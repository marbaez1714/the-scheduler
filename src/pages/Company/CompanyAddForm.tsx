import { useMemo, useState } from 'react';
import { IconButton, Button, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import toast from 'react-hot-toast';
import { Content } from 'src/components/Content';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export const CompanyAddForm = () => {
  // - HOOKS - //
  const { companiesCreate } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: companyName.trim(),
      primaryAddress: address.trim(),
      primaryEmail: email.trim(),
      primaryPhone: phoneNumber.trim(),
      notes: notes.trim(),
    };

    if (payload.name) {
      toast.promise(companiesCreate(payload), {
        loading: `Creating entry for ${payload.name}`,
        success: `${payload.name} added!`,
        error: `Error creating new company.`,
      });
    }
  };

  // - HELPERS - //
  const canSubmit = useMemo(() => {
    return !!companyName && companyName.trim() !== '';
  }, [companyName]);

  return (
    <Content className="flex flex-grow items-start space-x-4">
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form
        className="flex flex-col flex-grow divide-y space-y-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Company Name */}
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {/* Address */}
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* Email */}
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Phone Number */}
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* Notes */}
          <TextField
            label="Notes"
            multiline
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button variant="contained" type="submit" disabled={!canSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </Content>
  );
};
