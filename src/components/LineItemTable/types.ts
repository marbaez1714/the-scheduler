import { LineItem } from 'src/utils/cloudFunctionTypes';

export interface LineItemTableProps {
  lineItems: LineItem[];
  onRemove: (index: number) => void;
}
