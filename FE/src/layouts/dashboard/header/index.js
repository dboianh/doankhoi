import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
// import NotificationsPopover from './NotificationsPopover';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Link, useNavigate } from 'react-router-dom'
// ----------------------------------------------------------------------

const NAV_WIDTH = 260;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 85;


const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    position: 'absolute',

  [theme.breakpoints.up('lg')]: {
    // width: `100%  `,
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },

  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,

  //   // width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, open, data }) {

  const navigate = useNavigate()

  const handleRedirectToHome = () => {
    navigate('/', '_blank')
  }

  

  return (
    <StyledRoot sx={{ width: open ? 'auto' : '100% !important'}}>
      <StyledToolbar >
      <IconButton
          onClick={() => window.open('/', '_blank')}
          sx={{
            mr: 1,
            color: 'text.primary',
            // display: { lg: 'none' },
          }}
        >
            <Iconify icon="mdi:house-outline" />
        </IconButton>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover data={data}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
