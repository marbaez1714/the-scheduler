import { Badge, Email, Home, Notes, Phone } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Screen } from 'src/components/Screen';
import { FormField } from 'src/utils/forms/types';

const AddCompany = () => {
  const formFields: FormField[] = [
    { label: 'Company Name', required: true, icon: <Badge /> },
    { label: 'Primary Phone', icon: <Phone /> },
    { label: 'Primary Email', icon: <Email /> },
    { label: 'Office Address', icon: <Home /> },
    { label: 'Notes', multiline: true, icon: <Notes /> },
  ];

  return (
    <Screen
      title="Add Company"
      subtitle="Enter information in the boxes below to add a company."
      breadCrumbs={[
        { to: '/', title: 'home' },
        { to: '/test1', title: 'Test 1' },
        { to: '/add-company', title: 'Add Company' },
      ]}
    >
      <div className="flex flex-col space-y-6">
        {/* Fields */}
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

        {/* Actions */}
        <div className="flex space-x-4 justify-end">
          <Button>Cancel</Button>
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </Screen>
  );
};

export default AddCompany;
