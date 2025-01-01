import { foodPantryDb } from "~/staff/firestore/dbconnection";



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

export { getEventData};