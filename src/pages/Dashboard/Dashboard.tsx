import { useState } from 'react';
import {
  ContractorOptionFragment,
  useGetAssignedContractorsQuery,
} from 'src/api';

import { LegacyContractorTable } from 'src/components/LegacyContractorTable';
import { Screen } from 'src/components/Screen';
import { SettingsModal } from './SettingsModal';
import { UNASSIGNED } from './utils';

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
  const [settingsOpen, setSettingsOpen] = useState(false);

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
  const handleContractorToggle = (contractor: ContractorOptionFragment) => {
    setEnabledContractors((prev) => {
      if (prev.some((item) => item.id === contractor.id)) {
        return prev.filter((item) => item.id !== contractor.id);
      }
      return [...prev, contractor];
    });
  };

  const handleAll = () => {
    const allOptions = [
      UNASSIGNED,
      ...(getAssignedContractorsQueryData?.assignedContractors.data || []),
    ];
    setEnabledContractors(allOptions);
  };

  const handleRemoveAll = () => {
    setEnabledContractors([]);
  };

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
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
        title="Dashboard"
        primaryAction={{ onClick: toggleSettings, title: 'Display Settings' }}
      >
        <SettingsModal
          onAddAll={handleAll}
          onClose={toggleSettings}
          onContractorToggle={handleContractorToggle}
          onRemoveAll={handleRemoveAll}
          open={settingsOpen}
          enabledContractors={enabledContractors}
          contractors={
            getAssignedContractorsQueryData?.assignedContractors.data
          }
        />

        {/* Contractors */}
        {enabledContractors.map((contractor) => (
          <LegacyContractorTable contractor={contractor} key={contractor.id} />
        ))}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
