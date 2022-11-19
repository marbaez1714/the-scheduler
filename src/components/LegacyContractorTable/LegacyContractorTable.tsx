import { useState } from 'react';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import {
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
import { ReassignModal } from '../ReassignModal';
import { SendMessageModal } from '../SendMessageModal';
import { dataColumns } from 'src/utils/tables';

const LegacyContractorTable = ({ contractor }: LegacyContractorTableProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const navigate = useNavigate();

  /******************************/
  /* State                      */
  /******************************/
  const [selectedJob, setSelectedJob] = useState<JobLegacy>();
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [sendMessageModalOpen, setSendMessageModalOpen] = useState(false);

  const [displayedJobs, setDisplayedJobs] = useState<JobLegacy[]>([]);

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch, fetchMore } =
    useGetJobsLegacyByContractorIdQuery({
      variables: {
        contractorId: contractor.id,
        pagination: {
          page: 1,
          pageSize: 10,
        },
      },
      onCompleted: ({ jobsLegacyByContractorId }) => {
        setDisplayedJobs(jobsLegacyByContractorId.data as JobLegacy[]);
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

  const handlePaginationChange = (paginationState: PaginationState) => {
    fetchMore({
      variables: {
        pagination: {
          page: paginationState.pageIndex + 1,
          pageSize: paginationState.pageSize,
        },
      },
    }).then(({ data }) => {
      setDisplayedJobs(data.jobsLegacyByContractorId.data as JobLegacy[]);
    });
  };

  /******************************/
  /* Table                      */
  /******************************/
  const rowActions: TableRowAction<JobLegacy>[] = [
    {
      icon: <PencilSquareIcon />,
      label: 'Edit',
      onClick: (data) => navigate(`/modify_jobLegacy/${data.id}`),
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
      onClick: (data) =>
        modify({
          variables: { id: data.id, data: { inProgress: !data.inProgress } },
        }),
    },
    {
      icon: <ArrowUpIcon />,
      label: 'Toggle Important',
      onClick: (data) => {
        modify({
          variables: { id: data.id, data: { isImportant: !data.isImportant } },
        });
      },
    },
    {
      icon: <DocumentCheckIcon />,
      label: 'Complete',
      onClick: handleComplete,
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
          data={displayedJobs}
          pageCount={data?.jobsLegacyByContractorId.meta.totalPages}
          rowActions={rowActions}
          onPaginationChange={handlePaginationChange}
          tableAction={{
            title: 'Refresh',
            onClick: refetch,
          }}
        />
      </Collapsable>
    </>
  );
};

export default LegacyContractorTable;
