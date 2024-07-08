import React, {useState, useEffect, useRef} from 'react'
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
//Antd
import { DeleteOutlined,
    EditOutlined,
    UserAddOutlined,
    ExclamationCircleOutlined,
    SearchOutlined,
    AppstoreAddOutlined,
    InfoCircleOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
    FolderOpenOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    SwapOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    ZoomOutOutlined,
    ZoomInOutlined,
    FieldTimeOutlined,
    PlusSquareOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
  import {Alert, Button, Table, Modal, Input, Space, Tooltip, Select, Tag, Popconfirm, FloatButton, Image, Divider } from "antd";
//Redux
import { useDispatchRoot } from "../../redux/store";
import { setRefresh } from "../../redux/controllers/app/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import NewsAPI from "../../api/news/news.api";
import { StatusPost, RoleClaim, CateTypeEnum } from '../../common/enum/shared.enum'
import DrawerNewsDetail from "../../sections/@dashboard/blog/DrawerNewsDetail";
import openNotification from "../../components/CNotification";

import moment from "moment";


const { Search } = Input;



const AdminIntroPage = () => {

    const [newsData, setNewsData] = useState([]);
    const searchInput = useRef(null);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
    const [dataDrawer, setDataDrawer] = useState([]);
    const { userID, username, roleID, roleName } = useSelector((state) => state.login);
    const dispatch = useDispatchRoot();
    const { refresh } = useSelector((state) => state.app);
    const [filteredNews, setFilteredNews] = useState([]); // Dùng để lưu tin tức sau khi tìm kiếm
    const [loadings, setLoadings] = useState([]);
    const { confirm } = Modal;


    
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          if(roleName == RoleClaim.ADMIN) {
            return NewsAPI.getAllByAdmin(CateTypeEnum.GIOI_THIEU).then((res) => setNewsData(res.data));
          }
          else if (roleName == RoleClaim.USER) {
            return NewsAPI.getByUserCreate(userID).then((res) => {
              setNewsData(res.data)
            });
          }
        } catch (error) {
          console.log(error)
        }
      };
      fetchData();
    }, [dispatch, refresh]);



    const handleOpenDetailDrawer = (data) => {
      setDataDrawer(data);
      setOpenDetailDrawer(true);
    };
  
    const handleCloseDetailDrawer = () => {
      setOpenDetailDrawer(false);
    };

    const handleUpdateNews = (record) => {
      navigate(`/dashboard/update/${record.news_id}`);
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
        render: (text) => (searchedColumn === dataIndex ? text.toString() : text),
    });


    const enterLoading = (index, id) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        if (index.includes('approve')) {
          handleApprove(id);
        }
        if (index.includes('refuse')) {
          handleRefuse(id);
        }
        if(index.includes('resend')) {
          handleResend(id)
        }
        return newLoadings;
      });
  
    };

    const handleApprove = (id) => {
      NewsAPI.approve(id, { status: "Đã duyệt" })
        .then((res) => {
          openNotification("success", "", res.data.message);
          dispatch(setRefresh());
        })
        .catch((err) => {
          openNotification("error", "", err.response.data.message);
        });
    };
  
    const handleRefuse = (id) => {
      NewsAPI.refuse(id, { status: "Từ chối" })
        .then((res) => {
          openNotification("success", "", res.data.message);
          dispatch(setRefresh());
        })
        .catch((err) => {
          openNotification("error", "", err.response.data.message);
        });
    };
  
    const handleResend = (id) => {
      NewsAPI.resend(id, { status: "Chờ duyệt" })
        .then((res) => {
          openNotification("success", "", res.data.message);
          dispatch(setRefresh());
        })
        .catch((err) => {
          openNotification("error", "", err.response.data.message);
      });
    }


    const showDeleteConfirm = (id, isAttached) => {
      confirm({
        title: `Xác thực hành động!`,
        icon: <ExclamationCircleOutlined />,
        content: `Bạn chắc chắn muốn xóa tin tức này?`,
        okText: "Xoá",
        okType: "danger",
        cancelText: "Đóng",
        async onOk() {
          try {
            if (isAttached.length > 0) {
              await AttachAPI.delete(id);
            }
            await NewsAPI.delete(id);
            openNotification("success", "", "Xóa thành công");
            dispatch(setRefresh());
          } catch (error) {
            console.log(error)
            openNotification("error", "Lỗi", "Có lỗi xảy ra khi xóa tin tức hoặc tệp đính kèm.");
          }  
        },
        onCancel() {}
      });
    };


    const columns = [
        {
          title: "Tiêu đề",
          dataIndex: "title",
          width: '27%',
          ellipsis: true,
          ...getColumnSearchProps("title"),
        },
        {
          title: "Thể loại",
          width: '20%',
          dataIndex: "cname",
          ...getColumnSearchProps("cname"),
        },
        {
          title: "Tạo bởi",
          dataIndex: "username",
          width: "11%",
          ...getColumnSearchProps("username"),
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          width: "13%",
          align: "center",
          render: (record) => {
            if (record == StatusPost.PENDING) {
              return (
                <div className="stt-tag">
                  <Tag color="warning" icon={<SyncOutlined />}>Chờ duyệt</Tag>
                </div>
              );
            } else if (record === StatusPost.APPROVED) {
              return (
                <div className="stt-tag">
                  <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>
                </div>
              );
            } else if (record == StatusPost.REJECT) {
              return (
                <div className="stt-tag">
                  <Tag icon={<CloseCircleOutlined />} color="error">Từ chối</Tag>
                </div>
              );
            } else {
              return (
                <div className="stt-tag">
                  <Tag icon={<EditOutlined />} color="processing">{StatusPost.PROCESSING}</Tag>
                </div>
              );
            }
          },
        },
        {
          title: "Ngày tạo",
          dataIndex: "date",
          width: "12%",
          sorter: (a, b) => a.date.localeCompare(b.date),
          render: (record) => {
            return <div>{moment(record).format("DD-MM-YYYY")}</div>;
          },
        },
        {
          title: "Thao tác",
          dataIndex: "operation",
          width: "20%",
          render: (_, record, index) => {
            return (
              <div className="">
                {roleName == RoleClaim.ADMIN && record.status == StatusPost.PENDING ? (
                  <div className="d-flex align-items-center align-items-center">
                    <Tooltip title="Phê duyệt">
                      <Button
                        type="primary"
                        size="small"
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          marginLeft: 5,
                          backgroundColor: "#5B9A8B",
                          padding: "0px 14px",
                        }}
                        icon={<CheckCircleOutlined />}
                        // loading={loadings[`${record.news_id}_approve`]}
                        onClick={() => {
                          enterLoading(`${record.news_id}_approve`, record.news_id);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Từ chối tiếp nhận">
                      <Popconfirm
                          placement="left"
                          title={'Xác thực hành động'}
                          description={"Bạn muốn từ chối phê duyệt?"}
                          onConfirm={() => enterLoading(`${index}_refuse`, record.news_id)}
                          okText="Từ chối"
                          cancelText="Hủy"
                        >
                          <Button
                            type="primary"
                            size="small"
                            className="d-flex align-items-center justify-content-center"
                            icon={<MinusCircleOutlined />}
                            style={{marginLeft: 5, padding: "0px 14px"}}
                            danger
                          />
    
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                          type="primary"
                          size="small"
                          style={{
                            marginLeft: 5,
                            backgroundColor: "#F57328",
                            borderColor: "#F57328",
                          }}
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => handleUpdateNews(record)}
                        >
                          <EditOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xem trước">  
                      <a
                        href={`/preview/${record.news_id}`}
                        target="_blank"
                      >          
                        <Button
                          type="primary"
                          size="small"
                          className="d-flex align-items-center justify-content-center"
                          icon={<FolderOpenOutlined />}
                          style={{marginLeft: 5, padding: "0px 14px", backgroundColor: '#4F709C'}}
                          danger
                        />
                      </a>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <Tooltip title="Xem">
                      <a
                        href={`/tintuc/${record.news_id}`}
                        target="_blank"
                      >
                        <Button
                          type="primary"
                          size="small"
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => {}}
                          disabled={record.status !== "Đã duyệt"}
                          style={{
                            marginLeft: 5,
                            backgroundColor: "#CC3636",
                            borderColor: "#CC3636",
                          }}
                        >
                          <EyeOutlined />
                        </Button>
                      </a>
                    </Tooltip>
                    <Tooltip title="Chi tiết">
                      <Button
                        type="primary"
                        size="small"
                        style={{ marginLeft: 5 }}
                        className="d-flex align-items-center justify-content-center"
                        onClick={() => handleOpenDetailDrawer(record)}
                      >
                        <ExclamationCircleOutlined />
                      </Button>
                    </Tooltip>
                    {record.status === StatusPost.APPROVED && roleName == RoleClaim.USER ? "" : (
                      <>
                      <Tooltip title="Chỉnh sửa">
                        <Button
                          type="primary"
                          size="small"
                          style={{
                            marginLeft: 5,
                            backgroundColor: "#F57328",
                            borderColor: "#F57328",
                          }}
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => handleUpdateNews(record)}
                        >
                          <EditOutlined />
                        </Button>
                      </Tooltip>
                      
                      <Tooltip title="Xóa">
                        <Button
                          type="primary"
                          size="small"
                          style={{ marginLeft: 5 }}
                          className="d-flex align-items-center justify-content-center"
                          danger
                          onClick={() => showDeleteConfirm(record.news_id, record.attachments)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Tooltip>
                      </>
                    )} 
                  </div>
                )}
              </div>
            );
          },
        },
    ];

    const onSearch = async (value) => {
        await NewsAPI.search(value).then((res) => {
          if(roleName == RoleClaim.ADMIN) {
            setNewsData(res.data)
          } else if (roleName == RoleClaim.USER) {
            const filteredNews = res.data.filter((news) => {
              return news.title.toLowerCase().includes(value.toLowerCase()) && news.userID === userID;
            });
            setNewsData(filteredNews);
          }
        })
    }

    const rows = newsData.map((data, index) => ({
        ...data,
        key: index, // thêm key cho từng hàng
      }));

    return (
        <>
            <Helmet>
                <title> Trang giới thiệu </title>
            </Helmet>

            <DrawerNewsDetail
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
                    Giới thiệu
                </Typography>
                <div className="d-flex align-items-center">
                    <Link to="/dashboard/tintucsk/add" className="addNewsLink mr-3">
                    <Button className="d-flex align-items-center">
                        <EditOutlined/> Biên soạn
                    </Button>
                    {/* <Button type="primary" style={{ backgroundColor: '#088395' }}>
                        
                    </Button> */}
                    </Link>
                    <Link to={`topic/${CateTypeEnum.GIOI_THIEU}`} className="addNewsLink">
                    <Button className="d-flex align-items-center"><PlusOutlined /> Chủ đề</Button>
                    </Link>
                </div>
                </Stack>
                <Stack
                mb={3}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                >
                <Search
                    placeholder="Tìm kiếm chủ đề tin tức..."
                    size="large"
                    allowClear
                    style={{ width: 400 }}
                    className="custom-input"
                />
                </Stack>
                <Divider />

                <Card>
                    <Table columns={columns} dataSource={rows} className="table-striped-rows" bordered />
                </Card>

                {/* <FloatButton icon={<EditOutlined />} onClick={() => navigate('/dashboard/newsManagement/add')} /> */}

                {/* <Grid container spacing={3}>
                {newsData.map((post, index) => (
                    <BlogPostCard key={index} post={post} index={index} />
                ))}
                </Grid> */}
            </Container>
        </>
    )
}

export default AdminIntroPage
