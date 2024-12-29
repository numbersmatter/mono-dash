import { initializeFirestoreFoodPantryDb } from "@mono-dash/food-pantry-db";
import { getServerEnv } from "../env.server";

const {  SERVICE_ACCOUNT, FIREBASE_APP_NAME } =
  getServerEnv();

const { foodPantryDb } = initializeFirestoreFoodPantryDb({
  FIREBASE_APP_NAME,
  SERVICE_ACCOUNT,
  collectionPaths:{
    users:"users",
    applications:"applications",
    events:"events",
    registrations:"registrations",
    reservations:"reservations",
  }
});

export { foodPantryDb}