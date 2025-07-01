import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Footer from './Footer';

import { PropsWithChildren } from 'react';

const { Content } = AntLayout;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer />
    </AntLayout>
  );
};

export default Layout; 