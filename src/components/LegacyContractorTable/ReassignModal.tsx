import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useModifyJobLegacyMutation } from 'src/api';
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
  const [modify] = useModifyJobLegacyMutation({
    onCompleted: (data) => {
      toast.success(data.modifyJobLegacy.message);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleSubmit = () => {
    if (jobLegacy) {
      modify({
        variables: {
          id: jobLegacy?.id,
          data: { contractorId: selectedContractor },
        },
      });
    }
  };

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
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!selectedContractor} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};
