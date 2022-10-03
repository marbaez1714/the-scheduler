import { useEffect, useState } from 'react';
import {
  UnassignedJobsResponse,
  useGetAssignedContractorsQuery,
  useGetUnassignedJobsQuery,
} from 'src/api';
import { Button } from 'src/components/Button';

import { Collapsable } from 'src/components/Collapsable';
import { LegacyInstallerTable } from 'src/components/LegacyInstallerTable';
import { Screen } from 'src/components/Screen';
import { Toggle } from 'src/components/Toggle';
import { useOptions } from 'src/hooks/useOptions';

const Dashboard = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { contractorsOptions } = useOptions();

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [enabledList, setEnabledList] = useState<string[]>(['unassigned']);

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
  const handleContractorToggle = (id: string) => () => {
    setEnabledList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((value) => value !== id);
      }

      return [...prev, id];
    });
  };

  const handleAll = () => {
    const allOptions = ['unassigned'];
    contractorsOptions.forEach(({ value }) => allOptions.push(value));
    setEnabledList(allOptions);
  };

  const handleRemoveAll = () => {
    setEnabledList([]);
  };

  const getIsChecked = (id: string) => {
    return enabledList.includes(id);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content column className="gap-4">
        <Collapsable title="Display" subtitle="Select visible items">
          <div className="grid grid-flow-col grid-rows-5 gap-2 p-4">
            {/* Actions */}
            <div className="flex gap-x-2">
              <Button onClick={handleAll} size="small">
                Add All
              </Button>
              <Button onClick={handleRemoveAll} size="small" variant="outline">
                Remove All
              </Button>
            </div>
            {/* Unassigned */}
            <Toggle
              checked={getIsChecked('unassigned')}
              onChange={handleContractorToggle('unassigned')}
              title="Unassigned"
            />
            {/* Contractors */}
            {contractorsOptions.map(({ label, value }, index) => (
              <Toggle
                checked={getIsChecked(value)}
                onChange={handleContractorToggle(value)}
                title={`${index + 1}. ${label}`}
              />
            ))}
          </div>
        </Collapsable>
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
