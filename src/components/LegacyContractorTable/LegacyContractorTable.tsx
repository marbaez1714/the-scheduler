import { ChangeEventHandler, useState } from 'react';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';

import {
  JobLegacy,
  JobsLegacyFilterField,
  useGetJobsLegacyByContractorIdQuery,
  useModifyJobLegacyMutation,
} from 'src/api';
import { LegacyContractorTableProps } from './types';
import { Table, TableRowAction } from '../Table';
import { Collapsable } from '../Collapsable';
import { ReassignModal } from '../ReassignModal';
import { SendMessageModal } from '../SendMessageModal';
import { dataColumns } from 'src/utils/tables';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { Icon } from '../Icon';

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
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch } = useGetJobsLegacyByContractorIdQuery({
    variables: {
      contractorId: contractor.id,
      pagination,
      ...(debouncedSearchTerm && {
        filter: {
          field: JobsLegacyFilterField.Name,
          term: debouncedSearchTerm,
        },
      }),
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
    setPagination({
      page: paginationState.pageIndex + 1,
      pageSize: paginationState.pageSize,
    });
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  /******************************/
  /* Table                      */
  /******************************/
  const rowActions: TableRowAction<JobLegacy>[] = [
    {
      icon: <Icon icon="edit" />,
      label: 'Edit',
      onClick: (data) => navigate(`/jobs_legacy/modify/${data.id}`),
    },
    {
      icon: <Icon icon="message" />,
      label: 'Send Message',
      onClick: handleSendMessage,
    },
    {
      icon: <Icon icon="reassign" />,
      label: 'Reassign',
      onClick: handleReassignJob,
    },
    {
      icon: <Icon icon="inProgress" />,
      label: 'Toggle In Progress',
      onClick: (data) =>
        modify({
          variables: { id: data.id, data: { inProgress: !data.inProgress } },
        }),
    },
    {
      icon: <Icon icon="important" />,
      label: 'Toggle Important',
      onClick: (data) => {
        modify({
          variables: { id: data.id, data: { isImportant: !data.isImportant } },
        });
      },
    },
    {
      icon: <Icon icon="complete" />,
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
          headerRender={
            <div className="flex items-center justify-between gap-10">
              <TextInput
                placeholder="Filter by address"
                className="h-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="filled-light" onClick={() => refetch()}>
                Refresh
              </Button>
            </div>
          }
          columns={columns}
          data={displayedJobs}
          pageCount={data?.jobsLegacyByContractorId.pagination.totalPages}
          rowActions={rowActions}
          onPaginationChange={handlePaginationChange}
        />
      </Collapsable>
    </>
  );
};

export default LegacyContractorTable;
