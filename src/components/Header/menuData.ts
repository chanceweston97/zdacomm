import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Products",
    newTab: false,
    path: "/shop-with-sidebar",
    submenu: [
      {
        id: 5,
        title: "Antennas",
        newTab: false,
        path: "/categories/antennas",
      },
      {
        id: 6,
        title: "Custom Cables",
        newTab: false,
        path: "/categories/custom-cable",
      },
      {
        id: 7,
        title: "Connectors",
        newTab: false,
        path: "/categories/connectors",
      },
    ],
  },
  {
    id: 2,
    title: "Cable Customizer",
    newTab: false,
    path: "/cable-customizer",
  },
  {
    id: 3,
    title: "Request a Quote",
    newTab: false,
    path: "/request-a-quote",
  },
  {
    id: 4,
    title: "Our Story",
    newTab: false,
    path: "/our-story",
  },
  
];
