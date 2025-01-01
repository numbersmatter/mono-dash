import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("routes/layouts/main-layout.tsx",[
    index("routes/home.tsx"),
    ...prefix("events", [
      index("routes/events.tsx"),
      route(":eventId", "routes/events/eventIdRoute.tsx", [
        index("routes/events/eventIdIndex.tsx")
      ]),

    ]),    
  ]),
  route("login", "routes/login/login.tsx"),
  route("logout", "routes/logout.ts")
] satisfies RouteConfig;
