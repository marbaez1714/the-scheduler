import { useState, useMemo, ChangeEventHandler } from 'react';
import { ContractorOptionFragment } from 'src/api';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import { ScrollContainer } from 'src/components/ScrollContainer';

import { TextInput } from 'src/components/TextInput';
import { Toggle } from 'src/components/Toggle';
import { SettingsModalProps } from './types';
import { UNASSIGNED } from './utils';

export const SettingsModal = ({
  open,
  onAddAll,
  onRemoveAll,
  onClose,
  contractors,
  onContractorToggle,
  enabledContractors,
}: SettingsModalProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [filterTerm, setFilterTerm] = useState('');

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/
  const filteredContractors = useMemo(() => {
    if (!filterTerm) {
      return contractors;
    }

    return contractors?.filter((contractor) =>
      contractor.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }, [contractors, filterTerm]);

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterTerm(e.target.value);
  };

  const getIsChecked = (contractor: ContractorOptionFragment) => {
    return enabledContractors.some((item) => item.id === contractor.id);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Modal title="Display Options" open={open} onClose={onClose}>
      <TextInput
        placeholder="Filter Contractors"
        value={filterTerm}
        onChange={handleFilterChange}
      />

      {/* Contractors */}
      <ScrollContainer className="flex flex-col m-4 w-96 max-h-64">
        {/* Unassigned */}
        <div className="p-2 mb-2 rounded shadow-inner bg-app-medium">
          <Toggle
            checked={getIsChecked(UNASSIGNED)}
            onChange={() => onContractorToggle(UNASSIGNED)}
            title="Unassigned"
          />
        </div>
        <div className="px-2 space-y-2">
          {filteredContractors?.map((contractor) => (
            <Toggle
              checked={getIsChecked(contractor)}
              onChange={() => onContractorToggle(contractor)}
              title={contractor.name}
              key={contractor.id}
            />
          ))}
        </div>
      </ScrollContainer>

      {/* Actions */}
      <div className="flex mt-2 gap-x-2">
        <Button onClick={onAddAll} className="w-full">
          Add All
        </Button>
        <Button onClick={onRemoveAll} variant="outline" className="w-full">
          Remove All
        </Button>
      </div>
    </Modal>
  );
};
