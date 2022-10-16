import { useState } from 'react';
import { useGetAssignedContractorsQuery } from 'src/api';
import { Button } from 'src/components/Button';

import { Collapsable } from 'src/components/Collapsable';
import { LegacyContractorTable } from 'src/components/LegacyContractorTable';
import { Screen } from 'src/components/Screen';
import { Toggle } from 'src/components/Toggle';
import { AssignedContractor } from './types';

const UNASSIGNED = { name: 'Unassigned', id: '' };

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
  const [enabledContractors, setEnabledContractors] = useState([UNASSIGNED]);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const {
    data: getAssignedContractorsQueryData,
    loading: getAssignedContractorsQueryLoading,
  } = useGetAssignedContractorsQuery();

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleContractorToggle = (contractor: AssignedContractor) => () => {
    setEnabledContractors((prev) => {
      if (prev.some((item) => item.id === contractor.id)) {
        return prev.filter((item) => item.id !== contractor.id);
      }
      return [...prev, contractor];
    });
  };

  const handleAll = () => {
    const allOptions = [UNASSIGNED];
    getAssignedContractorsQueryData?.assignedContractors.data.forEach(
      (contractor) => allOptions.push(contractor)
    );
    setEnabledContractors(allOptions);
  };

  const handleRemoveAll = () => {
    setEnabledContractors([]);
  };

  const getIsChecked = (contractor: AssignedContractor) => {
    return enabledContractors.some((item) => item.id === contractor.id);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content
        column
        className="gap-4"
        loading={getAssignedContractorsQueryLoading}
      >
        {/* Filters */}
        <div className="w-1/2">
          <Collapsable
            title="Display"
            subtitle="Select visible items"
            unmount={false}
          >
            {/* Actions */}
            <div className="flex px-4 pt-4 gap-x-2">
              <Button onClick={handleAll} size="small" className="w-full">
                Add All
              </Button>
              <Button
                onClick={handleRemoveAll}
                size="small"
                variant="outline"
                className="w-full"
              >
                Remove All
              </Button>
            </div>
            {/* Contractors */}
            <div className="flex flex-col p-4 gap-y-2">
              {/* Unassigned */}
              <Toggle
                checked={getIsChecked(UNASSIGNED)}
                onChange={handleContractorToggle(UNASSIGNED)}
                title="Unassigned"
              />
              {getAssignedContractorsQueryData?.assignedContractors.data.map(
                (contractor, index) => (
                  <Toggle
                    checked={getIsChecked(contractor)}
                    onChange={handleContractorToggle(contractor)}
                    title={`${index + 1}. ${contractor.name}`}
                    key={contractor.id}
                  />
                )
              )}
            </div>
          </Collapsable>
        </div>
        {/* Contractors */}
        {enabledContractors.map((contractor) => (
          <LegacyContractorTable contractor={contractor} key={contractor.id} />
        ))}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
