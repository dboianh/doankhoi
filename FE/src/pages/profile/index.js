import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  Grid,
  IconButton,
  styled,
  Switch,
  Typography,
  TextField,
  Avatar,
  DialogActions,
  Stack,
  Container
} from "@mui/material";

import { Button } from "antd";

import LightTextField from "../../components/LightTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import UserAPI from "../../api/user/user.api";
import openNotification from '../../components/CNotification'
import { setRefresh } from '../../redux/controllers/app/appSlice'
import { useDispatchRoot } from '../../redux/store'
import ModalChangePassword from "./ModalChangePassword";


// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));

const Profile = () => {
  const [user, setUser] = useState({});

  const {userID, username, email, avatar, address, phone} = useSelector((state) => state.login);

  const [visibleModalChangePassword, setVisibleModalChangePassword] = useState(false);

  const [image, setImage] = useState(null);

  const [fileList, setFileList] = useState(null)

  const [checked, setChecked] = useState(true);

  const dispatch = useDispatchRoot()



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileList(event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDisplayImage = (e) => {
    setChecked(e.target.checked)
    
  }

  useEffect(() => {
    if(userID) {
      const fetchData = async () => {
        await UserAPI.getUserById(userID).then((res) => {
          setUser(res.data);
        });
      };
      fetchData();

    } else {
      setUser('')
    }
  }, [userID]);

  const initialValues = {
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",    
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    // phone: Yup.number().min(8).required("Phone is Required!"),
    // address: Yup.string().required("Address is Required!"),
  });

  const handleUpdateAccount = async (data) => {


    const dataAccount = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: data.address,
      image: fileList,
      flagRemoveImage: checked
    }    
    
    
    if (dataAccount) {
        await UserAPI.updateProfileById(userID, dataAccount)
        .then((res) => {     
          openNotification("success", "", res.data.message)    
          dispatch(setRefresh())
        }).catch((err) => {
            console.log(err)
            openNotification('error', "", err.response,data.message)
        })
    }
  }

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      handleUpdateAccount(data)
    },
  });

  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân </title>
      </Helmet>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <div></div>
          <Button type="dashed" size="medium" className="d-flex align-items-center" onClick={() => setVisibleModalChangePassword(true)}>
            Đổi mật khẩu
          </Button>
        </Stack>
        

        <Box pt={2} pb={4}>
          <Card sx={{ padding: 4 }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Card
                  sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ButtonWrapper>
                    <UploadButton>
                      <label htmlFor="upload-btn">
                        <input
                          accept="image/*"
                          id="upload-btn"
                          name="image"
                          type="file"
                          style={{ display: "none" }}
                          onChange={onImageChange}
                        />
                        <Avatar
                          alt="photoURL"
                          variant="rounded"
                          sx={{ height: "100px", width: "150px" }}
                          src={
                            checked === false 
                            ?
                              ""
                            :
                            image === null
                              ? typeof user.avatar === "string"
                                ? `${import.meta.env.VITE_API_URL}/uploads/${user.avatar}`
                                : ""
                              : 
                                image
                          }
                        />
                      </label>
                    </UploadButton>
                  </ButtonWrapper>

                  <Typography
                    marginTop={2}
                    maxWidth={200}
                    lineHeight={1.9}
                    display="block"
                    textAlign="center"
                    color="text.disabled"
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                  </Typography>

                  <Box maxWidth={250} marginTop={5} marginBottom={1}>
                    <SwitchWrapper>
                      <Typography display="block" fontWeight={600}>
                        Public Profile
                      </Typography>
                      <Switch defaultChecked />
                    </SwitchWrapper>

                    <SwitchWrapper>
                      <Typography display="block" fontWeight={600}>
                        Apply avatar
                      </Typography>
                      <Switch checked={checked} onChange={handleDisplayImage} />
                    </SwitchWrapper>
                    <Typography
                      display="block"
                      color="text.disabled"
                      fontWeight={500}
                    >
                      Apply disable account
                    </Typography>

                    <SwitchWrapper>
                      <Typography display="block" fontWeight={600}>
                        Email Verified
                      </Typography>
                      <Switch defaultChecked />
                    </SwitchWrapper>
                    <Typography
                      display="block"
                      color="text.disabled"
                      fontWeight={500}
                    >
                      Disabling this will automatically send the user a
                      verification email
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={8} xs={12}>
                
                <Card sx={{ padding: 3, boxShadow: 2 }}>
                  
                  <form onSubmit={handleSubmit}>

                    <Grid container spacing={4}>
                      <Grid item sm={6} xs={12}>
                        <LightTextField
                          fullWidth
                          name="username"
                          placeholder="Username"
                          value={values.username}
                          onChange={handleChange}
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <LightTextField
                          fullWidth
                          name="email"
                          placeholder="Email Address"
                          value={values.email}
                          onChange={handleChange}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <LightTextField
                          fullWidth
                          name="phone"
                          placeholder="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <LightTextField
                          multiline
                          fullWidth
                          rows={10}
                          name="address"
                          placeholder="Address"
                          value={values.address}
                          onChange={handleChange}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                          sx={{
                            "& .MuiOutlinedInput-root textarea": { padding: 0 },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        
                        <Button
                          type="primary"
                          size="large"
                          htmlType="submit"
                          style={{
                            borderRadius: "3px",
                            backgroundColor: "rgb(36, 153, 239)",
                          }}
                        >
                          Update profile
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
      {visibleModalChangePassword && (
        <ModalChangePassword
          visible={visibleModalChangePassword}
          setVisible={setVisibleModalChangePassword}
          title="Đổi mật khẩu"
          uid={userID}
        />
      )}
    </>
  );
};

export default Profile;
