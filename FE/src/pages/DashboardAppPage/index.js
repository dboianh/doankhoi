import React, { useState, useEffect } from "react";

import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify/Iconify';
// sections
import {
  AppNewsUpdate,
  AppWidgetSummary,
} from '../../sections/@dashboard/app';
//API
import AppAPI from '../../api/app/app.api'
import ContactAPI from '../../api/contact/contact.api'
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useSelector } from 'react-redux'
import { useDispatchRoot } from "../../redux/store";
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

// ----------------------------------------------------------------------

const formatter = (value) => <CountUp end={value} separator="," />;


export default function DashboardAppPage() {
  const theme = useTheme();
  const [figure, setFigure] = useState([])
  const [mailContact, setMailContact] = useState([])
  const { refresh } = useSelector((state) => state.app);
  const dispatch = useDispatchRoot();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AppAPI.getStatistic();
        setFigure(res.data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, refresh]);

  //API - Contact
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ContactAPI.getAll();
        setMailContact(res.data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, refresh]);  


  return (
    <>
      <Helmet>
        <title> Trang quản trị </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card bordered={false}>
              <Statistic title={figure[0]?.field} value={figure[0]?.total} formatter={formatter} valueStyle={{color: '#3f8600'}} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card bordered={false}>
              <Statistic title={figure[1]?.field} value={figure[1]?.total} formatter={formatter} valueStyle={{color: '#3f8600'}} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card bordered={false}>
              <Statistic title={figure[2]?.field} value={figure[2]?.total} formatter={formatter} valueStyle={{color: '#3f8600'}}/>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card bordered={false}>
              <Statistic title={figure[3]?.field} value={figure[3]?.total} formatter={formatter} valueStyle={{color: '#3f8600'}} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppNewsUpdate
              title="Thông tin góp ý"
              list={mailContact}
            />
          </Grid>
          

        </Grid>
      </Container>
    </>
  );
}
