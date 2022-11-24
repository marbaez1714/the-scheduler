import { Outlet } from 'react-router-dom';
import { Screen } from 'src/components/Screen';

const ManageData = () => {
  return (
    <Screen>
      <Outlet />
    </Screen>
  );
};

export default ManageData;
