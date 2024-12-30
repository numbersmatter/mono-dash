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