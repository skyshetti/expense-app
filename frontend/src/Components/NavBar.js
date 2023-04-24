import React from "react";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import "./Navbar.css";

import Login from "./Login";
import SignupForm from "./Registration";

import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Restore from "./Restore";
import Logout from "./Logout";

// Layout imports
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ToolOutlined,
  SmileOutlined,
  HomeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

//
const Navbar = () => {
  const isUserLoggedIn = useSelector(state => {
    return Object.keys(state.users.data).length > 0;
  });

  console.log(isUserLoggedIn);

  // antd Layout part
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />

        {isUserLoggedIn ? (
          <Menu
            theme=''
            mode='horizontal'
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: (
                  <HomeOutlined style={{ color: "White", fontSize: "20px" }} />
                ),
                label: <Link to='/home'> Home </Link>,
              },
              {
                key: "2",
                icon: (
                  <SmileOutlined style={{ color: "White", fontSize: "20px" }} />
                ),
                label: <Link to='/profile'> Profile</Link>,
              },
              {
                key: "3",
                icon: (
                  <ToolOutlined style={{ color: "White", fontSize: "20px" }} />
                ),
                label: <Link to='/settings'>Settings</Link>,
              },
              {
                key: "4",
                icon: (
                  <DeleteOutlined
                    style={{ color: "White", fontSize: "20px" }}
                  />
                ),
                label: <Link to='/restore'>Restore</Link>,
              },
              {
                key: "5",
                icon: (
                  <UploadOutlined
                    style={{ color: "White", fontSize: "20px" }}
                  />
                ),
                label: <Link to='/logout'> Logout</Link>,
              },
            ]}
          />
        ) : (
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: (
                  <ToolOutlined style={{ color: "Red", fontSize: "30px" }} />
                ),
                label: <Link to='/login'> Login</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to='/registration'> Registration</Link>,
              },
            ]}
          />
        )}
      </Header>
      <Content
        style={{
          padding: "0 10px",
          marginTop: "20px",
        }}
      >
        <div
          className='site-layout-content'
          style={{
            background: colorBgContainer,
          }}
        >
          <Route path='/' component={Login} exact={true} />
          <Route path='/login' component={Login} exact={true} />
          <Route path='/registration' component={SignupForm} exact={true} />
          {/* <Route component={Login} /> */}
          <PrivateRoute path='/home' component={Home} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/settings' component={Settings} />
          <PrivateRoute path='/restore' component={Restore} />
          <PrivateRoute path='/logout' component={Logout} />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};
export default Navbar;
