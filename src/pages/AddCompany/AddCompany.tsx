import { useMemo, useState } from 'react';
import { Button, Icon, InputAdornment, TextField } from '@mui/material';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';
import { AddCompanyFields } from 'src/utils/forms';
import { CreatePayloadTypes } from 'src/utils/firebase/types';

const AddCompany = () => {
  // Hooks
  const { createCompany } = useFirebase();

  // State
  const [companyData, setCompanyData] = useState<CreatePayloadTypes<'Company'>>(
    {
      name: '',
      primaryAddress: '',
      primaryEmail: '',
      primaryPhone: '',
      notes: '',
    }
  );

  // Functions
  const handleChange =
    (param: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCompanyData((prev) => ({ ...prev, [param]: e.target.value }));
    };

  const handleSubmit = () => {
    if (companyData.name) {
      createCompany(companyData)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    }
  };

  // Helpers
  const canSubmit = useMemo(() => {
    return !!companyData.name;
  }, [companyData]);

  return (
    <Screen
      title="Add Company"
      subtitle="Enter information in the boxes below to add a company."
    >
      {/* Page Content */}
      <div className="flex flex-col divide-y space-y-6">
        {/* Input Fields */}
        <div className="flex flex-col space-y-6">
          {AddCompanyFields.map(
            ({ label, param, required, icon, ...props }, index) => (
              <TextField
                key={index}
                {...props}
                required={required}
                onChange={handleChange(param)}
                label={required ? label : `${label} (optional)`}
                InputProps={{
                  startAdornment: icon && (
                    <InputAdornment position="start">
                      <Icon>{icon}</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            )
          )}
        </div>
        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button>Cancel</Button>
          <Button
            variant="contained"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Screen>
  );
};

export default AddCompany;
