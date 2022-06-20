import { useEffect, useMemo, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseDocument } from 'src/utils/firebase/types';
import { Content } from 'src/components/Content';
import { ArrowBack } from '@mui/icons-material';

export const CompanyModifyForm = () => {
  // - HOOKS - //
  const { companyId } = useParams();
  const { companiesGetById } = useFirebase();
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
    if (companyId) {
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
    }
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
    return false;
  }, []);

  // - JSX - //
  return (
    <Content className="flex flex-grow items-start space-x-4" loading={loading}>
      <IconButton onClick={handleBack}>
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
