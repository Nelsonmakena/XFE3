import { Home } from "lucide-react";

export interface MenuItem {
  label: string;
  items: {
    name: string;
    path: string;
    icon?: React.ElementType | string;
  }[];
}

export const DoctorMenuItems: MenuItem[] = [
  { label: "Dashboard", items: [{ name: "Home", path: "", icon: Home }] },
  {
    label: "patients",
    items: [
      { name: "incoming", path: "" },
      { name: "diognized", path: "" },
      { name: "attendance", path: "" },
    ],
  },
  {
    label: "Exams",
    items: [
      { name: "Subjects", path: "" },
      { name: "Time Table", path: "" },
    ],
  },
];

export const AdminMenuItems: MenuItem[] = [
  { label: "Dashboard", items: [{ name: "Home", path: "", icon: Home }] },
  {
    label: "management",
    items: [
      { name: "employees", path: "" },
      { name: "", path: "" },
    ],
  },
  {
    label: "setup",
    items: [
      { name: "classes", path: "" },
      { name: "instructors", path: "" },
      { name: "subjects", path: "" },
    ],
  },

  { label: "subjects", items: [] },
  { label: "students", items: [{ name: "", path: "" }] },
  { label: "exams", items: [] },
  { label: "schedule", items: [] },
  { label: "instructors", items: [] },
  { label: "reports", items: [] },
];
