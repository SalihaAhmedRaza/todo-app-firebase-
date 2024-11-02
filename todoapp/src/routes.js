import Home from "./pages/Home";

import Todo from "./pages/Todo";




const dashboardRoutes = [
 {
    upgrade: true,
    path: "/home",
    name: "Dashboard",
    icon: "nc-icon nc-alien-33",
    component: Home,
    layout: "/admin"
  },
  {
    path: "/todo",
    name: "Employees",
    icon: "nc-icon nc-chart-pie-35",
    component: Todo,
    layout: "/admin"
  },
  
 
];

export default dashboardRoutes;