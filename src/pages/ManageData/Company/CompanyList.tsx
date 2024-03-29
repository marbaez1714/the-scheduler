import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Company,
  useGetCompaniesQuery,
  useArchiveCompanyMutation,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

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
  const rowActions = (data: Company) => [
    {
      icon: <PencilSquareIcon />,
      label: 'Edit',
      onClick: () => navigate(data.id),
    },
    {
      icon: <ArchiveBoxIcon />,
      label: 'Archive',
      onClick: () =>
        confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns = [
    dataColumns.companyMenu(rowActions),
    dataColumns.name,
    dataColumns.primaryPhone,
    dataColumns.primaryAddress,
    dataColumns.updatedTimestamp,
    dataColumns.createdTimestamp,
    dataColumns.id,
  ] as ColumnDef<Company>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Companies List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.companies && (
        <Table data={data.companies.data as Company[]} columns={tableColumns} />
      )}
    </Screen.Content>
  );
};
