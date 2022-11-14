import { KeyIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  ContractorOptionFragment,
  useGetAssignedContractorsQuery,
} from 'src/api';

import { LegacyContractorTable } from 'src/components/LegacyContractorTable';
import { Menu } from 'src/components/Menu';
import { Screen } from 'src/components/Screen';
import { localStorageKeys } from 'src/utils/localStorage';
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
  const [enabledContractors, setEnabledContractors] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);
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
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKeys.enabledContractors);

    if (stored) {
      try {
        setEnabledContractors(JSON.parse(stored));
      } catch {
        toast.error('Unable to get stored dashboard.');
      }
    }
  }, []);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const storeEnabledContractors = (
    list: {
      name: string;
      id: string;
    }[]
  ) => {
    localStorage.setItem(
      localStorageKeys.enabledContractors,
      JSON.stringify(list)
    );
  };

  const handleContractorToggle = (contractor: ContractorOptionFragment) => {
    setEnabledContractors((prev) => {
      if (prev.some((item) => item.id === contractor.id)) {
        const filtered = prev.filter((item) => item.id !== contractor.id);
        storeEnabledContractors(filtered);
        return filtered;
      }

      storeEnabledContractors([...prev, contractor]);
      return [...prev, contractor];
    });
  };

  const handleAddAll = () => {
    const allOptions = [
      UNASSIGNED,
      ...(getAssignedContractorsQueryData?.assignedContractors.data || []),
    ];
    storeEnabledContractors(allOptions);
    setEnabledContractors(allOptions);
  };

  const handleRemoveAll = () => {
    storeEnabledContractors([]);
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
        title="Dashboard"
        className='flex flex-col gap-4'
        loading={getAssignedContractorsQueryLoading}
        primaryAction={{ onClick: toggleSettings, title: 'Display Settings' }}
      >
        <SettingsModal
          onAddAll={handleAddAll}
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
