import { useState, useEffect, useMemo, ChangeEventHandler } from 'react';
import { ColumnDef, PaginationState } from '@tanstack/react-table';

import {
  JobLegacy,
  JobsLegacyFilterField,
  useGetJobsLegacyByActiveStatusQuery,
} from 'src/api';
import { Screen } from 'src/components/Screen';
import { dataColumns } from 'src/utils/tables';
import { useDebounce } from 'usehooks-ts';
import { Table } from 'src/components/Table';
import { TextInput } from 'src/components/TextInput';
import { Button } from 'src/components/Button';
import { RadioGroupInput } from 'src/components/RadioGroupInput';

export const JobsList = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [displayedJobs, setDisplayedJobs] = useState<JobLegacy[]>([]);
  const [jobStatus, setJobStatus] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const { data, refetch } = useGetJobsLegacyByActiveStatusQuery({
    variables: {
      active: jobStatus,
      pagination,
      ...(debouncedSearchTerm && {
        filter: {
          field: JobsLegacyFilterField.Name,
          term: debouncedSearchTerm,
        },
      }),
    },
    onCompleted: ({ jobsLegacyByActiveStatus }) => {
      setDisplayedJobs(jobsLegacyByActiveStatus.data as JobLegacy[]);
    },
    notifyOnNetworkStatusChange: true,
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
    <Screen.Content
      title={`Jobs (Legacy) - ${jobStatus ? 'Active' : 'Completed'}`}
    >
      <Table
        headerRender={
          <div>
            <RadioGroupInput
              options={[
                { label: 'Active', value: true },
                { label: 'Completed', value: false },
              ]}
              onChange={setJobStatus}
              value={jobStatus}
              className="w-1/2 mb-4"
            />
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
          </div>
        }
        data={displayedJobs}
        columns={columns}
        pageCount={data?.jobsLegacyByActiveStatus.pagination.totalPages}
        onPaginationChange={handlePaginationChange}
      />
    </Screen.Content>
  );
};