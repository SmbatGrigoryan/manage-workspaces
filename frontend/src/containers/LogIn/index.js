import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useSelector} from 'react-redux';

import {Form, Input, Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import {loginStart} from './actions';
import './style.css';


const LogIn = (props) => {

  const [authInitialState] = useState(props.isAuthenticated);

  const authorizationError = useSelector(state => state.global.authorizationError);

  useEffect(() => console.log('LOGIN PROPS', props))

  useEffect(() => {
      if (props.isAuthenticated) {
        props.history.push('/admin/products')
      }
    });

  useEffect(() => {
      if ( ! authInitialState && props.isAuthenticated) {
        props.history.push('/user-workspaces')

      }
    }, [props.isAuthenticated]);


  const onFinish = values => {
    return props.loginStart(values)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row type='flex' justify='center' align='middle' className='login'>
        <Col span={8}>
          <Form
            size='large'
            name='basic'
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onFieldsChange={(changedFields, allFields) => {
            }}
          >
            <Form.Item
              label=''
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                }
              ]}
            >
              <Input placeholder='email'/>
            </Form.Item>
            {
              props.validationErrors &&
              props.validationErrors.email &&
              <span className='error'>{props.validationErrors.email}</span>
            }

            <Form.Item
              label=''
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                }
              ]}
            >
              <Input.Password placeholder='Password'/>

            </Form.Item>
            {
              props.validationErrors &&
              props.validationErrors.password &&
              <span className='error'>{props.validationErrors.password}</span>
            }

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Log In
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>

    </div>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    loginStart: data => dispatch(loginStart(data))
  }
};

export default connect(null, mapDispatchToProps)(LogIn)

