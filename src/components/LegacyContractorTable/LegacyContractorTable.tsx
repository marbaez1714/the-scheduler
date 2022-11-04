import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
  CogIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';

import {
  GetJobLegacyByIdDocument,
  JobLegacy,
  useGetJobLegacyByContractorIdQuery,
  useModifyJobLegacyMutation,
} from 'src/api';
import { LegacyContractorTableProps } from './types';
import { Table, TableRowAction } from '../Table';

import { Collapsable } from '../Collapsable';
import { confirmArchive } from 'src/utils/alerts';
import { ReassignModal } from './ReassignModal';
import toast from 'react-hot-toast';

const LegacyContractorTable = ({ contractor }: LegacyContractorTableProps) => {
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
  const [selectedJob, setSelectedJob] = useState<JobLegacy>();
  const [reassignModalOpen, setReassignModalOpen] = useState(false);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch } = useGetJobLegacyByContractorIdQuery({
    variables: { contractorId: contractor.id },
  });

  const [modify] = useModifyJobLegacyMutation({
    onCompleted: () => {
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
  const handleReassignJob = (data: JobLegacy) => {
    setSelectedJob(data);
    setReassignModalOpen(true);
  };

  const handleReassignModalClose = () => {
    setSelectedJob(undefined);
    setReassignModalOpen(false);
  };

  const handleEditJob = (data: JobLegacy) => {
    navigate(`/modify_jobLegacy/${data.id}`);
  };

  const handleToggleInProgress = (data: JobLegacy) => {
    modify({
      variables: { id: data.id, data: { inProgress: !data.inProgress } },
    });
  };

  const handleToggleIsImportant = (data: JobLegacy) => {
    modify({
      variables: { id: data.id, data: { isImportant: !data.isImportant } },
    });
  };

  const handleComplete = (data: JobLegacy) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${data.name} as COMPLETED?`
    );

    if (confirm) {
      const completedDate = new Date().toDateString();

      modify({
        variables: { id: data.id, data: { active: false, completedDate } },
      }).then(() => toast.success(`${data.name} has been marked as completed`));
    }
  };

  /******************************/
  /* Table                      */
  /******************************/
  const rowActions: TableRowAction<JobLegacy>[] = [
    {
      icon: <PencilSquareIcon />,
      label: 'Edit',
      onClick: handleEditJob,
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon />,
      label: 'Send Alert',
      onClick: () => {},
    },
    {
      icon: <ArrowsRightLeftIcon />,
      label: 'Reassign',
      onClick: handleReassignJob,
    },
    {
      icon: <CogIcon />,
      label: 'Toggle In Progress',
      onClick: handleToggleInProgress,
    },
    {
      icon: <ArrowUpIcon />,
      label: 'Toggle Important',
      onClick: handleToggleIsImportant,
    },
    {
      icon: <DocumentCheckIcon />,
      label: 'Complete',
      onClick: handleComplete,
    },
    {
      icon: <ArchiveBoxIcon />,
      label: 'Archive',
      onClick: (data) => confirmArchive(data.name),
    },
  ];

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
  if (loading) {
    <div className="flex items-center w-full py-6 pl-4 pr-6 rounded bg-app animate-pulse">
      <ArrowPathIcon className="w-6 h-6 my-2 ml-2 mr-6 text-app-altText animate-spin" />

      {/******************************/}
      {/* Title                      */}
      {/******************************/}
      <div className="flex items-end basis-2/3">
        <h1 className="text-4xl font-semibold tracking-wide text-app-altText">
          {contractor.name}
        </h1>
      </div>
    </div>;
  }

  return (
    <>
      <ReassignModal
        open={reassignModalOpen}
        onClose={handleReassignModalClose}
        jobLegacy={selectedJob}
      />
      <Collapsable title={contractor.name} unmount={false} defaultOpen>
        <Table
          data={(data?.jobLegacyByContractorId.data ?? []) as JobLegacy[]}
          columns={columns}
          total={data?.jobLegacyByContractorId.meta.totalCount ?? 0}
          rowActions={rowActions}
        />
      </Collapsable>
    </>
  );
};

export default LegacyContractorTable;
