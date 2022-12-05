import { ColumnDef } from '@tanstack/react-table';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Community,
  useArchiveCommunityMutation,
  useGetCommunitiesQuery,
} from 'src/api';

import { Table } from 'src/components/Table';
import { Screen } from 'src/components/Screen';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

export const CommunityList = () => {
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
  const { data, loading, refetch } = useGetCommunitiesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveCommunityMutation({
    onCompleted: (data) => {
      toast.success(data.archiveCommunity.message);
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
    title: 'Add Community',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions = (data: Community) => [
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
    dataColumns.communityMenu(rowActions),
    dataColumns.name,
    dataColumns.company,
    dataColumns.timestamps,
    dataColumns.id,
  ] as ColumnDef<Community>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Communities List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.communities && (
        <Table
          data={data.communities.data as Community[]}
          columns={tableColumns}
        />
      )}
    </Screen.Content>
  );
};
