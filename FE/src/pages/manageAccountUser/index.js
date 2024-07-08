import {
    DeleteOutlined,
    EditOutlined,
    UserAddOutlined,
    ExclamationCircleOutlined,
    SearchOutlined
} from "@ant-design/icons";

import { Alert, Button, Table, Modal, Input, Space, Tag, Badge, Divider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import UserAPI from "../../api/user/user.api";
import { useDispatchRoot } from "../../redux/store";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { getInfoUser } from "../../redux/controllers/user/userSlice";
import { useSelector } from 'react-redux'
import moment from 'moment';
import ModalUpdateAccount from "./ModalUpdateAccount";
import ModalCreateAccount from "./ModalCreateAccount";
import openNotification from '../../components/CNotification'
import { Helmet } from 'react-helmet-async';
import './style.scss'
import {Card, Stack, Avatar, Popover, Container, Typography, IconButton, TableContainer, TablePagination} from '@mui/material';

// components
import Iconify from '../../components/iconify';
import { RoleClaim } from '../../common/enum/shared.enum'

const { confirm } = Modal;


const ManageAccountUser = () => {

    const [visibleModalCreateAccount, setVisibleModalCreateAccount] = useState(false);
    const [visibleModalUpdateAccount, setVisibleModalUpdateAccount] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const [currentIdUserSelect, setCurrentIdUserSelect] = useState();
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null)
    const [searchText, setSearchText] = useState("");
    const [roleList, setRoleList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          await UserAPI.getAllUser().then((res) => setDataTable(res.data));
        };
        fetchData();
    }, [dispatch, refresh]);


    useEffect(() => {
      const fetchData = async () => {
      await UserAPI.getRoles().then((res) => {
          setRoleList(res.data);
      });
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
        content: `Bạn có muốn xóa người dùng "${name}" ? `,
        okText: "Xoá",
        okType: "danger",
        cancelText: "Đóng",
        async onOk() {
          await UserAPI.deleteUserById(Id).then((res) => {
            openNotification('success', "", res.data.message);
            dispatch(setRefresh());
          });
        },
        onCancel() {},
      });
    };



    const columns = [
        {
          title: 'Ảnh',
          dataIndex: 'avatar',
          render: (record, index) => {
            return (
              <>
                {
                  typeof record === 'string' ? (
                    <Avatar key={index} src={`${import.meta.env.VITE_API_URL}/uploads/${record}`} alt="photoURL" />
                    ) : (
                      <Avatar alt="photoURL" />
                    )
                }
              </>
            );
          },
        },
        {
          title: 'Họ tên',
          dataIndex: 'username',
          align: 'center',
          ...getColumnSearchProps('username'),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          align: 'center',
          ...getColumnSearchProps('email'),
        },
        {
          title: 'Số điện thọai',
          dataIndex: 'phone',
          align: 'center',
        },
        {
          title: 'Trạng thái',
          dataIndex: 'isLoggedIn',
          align: 'center',
          width: '13%',
          render: (record, index) => record == 1 ? <Badge status="success" text="Hoạt động" key={index} /> : <Badge status="error" text="Không hoạt động" key={index} />
        },
        {
          title: 'Vai trò',
          dataIndex: 'roleName',
          align: 'center',
          width: "15%",
          render: (record, index) => {
            if(record == RoleClaim.ADMIN) {
              return (
                <div>
                  <Tag color="gold" key={index}>{record}</Tag>
                </div>
              )
            } else {
              return (
                <>
                  <Tag color="blue" key={index}>{record}</Tag>
                </>
              )
            }
          },
        },
        {
          title: 'Ngày tạo',
          dataIndex: 'created_at',
          key: 'created_at',
          align: 'center',
          ...getColumnSearchProps('created_at'),
          render: (record, index) => {
            return (
              <div key={index}> 
                {moment(record).format("DD-MM-YYYY")}
              </div>
            );
          },
        },
        {
            title: "Thao tác",
            dataIndex: "operation",
            width: "12%",
            align: 'center',
            render: (_, record, index) => {
              const role = record.roleID || "";
              return (
                <div key={index}>
                    {record.roleName == RoleClaim.ADMIN ? "" : (
                      <div className="d-flex align-items-center">
                        <Button
                          type="primary"
                          size="small"
                          className="d-flex align-items-center justify-content-center mx-2"
                          onClick={() => {
                            dispatch(
                              getInfoUser({
                                userID: record.userID,
                                username: record.username,
                                email: record.email,
                                roleID: record.roleID,
                              })
                            );
                            setVisibleModalUpdateAccount(true);
                          }}
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          type="primary"
                          size="small"
                          className="d-flex align-items-center justify-content-center mx-2"
                          danger
                          onClick={() => showDeleteConfirm(record.userID, record.username)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>

                    )}
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
        <title>Tài khoản người dùng </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Quản lý tài khoản
          </Typography>
          <Button type="primary" size="medium" className="d-flex align-items-center" onClick={() => setVisibleModalCreateAccount(true)}>
          <UserAddOutlined /> Tạo mới
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
            
      {visibleModalCreateAccount && (
        <ModalCreateAccount
          visible={visibleModalCreateAccount}
          setVisible={setVisibleModalCreateAccount}
          title="TẠO TÀI KHOẢN NGƯỜI DÙNG"
          roleList={roleList}
        />
      )}

      {visibleModalUpdateAccount && (
        <ModalUpdateAccount
          title="CẬP NHẬP TÀI KHOẢN NGƯỜI DÙNG"
          visible={visibleModalUpdateAccount}
          setVisible={setVisibleModalUpdateAccount}
          roleList={roleList}
        />
      )}
    </React.Fragment>
    )
}

export default ManageAccountUser
