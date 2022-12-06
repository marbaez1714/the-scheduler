import { useState, useMemo, ChangeEventHandler } from 'react';
import { ContractorOptionFragment } from 'src/api';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';

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
      <div className="m-4 flex max-h-64 w-96 flex-col overflow-auto rounded border border-app-medium p-2">
        {/* Unassigned */}
        <div className="mb-2 rounded bg-app-medium p-2 shadow-inner">
          <Toggle
            checked={getIsChecked(UNASSIGNED)}
            onChange={() => onContractorToggle(UNASSIGNED)}
            title="Unassigned"
          />
        </div>
        <div className="space-y-2 px-2">
          {filteredContractors?.map((contractor) => (
            <Toggle
              checked={getIsChecked(contractor)}
              onChange={() => onContractorToggle(contractor)}
              title={contractor.name}
              key={contractor.id}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-2 flex gap-x-2">
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
