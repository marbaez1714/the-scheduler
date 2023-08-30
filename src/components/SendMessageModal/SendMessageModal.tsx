import { format } from 'date-fns';
import { useState, useEffect, useMemo } from 'react';
import {
  JobsLegacyMessageRecipient,
  useSendMessageJobLegacyMutation,
} from 'src/api';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { RadioGroupInput } from '../RadioGroupInput';
import { TextAreaInput } from '../TextAreaInput';
import { SendMessageModalProps } from './types';

const SendMessageModal = ({
  jobLegacy,
  open,
  onClose,
}: SendMessageModalProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [contractorLanguage, setContractorLanguage] = useState('english');
  const [contractorMessage, setContractorMessage] = useState('');
  const [reporterLanguage, setReporterLanguage] = useState('english');
  const [reporterMessage, setReporterMessage] = useState('');

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/
  const [sendMessageLegacy, { loading }] = useSendMessageJobLegacyMutation();

  /******************************/
  /* Memos                      */
  /******************************/
  const translations = useMemo(() => {
    if (jobLegacy) {
      const startDate = jobLegacy.startDate
        ? format(new Date(jobLegacy.startDate), 'P')
        : '';

      const lineItems = jobLegacy.lineItems
        .map((item) => `\n• ${item.orderNumber} - ${item.supplier.name}`)
        .join();

      return {
        english: {
          date: `- Date: ${startDate}`,
          installer: `- Installer: ${jobLegacy.contractor?.name}`,
          builder: `- Builder: ${jobLegacy.builder?.name}`,
          community: `- Community: ${jobLegacy.community?.name}`,
          address: `- Address: ${jobLegacy.name}`,
          scope: `- ${jobLegacy.scope?.name ?? ''} ${
            jobLegacy.area?.name ?? ''
          }`,
          orders: `- Orders: ${lineItems}`,
          notes: `- Notes: ${jobLegacy.notes}`,
        },
        spanish: {
          date: `- Fecha: ${startDate}`,
          installer: `- Instalador: ${jobLegacy.contractor?.name}`,
          builder: `- Constructor: ${jobLegacy.builder?.name}`,
          community: `- Comunidad: ${jobLegacy.community?.name}`,
          address: `- Dirección: ${jobLegacy.name}`,
          scope: `- ${jobLegacy.scope?.nameSpanish ?? ''} ${
            jobLegacy.area?.nameSpanish ?? ''
          }`,
          orders: `- Ordenes: ${lineItems}`,
          notes: `- Notas: ${jobLegacy.notes}`,
        },
      };
    }
  }, [jobLegacy]);

  /******************************/
  /* Effects                    */
  /******************************/
  useEffect(() => {
    if (jobLegacy && translations) {
      const selected =
        translations[contractorLanguage as 'english' | 'spanish'];

      const messageArray = [
        jobLegacy.startDate && selected.date,
        jobLegacy.community && selected.community,
        selected.address,
        (jobLegacy.scope || jobLegacy.area) && selected.scope.trim(),
        jobLegacy.lineItems.length && selected.orders,
        jobLegacy.notes && selected.notes,
      ];

      setContractorMessage(messageArray.filter((line) => line).join('\n'));
    }
  }, [translations, contractorLanguage]);

  useEffect(() => {
    if (jobLegacy && translations) {
      const selected = translations[reporterLanguage as 'english' | 'spanish'];

      const messageArray = [
        jobLegacy.startDate && selected.date,
        jobLegacy.contractor && selected.installer,
        jobLegacy.builder && selected.builder,
        jobLegacy.community && selected.community,
        selected.address,
        (jobLegacy.scope || jobLegacy.area) && selected.scope.trim(),
        jobLegacy.lineItems.length && selected.orders,
        jobLegacy.notes && selected.notes,
      ];

      setReporterMessage(messageArray.filter((line) => line).join('\n'));
    }
  }, [translations, reporterLanguage]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const sendContractorMessage = () => {
    if (jobLegacy) {
      sendMessageLegacy({
        variables: {
          id: jobLegacy.id,
          message: contractorMessage,
          recipient: JobsLegacyMessageRecipient.Contractor,
        },
      });
    }
  };

  const sendReporterMessage = () => {
    if (jobLegacy) {
      sendMessageLegacy({
        variables: {
          id: jobLegacy.id,
          message: reporterMessage,
          recipient: JobsLegacyMessageRecipient.Reporter,
        },
      });
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Modal
      title={`Send Message for: ${jobLegacy?.name}`}
      open={open}
      onClose={onClose}
    >
      <div className="flex gap-6">
        {jobLegacy?.contractor && (
          <div className="flex w-96 flex-grow basis-1/2 flex-col gap-4 rounded border border-app-medium p-4 shadow">
            <p className="text-lg font-medium uppercase text-app-dark">
              To installer {jobLegacy.contractor.name}
            </p>

            <RadioGroupInput
              value={contractorLanguage}
              onChange={setContractorLanguage}
              options={[
                { label: 'English', value: 'english' },
                { label: 'Spanish', value: 'spanish' },
              ]}
            />

            <TextAreaInput
              className="h-96"
              value={contractorMessage}
              onChange={(e) => setContractorMessage(e.target.value)}
            />

            <Button
              className="ml-auto w-1/2"
              loading={loading}
              onClick={sendContractorMessage}
            >
              Send
            </Button>
          </div>
        )}
        {jobLegacy?.reporter && (
          <div className="flex w-96 flex-grow basis-1/2 flex-col gap-4 border border-app-medium p-4 shadow">
            <p className="text-lg font-medium uppercase text-app-dark">
              To reporter {jobLegacy.reporter.name}
            </p>

            <RadioGroupInput
              value={reporterLanguage}
              onChange={setReporterLanguage}
              options={[
                { label: 'English', value: 'english' },
                { label: 'Spanish', value: 'spanish' },
              ]}
            />

            <TextAreaInput
              className="h-96"
              value={reporterMessage}
              onChange={(e) => setReporterMessage(e.target.value)}
            />

            <Button
              className="ml-auto w-1/2"
              loading={loading}
              onClick={sendReporterMessage}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SendMessageModal;
