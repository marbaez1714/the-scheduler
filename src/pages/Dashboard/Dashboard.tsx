import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { useGetAssignedContractorsQuery } from 'src/api';
import { Button } from 'src/components/Button';
import { Collapsable } from 'src/components/Collapsable';
import { toast } from 'react-hot-toast';

import { LegacyContractorTable } from './LegacyContractorTable';
import { Screen } from 'src/components/Screen';
import { TextInput } from 'src/components/TextInput';
import { Toggle } from 'src/components/Toggle';
import { localStorageKeys } from 'src/utils/localStorage';
import { UNASSIGNED } from './utils';
import { ContractorTable } from './types';

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
  const [contractors, setContractors] = useState<ContractorTable[]>([]);
  const [contractorFilterTerm, setContractorFilterTerm] = useState('');
  const [addressFilterTerm, setAddressFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(addressFilterTerm);

  /******************************/
  /* Data                       */
  /******************************/

  const { loading } = useGetAssignedContractorsQuery({
    onCompleted: ({ assignedContractors }) => {
      // Get the previous state
      let prevState: Record<string, { visible: boolean; open: boolean }> = {};
      try {
        const prevStateStored =
          localStorage.getItem(localStorageKeys.dashboardContractors) ?? '{}';
        prevState = JSON.parse(prevStateStored);
      } catch {
        toast.error('Unable to get previous state');
      }

      const formattedContractors = assignedContractors.data.map((item) => ({
        ...item,
        ...prevState[item.id],
      }));

      setContractors([
        { ...UNASSIGNED, ...prevState[''] },
        ...formattedContractors,
      ]);
    },
  });

  /******************************/
  /* Callbacks                  */
  /******************************/
  const storeEnabledContractors = (list: ContractorTable[]) => {
    setContractors(list);

    const storageObject = list.reduce<
      Record<string, { open: boolean; visible: boolean }>
    >((acc, curr) => {
      acc[curr.id] = { open: curr.open, visible: curr.visible };

      return acc;
    }, {});

    localStorage.setItem(
      localStorageKeys.dashboardContractors,
      JSON.stringify(storageObject)
    );
  };

  const handleAddAll = () => {
    const allOptions = contractors.map((item) => ({
      ...item,
      visible: true,
      open: true,
    }));
    storeEnabledContractors(allOptions);
  };

  const handleRemoveAll = () => {
    const allOptions = contractors.map((item) => ({
      ...item,
      visible: false,
      open: false,
    }));
    storeEnabledContractors(allOptions);
  };

  const handleContractorToggle = (id: string) => {
    const allOptions = contractors.map((item) =>
      item.id === id
        ? { ...item, visible: !item.visible, open: !item.visible }
        : item
    );
    storeEnabledContractors(allOptions);
  };

  const handleToggleCollapsable = (id: string, open: boolean) => {
    const allOptions = contractors.map((item) =>
      item.id === id ? { ...item, open } : item
    );
    storeEnabledContractors(allOptions);
  };

  const handleRemoveContractor = (id: string) => () => {
    const allOptions = contractors.map((item) =>
      item.id === id ? { ...item, visible: false, open: false } : item
    );
    storeEnabledContractors(allOptions);
  };

  const handleAddressFilterTermChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressFilterTerm(e.target.value);
  };

  const handleContractorFilterTermChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          {/* Filters */}
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
          {/* Visible Contractors */}
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
                  <Button onClick={handleAddAll} className="w-1/2">
                    Add All
                  </Button>
                  <Button
                    onClick={handleRemoveAll}
                    variant="outline"
                    className="w-1/2"
                  >
                    Remove All
                  </Button>
                </div>
              </div>
            </Collapsable>
          </div>
        </div>

        <div className="form-divider-y" />

        {/* Contractors */}
        {visibleContractors.map((contractor) => (
          <Collapsable
            key={contractor.id}
            title={contractor.name}
            defaultOpen={contractor.open}
            onToggle={(open) => handleToggleCollapsable(contractor.id, open)}
            action={{
              label: 'remove',
              onClick: handleRemoveContractor(contractor.id),
            }}
          >
            <LegacyContractorTable
              contractor={contractor}
              filter={debouncedFilterTerm}
            />
          </Collapsable>
        ))}
      </Screen.Content>
    </Screen>
  );
};

export default Dashboard;
