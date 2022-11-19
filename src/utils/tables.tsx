import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Table } from 'src/components/Table';
import {
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  Reporter,
  Scope,
  Supplier,
} from 'src/api';

const dataHelpers = createColumnHelper<
  JobLegacy &
    Area &
    Builder &
    Community &
    Company &
    Contractor &
    Reporter &
    Scope &
    Supplier
>();

export const dataColumns = {
  status: dataHelpers.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => <Table.JobLegacyStatusCell value={getValue()} />,
  }),
  startDate: dataHelpers.accessor(
    (row) => format(new Date(row.updatedTime), 'P'),
    {
      id: 'startDate',
      header: 'Start Date',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    }
  ),
  address: dataHelpers.accessor('name', {
    id: 'name',
    header: 'Address',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  community: dataHelpers.accessor((row) => row.community?.name, {
    id: 'communityId',
    header: 'Community',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  reporter: dataHelpers.accessor((row) => row.reporter?.name, {
    id: 'reporterId',
    header: 'Reporter',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  scope: dataHelpers.accessor((row) => row.scope?.name, {
    id: 'scopeId',
    header: 'Scope',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  area: dataHelpers.accessor((row) => row.area?.name, {
    id: 'areaId',
    header: 'Area',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  builder: dataHelpers.accessor((row) => row.builder?.name, {
    id: 'builderId',
    header: 'Builder',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  name: dataHelpers.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  nameSpanish: dataHelpers.accessor('nameSpanish', {
    id: 'nameSpanish',
    header: () => <Table.HeaderCell title="Translation" subtitle="Spanish" />,
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  timestamps: dataHelpers.accessor(
    (row) => format(new Date(row.updatedTime), 'Pp'),
    {
      id: 'updatedTime',
      header: 'Timestamps',
      cell: (data) => <Table.TimestampCell data={data.row.original} />,
    }
  ),
  id: dataHelpers.accessor('id', {
    id: 'id',
    header: 'ID',
    cell: (data) => (
      <Table.DataIdCell
        data={{
          id: data.getValue(),
          legacy: data.row.original.legacy ?? false,
        }}
      />
    ),
  }),
  company: dataHelpers.accessor((row) => row.company.name, {
    id: 'companyId',
    header: 'Company',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  primaryPhone: dataHelpers.accessor('primaryPhone', {
    id: 'primaryPhone',
    header: 'Primary Phone',
    cell: ({ getValue }) => <Table.PhoneNumberCell value={getValue()} />,
  }),
  primaryEmail: dataHelpers.accessor('primaryEmail', {
    id: 'primaryEmail',
    header: 'Primary Email',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
  primaryAddress: dataHelpers.accessor('primaryAddress', {
    id: 'primaryAddress',
    header: 'Primary Address',
    cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
  }),
};
