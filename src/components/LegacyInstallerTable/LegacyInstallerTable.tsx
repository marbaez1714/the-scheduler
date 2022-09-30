import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { JobLegacy } from 'src/api';

import { LegacyInstallerTableProps } from './types';
import { Table } from '../Table';

const LegacyInstallerTable = ({ data }: LegacyInstallerTableProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Table                      */
  /******************************/
  const columns: ColumnDef<JobLegacy>[] = [
    {
      id: 'job-actions',
      header: '',
      enableSorting: false,
      cell: (context) => 'actions',
    },
    {
      id: 'job-status',
      header: 'Status',
      enableSorting: false,
      accessorKey: 'status',
      cell: ({ getValue }) => <Table.JobLegacyStatusCell value={getValue()} />,
    },
    {
      id: 'job-start-date',
      header: 'Start Date',
      accessorFn: (row) => format(new Date(row.updatedTime), 'P'),
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-name',
      header: 'Address',
      accessorKey: 'name',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-community',
      header: 'Community',
      accessorFn: (row) => row.community?.name,
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-reporter',
      header: 'Reporter',
      accessorFn: (row) => row.reporter?.name,
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-scope',
      header: 'Scope',
      accessorFn: (row) => row.scope?.name,
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-area',
      header: 'Area',
      accessorFn: (row) => row.area?.name,
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-builder',
      header: 'Builder',
      accessorFn: (row) => row.builder?.name,
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'timestamp',
      header: () => (
        <Table.HeaderCell
          title="Timestamps"
          subtitle="Last Updated / First Created"
        />
      ),
      accessorFn: (row) => format(new Date(row.updatedTime), 'Pp'),
      cell: (data) => <Table.TimestampCell data={data.row.original} />,
    },
    {
      id: 'id',
      header: () => (
        <Table.HeaderCell title="ID" subtitle="Identifier / Origin" />
      ),
      accessorKey: 'id',
      cell: (data) => (
        <Table.DataIdCell
          data={{
            id: data.getValue(),
            legacy: data.row.original.legacy ?? false,
          }}
        />
      ),
    },
  ];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Table
      title="Unassigned Jobs"
      data={data.data}
      columns={columns}
      total={data.meta.totalCount}
    />
  );
};

export default LegacyInstallerTable;
