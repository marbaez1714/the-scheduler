import { useState } from 'react';
import {
  Archive,
  DataObject,
  ExpandLess,
  ExpandMore,
  TableChart,
} from '@mui/icons-material';
import {
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    <div className="flex flex-col flex-shrink-0 justify-between bg-slate-900 text-white max-w-1/4 min-w-1/4">
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
      </List>
      {/* TODO: Add account stuff */}
    </div>
  );
};
