import HeaderIcon from "@mui/icons-material/Inventory2Outlined";
import CheckIcon from "@mui/icons-material/CheckCircleOutlined";
import OutIcon from "@mui/icons-material/ReportOutlined";
import NewIcon from "@mui/icons-material/VerifiedOutlined";

export const headerdata = [
  {
    header: "Total Order",
    body: "1200",
    footer: "Yesterday 1133",
  },
  {
    header: "Total Pending",
    body: "95",
    footer: "Yesterday 83",
  },
  {
    header: "Total Completed",
    body: "456",
    footer: "Yesterday 455",
  },
  {
    header: "Total Cancel",
    body: "33",
    footer: "Yesterday 333",
  },
];

//for class order table
export const classOrdertable = [
  {
    order_id: 1000,
    order_item: "apple,grape,orange",
    amount: 20000,
    payment: "KBZ pay",
    payment_proof: "photo.file",
  },
  {
    order_id: 1000,
    order_item: "apple,grape,orange",
    amount: 20000,
    payment: "KBZ pay",
    payment_proof: "photo.file",
  },
  {
    order_id: 1000,
    order_item: "apple,grape,orange",
    amount: 20000,
    payment: "KBZ pay",
    payment_proof: "photo.file",
  },
  {
    order_id: 1000,
    order_item: "apple,grape,orangedfsdfdsfasdfdsafsdafdsfasdf",
    amount: 20000,
    payment: "KBZ pay",
    payment_proof: "photo.file",
  },
];

//for classmenu
export const orderheadingdata = [
  { title: "Total Menus", icon: HeaderIcon, amount: "345" },
  { title: "Avaliables Menus", icon: CheckIcon, amount: "345" },
  { title: "Out of Stock", icon: OutIcon, amount: "345" },
  { title: "New Arrival Menus", icon: NewIcon, amount: "Pasta and Noodles" },
];
