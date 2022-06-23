export const formatString = (value?: string) => {
  return value?.trim() || '';
};

export const formRules = {
  isNotEmpty: { required: true, pattern: new RegExp('^(?!\\s*$).+') },
};
