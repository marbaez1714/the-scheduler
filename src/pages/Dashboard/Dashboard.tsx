import { useState } from 'react';
import { useGetAssignedContractorsQuery } from 'src/api';

import { LegacyContractorTable } from 'src/components/LegacyContractorTable';
import { Screen } from 'src/components/Screen';
import { SettingsModal } from './SettingsModal';
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
  const [modalOpen, setModalOpen] = useState(false);

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
        <SettingsModal onAddAll={handleAll} onRemoveAll={handleRemoveAll} />

        {/* Contractors */}
        {enabledContractors.map((contractor) => (
          <LegacyContractorTable contractor={contractor} key={contractor.id} />
        ))}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
