import {
    DeleteOutlined,
    EditOutlined,
    UserAddOutlined,
    ExclamationCircleOutlined,
    SearchOutlined,
    AppstoreAddOutlined
} from "@ant-design/icons";

import { Alert, Button, Table, Modal, Input, Space, Divider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ServiceAPI from "../../api/service/service.api";
import { useDispatchRoot } from "../../redux/store";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { getInfoUser } from "../../redux/controllers/user/userSlice";
import { useSelector } from 'react-redux'
import moment from 'moment';
import openNotification from '../../components/CNotification'
import { Helmet } from 'react-helmet-async';
import './style.scss'
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
import ModalCreateService from "./ModalCreateService";
import ModalUpdateService from "./ModalUpdateService";


// components
import Iconify from '../../components/iconify';

const { confirm } = Modal;


const AdminServicesPage = () => {

    const [visibleModalCreateService, setVisibleModalCreateService] = useState(false);
    const [visibleModalUpdateService, setVisibleModalUpdateService] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const [currentIdUserSelect, setCurrentIdUserSelect] = useState();
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null)
    const [searchText, setSearchText] = useState("");
    const [sid, setSid] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          await ServiceAPI.getAllService().then((res) => setDataTable(res.data));
        };
        fetchData();
    }, [dispatch, refresh]);



    const handleSearch = (
        selectedKeys,
        confirm,
        dataIndex
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
      };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
              
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                // icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        // onFilterDropdownOpenChange: (visible) => {
        //   if (visible) {
        //     setTimeout(() => searchInput.current?.select(), 100);
        //   }
        // },
        render: (text) => (searchedColumn === dataIndex ? text.toString() : text),
    });

    const showDeleteConfirm = (Id, name) => {
      confirm({
        title: `Xác thực hành động!`,
        icon: <ExclamationCircleOutlined />,
        content: `Bạn có muốn xóa dịch vụ "${name}" ? `,
        okText: "Xoá",
        okType: "danger",
        cancelText: "Đóng",
        async onOk() {
          await ServiceAPI.deleteService(Id).then((res) => {
            openNotification('success', "", res.data.message);
            dispatch(setRefresh());
          });
        },
        onCancel() {},
      });
    };



    const columns = [
        {
          title: 'STT',
          dataIndex: 'key',
          width: '6%',
          render: (text, record, index) => index + 1, // Sử dụng index + 1 để in ra thứ tự
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'img_url',
            render: (record) => {
              return (
                <>
                  {
                    typeof record === 'string' ? (
                      <img className="photoService" src={`${import.meta.env.VITE_API_URL}/uploads/${record}`} alt="photoURL" />
                      ) : (
                        <img alt="photoURL" />
                      )
                  }
                </>
              );
            },
        },
        {
          title: 'Tên dịch vụ',
          dataIndex: 'service_name',
          ...getColumnSearchProps('service_name'),
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          width: 400,
          ellipsis: true,
          ...getColumnSearchProps('description'),
        },
        {
            title: "Thao tác",
            dataIndex: "operation",
            width: "12%",
            render: (_, record, index) => {
              const role = record.roleID || "";
              return (
                <div className="">
                    <div className="d-flex align-items-center">
                      <Button
                        type="primary"
                        size="small"
                        className="d-flex align-items-center justify-content-center mx-2"
                        onClick={() => {
                            setSid(record)
                            setVisibleModalUpdateService(true);
                        }}
                      >
                        <EditOutlined />
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        className="d-flex align-items-center justify-content-center mx-2"
                        danger
                        onClick={() => showDeleteConfirm(record.service_id, record.service_name)}
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
        <title>Quản lý dịch vụ </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Quản lý dịch vụ
          </Typography>
          <Button type="primary" size="medium" className="d-flex align-items-center" onClick={() => setVisibleModalCreateService(true)}>
          <AppstoreAddOutlined /> Tạo mới
          </Button>
        </Stack>
        <Divider />
        <Card>
          <Table 
            columns={columns} 
            dataSource={rows} 
            bordered
            />
        </Card>
    </Container>

    {visibleModalCreateService && (
        <ModalCreateService
          visible={visibleModalCreateService}
          setVisible={setVisibleModalCreateService}
          title="Tạo mới dịch vụ"
        />
      )}

    {visibleModalUpdateService && (
        <ModalUpdateService
          title="CẬP NHẬP DỊCH VỤ"
          visible={visibleModalUpdateService}
          setVisible={setVisibleModalUpdateService}
          sid={sid}
        />
      )}

    </React.Fragment>
    )
}

export default AdminServicesPage
