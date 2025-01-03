import { getFirestore } from "firebase-admin/firestore"
import { applicationsDb } from "./firestore/applications/applications-crud.server"
import { eventsDb } from "./firestore/events/crud.server"
import { EventStage } from "./firestore/events/event-types"
import { EventType } from "./firestore/events/event-types"
import { initFirebase } from "./firestore/firestore.server"
import { registrationsDb } from "./firestore/registrations/registrations-crud.server"
import { reservationsDb } from "./firestore/reservations/crud.server"
import { UserDb } from "./firestore/users/crud.server"

// This is your packages entry point, everything exported from here will be accessible to the end-user.

type CollectionPaths = {
	applications?: string
	events?: string
	registrations?: string
	reservations?: string
	users?: string
}

export const initializeFirestoreFoodPantryDb = ({
	FIREBASE_APP_NAME,
	SERVICE_ACCOUNT,
	collectionPaths,
}: {
	FIREBASE_APP_NAME: string
	SERVICE_ACCOUNT: string
	collectionPaths: CollectionPaths
}) => {
	const fireApp = initFirebase({ FIREBASE_APP_NAME, SERVICE_ACCOUNT })
	const firestore = getFirestore(fireApp)

	const applicationsPath = collectionPaths.applications ?? "applications"
	const eventsPath = collectionPaths.events ?? "events"
	const registrationsPath = collectionPaths.registrations ?? "registrations"
	const reservationsPath = collectionPaths.reservations ?? "reservations"
	const usersPath = collectionPaths.users ?? "users"

	const applications = applicationsDb({ firestore, path: applicationsPath })
	const events = eventsDb({ firestore, path: eventsPath })
	const registrations = registrationsDb({ firestore, path: registrationsPath })
	const reservations = reservationsDb({ firestore, path: reservationsPath })
	const users = UserDb({ firestore, path: usersPath })

	const foodPantryDb = {
		applications,
		events,
		registrations,
		reservations,
		users,
	}
	return {
		foodPantryDb,
	}
}

export type { EventType, EventStage }
