import { useState } from 'react';
import { SideBarLink } from './SideBarLink';
import { SideBarButton } from './SideBarButton';
import { manageDataItems } from './utils';
import { useFirebase } from 'src/hooks/useFirebase';

export const SideBar = () => {
  const { signOut } = useFirebase();

  const [expandManage, setExpandManage] = useState(false);

  const handleExpand = () => {
    setExpandManage((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white z-10 shadow-md">
      <h1 className="text-2xl font-bold py-3 pl-6 pr-10">the_scheduler</h1>
      <ul className="font-medium whitespace-nowrap">
        <SideBarLink to="/dashboard" icon="dashboard" title="Dashboard" />
        <SideBarLink to="/dispatch" icon="table_chart" title="Dispatch" />
        <SideBarLink to="/create_job" icon="add_circle" title="Create Job" />
        <SideBarButton
          leftIcon="data_object"
          rightIcon={expandManage ? 'expand_less' : 'expand_more'}
          title="Manage Data"
          onClick={handleExpand}
        />
        {expandManage && manageDataItems.map((item, index) => <SideBarLink className="pl-10" {...item} key={index} />)}
      </ul>
      <SideBarButton className="mt-auto" leftIcon="logout" title="Logout" onClick={signOut} />
    </div>
  );
};
