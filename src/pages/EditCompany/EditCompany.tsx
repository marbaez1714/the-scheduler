import { useState } from 'react';
import { Phone, Email, Notes, LocationOn } from '@mui/icons-material';
import {
  Badge,
  TextField,
  InputAdornment,
  Button,
  Autocomplete,
} from '@mui/material';
import { Screen } from 'src/components/Screen';
import { FormField } from 'src/utils/forms/types';

const EditCompany = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>();

  const formFields: FormField[] = [
    // { label: 'Company Name', required: true, icon: <Badge /> },
    // { label: 'Primary Phone', icon: <Phone /> },
    // { label: 'Primary Email', icon: <Email /> },
    // { label: 'Location', icon: <LocationOn /> },
    // { label: 'Notes', multiline: true, icon: <Notes /> },
  ];

  const exampleOptions = [
    { label: 'Company A', id: '1' },
    { label: 'Company B', id: '2' },
    { label: 'Company C', id: '3' },
  ];

  return (
    <Screen title="Edit Company">
      {/* Page Content */}
      <div className="flex flex-col divide-y space-y-6">
        {/* Edit Company Select */}
        <div>
          <Autocomplete
            options={exampleOptions}
            getOptionLabel={(option) => `${option.id}`}
            onChange={(_, option) => setSelectedCompany(option?.id)}
            isOptionEqualToValue={(option) => option.id === selectedCompany}
            renderInput={(params) => <TextField {...params} label="Company" />}
          />
        </div>

        {/* Editable Fields */}
        <div className="flex flex-col space-y-6 pt-6">
          {formFields.map(({ icon, ...props }, index) => (
            <TextField
              key={index}
              {...props}
              InputProps={{
                startAdornment: icon && (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button>Cancel</Button>
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </Screen>
  );
};

export default EditCompany;
