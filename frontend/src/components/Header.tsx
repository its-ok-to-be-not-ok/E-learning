import React from 'react';
import { Layout, Menu, Input, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const isLoggedIn = false; // Thay bằng logic thực tế
const userAvatarUrl = "";

const menuLoggedIn = (
  <Menu>
    <Menu.Item key="profile"><a href="/profile">Profile</a></Menu.Item>
    <Menu.Item key="settings"><a href="/settings">Settings</a></Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const menuLoggedOut = (
  <Menu>
    <Menu.Item key="login"><a href="/login">Login</a></Menu.Item>
    <Menu.Item key="register"><a href="/register">Register</a></Menu.Item>
  </Menu>
);

const Header = () => (
  <AntHeader style={{ background: '#0d1b2a', padding: 0 }}>
    <div
      style={{
        maxWidth: 1440, 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        height: 64,
        padding: '0 18px', 
      }}
    >
      <div style={{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 32,
      }}>Logo</div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Explore</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
        <Menu.Item key="4">Contact</Menu.Item>
      </Menu>

      <Input.Search
        placeholder="Search..."
        size="large"
        style={{
          width: 320,
          marginLeft: 24,
          marginRight: 16,
          fontSize: 18,
          borderRadius: 8,
        }}
      />

      <Dropdown
        overlay={isLoggedIn ? menuLoggedIn : menuLoggedOut}
        trigger={['click']}
        placement="bottomRight"
      >
        <div style={{ cursor: 'pointer', marginRight: 0 }}>
          <Avatar
            size="small"
            src={isLoggedIn && userAvatarUrl ? userAvatarUrl : undefined}
            icon={!isLoggedIn || !userAvatarUrl ? <UserOutlined /> : undefined}
            style={{
              backgroundColor: '#fff',
              color: '#001529',
              marginLeft: 8,
              border: '1px solid #e0e0e0',
            }}
          />
        </div>
      </Dropdown>
    </div>
  </AntHeader>
);

export default Header;
