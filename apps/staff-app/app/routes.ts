import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layouts/main-layout.tsx",[
    index("routes/home.tsx"),
    route("events","routes/events.tsx" )
  ]),
  route("login", "routes/login.tsx")
] satisfies RouteConfig;
