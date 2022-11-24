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
} from '@heroicons/react/24/solid';

import { IconProps } from './types';

const Icon = ({ icon, ...rest }: IconProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  switch (icon) {
    case 'address':
      return <MapPinIcon {...rest} />;
    case 'area':
      return <Squares2X2Icon {...rest} />;
    case 'builder':
      return <ClipboardIcon {...rest} />;
    case 'complete':
      return <DocumentCheckIcon {...rest} />;
    case 'community':
      return <MapIcon {...rest} />;
    case 'company':
      return <BuildingOfficeIcon {...rest} />;
    case 'contractor':
      return <UserGroupIcon {...rest} />;
    case 'data':
      return <CircleStackIcon {...rest} />;
    case 'dashboard':
      return <ComputerDesktopIcon {...rest} />;
    case 'edit':
      return <PencilSquareIcon {...rest} />;
    case 'important':
      return <ArrowUpIcon {...rest} />;
    case 'inProgress':
      return <CogIcon {...rest} />;
    case 'job':
      return <ClipboardDocumentIcon {...rest} />;
    case 'logout':
      return <ArrowRightOnRectangleIcon {...rest} />;
    case 'message':
      return <ChatBubbleBottomCenterTextIcon {...rest} />;
    case 'orderNumber':
      return <CreditCardIcon {...rest} />;
    case 'reassign':
      return <ArrowsRightLeftIcon {...rest} />;
    case 'reporter':
      return <EyeIcon {...rest} />;
    case 'scope':
      return <MagnifyingGlassIcon {...rest} />;
    case 'supplier':
      return <TruckIcon {...rest} />;

    default:
      return <></>;
  }
};

export default Icon;
