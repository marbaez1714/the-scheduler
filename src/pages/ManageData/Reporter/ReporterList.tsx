import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

import {
  Reporter,
  useArchiveReporterMutation,
  useGetReportersQuery,
} from 'src/api';

import { Screen } from 'src/components/Screen';
import { Table, TableRowAction } from 'src/components/Table';
import { confirmArchive } from 'src/utils/alerts';
import { dataColumns } from 'src/utils/tables';

export const ReporterList = () => {
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
  const { data, loading, refetch } = useGetReportersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [archive, { loading: archiveLoading }] = useArchiveReporterMutation({
    onCompleted: (data) => {
      toast.success(data.archiveReporter.message);
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
    title: 'Add Reporter',
    onClick: () => navigate('add'),
  };

  /******************************/
  /* Table Definitions         */
  /******************************/
  const rowActions: TableRowAction<Reporter>[] = [
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
    dataColumns.primaryEmail,
    dataColumns.timestamps,
    dataColumns.id,
  ] as ColumnDef<Reporter>[];

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content
      title="Reporters List"
      loading={loading || archiveLoading}
      primaryAction={primaryAction}
    >
      {/* Area List */}
      {data?.reporters && (
        <Table
          data={data.reporters.data as Reporter[]}
          columns={tableColumns}
          rowActions={rowActions}
        />
      )}
    </Screen.Content>
  );
};
