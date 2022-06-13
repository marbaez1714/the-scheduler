import { List, ListItem } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Screen } from 'src/components/Screen';

const Company = () => {
  return (
    <Screen title="Manage - Company">
      <Outlet />
    </Screen>
  );
};

export default Company;
