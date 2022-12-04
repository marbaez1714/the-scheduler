import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  ContractorOptionFragment,
  useGetAssignedContractorsQuery,
} from 'src/api';
import { Collapsable } from 'src/components/Collapsable';

import { LegacyContractorTable } from 'src/components/LegacyContractorTable';
import { Screen } from 'src/components/Screen';
import { TextInput } from 'src/components/TextInput';
import { Toggle } from 'src/components/Toggle';
import { localStorageKeys } from 'src/utils/localStorage';
import { useDebounce } from 'usehooks-ts';
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
    { name: string; id: string }[]
  >([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(filterTerm);

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

  const handleFilterTermChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFilterTerm(e.target.value);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <SettingsModal
        onAddAll={handleAddAll}
        onClose={toggleSettings}
        onContractorToggle={handleContractorToggle}
        onRemoveAll={handleRemoveAll}
        open={settingsOpen}
        enabledContractors={enabledContractors}
        contractors={getAssignedContractorsQueryData?.assignedContractors.data}
      />
      <Screen>
        <Screen.Content
          title="Dashboard"
          className="flex flex-col gap-2"
          loading={getAssignedContractorsQueryLoading}
          primaryAction={{ onClick: toggleSettings, title: 'Display Settings' }}
        >
          <Collapsable title="Display Settings">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Address Filter"
                placeholder="Filter all addresses"
                value={filterTerm}
                onChange={handleFilterTermChange}
              />

              {/* Contractors */}
              <div>
                <p className="mb-2 font-medium text-app-dark">
                  Displayed Contractors
                </p>
                <div className="p-2 overflow-scroll border-2 rounded shadow-inner border-app-medium max-h-64 bg-app-light">
                  {/* Unassigned */}
                  <div className="p-2 mb-2 rounded shadow-inner bg-app-medium/50">
                    <Toggle
                      checked={false}
                      onChange={() => {}}
                      title="Unassigned"
                    />
                  </div>
                  <div className="px-2 space-y-2">
                    {getAssignedContractorsQueryData?.assignedContractors.data?.map(
                      (contractor) => (
                        <Toggle
                          checked={false}
                          onChange={() => {}}
                          title={contractor.name}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Collapsable>

          {/* Contractors */}
          {enabledContractors.map((contractor) => (
            <LegacyContractorTable
              contractor={contractor}
              key={contractor.id}
              filter={debouncedFilterTerm}
            />
          ))}
        </Screen.Content>
      </Screen>
    </>
  );
};

export default Dashboard;
