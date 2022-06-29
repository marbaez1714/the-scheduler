import { AppRoutes } from 'src/utils/constants/routes';

export const manageDataItems = [
  { title: 'Areas', target: AppRoutes.Area, icon: 'location_searching' },
  {
    title: 'Builder',
    target: AppRoutes.Builder,
    icon: 'connect_without_contact',
  },
  { title: 'Communities', target: AppRoutes.Community, icon: 'map' },
  { title: 'Companies', target: AppRoutes.Company, icon: 'apartment' },
  { title: 'Contractors', target: AppRoutes.Contractor, icon: 'engineering' },
  { title: 'Reporter', target: AppRoutes.Reporter, icon: 'summarize' },
  { title: 'Scope', target: AppRoutes.Scope, icon: 'assignment' },
  { title: 'Supplier', target: AppRoutes.Supplier, icon: 'inventory' },
];
