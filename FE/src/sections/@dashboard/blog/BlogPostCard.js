import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import DrawerNewsDetail from './DrawerNewsDetail' 
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
//antd
import { Popover, Spin, Tooltip, Menu, Modal } from "antd";
import {
  InfoCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';
import NewsAPI from '../../../api/news/news.api';
import { setRefresh } from "../../../redux/controllers/app/appSlice";
import { useDispatchRoot, useSelectorRoot } from "../../../redux/store";
import openNotification from "../../../components/CNotification";
import { TroubleshootOutlined } from '@mui/icons-material';


const { confirm } = Modal;



const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  color: 'inherit'
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

function getItem(label, key, icon, children, onTitleClick) {
  return {
    key,
    icon,
    children,
    label,
    onTitleClick
  };
}

export default function BlogPostCard({ post, index }) {
  const { avatar, category, date, image, news_id, title, username, views, updated_date } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const navigate = useNavigate()


  const POST_INFO = [
    // { number: comment, icon: 'eva:message-circle-fill' },
    { number: views, icon: 'eva:eye-fill' },
    // { number: share, icon: 'eva:share-fill' },
  ];
  
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatchRoot();
  const { refresh } = useSelectorRoot((state) => state.app);


  const handleOpenDetailDrawer = () => {
    setIsMenuOpen(false)
    setOpenDetailDrawer(true);
  };

  const handleCloseDetailDrawer = () => {
    setOpenDetailDrawer(false);
  };

  const handleUpdateNews = () => {
    navigate(`/dashboard/update/${news_id}`)
  }

  
  const showDeleteConfirm = (Id) => {
    setIsMenuOpen(false)
    confirm({
      title: `Xác thực hành động!`,
      icon: <ExclamationCircleOutlined />,
      content: `Bạn chắc chắn muốn xóa tin tức này?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Đóng",
      async onOk() {
        await NewsAPI.delete(Id).then((res) => {
          openNotification('success', "", res.data.message);
          dispatch(setRefresh());
        });
      },
      onCancel() {},
    });
  };

  

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <DrawerNewsDetail openDrawerDetail={openDetailDrawer}
        onOpenDrawerDetail={handleOpenDetailDrawer}
        onCloseDrawerDetail={handleCloseDetailDrawer} 
        data={post}
        
        />
        <Popover
          placement="rightTop"
          trigger="contextMenu"
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}

          content={() => {
            return (
              <>
                  <Menu
                    style={{
                      width: 150,
                      border: 'none',
                      fontSize: '15px'
                    }}
                    mode="vertical"
                    theme="light"
                    selectedKeys={[]}
                  >
                    <Menu.Item key="1" icon={<FolderOpenOutlined />}>
                      <a href={`/tintuc/${news_id}`} target="_blank" className="text-decoration-none" >
                        Mở tin
                      </a> 
                    </Menu.Item>
                    <Menu.Item key="2" icon={<InfoCircleOutlined />} onClick={handleOpenDetailDrawer}  >
                      Chi tiết
                    </Menu.Item>
                    <Menu.Item key="3" icon={<EditOutlined />} onClick={handleUpdateNews}>
                      Chỉnh sửa
                    </Menu.Item>  
                    <Menu.Item key="4" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(news_id)}>
                      Xóa
                    </Menu.Item>
                  </Menu>
              </>
            )}}
        >
          <Card sx={{ position: 'relative' }}>
            <StyledCardMedia
              sx={{
                ...((latestPostLarge || latestPost) && {
                  pt: 'calc(100% * 4 / 3)',
                  '&:after': {
                    top: 0,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  },
                }),
                ...(latestPostLarge && {
                  pt: {
                    xs: 'calc(100% * 4 / 3)',
                    sm: 'calc(100% * 3 / 4.66)',
                  },
                }),
              }}
            >
              <SvgColor
                color="paper"
                src="/images/icon/shape-avatar.svg"
                sx={{
                  width: 80,
                  height: 36,
                  zIndex: 9,
                  bottom: -15,
                  position: 'absolute',
                  color: 'background.paper',
                  ...((latestPostLarge || latestPost) && { display: 'none' }),
                }}
              />
              <StyledAvatar
                alt={username}
                src={`${import.meta.env.VITE_API_URL}/uploads/${avatar}`}
                sx={{
                  ...((latestPostLarge || latestPost) && {
                    zIndex: 9,
                    top: 24,
                    left: 24,
                    width: 40,
                    height: 40,
                  }),
                }}
              />
              {
                typeof image === 'string' ? (
                  <StyledCover alt={title} src={`${import.meta.env.VITE_API_URL}/uploads/${image}`} />
                ) : (
                  <StyledCover alt="photoURL" src="/images/background/no-image.png"/>
                )
              }

            </StyledCardMedia>

            <CardContent
              sx={{
                pt: 4,
                ...((latestPostLarge || latestPost) && {
                  bottom: 0,
                  width: '100%',
                  position: 'absolute',
                  color: 'white'
                }),
              }}
            >
              <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                {fDate(date)}
              </Typography>

              <StyledTitle
                color="inherit"
                variant="subtitle2"
                underline="hover"
                sx={{
                  ...(latestPostLarge && { typography: 'h5', height: 60 }),
                  ...((latestPostLarge || latestPost) && {
                    color: 'common.white',
                  }),
                }}
              >
                {title}
              </StyledTitle>

              <StyledInfo>
                {POST_INFO.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                      ...((latestPostLarge || latestPost) && {
                        color: 'grey.500',
                      }),
                    }}
                  >
                    <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                    <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                  </Box>
                ))}
              </StyledInfo>
            </CardContent>
            
          </Card>
        </Popover>     
    </Grid>
  );
}
