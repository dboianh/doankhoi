import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, Collapse, ListItemButton, ListItemIcon, ListItemText, ListItem, Divider } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import {NavLink} from 'react-router-dom'
import './style.scss'
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {

  return (
    <Box {...other}>
      <List disablePadding component="nav">
        {data.map((item, index) => (
            <NavItem key={index} item={item}  />          
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};


function NavItem({ item }) {
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [childActive, setChildActive] = React.useState(false);


  const handleClick = () => {
    setOpen(!open);
    setChildActive(false)

  };

  const handleChildClick = () => {
    setChildActive(true)
    setIsActive(false);
  };



  return (
    <>
      <ListItemButton key={item.title} onClick={handleClick} component={path ? RouterLink : 'div'} 
        to={path}
        sx={{
          '&.active': {
            color: 'text.primary',
            bgcolor: 'rgba(25, 118, 210, 0.08)',
            fontWeight: 'bold',  
          },
          height: 49,
        }}>
        <ListItemIcon>
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        </ListItemIcon>
        <ListItemText primary={title} primaryTypographyProps={{
          sx: {
            fontSize: '15px',
            fontFamily: 'Poppins, sans-serif'
          }
        }} />
          {item.children && item.children.length > 0 && (
            open ? <ExpandLess /> : <ExpandMore />
          )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
              {item.children.map((child, index) => (
                <NavLink key={index} to={child.path} className="text-decoration-none text-dark"
                >
                  <ListItemButton sx={{
                      pl: 4,
                      '&.active': {
                        color: 'text.primary',
                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                        fontWeight: 'bold',
                      },
                    }}>
                    <ListItemIcon>
                      <ArrowRightIcon sx={{ fontSize: '1.8rem'}} />
                    </ListItemIcon>
                    <ListItemText primary={child.title} primaryTypographyProps={{
                      sx: {
                        fontSize: '15px',
                        fontFamily: 'Poppins, sans-serif'
                      }
                    }} />
                  </ListItemButton>
                </NavLink>
                )
              )}
        </List>
      </Collapse>
  

    </>
  );
}
