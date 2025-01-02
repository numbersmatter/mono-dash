import { foodPantryDb } from "~/staff/firestore/dbconnection";



export const getEvents= async()=>{
    const eventDocs = await foodPantryDb.events.list();
  const semesterId = "Dt6bULFo471k1b6HRsDl";
  const semesterInfo = {
    semesterName: "August-December 2024",
  };


  const events = eventDocs.map((doc) => {
    return {
      id: doc.id,
      name: doc.name,
      type: doc.type,
      eventDate: doc.eventDate.toDateString(),
      stage: doc.stage,
    };
  });

  return { events, eventDocs, semesterInfo };
}



// Event Index Page
export const getEventStats = async ({ eventId }:{ eventId:string })=>{
  const eventDoc = await foodPantryDb
  .events.read({eventId})

  if(!eventDoc){
    throw new Error("Event by id does not exist")
  }

  const {semesterId } = eventDoc

  //  get all reservations for the events
  const reservationsDocs = await foodPantryDb
  .reservations
  .listByEvent({eventId});

  // const { semesterId} = await getActiveSemester()

  // order reservations by date requested 
  const reservations = reservationsDocs
  .sort((a,b)=>a.createdDate.valueOf() - b.createdDate.valueOf())


  //  get a list of approved reservations
  const approvedReservations= reservationsDocs
  .filter(r=> r.status == "approved")


  //  get list of approved reservations that have been delivered
  const reservationsDelivered = approvedReservations
  .map( r => {
    const deliveryStatus = r.deliveryDetails?.status ?? "waiting"

    return {
      ...r,
      deliveryStatus,
    }
  })
  .filter( r => r.deliveryStatus ==="delivered")

  //  get list of userIds for the delivered reservations
  const userIds = reservationsDelivered.map(r=> r.userId);

  //  create an array of promises for the each user with Id to get their registration for that semester
  const registrationDocsPromises = userIds.map(userId => foodPantryDb.registrations.checkRegistration({userId, semesterId}))

  
  const registrationQuery = await Promise.all(registrationDocsPromises)

  //  remove users who do not have registration Docs
  const registeredDocs = registrationQuery.filter(r=> r !== null)

  // get an array of all students then create separate lists by school
  const studentsArray = registeredDocs.map(doc => doc.students).flat()
  
  const ldeStudents = studentsArray.filter(s=> s.school==="lde")
  const tpsStudents = studentsArray.filter(s=> s.school==="tps")
  const tmsStudents = studentsArray.filter(s=> s.school==="tms")
  const thsStudents = studentsArray.filter(s=> s.school==="ths")

  // get array of all adults
  const adults = registeredDocs
  .map(d=> d.household_adults)
  .reduce((a, c)=> a +c, 0)


  //  find users missing some registration data
  const uncounted = userIds.length - registeredDocs.length

  // create stats needed
  const stats = [
  { name: 'Adults', stat: adults },
  { name: 'Students', stat: studentsArray.length },
  { name: 'High School', stat: thsStudents.length },
  { name: 'Middle School', stat: tmsStudents.length },
  { name: 'Elementary School', stat: ldeStudents.length },
  { name: 'Primary School', stat: tpsStudents.length },
  { name: 'Missing Info', stat: uncounted}
]


  return { studentsArray,  requests: reservations, stats,  registeredDocs, approvedReservations, reservationsDelivered };

}