import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import { Area, useArchiveAreaMutation, useGetAreasQuery } from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

export const AreaList = () => {
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
  const { data, loading, refetch } = useGetAreasQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveAreaMutation({
    onCompleted: (data) => {
      toast.success(data.archiveArea.message);
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
    title: 'Add Area',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions = (data: Area) => [
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
    dataColumns.areaMenu(rowActions),
    dataColumns.name,
    dataColumns.nameSpanish,
    dataColumns.updatedTimestamp,
    dataColumns.createdTimestamp,
    dataColumns.id,
  ] as ColumnDef<Area>[];

  /******************************/
  /* Render                    */
  /******************************/
  return (
    <Screen.Content
      title="Areas List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.areas && <Table data={data.areas.data} columns={tableColumns} />}
    </Screen.Content>
  );
};
