import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Builder,
  useArchiveBuilderMutation,
  useGetBuildersQuery,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

export const BuilderList = () => {
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
  const { data, loading, refetch } = useGetBuildersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveBuilderMutation({
    onCompleted: (data) => {
      toast.success(data.archiveBuilder.message);
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
    title: 'Add Builder',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions = (data: Builder) => [
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
    dataColumns.builderMenu(rowActions),
    dataColumns.name,
    dataColumns.company,
    dataColumns.primaryPhone,
    dataColumns.primaryEmail,
    dataColumns.updatedTimestamp,
    dataColumns.createdTimestamp,
    dataColumns.id,
  ] as ColumnDef<Builder>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Builders List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.builders && (
        <Table data={data.builders.data as Builder[]} columns={tableColumns} />
      )}
    </Screen.Content>
  );
};
