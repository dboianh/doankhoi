import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux'
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar,  } from '@mui/material';
import { Divider } from 'antd'

// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 260;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav, data }) {

  // const [isContentOpen, setIsContentOpen] = useState(false);

  const isDesktop = useResponsive('up', 'lg');


  // const filteredNavConfig = navConfig.filter((item) => {
  //   return data.alias !== 'USER' || item.title == 'Dịch vụ' || item.title == 'Tin tức - Sự kiện' || item.title == 'Album';
  // });


  // const handleContentToggle = () => {
  //   setIsContentOpen(!isContentOpen);
  // };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 1, display: 'inline-flex' }}>
        {/* <Logo /> */}
      </Box>

      <Box sx={{ mb: 3, mx: 1 }}>
        <Link underline="none">
          <StyledAccount>
            {
              typeof data.avatar === 'string' ? (
                <Avatar src={`${import.meta.env.VITE_API_URL}/uploads/${data.avatar}`} alt="photoURL" />

              ): (
                <Avatar alt="photoURL" />

              )
            }
 
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {data.username}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* User role */}
                {data.roleName}
                {/* Admin */}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <Divider style={{ margin: 0, padding: 10 }} />

      
      <Box sx={{
        overflowY: 'auto',
        maxHeight: '470px',
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '6px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#F5F5F5',
        },
        }}>
        
        <NavSection data={navConfig} />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH }
      }}
    >
  
      {isDesktop ? (
          <Drawer
            open={openNav}
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            {renderContent}
          </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
