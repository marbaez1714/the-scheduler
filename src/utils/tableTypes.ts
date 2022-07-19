import { ColumnDef } from '@tanstack/react-table';
import { StoreDocument, ResponseDocument } from './cloudFunctionTypes';

export type DocumentTableColumns<T extends keyof StoreDocument> = ColumnDef<ResponseDocument<T>>[];
