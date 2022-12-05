import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';

import {
  ContractorOptionFragment,
  useGetAssignedContractorsQuery,
} from 'src/api';
import { Button } from 'src/components/Button';
import { Collapsable } from 'src/components/Collapsable';

import { LegacyContractorTable } from './LegacyContractorTable';
import { Screen } from 'src/components/Screen';
import { TextInput } from 'src/components/TextInput';
import { Toggle } from 'src/components/Toggle';
import { localStorageKeys } from 'src/utils/localStorage';
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

  const handleFilterTermChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFilterTerm(e.target.value);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content
        title="Dashboard"
        className="flex flex-col gap-2"
        loading={getAssignedContractorsQueryLoading}
      >
        <div className="flex gap-4">
          <div className="w-1/2">
            <Collapsable title="Filter">
              <TextInput
                label="Address Filter"
                placeholder="Filter all addresses"
                value={filterTerm}
                onChange={handleFilterTermChange}
              />
            </Collapsable>
          </div>
          <div className="w-1/2">
            <Collapsable title="Displayed">
              {/* Contractors */}
              <div>
                <p className="mb-2 font-medium text-app-dark">
                  Displayed Contractors
                </p>
                <div className="flex flex-col gap-2 p-2 overflow-scroll border-2 rounded shadow-inner border-app-medium max-h-64 bg-app-light">
                  {/* Unassigned */}
                  <div className="p-2 rounded bg-app-medium/50">
                    <Toggle
                      checked={false}
                      onChange={() => handleContractorToggle(UNASSIGNED)}
                      title="Unassigned"
                    />
                  </div>
                  {getAssignedContractorsQueryData?.assignedContractors.data?.map(
                    (contractor) => (
                      <Toggle
                        checked={false}
                        onChange={() => handleContractorToggle(contractor)}
                        title={contractor.name}
                      />
                    )
                  )}
                </div>
                <div className="flex mt-2 gap-x-2">
                  <Button onClick={handleAddAll} className="w-full">
                    Add All
                  </Button>
                  <Button
                    onClick={handleRemoveAll}
                    variant="outline"
                    className="w-full"
                  >
                    Remove All
                  </Button>
                </div>
              </div>
            </Collapsable>
          </div>
        </div>

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
  );
};

export default Dashboard;
