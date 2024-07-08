import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom"

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AccountPopover({data}) {


  const MENU_OPTIONS = [
    {
      label: 'Bảng điều khiển',
      icon: 'eva:home-fill',
      to: '/dashboard/app',
      hidden: data && data.alias === 'USER'
    },
    {
      label: 'Thông tin cá nhân',
      icon: 'eva:person-fill',
      to: '/dashboard/profile'
  
    },
  ];

  const [open, setOpen] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const navigate = useNavigate();

  


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  function handleLogOut() {
    removeCookie('token');
    localStorage.clear();

    if(cookies.token) {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
      window.location.reload()

    }
    // navigate('/login');

  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {
          typeof data.avatar === 'string' ? (
            <Avatar src={`${import.meta.env.VITE_API_URL}/uploads/${data.avatar}`} alt="photoURL" />

          ): (
            <Avatar alt="photoURL" />

          )
        }

      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>

          <Typography variant="subtitle2" noWrap>
            {data.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {data.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(145, 158, 171, 0.8)', height: '0px !important'}} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) =>
            !option.hidden ? (
              <Link key={option.label} to={option.to} style={{ color: '#272829', textDecoration: 'none' }}>
                <MenuItem onClick={handleClose}>
                  {option.label}
                </MenuItem>
              </Link>
            ) : null
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(145, 158, 171, 0.8)', height: '0px !important' }} />

        <MenuItem onClick={() => handleLogOut()} sx={{ m: 1 }}>
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}
