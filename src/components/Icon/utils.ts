import {
  PencilSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowsRightLeftIcon,
  DocumentCheckIcon,
  ArrowUpIcon,
  CogIcon,
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  Squares2X2Icon,
  ClipboardIcon,
  MapIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  MapPinIcon,
  CreditCardIcon,
  XMarkIcon,
  TrashIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';

export const iconMap = {
  address: MapPinIcon,
  area: Squares2X2Icon,
  builder: ClipboardIcon,
  complete: DocumentCheckIcon,
  community: MapIcon,
  company: BuildingOfficeIcon,
  contractor: UserGroupIcon,
  data: CircleStackIcon,
  dashboard: ComputerDesktopIcon,
  edit: PencilSquareIcon,
  important: ArrowUpIcon,
  inProgress: CogIcon,
  job: ClipboardDocumentIcon,
  logout: ArrowRightOnRectangleIcon,
  message: ChatBubbleBottomCenterTextIcon,
  orderNumber: CreditCardIcon,
  reassign: ArrowsRightLeftIcon,
  reporter: EyeIcon,
  scope: MagnifyingGlassIcon,
  supplier: TruckIcon,
  remove: XMarkIcon,
  trash: TrashIcon,
  loading: ArrowPathIcon,
  calendar: CalendarDaysIcon,
  chevronDown: ChevronDownIcon,
  plusCircle: PlusCircleIcon,
};

export const iconNames = Object.keys(iconMap) as (keyof typeof iconMap)[];
