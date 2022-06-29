import { DataObject, TableChart } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SideBarLink } from './SideBarLink';
import { SideBarButton } from './SideBarButton';
import { manageDataItems } from './utils';

export const SideBar = () => {
  const navigate = useNavigate();

  const [expandManage, setExpandManage] = useState(false);

  const handleExpand = () => {
    setExpandManage((prev) => !prev);
  };

  const handleNavigate = (target: string) => () => {
    navigate(`${target}`);
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white">
      <h1 className="text-2xl font-bold py-3 pl-6 pr-10">the_scheduler</h1>
      <ul className="font-medium whitespace-nowrap">
        <SideBarLink to="/company" icon="table_chart" title="Dispatch" />
        <SideBarLink to="/create_job" icon="add_circle" title="Create Job" />
        <SideBarButton
          leftIcon="data_object"
          rightIcon={expandManage ? 'expand_less' : 'expand_more'}
          title="Manage Data"
          onClick={handleExpand}
        />
        {expandManage &&
          manageDataItems.map((item, index) => (
            <SideBarLink className="pl-10" {...item} key={index} />
          ))}
      </ul>

      {/* <List>
        <ListItem className="text-2xl font-bold mb-4">the-scheduler</ListItem>
        <ListItemButton>
          <ListItemIcon>
            <TableChart className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Dispatch" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Archive className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItemButton>
        <ListItemButton onClick={handleExpand}>
          <ListItemIcon>
            <DataObject className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Manage Data" />
          {expandManage ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expandManage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {manageDataItems.map((item, index) => (
              <ListItemButton
                className="pl-8"
                key={index}
                onClick={handleNavigate(item.target)}
              >
                <ListItemIcon className="text-white">
                  <Icon className="text-white">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List> */}
    </div>
  );
};
