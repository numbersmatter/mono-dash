import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layouts/main-layout.tsx",[
    index("routes/home.tsx"),
    route("events","routes/events.tsx" )
  ]),
  route("login", "routes/login/login.tsx"),
  route("logout", "routes/logout.ts")
] satisfies RouteConfig;
