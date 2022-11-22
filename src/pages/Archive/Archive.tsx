import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { ChangeEventHandler, useState } from 'react';

import {
  JobLegacy,
  JobsLegacyFilterField,
  useGetJobsLegacyByActiveStatusQuery,
} from 'src/api';
import { Button } from 'src/components/Button';
import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { TextInput } from 'src/components/TextInput';
import { dataColumns } from 'src/utils/tables';
import { useDebounce } from 'usehooks-ts';

const Archive = () => {
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
      active: false,
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
  });

  console.log(data);

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
    <Screen>
      <Screen.Content title="Jobs (Legacy) - inactive">
        <Table
          headerRender={
            <div className="flex items-center justify-between gap-10">
              <TextInput
                placeholder="Search by name"
                className="h-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="filled-light" onClick={() => refetch()}>
                Refresh
              </Button>
            </div>
          }
          data={displayedJobs}
          columns={columns}
          pageCount={data?.jobsLegacyByActiveStatus.pagination.totalPages}
          onPaginationChange={handlePaginationChange}
        />
      </Screen.Content>
    </Screen>
  );
};

export default Archive;
