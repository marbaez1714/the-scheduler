import { Outlet } from 'react-router-dom';
import { Screen } from 'src/components/Screen';

const Company = () => {
  return (
    <Screen title="Companies">
      <Outlet />
    </Screen>
  );
};

export default Company;
