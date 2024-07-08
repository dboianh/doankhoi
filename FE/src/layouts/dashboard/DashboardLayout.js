import React, { useState, useEffect} from "react";
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import UserAPI from '../../api/user/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {

  const {userID} = useSelector((state) => state.login);

  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({})

  const navigate = useNavigate()



  useEffect(() => {
    if(userID) {
      const fetchData = async () => {
        await UserAPI.getUserById(userID).then((res) => {
          setUser(res.data)
        });
      };
      fetchData();
    } else {
      setUser('')
      
    }
  }, [userID])


  return (
    <StyledRoot>
      
      <Header onOpenNav={() => setOpen(!open)} open={open} data={user}/>
      {open ? (
        <Nav openNav={open} onCloseNav={() => setOpen(false)} data={user} />

      ) : ''}
      


      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
