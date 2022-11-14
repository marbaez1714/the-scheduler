import { useState } from 'react';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  ColumnDefResolved,
  createColumnHelper,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  ArchiveBoxIcon,
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
  CogIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

import {
  JobLegacy,
  useGetJobsLegacyByContractorIdQuery,
  useModifyJobLegacyMutation,
} from 'src/api';
import { LegacyContractorTableProps } from './types';
import { Table, TableRowAction } from '../Table';
import { Collapsable } from '../Collapsable';
import { confirmArchive } from 'src/utils/alerts';
import { ReassignModal } from '../ReassignModal';
import { SendMessageModal } from '../SendMessageModal';
import { useManualTable } from 'src/hooks/useManualTable';
import { dataColumns } from 'src/utils/tables';

const LegacyContractorTable = ({ contractor }: LegacyContractorTableProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();
  const { pagination, handlePageSizeChange, handlePaginationChange } =
    useManualTable();

  /******************************/
  /* State                      */
  /******************************/
  const [selectedJob, setSelectedJob] = useState<JobLegacy>();
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [sendMessageModalOpen, setSendMessageModalOpen] = useState(false);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch } = useGetJobsLegacyByContractorIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      contractorId: contractor.id,
      pagination,
    },
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

  const handleSendMessage = (data: JobLegacy) => {
    setSelectedJob(data);
    setSendMessageModalOpen(true);
  };

  const handleSendMessageModalClose = () => {
    setSelectedJob(undefined);
    setSendMessageModalOpen(false);
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
      label: 'Send Message',
      onClick: handleSendMessage,
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

  const columns = [
    dataColumns.status,
    dataColumns.startDate,
    dataColumns.address,
    dataColumns.community,
    dataColumns.reporter,
    dataColumns.scope,
    dataColumns.area,
    dataColumns.builder,
    dataColumns.timestamps,
    dataColumns.id,
  ] as ColumnDef<JobLegacy>[];

  const tableAction = {
    title: 'Refresh',
    onClick: () => {
      refetch();
    },
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <ReassignModal
        open={reassignModalOpen}
        onClose={handleReassignModalClose}
        jobLegacy={selectedJob}
      />
      <SendMessageModal
        open={sendMessageModalOpen}
        jobLegacy={selectedJob}
        onClose={handleSendMessageModalClose}
      />
      <Collapsable
        title={contractor.name}
        unmount={false}
        loading={loading}
        defaultOpen
      >
        <Table
          loading={loading}
          columns={columns}
          data={data?.jobsLegacyByContractorId.data as JobLegacy[]}
          total={data?.jobsLegacyByContractorId.meta.totalCount}
          pageCount={data?.jobsLegacyByContractorId.meta.totalPages}
          rowActions={rowActions}
          onPaginationChange={handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          tableAction={tableAction}
          manualPagination
        />
      </Collapsable>
    </>
  );
};

export default LegacyContractorTable;
