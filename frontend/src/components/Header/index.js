import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Col, Row, Button} from 'antd';

import './style.css';

const {Header} = Layout;


const _Header = (props) => {
  return (
    <Header className='header'>
      <Row type='flex' justify='space-between'>
        <Col span={12} align='left'>
          LOGO
        </Col>
        <Col span={12} align='right'>
          {
           ! props.isAuthenticated && <Link to='/login'>
             <Button
               type='primary'
               onClick={e => console.log('do something')}
             >
               Log In
             </Button>
           </Link>
          }
        </Col>
      </Row>
    </Header>
  )
};

export default _Header





