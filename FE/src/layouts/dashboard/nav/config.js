// component
import SvgColor from '../../../components/svg-color';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import MessageIcon from '@mui/icons-material/Message';
import WebIcon from '@mui/icons-material/Web';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import WebAssetIcon from '@mui/icons-material/WebAsset';
// ----------------------------------------------------------------------



const navConfig = [
  {
    title: 'Bảng điều khiển',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
    index: 1,
    children: []
  },
  {
    title: 'Người dùng',
    path: '/dashboard/user',
    icon: <ManageAccountsIcon />,
    index: 2,
    children: [],

  },
  {
    title: 'Giới thiệu',
    path: '/dashboard/gioithieu',
    icon: <ApartmentIcon />,
    index: 3,
    children: []


  },
  {
    title: 'Tin tức - Sự kiện',
    icon: <NewspaperIcon />,
    index: 4,
    children: [
      {
        title: 'Tin tức',
        path: '/dashboard/tintucsk',
        index: 5,
        children: []
      },
    ],
  },
  
  
  // {
  //   title: 'Dịch vụ',
  //   path: '/dashboard/serviceManagement',
  //   icon: <MiscellaneousServicesIcon />,
  //   index: 6,
  //   children: []


  // },
  {
    title: 'Hộp thư',
    path: '/dashboard/Quan-ly-hom-thu-gop-y',
    icon: <MessageIcon />,
    index: 7,
    children: []

  },
  // {
  //   title: 'Sản phẩm',
  //   path: '/dashboard/Quan-ly-san-pham',
  //   icon: <WebIcon />,
  //   index: 8,
  //   children: []

  // },
  {
    title: 'Album',
    path: '/dashboard/albums',
    icon: <PhotoLibraryIcon />,
    index: 9,
    children: []

  },
  {
    title: 'Thiết kế',
    icon: <WebAssetIcon />,
    index: 10,
    children: [
      {
        title: 'Banners',
        path: '/dashboard/config/banners',
        index: 11,
        children: []
      },
      {
        title: 'Navbar',
        path: '/dashboard/config/navbar',
        index: 12,
        children: []
      },
    ],

  },
 
  
];

export default navConfig;
