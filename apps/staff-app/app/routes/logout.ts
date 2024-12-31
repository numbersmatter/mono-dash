import { signOut } from "../services/auth-funcs.server";
import { Route } from "./+types/logout";

export async function action({request}: Route.ActionArgs) {
  return await signOut({request}) 
}