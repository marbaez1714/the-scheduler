import { useState } from 'react';
import { SideBarLink } from './SideBarLink';
import { SideBarButton } from './SideBarButton';
import { manageDataItems } from './utils';
import { useFirebase } from 'src/hooks/useFirebase';

export const SideBar = () => {
  const { signOut } = useFirebase();

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [manageExpanded, setManageExpanded] = useState(false);

  const toggleExpandManage = () => {
    setManageExpanded((prev) => {
      if (!prev) {
        setSideBarOpen(true);
      }
      return !prev;
    });
  };

  const toggleSideBar = () => {
    setSideBarOpen((prev) => {
      if (prev) {
        setManageExpanded(false);
      }
      return !prev;
    });
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white z-10 shadow-md">
      {/* Title */}
      <SideBarButton
        title="the_scheduler"
        leftIcon={sideBarOpen ? 'chevron_left' : 'menu'}
        className="text-2xl font-bold py-3 h-14"
        expanded={sideBarOpen}
        onClick={toggleSideBar}
      />

      {/* Side Bar options */}
      <div className="flex-col font-medium whitespace-nowrap">
        <SideBarLink to="/dashboard" icon="dashboard" title="Dashboard" expanded={sideBarOpen} />
        <SideBarLink to="/dispatch" icon="table_chart" title="Dispatch" expanded={sideBarOpen} />
        <SideBarLink to="/create_job" icon="add_circle" title="Create Job" expanded={sideBarOpen} />
        <SideBarButton
          leftIcon="data_object"
          rightIcon={manageExpanded ? 'expand_less' : 'expand_more'}
          title="Manage Data"
          expanded={sideBarOpen}
          onClick={toggleExpandManage}
        />
        {/* Expanded Manage Data options */}
        {manageExpanded &&
          manageDataItems.map((item, index) => (
            <SideBarLink className="pl-10" {...item} key={index} expanded={sideBarOpen} />
          ))}
      </div>
      {/* Sign out button at the end */}
      <SideBarButton className="mt-auto" leftIcon="logout" title="Logout" expanded={sideBarOpen} onClick={signOut} />
    </div>
  );
};
