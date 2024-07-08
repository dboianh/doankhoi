import React, { useEffect, useRef, useState } from "react";
import ContactAPI from "../../api/contact/contact.api";
import { Helmet } from "react-helmet-async";
import {
  Alert,
  Button,
  Table,
  Modal,
  Input,
  Space,
  Tag,
  Tooltip,
  message,
  Divider
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatchRoot } from "../../redux/store";
import openNotification from "../../components/CNotification";
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
} from "@mui/material";
import moment from "moment";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import "./style.scss";
import DrawerContactDetail from "./DrawerContactDetail";

import { id } from "date-fns/locale";

//----------------------------------------
const { confirm } = Modal;

const AdminContactPage = () => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatchRoot();
  const { refresh } = useSelector((state) => state.app);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
  const [dataDrawer, setDataDrawer] = useState([]);
  const [loadings, setLoadings] = useState([]);

  const handleOpenDetailDrawer = (data) => {
    setDataDrawer(data);
    setOpenDetailDrawer(true);
  };

  const handleCloseDetailDrawer = () => {
    setOpenDetailDrawer(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await ContactAPI.getAll().then((res) => setDataTable(res.data));
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
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1677ff" : undefined,
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

  const showDeleteConfirm = (Id) => {
    console.log(Id);
    confirm({
      title: `Xác thực hành động!`,
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có muốn xóa góp ý này ? `,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Đóng",
      async onOk() {
        await ContactAPI.delete(Id).then((res) => {
          openNotification("success", "", res.data.message);
          dispatch(setRefresh());
        });
      },
      onCancel() {},
    });
  };

  //Loading btn

  const enterLoading = (index, id) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        handleApprove(id);
        return newLoadings;
      });
    }, 2000);
  };

  const handleApprove = (id) => {
    ContactAPI.check(id).then((res) => {
      openNotification("success", "", res.data.message);
      dispatch(setRefresh());
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: "5%",
      render: (text, record, index) => index + 1, // Sử dụng index + 1 để in ra thứ tự
    },
    {
      title: "Tên",
      dataIndex: "fullname",
      width: "16%",
      ...getColumnSearchProps("fullname"),
    },

    {
      title: "Nội dung",
      dataIndex: "message",
      width: 400,
      ...getColumnSearchProps("message"),
    },
    {
      title: "Ngày gởi",
      dataIndex: "sending_date",
      width: "12%",
      render: (record) => {
        return (
          <div>
            {moment(record).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "isChecked",
      filters: [
        {
          text: "Chưa duyệt",
          value: 0,
        },
        {
          text: "Đã duyệt",
          value: 1,
        },
      ],
      onFilter: (value, record) => record.isChecked === value,
      width: "8%",
      render: (record) => {
        if (record == 0) {
          return (
            <div className="">
              <Tag color="error">Chưa duyệt</Tag>
            </div>
          );
        } else if (record == 1) {
          return (
            <div className="">
              <Tag color="success">Đã duyệt</Tag>
            </div>
          );
        }
      },
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
              {record.isChecked === 0 ? (
                <Tooltip title="Phê duyệt">
                  <Button
                    type="primary"
                    size="small"
                    className="d-flex align-items-center justify-content-center mx-2"
                    style={{
                      backgroundColor: "#5B9A8B",
                      padding: "0px 14px",

                    }}
                    icon={<CheckCircleOutlined />}
                    loading={loadings[record.cid]}
                    onClick={() => {
                      enterLoading(record.cid, record.cid);
                    }}
                  />
                </Tooltip>

              ) : (
                ""
              )}

              <Tooltip title="Xem danh thiếp">
                <Button
                  type="primary"
                  size="small"
                  className="d-flex align-items-center justify-content-center mx-2"
                  style={{ backgroundColor: "#6499E9" }}
                  onClick={() => handleOpenDetailDrawer(record)}
                >
                  <ExclamationCircleOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="Xóa">
                <Button
                  type="primary"
                  size="small"
                  className="d-flex align-items-center justify-content-center mx-2"
                  danger
                  onClick={() => showDeleteConfirm(record.cid)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
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
        <title>Quản lý hòm thư góp ý </title>
      </Helmet>

      <DrawerContactDetail
        openDrawerDetail={openDetailDrawer}
        onOpenDrawerDetail={handleOpenDetailDrawer}
        onCloseDrawerDetail={handleCloseDetailDrawer}
        data={dataDrawer}
      />

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h6" gutterBottom>
            Hộp thư góp ý
          </Typography>
          {/* <Button type="primary" size="medium" className="d-flex align-items-center" onClick={() => setVisibleModalCreateService(true)}>
            <AppstoreAddOutlined /> Tạo mới
            </Button> */}
        </Stack>
        <Divider />
        <Card>
          <Table columns={columns} dataSource={rows} bordered />
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default AdminContactPage;
