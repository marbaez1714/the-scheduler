import { LineItem } from 'src/utils/forms/types';

export interface LineItemTableProps {
  lineItems: LineItem[];
  onRemove: (index: number) => void;
}
