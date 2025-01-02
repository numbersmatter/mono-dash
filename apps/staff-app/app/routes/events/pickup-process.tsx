import { requireAuth } from "~/staff/services/auth-funcs.server";
import { mutations } from "./mutations.server";
import { getReservationProcessData } from "./data-fetchers.server";
import {
  Card,
  CardContent,
  CardFooter
} from "~/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Route } from "./+types/pickup-process";
import { Button } from "~/staff/components/ui/button";
import { Form } from "react-router";

export const loader = async (args: Route.LoaderArgs) => {
  await requireAuth(args);
  const reservationId = args.params.reservationId;
  const data = await getReservationProcessData({ reservationId });
  return { ...data };
};


export const action = async (args: Route.ActionArgs) => {
  const { user } = await requireAuth(args);

  return await mutations.confirmPickup({
    reservationId: args.params.reservationId,
    staffId: user.uid,
    eventId: args.params.eventId
  });
};


export default function PickupForm({ loaderData }: Route.ComponentProps) {
  const { reservation } = loaderData;

  return (
    <Card className="flex flex-col flex-1 pb-4"
    >
      <CardContent
        className="flex-1 grid grid-cols-1 py-8 place-content-center"
      >
        <h3
          className="m-auto inset-0 text-5xl text-sky-600 font-bold"
        >
          {reservation.confirm}
        </h3>
      </CardContent>
      <CardFooter
        className="grid grid-cols-1 gap-4"
      >
        <ConfirmPickup />
        <Button
          variant={"secondary"}
          className=""
        >
          Cancel
        </Button>

      </CardFooter>
    </Card>
  )
}


export function ConfirmPickup() {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Confirm Pickup
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm Box Pickedup
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the box as picked up.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form method="post" >
            <Button name="intent" value="confirm" type="submit" variant={"outline"}>
              Confirm Pickup
            </Button>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}



