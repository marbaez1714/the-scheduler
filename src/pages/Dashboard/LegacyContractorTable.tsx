import { ChangeEventHandler, useState } from 'react';
import {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';

import {
  JobLegacy,
  SortDirection,
  useGetJobsLegacyByContractorIdQuery,
  useModifyJobLegacyMutation,
} from 'src/api';
import { LegacyContractorTableProps } from './types';
import { Table } from 'src/components/Table';
import { Collapsable } from 'src/components/Collapsable';
import { ReassignModal } from 'src/components/ReassignModal';
import { SendMessageModal } from 'src/components/SendMessageModal';
import {
  dataColumns,
  DEFAULT_PAGINATION,
  DEFAULT_SORT,
} from 'src/utils/tables';
import { TextInput } from 'src/components/TextInput';
import { Button } from 'src/components/Button';
import { Icon } from 'src/components/Icon';

export const LegacyContractorTable = ({
  contractor,
  filter,
}: LegacyContractorTableProps) => {
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
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading, refetch } = useGetJobsLegacyByContractorIdQuery({
    variables: {
      contractorId: contractor.id,
      pagination,
      sort,
      ...((debouncedSearchTerm || filter) && {
        filter: {
          field: 'name',
          term: debouncedSearchTerm || filter,
        },
      }),
    },
    onCompleted: ({ jobsLegacyByContractorId }) => {
      setDisplayedJobs(jobsLegacyByContractorId.data as JobLegacy[]);
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
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

  const handleSortingChange = (sortingState: SortingState) => {
    const sorting = sortingState[0];
    if (sorting) {
      setSort({
        field: sorting.id,
        direction: sorting.desc ? SortDirection.Desc : SortDirection.Asc,
      });
    } else {
      setSort(DEFAULT_SORT);
    }
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  /******************************/
  /* Table                      */
  /******************************/
  const rowActions = (data: JobLegacy) => [
    {
      icon: <Icon icon="edit" />,
      label: 'Edit',
      onClick: () => navigate(`/jobs_legacy/modify/${data.id}`),
    },
    {
      icon: <Icon icon="message" />,
      label: 'Send Message',
      onClick: () => handleSendMessage(data),
    },
    {
      icon: <Icon icon="reassign" />,
      label: 'Reassign',
      onClick: () => handleReassignJob(data),
    },
    {
      icon: <Icon icon="inProgress" />,
      label: 'Toggle In Progress',
      onClick: () =>
        modify({
          variables: { id: data.id, data: { inProgress: !data.inProgress } },
        }),
    },
    {
      icon: <Icon icon="important" />,
      label: 'Toggle Important',
      onClick: () => {
        modify({
          variables: { id: data.id, data: { isImportant: !data.isImportant } },
        });
      },
    },
    {
      icon: <Icon icon="complete" />,
      label: 'Complete',
      onClick: () => handleComplete(data),
    },
  ];

  const columns = [
    dataColumns.jobLegacyMenu(rowActions),
    dataColumns.status,
    dataColumns.startDate,
    dataColumns.address,
    dataColumns.community,
    dataColumns.reporter,
    dataColumns.scope,
    dataColumns.area,
    dataColumns.builder,
    dataColumns.updatedTimestamp,
    dataColumns.createdTimestamp,
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
        title={`${contractor.name} ${
          displayedJobs.length === 0 ? '- (No Results)' : ''
        }`}
        unmount={false}
        loading={loading}
        defaultOpen
      >
        <Table
          headerRender={
            <div className="flex flex-col gap-4 md:flex-row">
              <TextInput
                placeholder="Filter by address"
                className="h-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button
                variant="filled-light"
                onClick={() => refetch()}
                className="ml-0 md:ml-auto"
              >
                Refresh
              </Button>
            </div>
          }
          columns={columns}
          data={displayedJobs}
          pageCount={data?.jobsLegacyByContractorId.pagination.totalPages}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
        />
      </Collapsable>
    </>
  );
};
