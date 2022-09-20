import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import {
  Company,
  useGetCompaniesQuery,
  useArchiveCompanyMutation,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { format } from 'date-fns';

export const CompanyList = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();

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
  const { data, loading, refetch } = useGetCompaniesQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [archive, { loading: archiveLoading }] = useArchiveCompanyMutation({
    onCompleted: (data) => {
      toast.success(data.archiveCompany.message);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
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
  const primaryAction = {
    title: 'Add Company',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Company>[] = [
    { icon: 'edit', label: 'Edit', onClick: (data) => navigate(data.id) },
    {
      icon: 'archive',
      label: 'Archive',
      onClick: (data) =>
        confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns: ColumnDef<Company>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ getValue }) => <Table.TextCell value={getValue()} />,
    },
    {
      id: 'primaryPhone',
      header: 'Primary Phone',
      accessorKey: 'primaryPhone',
      cell: ({ getValue }) => <Table.PhoneNumberCell value={getValue()} />,
    },
    {
      id: 'primaryAddress',
      header: 'Primary Address',
      accessorKey: 'primaryAddress',
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
    <Screen.Content
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.companies && (
        <Table
          title="Companies List"
          data={data.companies.data as Company[]}
          columns={tableColumns}
          total={data.companies.meta.totalCount}
          rowActions={rowActions}
        />
      )}
    </Screen.Content>
  );
};
