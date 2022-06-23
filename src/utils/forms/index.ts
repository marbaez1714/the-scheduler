import { AddFormData } from './types';

export const formatString = (value?: string) => {
  return value?.trim() || '';
};

export const formRules = {
  isNotEmpty: { required: true, pattern: new RegExp('^(?!\\s*$).+') },
};

export const AddFormDefaultData: AddFormData = {
  company: {
    name: '',
    primaryAddress: '',
    primaryEmail: '',
    primaryPhone: '',
    notes: '',
  },
  reporter: {
    name: '',
    primaryPhone: '',
    primaryEmail: '',
    notes: '',
  },
};
