import { FormField } from './types';

export const AddCompanyFields: FormField[] = [
  { label: 'Company Name', param: 'name', required: true, icon: 'badge' },
  { label: 'Primary Phone', param: 'primaryAddress', icon: 'phone' },
  { label: 'Primary Email', param: 'primaryEmail', icon: 'email' },
  { label: 'Primary Address', param: 'primaryPhone', icon: 'location_on' },
  { label: 'Notes', param: 'notes', multiline: true, icon: 'notes' },
];
