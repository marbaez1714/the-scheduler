import { useState, useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { JobLegacy, useGetJobsLegacyByActiveStatusQuery } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { format } from 'date-fns';

const Archive = () => {
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
  const { data: getJobsLegacyData, loading: getJobLegacyLoading } =
    useGetJobsLegacyByActiveStatusQuery({
      variables: { active: false, pagination: { page: 1, pageSize: 10 } },
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
    <Screen>
      <Screen.Content title="Jobs (Legacy) - inactive " loading={getJobLegacyLoading}>
        <Table
          data={getJobsLegacyData?.jobsLegacyByActiveStatus.data as JobLegacy[]}
          columns={columns}
          total={
            getJobsLegacyData?.jobsLegacyByActiveStatus.meta.totalCount ?? 0
          }
        />
      </Screen.Content>
    </Screen>
  );
};

export default Archive;
