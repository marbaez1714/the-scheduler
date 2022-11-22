import { Outlet } from 'react-router-dom';
import { Screen } from 'src/components/Screen';

const JobsLegacy = () => {
  return (
    <Screen>
      <Outlet />
    </Screen>
  );
};

export default JobsLegacy;
