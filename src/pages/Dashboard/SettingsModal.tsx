import { useState, useEffect, useMemo } from 'react';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';

import { TextInput } from 'src/components/TextInput';
import { Toggle } from 'src/components/Toggle';
import { SettingsModalProps } from './types';

export const SettingsModal = ({
  onAddAll,
  onRemoveAll,
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
  const [modalOpen, setModalOpen] = useState(false);
  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const toggleOpen = () => {
    setModalOpen((prev) => !prev);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <Button onClick={toggleOpen}>toggle</Button>
      <Modal title="Display Options" open={modalOpen} onClose={toggleOpen}>
        <TextInput placeholder="Search" />

        {/* Actions */}
        <div className="flex mt-2 gap-x-2">
          <Button onClick={onAddAll} size="small" className="w-full">
            Add All
          </Button>
          <Button
            onClick={onRemoveAll}
            size="small"
            variant="outline"
            className="w-full"
          >
            Remove All
          </Button>
        </div>
        {/* Contractors */}
        <div className="flex flex-col p-4 gap-y-2">
          {/* Unassigned */}
          {/* <Toggle
          checked={getIsChecked(UNASSIGNED)}
          onChange={handleContractorToggle(UNASSIGNED)}
          title="Unassigned"
        />
        {getAssignedContractorsQueryData?.assignedContractors.data.map(
          (contractor) => (
            <Toggle
              checked={getIsChecked(contractor)}
              onChange={handleContractorToggle(contractor)}
              title={contractor.name}
              key={contractor.id}
            />
          )
        )} */}
        </div>
      </Modal>
    </>
  );
};
