import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import {
  JobLegacy,
  useGetAssignedContractorsQuery,
  useGetUnassignedJobsQuery,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';

const Dashboard = () => {
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
  const { data: assignedContractorsData } = useGetAssignedContractorsQuery({
    onCompleted: (resp) => {
      console.log(resp);
    },
  });

  const { data: unassignedJobsData } = useGetUnassignedJobsQuery({
    onCompleted: (resp) => {
      console.log(resp.unassignedJobs.data);
    },
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
  const unassignedTableColumns: ColumnDef<JobLegacy>[] = [
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
      cell: (context) => 'status icons',
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
      accessorFn: (row) => row.community?.name || '-',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-reporter',
      header: 'Reporter',
      accessorFn: (row) => row.reporter?.name || '-',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-scope',
      header: 'Scope',
      accessorFn: (row) => row.scope?.name || '-',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-area',
      header: 'Area',
      accessorFn: (row) => row.area?.name || '-',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'job-builder',
      header: 'Builder',
      accessorFn: (row) => row.builder?.name || '-',
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
      <Screen.Content>
        {!!unassignedJobsData && (
          <Table
            title="Unassigned Jobs"
            data={unassignedJobsData.unassignedJobs.data as JobLegacy[]}
            columns={unassignedTableColumns}
          />
        )}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
