import { Badge, Email, LocationOn, Notes, Phone } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Screen } from 'src/components/Screen';
import { FormField } from 'src/utils/forms/types';

const AddCompany = () => {
  const formFields: FormField[] = [
    { label: 'Company Name', required: true, icon: <Badge /> },
    { label: 'Primary Phone', icon: <Phone /> },
    { label: 'Primary Email', icon: <Email /> },
    { label: 'Location', icon: <LocationOn /> },
    { label: 'Notes', multiline: true, icon: <Notes /> },
  ];

  return (
    <Screen
      title="Add Company"
      subtitle="Enter information in the boxes below to add a company."
    >
      {/* Page Content */}
      <div className="flex flex-col divide-y space-y-6">
        {/* Input Fields */}
        <div className="flex flex-col space-y-6">
          {formFields.map(({ label, icon, required, ...props }, index) => (
            <TextField
              key={index}
              {...props}
              label={required ? label : `${label} (optional)`}
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

export default AddCompany;
