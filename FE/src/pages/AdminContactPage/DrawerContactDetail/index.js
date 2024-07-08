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
import { Tag } from "antd";

import './style.scss'

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import Title from 'antd/es/skeleton/Title';
import { SpaceContextProvider } from 'antd/es/space/context';


// ----------------------------------------------------------------------

DrawerContactDetail.propTypes = {
  openDrawerDetail: PropTypes.bool,
  onOpenDrawerDetail: PropTypes.func,
  onCloseDrawerDetail: PropTypes.func,
};

export default function DrawerContactDetail({ openDrawerDetail, onOpenDrawerDetail, onCloseDrawerDetail, data}) {
  const { fullname, email, address, phone, sending_date, isChecked } = data;
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
                Họ tên:
              </Typography> 
              <Box ml={1}>{fullname}</Box>
            </Stack>
            {/* <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Nội dung: 
              </Typography> 
              <Box ml={1} className="ellipsis-text">{content}</Box>
            </Stack> */}
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Email: 
              </Typography> 
              <Box ml={1}>{email}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Số điện thoại: 
              </Typography> 
              <Box ml={1}>{phone}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Địa chỉ:
              </Typography> 
              <Box ml={1}>{address}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Ngày gởi: 
              </Typography> 
              <Box ml={1}>{moment(sending_date).format("DD-MM-YYYY")}</Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="subtitle1" gutterBottom>
                Trạng thái: 
              </Typography> 
              <Box ml={1}>{ isChecked === 0 ? (
                <Tag color="error">Chưa duyệt</Tag>

              ) : <Tag color="success">Đã duyệt</Tag>
            }</Box>
            </Stack>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}