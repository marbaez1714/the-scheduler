import { FormEventHandler, useMemo, useState } from 'react';
import { IconButton, Button, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import toast from 'react-hot-toast';
import { Content } from 'src/components/Content';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { formatString } from 'src/utils/forms';

export const ReporterAddForm = () => {
  // - HOOKS - //
  const { reportersCreate, refreshStoreData } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //
  const [reporterName, setReporterName] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [notes, setNotes] = useState('');

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // Create new reporter
      await reportersCreate({
        name: formatString(reporterName),
        primaryEmail: formatString(primaryEmail),
        primaryPhone: formatString(primaryPhone),
        notes: formatString(notes),
      });
      // Refresh reporters in data store
      await refreshStoreData.reporters();
      // Reset inputs
      resetInputs();
    } catch (e: any) {
      e.message && toast.error(e.message);
    }
  };

  // - HELPERS - //
  const canSubmit = useMemo(() => {
    return !!reporterName && reporterName.trim() !== '';
  }, [reporterName]);

  const resetInputs = () => {
    setReporterName('');
    setPrimaryPhone('');
    setPrimaryEmail('');
    setNotes('');
  };

  return (
    <Content className="flex flex-grow items-start space-x-4">
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form
        className="w-full grid grid-cols-2 gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Reporter Name */}
        <TextField
          label="Name"
          value={reporterName}
          onChange={(e) => setReporterName(e.target.value)}
        />
        {/* Email */}
        <TextField
          label="Email"
          value={primaryEmail}
          onChange={(e) => setPrimaryEmail(e.target.value)}
        />
        {/* Phone Number */}
        <TextField
          label="Phone Number"
          value={primaryPhone}
          onChange={(e) => setPrimaryPhone(e.target.value)}
        />
        {/* Notes */}
        <TextField
          className="col-span-2"
          label="Notes"
          multiline
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {/* Actions */}
        <Button
          className="col-span-2 justify-self-end"
          variant="contained"
          type="submit"
          disabled={!canSubmit}
        >
          Submit
        </Button>
      </form>
    </Content>
  );
};
