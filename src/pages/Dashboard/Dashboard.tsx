import { useMemo, useState } from 'react';
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
  const [contractorFilterTerm, setContractorFilterTerm] = useState('');
  const [addressFilterTerm, setAddressFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(addressFilterTerm);

  /******************************/
  /* Data                       */
  /******************************/

  const { loading } = useGetAssignedContractorsQuery({
    onCompleted: ({ assignedContractors }) => {
      const formattedContractors = assignedContractors.data.map((item) => ({
        ...item,
        visible: true,
      }));

      setContractors([UNASSIGNED, ...formattedContractors]);
    },
  });

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

  const handleAddressFilterTermChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setAddressFilterTerm(e.target.value);
  };

  const handleContractorFilterTermChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setContractorFilterTerm(e.target.value);
  };

  /******************************/
  /* Memo                       */
  /******************************/
  const visibleContractors = useMemo(() => {
    const visible = contractors.filter((contractor) => contractor.visible);

    if (contractorFilterTerm) {
      return visible.filter((contractor) =>
        contractor.name
          .toLocaleLowerCase()
          .includes(contractorFilterTerm.toLocaleLowerCase())
      );
    }

    return visible;
  }, [contractors, contractorFilterTerm]);

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen>
      <Screen.Content
        title="Dashboard"
        className="flex flex-col gap-4"
        loading={loading}
      >
        <div className="flex gap-4">
          <div className="w-1/2">
            <Collapsable title="Filter">
              <div className="flex flex-col gap-4">
                {/* Address */}
                <TextInput
                  label="Address Filter"
                  placeholder="Filter all addresses"
                  value={addressFilterTerm}
                  onChange={handleAddressFilterTermChange}
                />
                {/* Contractor */}
                <TextInput
                  label="Contractor Filter"
                  placeholder="Filter contractors"
                  value={contractorFilterTerm}
                  onChange={handleContractorFilterTermChange}
                />
              </div>
            </Collapsable>
          </div>
          <div className="w-1/2">
            <Collapsable title="Displayed">
              {/* Contractors */}
              <div>
                <p className="mb-2 font-medium text-app-dark">
                  Displayed Contractors
                </p>
                <div className="flex max-h-64 flex-col gap-2 overflow-scroll rounded border-2 border-app-medium bg-app-light p-2 shadow-inner">
                  {contractors?.map((contractor) => (
                    <Toggle
                      checked={contractor.visible}
                      onChange={() => handleContractorToggle(contractor.id)}
                      title={contractor.name}
                      key={contractor.id}
                    />
                  ))}
                </div>
                <div className="mt-2 flex gap-x-2">
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
        {visibleContractors.map((contractor) => (
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
