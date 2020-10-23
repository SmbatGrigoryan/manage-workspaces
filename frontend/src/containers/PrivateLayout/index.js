import React, {Fragment, useEffect} from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import {Layout, Col, Row, Button} from 'antd';

import Header from '../../components/Header';

import './style.css'


const PrivateLayout = ({component: Component, isAuthenticated, ...rest}) => {


  if (isAuthenticated === true) {
    return (
      <Route render={routeProps => (
        <Layout className='privateLayout'>
          <Header isAuthenticated={isAuthenticated}/>
          <main>
            <Row type='flex' className='privateRow'>
              <Col span={19} align='middle' className='privateComponent'>
                <Component
                  {...rest}
                  {...routeProps}
                />
              </Col>
            </Row>
          </main>
        </Layout>
      )}
      />
    )
  } else {
    return <Redirect to='/login'/>
  }

};

export default PrivateLayout;

