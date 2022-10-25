import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState, useMemo } from 'react';
import { useOptions } from 'src/hooks/useOptions';
import { AutocompleteInput } from '../AutocompleteInput';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ReassignModalProps } from './types';

export const ReassignModal = ({
  open,
  onClose,
  jobLegacy,
}: ReassignModalProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { contractorsOptions } = useOptions();
  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [selectedContractor, setSelectedContractor] = useState('');

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/
  const currentContractor = useMemo(() => {
    return (
      contractorsOptions.find(
        (item) => item.value === jobLegacy?.contractorId
      ) ?? { label: 'Unassigned', value: '' }
    );
  }, [jobLegacy, contractorsOptions]);

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Modal title={`Reassign: ${jobLegacy?.name}`} open={open} onClose={onClose}>
      <div className="flex items-center">
        <AutocompleteInput
          className="flex-grow w-72"
          label="Current"
          options={[...contractorsOptions, { label: 'Unassinged', value: '' }]}
          value={jobLegacy?.contractorId ?? ''}
          onChange={setSelectedContractor}
          disabled
        />

        <ArrowRightIcon className="h-6 mx-4" />

        <AutocompleteInput
          className="flex-grow w-72"
          label="New"
          options={contractorsOptions}
          value={selectedContractor}
          onChange={setSelectedContractor}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="text">Cancel</Button>
        <Button>Accept</Button>
      </div>
    </Modal>
  );
};
