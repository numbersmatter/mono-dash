import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { requireAuth } from "../services/auth-funcs.server";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth({ request });
  return {};
}

export default function Home() {
  return <Welcome />;
}
