export interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  isValid: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onClearClick?: () => void;
}
