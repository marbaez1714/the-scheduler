import { useState, useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { JobLegacy, useGetJobsLegacyByActiveStatusQuery } from 'src/api';
import { Screen } from 'src/components/Screen';
import { Table } from 'src/components/Table';
import { format } from 'date-fns';
import { dataColumns } from 'src/utils/tables';

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

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const { data: getJobsLegacyData, loading: getJobLegacyLoading } =
    useGetJobsLegacyByActiveStatusQuery({
      variables: { active: false, pagination: { page: 1, pageSize: 10 } },
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
      <Screen.Content
        title="Jobs (Legacy) - inactive "
        loading={getJobLegacyLoading}
      >
        <Table
          data={getJobsLegacyData?.jobsLegacyByActiveStatus.data as JobLegacy[]}
          columns={columns}
        />
      </Screen.Content>
    </Screen>
  );
};

export default Archive;
