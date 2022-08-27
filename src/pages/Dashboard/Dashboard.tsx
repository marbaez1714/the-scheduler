import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { JobLegacy, useGetAssignedContractorsQuery, useGetUnassignedJobsQuery } from 'src/api';

import { Content, Screen, Table } from 'src/components';

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
      accessorFn: (row) => (row.startDate ? format(new Date(row.startDate), 'P') : '-'),
      cell: (context) => context.getValue(),
    },
    {
      id: 'job-name',
      header: 'Address',
      accessorKey: 'name',
      cell: (context) => context.getValue(),
    },
    {
      id: 'job-community',
      header: 'Community',
      accessorFn: (row) => row.community?.name || '-',
      cell: (context) => context.getValue(),
    },
    {
      id: 'job-reporter',
      header: 'Reporter',
      accessorFn: (row) => row.reporter?.name || '-',
      cell: (context) => context.getValue(),
    },
    {
      id: 'job-scope',
      header: 'Scope',
      accessorFn: (row) => row.scope?.name || '-',
      cell: (context) => context.getValue(),
    },
    {
      id: 'job-area',
      header: 'Area',
      accessorFn: (row) => row.area?.name || '-',
      cell: (context) => context.getValue(),
    },
    // { TODO
    //   id: 'job-company',
    //   header: 'Company',
    //   accessorKey: ''
    // }
    {
      id: 'job-builder',
      header: 'Builder',
      accessorFn: (row) => row.builder?.name || '-',
      cell: (context) => context.getValue(),
    },
  ];

  // <!-- community -->
  // <td>{{ item.communityName }}</td>
  // <!-- reporter -->
  // <td>{{ item.reporterName }}</td>
  // <!-- scope -->
  // <td>{{ item.sowName }}</td>
  // <!-- area -->
  // <td>{{ item.areaName }}</td>
  // <!-- company -->
  // <td>{{ item.companyName }}</td>
  // <!-- builder -->
  // <td>{{ item.builderName }}</td>
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Content>
        {!!unassignedJobsData && (
          <Table
            title="Unassigned Jobs"
            data={unassignedJobsData.unassignedJobs.data as JobLegacy[]}
            columns={unassignedTableColumns}
          />
        )}
      </Content>
    </Screen>
  );
};

export default Dashboard;
