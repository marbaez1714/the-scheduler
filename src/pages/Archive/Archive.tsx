import { useState, useEffect, useMemo } from 'react';
import { useGetJobsLegacyQuery } from 'src/api';
import { Screen } from 'src/components/Screen';

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
    useGetJobsLegacyQuery({
      variables: { archived: true, pagination: { page: 1, pageSize: 10 } },
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
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content title="Archive" loading={getJobLegacyLoading}>
        {JSON.stringify(getJobsLegacyData)}
      </Screen.Content>
    </Screen>
  );
};

export default Archive;
