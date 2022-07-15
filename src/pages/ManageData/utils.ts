export const confirmArchive = (name: string) => {
  return confirm(`Are you sure you want to archive "${name}"? This action cannot be undone.`);
};
