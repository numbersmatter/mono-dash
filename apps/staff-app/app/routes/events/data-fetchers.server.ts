import { foodPantryDb } from "~/staff/firestore/dbconnection";
import { convertTo12Hour } from "~/staff/lib/utils";



const getEventData = async ({ eventId }: { eventId: string }) => {
  const eventDoc = await foodPantryDb.events.read({ eventId });
  if (!eventDoc) {
    throw new Response("Not Found", { status: 404, statusText: "Event Not Found" });
  }

  const baseUrl = `/events/${eventId}`

  const timeSlots = eventDoc.timeSlots;

  // Turn timeSlots into an array of objects
  const timeSlotsArray = Object.entries(timeSlots)
  .map(([key, value]) => ({key,value}))
  .sort((a,b)=> Number(a.key) - Number(b.key))

  const tabs = [
    { name: 'Info', to: '', end: true },
    { name: 'Edit', to: 'edit', end:true},
    { name: 'Pickup', to: 'pickup', end:false },
  ].map((tab)=>{
    
    return {
      name: tab.name,
      to:`${baseUrl}/${tab.to}`,
      end: tab.end
    }

  })

  return { event: eventDoc, pickupTimes: timeSlotsArray, tabs };
};

const getEventPickupList = async ({eventId}:{eventId:string}) => {
  const reservationDocsAll = await foodPantryDb.reservations.listByEvent({eventId});

  const approvedReservations= reservationDocsAll
  .filter(r=> r.status == "approved")

  const reservationsOrdered = approvedReservations
  .sort((a,b)=> a.time - b.time)
  .map( r => {
    const timeSlot = convertTo12Hour(r.time)
    const deliveryStatus = r.deliveryDetails?.status ?? "waiting"

    return {
      ...r,
      timeSlot,
      deliveryStatus,
    }

  })

  const slots = new Set<number>();
  const slotMap = new Map();

  reservationsOrdered.map(r =>{
    slots.add(r.time)
  })

  const slotArray =[...slots].map( s => {
    const reservationsAtTime = reservationsOrdered
    .filter(r=> r.time === s)

    slotMap.set( s, reservationsAtTime)

    return reservationsAtTime
  })

  const slotTimes = [...slots].sort((a,b)=> a-b)

  return { reservations: reservationsOrdered, slotMap, slots:slotTimes };
};


const getActiveSemester = async ()=>{
  const semesterId = "Dt6bULFo471k1b6HRsDl";
  const semesterName = "August-December 2024"


  return {
    semesterId,
    semesterName
  }
}


export { getEventData, getEventPickupList, getActiveSemester};