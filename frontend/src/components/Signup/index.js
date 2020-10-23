import React, {Fragment, useEffect} from 'react';
import {Form, Input, Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import './style.css';


const Signup = (props) => {
  useEffect(() => {
      if (props.signupSuccess) {
        props.history.push('/verify')
      }
    })

  const onFinish = values => props.signupStart(values);


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
            onFieldsChange={
              (changedFields, allFields) => props.resetValidationsErrors()}
          >
            <Form.Item
              label='Full Name'
              name='fullName'
              rules={[
                {
                  required: true,
                  message: 'Please input your Full Name!',
                }
              ]}
            >
              <Input placeholder='Full Name'/>
            </Form.Item>
            {
              props.validationErrors &&
              props.validationErrors.fullName &&
              <span className='error'>{props.validationErrors.fullName}</span>
            }

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder='Full Name'/>
            </Form.Item>
            {
              props.validationErrors &&
              props.validationErrors.email &&
              <span className='error'>{props.validationErrors.email}</span>
            }
            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input password!',
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
                Sign Up
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
