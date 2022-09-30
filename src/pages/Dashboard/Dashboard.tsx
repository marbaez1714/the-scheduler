import {
  UnassignedJobsResponse,
  useGetAssignedContractorsQuery,
  useGetUnassignedJobsQuery,
} from 'src/api';

import { LegacyInstallerTable } from 'src/components/LegacyInstallerTable';
import { Screen } from 'src/components/Screen';

const Dashboard = () => {
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
  const { data: assignedContractorsData } = useGetAssignedContractorsQuery({
    onCompleted: (resp) => {
      console.log(resp);
    },
  });

  const { data: unassignedJobsData } = useGetUnassignedJobsQuery({
    onCompleted: (resp) => {
      console.log(resp.unassignedJobs.data);
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

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content>
        {!!unassignedJobsData && (
          <LegacyInstallerTable
            data={unassignedJobsData.unassignedJobs as UnassignedJobsResponse}
          />
        )}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
