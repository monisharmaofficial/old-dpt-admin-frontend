/** Icons are imported separatly to reduce build time */
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import TagIcon from "@heroicons/react/24/outline/TagIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import BuildingOffice2Icon from "@heroicons/react/24/outline/BuildingOffice2Icon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const submenu = [
  {
    path: "/app/tour-booking",
    icon: <WalletIcon className={submenuIconClasses} />,
    name: "Tour Booking",
  },
  {
    path: "/app/transfer-booking",
    icon: <KeyIcon className={submenuIconClasses} />,
    name: "Transfer Service Booking",
  },
  {
    path: "/app/visa-application",
    icon: <CalendarDaysIcon className={submenuIconClasses} />,
    name: "Visa Application",
  },
];

const routes = [
  // {
  //   path: '/app/dashboard',
  //   icon: <Squares2X2Icon className={iconClasses} />,
  //   name: 'Dashboard',
  // },
  {
    path: "/app/category",
    icon: <TagIcon className={iconClasses} />,
    name: "Category",
  },
  {
    path: "/app/emirates",
    icon: <UsersIcon className={iconClasses} />,
    name: "Emirates",
  },
  {
    path: "/app/destinations",
    icon: <UserIcon className={iconClasses} />,
    name: "Destinations",
  },
  {
    path: "/app/itinerary",
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: "Itinerary",
  },
  {
    path: "/app/tours",
    icon: <BuildingOffice2Icon className={iconClasses} />,
    name: "Tours",
  },

  {
    icon: <ArrowRightOnRectangleIcon className={iconClasses} />,
    name: "Booking",
    children: submenu,
  },

  {
    path: "/app/agents",
    icon: <UserGroupIcon className={iconClasses} />,
    name: "Agents",
  },
  {
    path: "/app/user-data",
    icon: <UserIcon className={iconClasses} />,
    name: "User",
  },
  {
    path: "/app/page",
    icon: <DocumentIcon className={iconClasses} />,
    name: "Page",
  },
  // {
  //   path: "/app/destinations",
  //   icon: <UserIcon className={iconClasses} />,
  //   name: "Destinations",
  // },
  {
    path: "/app/hotel-location",
    icon: <ChartBarIcon className={iconClasses} />,
    name: "Location",
  },
  {
    path: "/app/hotel",
    icon: <ChartBarIcon className={iconClasses} />,
    name: "Hotels",
  },

  {
    path: "/app/testimonial",
    icon: <ChartBarIcon className={iconClasses} />,
    name: "Testimonial",
  },

  {
    path: "/app/review",
    icon: <DocumentDuplicateIcon className={iconClasses} />,
    name: "Review",
  },
  {
    path: "/app/faq",
    icon: <DocumentDuplicateIcon className={iconClasses} />,
    name: "FAQ",
  },
  {
    path: "/app/attraction",
    icon: <DocumentDuplicateIcon className={iconClasses} />,
    name: "Attraction",
  },
  {
    path: "/app/leads",
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: "Leads",
  },
  {
    path: "/app/transactions",
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: "Transactions",
  },
];

export default routes;
