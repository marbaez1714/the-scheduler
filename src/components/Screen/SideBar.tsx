import {
  Archive,
  DataObject,
  ExpandLess,
  ExpandMore,
  TableChart,
} from '@mui/icons-material';
import {
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

const manageDataItems = [
  { title: 'Companies', icon: 'apartment' },
  { title: 'Communities', icon: 'map' },
  { title: 'Reporter', icon: 'reporter' },
  { title: 'Installer', icon: 'engineering' },
];

export const SideBar = () => {
  const [expandManage, setExpandManage] = useState(false);

  const handleExpand = () => {
    setExpandManage((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-between bg-slate-900 text-white w-1/5">
      <List>
        {/* Header */}
        <ListItem className="text-2xl font-bold mb-4">the-scheduler</ListItem>
        {/* Dispatch */}
        <ListItemButton>
          <ListItemIcon>
            <TableChart className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Dispatch" />
        </ListItemButton>
        {/* Archive */}
        <ListItemButton>
          <ListItemIcon>
            <Archive className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItemButton>
        {/* Manage Data */}
        <ListItemButton onClick={handleExpand}>
          <ListItemIcon>
            <DataObject className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Manage Data" />
          {expandManage ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* Manage Data - Collapsable Content */}
        <Collapse in={expandManage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {manageDataItems.map((item) => (
              <ListItemButton className="pl-8">
                <ListItemIcon className="text-white">
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      {/* TODO: Add account stuff */}
    </div>
  );
};
