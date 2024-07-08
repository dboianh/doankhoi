import { Link as RouterLink } from 'react-router-dom'
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, list }) {

    return (
    <Card>
      <CardHeader title={title} action={
      <IconButton>
        <AccessTimeIcon />
      </IconButton>
    } />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.slice(0, 5).map((data, index) => (
            <NewsItem key={index} data={data} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <RouterLink to='/dashboard/Quan-ly-hom-thu-gop-y'>
          <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            Xem thêm
          </Button>
        </RouterLink>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ data }) {
  const { fullname, message, phone, sending_date } = data;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {fullname}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {message}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(sending_date)}
      </Typography>
    </Stack>
  );
}
