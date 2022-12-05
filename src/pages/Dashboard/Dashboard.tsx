import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';

import { useGetAssignedContractorsQuery } from 'src/api';
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
  const [contractors, setContractors] = useState<
    { name: string; id: string; visible: boolean }[]
  >([]);
  const [filterTerm, setFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(filterTerm);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const { data, loading } = useGetAssignedContractorsQuery({
    onCompleted: ({ assignedContractors }) => {
      const formattedContractors = assignedContractors.data.map((item) => ({
        ...item,
        visible: false,
      }));

      setContractors([UNASSIGNED, ...formattedContractors]);
    },
  });

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKeys.dashboardContractors);
    if (stored) {
      try {
        const enabledList = JSON.parse(stored) as string[];
        setContractors((prev) =>
          prev.map((item) => ({
            ...item,
            visible: item.visible || enabledList.includes(item.id),
          }))
        );
      } catch {
        toast.error('Unable to get stored dashboard.');
      }
    }
  }, [data?.assignedContractors.data]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const storeEnabledContractors = (
    list: { name: string; id: string; visible: boolean }[]
  ) => {
    setContractors(list);
    localStorage.setItem(
      localStorageKeys.dashboardContractors,
      JSON.stringify(list.map((item) => item.visible && item.id))
    );
  };

  const handleAddAll = () => {
    const allOptions = contractors.map((item) => ({ ...item, visible: true }));
    storeEnabledContractors(allOptions);
  };

  const handleRemoveAll = () => {
    const allOptions = contractors.map((item) => ({ ...item, visible: false }));
    storeEnabledContractors(allOptions);
  };

  const handleContractorToggle = (id: string) => {
    const allOptions = contractors.map((item) =>
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    storeEnabledContractors(allOptions);
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
        loading={loading}
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
                  {contractors?.map((contractor) => (
                    <Toggle
                      checked={contractor.visible}
                      onChange={() => handleContractorToggle(contractor.id)}
                      title={contractor.name}
                      key={contractor.id}
                    />
                  ))}
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
        {contractors.map(
          (contractor) =>
            contractor.visible && (
              <LegacyContractorTable
                contractor={contractor}
                key={contractor.id}
                filter={debouncedFilterTerm}
              />
            )
        )}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
