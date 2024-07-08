import {
    DeleteOutlined,
    EditOutlined,
    UserAddOutlined,
    ExclamationCircleOutlined,
    SearchOutlined,
    CheckOutlined
} from "@ant-design/icons";
import { Link, useParams } from 'react-router-dom'
import { Alert, Button, Table, Modal, Input, Space, Select, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import NewsAPI from "../../api/news/news.api";
import NavbarAPI from "../../api/outline/navbar.api";
import { useDispatchRoot } from "../../redux/store";
import { setRefresh } from "../../redux/controllers/app/appSlice";
// import { getInfoUser } from "../../redux/controllers/user/userSlice";
import { useSelector } from 'react-redux'
import moment from 'moment';
import openNotification from '../../components/CNotification'
import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Avatar,
  Popover,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import Iconify from '../../components/iconify';

const { confirm } = Modal;


const AdminCategoriesPage = () => {
    
    const [visibleModalCreateTopic, setVisibleModalCreateTopic] = useState(false);
    const [visibleModalUpdateTopic, setVisibleModalUpdateTopic] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const [cid, setCid] = useState(null)
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [dataSelected, setDataSelected] = useState('')
    const [isActive, setIsActive] = useState('')

    const params = useParams()

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
          await NewsAPI.getTopicByParentId(params.id).then((res) => setDataTable(res.data));
        };
        fetchData();
    }, [dispatch, refresh]);



    const showDeleteConfirm = (Id, name) => {
      confirm({
        title: `Xác thực hành động!`,
        icon: <ExclamationCircleOutlined />,
        content: `Bạn có muốn xóa chủ đề "${name}" ? `,
        okText: "Xoá",
        okType: "danger",
        cancelText: "Đóng",
        async onOk() {
          await NewsAPI.deleteTopic(Id).then((res) => {
            openNotification('success', "", res.data.message);
            dispatch(setRefresh());
          }).catch((err) => {
            openNotification("error", '', err.response.data.message)
          })
        },
        onCancel() {},
      });
    };

    const showCreateModal = () => {
        setOpen(true)
    }

    const showUpdateModal = () => {
        setVisibleModalUpdateTopic(true)
    }
    
    const hideUpdateModal = () => {
        setVisibleModalUpdateTopic(false)
    }
    



    const columns = [
        {
          title: 'STT',
          dataIndex: 'key',
          width: '5%',
          render: (text, record, index) => index + 1, // Sử dụng index + 1 để in ra thứ tự
        },
        {
          title: 'Chủ đề',
          dataIndex: 'cname',
        },
        {
          title: "Hiển thị ngoài",
          dataIndex: "isDisplayHome",
          width: '15%',
          align: "center",
          render: (record) => record == 1 ? <CheckOutlined style={{ color: "#52c41a"}} /> : ''
        },
        {
            title: "Thao tác",
            dataIndex: "operation",
            width: "12%",
            render: (_, record, index) => {
               return (
                <div className="">
                    <div className="d-flex align-items-center">
                      <Button
                        type="primary"
                        size="small"
                        className="d-flex align-items-center justify-content-center mx-2"
                        onClick={() => {
                            setCid(record.cid)
                            setDataSelected(record.cname)
                            setIsActive(record.isDisplayHome)
                            showUpdateModal()
                        }}
                        style={{backgroundColor: "#F57328",
                        borderColor: "#F57328"}}
                      >
                        <EditOutlined />
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        className="d-flex align-items-center justify-content-center mx-2"
                        danger
                        onClick={() => showDeleteConfirm(record.cid, record.cname)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                </div>
              );
            },
          },
    ];


    const rows = dataTable.map((data, index) => ({
      ...data,
      key: index, // thêm key cho từng hàng
    }));

    return (
    <React.Fragment>
        <Helmet>
        <title>Quản lý chủ đề </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h6" gutterBottom>
            <Link to={-1}>
                <IconButton
                    sx={{
                        mr: 1,
                        color: 'text.primary',
                    }}
                >
                    <Iconify icon="feather:arrow-left" />
                </IconButton>
            </Link>
            Quản lý chủ đề
          </Typography>
          <Button className="d-flex align-items-center" onClick={() => setOpen(true)}>
            <EditOutlined /> Tạo mới
          </Button>
        </Stack>
        <Card>
          <Table 
            columns={columns} 
            dataSource={rows} 
            bordered
            />
        </Card>
    </Container>

    {/* Modal create topic */}
    <Modal
        title="Thêm mới chủ đề"
        open={open}
        onOk={() => {
            NewsAPI.createNewTopic({cname: topic, parentID: params.id}).then((res) => {
                openNotification('success', "", res.data.message);
                dispatch(setRefresh());
                setOpen(false);
            }).catch((err) => {
                openNotification("error", '', err.response.data.message)
            })
        }}
        onCancel={hideModal}
        okText="Thêm"
        cancelText="Đóng"
        >
        <Input
          placeholder="Tên chủ đề"
          defaultValue={""}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          size="large"
          className="mt-2 mb-2"
          required
        />
    </Modal>
    


    {/*Modal chỉnh sửa */}

    <Modal
        title={<h5 className="text-center fw-bold mb-3">Chỉnh sửa</h5>}
        open={visibleModalUpdateTopic}
        onOk={() => {
            NewsAPI.updateNewTopic(cid, { cname: dataSelected, isDisplayHome: isActive}).then((res) => {
                openNotification('success', "", res.data.message);
                dispatch(setRefresh());
                setVisibleModalUpdateTopic(false);
            }).catch((err) => {
                openNotification("error", '', err.response.data.message)
            })
        }}
        onCancel={hideUpdateModal}
        okText="Cập nhật"
        cancelText="Đóng"
        >
          <div className="form-group">
            <label htmlFor="topicName">Tên chủ đề:</label>
            <Input             
              placeholder="Nhập tên chủ đề"
              value={dataSelected}
              onChange={(e) => setDataSelected(e.target.value)}
              size="large"
            />
          </div>

          <div className="form-group">
            <label htmlFor="isActiveSwitch">Hiển thị ngoài:</label>
            <div className="d-flex align-items-center mt-2">
                <Switch 
                    id="isActiveSwitch"
                    checked={isActive}
                    onChange={(checked) => setIsActive(checked ? 1 : 0)} 
                />
                <label htmlFor="isActiveSwitch" className="ml-2 mb-0">Bật/Tắt</label>
            </div>
          </div>
            {/* <Input
                placeholder="Tên chủ đề"
                value={dataSelected}
                onChange={(e) => setDataSelected(e.target.value)}
                size="large"
                className="mt-2 mb-2"
                required
            />

            <Switch value={isActive} onChange={(checked) => setIsActive(checked ? 1 : 0)} /> */}
              
              
    </Modal>

    </React.Fragment>
    )
}

export default AdminCategoriesPage
