import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Contractor,
  useArchiveContractorMutation,
  useGetContractorsQuery,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

export const ContractorList = () => {
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
  const { data, loading, refetch } = useGetContractorsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveContractorMutation({
    onCompleted: (data) => {
      toast.success(data.archiveContractor.message);
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
    title: 'Add Contractor',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Contractor>[] = [
    {
      icon: <PencilSquareIcon />,
      label: 'Edit',
      onClick: (data) => navigate(data.id),
    },
    {
      icon: <ArchiveBoxIcon />,
      label: 'Archive',
      onClick: (data) =>
        confirmArchive(data.name) && archive({ variables: { id: data.id } }),
    },
  ];

  const tableColumns = [
    dataColumns.name,
    dataColumns.primaryPhone,
    dataColumns.timestamps,
    dataColumns.id,
  ] as ColumnDef<Contractor>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Contractors List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.contractors && (
        <Table
          data={data.contractors.data as Contractor[]}
          columns={tableColumns}
          rowActions={rowActions}
        />
      )}
    </Screen.Content>
  );
};
