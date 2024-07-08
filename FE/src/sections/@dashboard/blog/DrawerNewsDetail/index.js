import moment from 'moment';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import './style.scss'

// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import Title from 'antd/es/skeleton/Title';
import { SpaceContextProvider } from 'antd/es/space/context';

// ----------------------------------------------------------------------

DrawerNewsDetail.propTypes = {
  openDrawerDetail: PropTypes.bool,
  onOpenDrawerDetail: PropTypes.func,
  onCloseDrawerDetail: PropTypes.func,
};

export default function DrawerNewsDetail({ openDrawerDetail, onOpenDrawerDetail, onCloseDrawerDetail, data}) {
  const { avatar, cname, content, date, image, news_id, title, username, views, updated_date, updated_by } = data;
  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawerDetail}
        onClose={onCloseDrawerDetail}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Thông tin chi tiết
          </Typography>
          <IconButton onClick={onCloseDrawerDetail}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Tiêu đề: 
              </Typography> 
              <Box ml={1}>{title}</Box>
            </Stack>
            {/* <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Nội dung: 
              </Typography> 
              <Box ml={1} className="ellipsis-text">{content}</Box>
            </Stack> */}
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Thể loại: 
              </Typography> 
              <Box ml={1}>{cname}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Lượt xem: 
              </Typography> 
              <Box ml={1}>{views}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Ngày tạo: 
              </Typography> 
              <Box ml={1}>{moment(date).format("DD-MM-YYYY")}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Tác giả: 
              </Typography> 
              <Box ml={1}>{username}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Cập nhật vào: 
              </Typography> 
              <Box ml={1}>{moment(updated_date).format("DD-MM-YYYY")}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Cập nhật bởi: 
              </Typography> 
              <Box ml={1}>{updated_by}</Box>
            </Stack>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}