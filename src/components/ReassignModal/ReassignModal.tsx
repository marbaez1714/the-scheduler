import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  GetJobsLegacyByContractorIdDocument,
  useModifyJobLegacyMutation,
} from 'src/api';
import { useOptions } from 'src/hooks/useOptions';
import { AutocompleteInput } from '../AutocompleteInput';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ReassignModalProps } from './types';

const ReassignModal = ({ open, onClose, jobLegacy }: ReassignModalProps) => {
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
  const [selectedContractor, setSelectedContractor] = useState<string>();

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const [modify] = useModifyJobLegacyMutation({
    onCompleted: (data) => {
      toast.success(data.modifyJobLegacy.message);
      setSelectedContractor(undefined);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GetJobsLegacyByContractorIdDocument,
        variables: { contractorId: jobLegacy?.contractorId },
      },
      {
        query: GetJobsLegacyByContractorIdDocument,
        variables: { contractorId: selectedContractor },
      },
    ],
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
          className="w-72 flex-grow"
          label="Current"
          options={[...contractorsOptions, { label: 'Unassinged', value: '' }]}
          value={jobLegacy?.contractorId ?? ''}
          onChange={() => {}}
          disabled
        />

        <ArrowRightIcon className="mx-4 h-6" />

        <AutocompleteInput
          className="w-72 flex-grow"
          label="New"
          options={contractorsOptions}
          value={selectedContractor}
          onChange={setSelectedContractor}
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
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

export default ReassignModal;
