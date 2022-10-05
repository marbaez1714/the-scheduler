import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { JobLegacy, useGetJobLegacyByContractorIdQuery } from 'src/api';

import { LegacyContractorTableProps } from './types';
import { Table } from '../Table';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const LegacyContractorTable = ({ contractor }: LegacyContractorTableProps) => {
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
  const { data, loading } = useGetJobLegacyByContractorIdQuery({
    variables: { contractorId: contractor.id },
  });

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
  if (loading) {
    <div className="flex items-center w-full py-6 pl-4 pr-6 rounded bg-app animate-pulse">
      <ArrowPathIcon className="w-6 h-6 my-2 ml-2 mr-6 text-app-altText animate-spin" />

      {/******************************/}
      {/* Title                      */}
      {/******************************/}
      <div className="flex items-end basis-2/3">
        <h1 className="text-4xl font-semibold tracking-wide text-app-altText">
          {contractor.name}
        </h1>
      </div>
    </div>;
  }

  return (
    <Table
      title={contractor.name}
      data={(data?.jobLegacyByContractorId.data ?? []) as JobLegacy[]}
      columns={columns}
      total={data?.jobLegacyByContractorId.meta.totalCount ?? 0}
    />
  );
};

export default LegacyContractorTable;
