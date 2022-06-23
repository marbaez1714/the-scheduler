import { useEffect, useMemo, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseDocument } from 'src/utils/firebase/types';
import { Content } from 'src/components/Content';
import { ArrowBack } from '@mui/icons-material';
import { formatString } from 'src/utils/forms';

// TODO: REDO ALL OF IT

export const CompanyModifyForm = () => {
  // - HOOKS - //
  const { companyId } = useParams();
  const { companiesGetById, companiesUpdate } = useFirebase();
  const navigate = useNavigate();

  // - STATE - //
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] =
    useState<ResponseDocument<'Company'>>();
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  // - EFFECTS - //
  useEffect(() => {
    if (!companyId) return;
    // Start loading
    setLoading(true);
    // Fetch company by id
    companiesGetById(companyId)
      .then(({ data }) => {
        // set original
        setOriginalData(data.document);
        // set all values
        setCompanyName(data.document.name);
        setAddress(data.document.primaryAddress);
        setEmail(data.document.primaryEmail);
        setPhoneNumber(data.document.primaryPhone);
        setNotes(data.document.notes);
      })
      // End loading
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  // - ACTIONS - //
  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // - HELPERS - //
  const canSubmit = useMemo(() => {
    return (
      formatString(companyName) &&
      formatString(companyName) !== originalData?.name
    );
  }, [companyName]);

  // - JSX - //
  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loading}>
      <IconButton onClick={handleBack} title="back">
        <ArrowBack />
      </IconButton>
      <form
        className="w-full grid grid-cols-2 gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
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
