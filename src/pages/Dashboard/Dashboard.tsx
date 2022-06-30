import { Link } from 'react-router-dom';
import { Content } from 'src/components/Content';
import { Screen } from 'src/components/Screen';

const Dashboard = () => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <Screen title="Dashboard">
      <Content className="grid grid-cols-4">
        <div className="p-8 h-[1000px] bg-slate-500">test</div>
        {/* <Link
          to="/manage"
          className="shadow bg-white border border-slate-300 rounded"
        >
          <div className="border-b">Dispatch</div>
          <div>
            <p>this is the description</p>
          </div>
        </Link> */}
      </Content>
    </Screen>
  );
};

export default Dashboard;
