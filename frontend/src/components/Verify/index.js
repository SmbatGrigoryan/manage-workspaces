import React, {useEffect} from 'react';
import {Form, Input, Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import './style.css';


const Verify = (props) => {

  useEffect(() => {
    if (props.verifySuccess) {
      props.history.push('/login')
    }
  },
  [props.verifySuccess]
  )

  const onFinish = values => {
    props.verifyStart({
      email: props.user.email,
      emailVerificationToken: values.emailVerificationToken.trim()
    })
  } ;


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row type='flex' justify='center' align='middle'>
        <h3>You have received verification code. </h3>
        <h3>
           Please check your {props.user && props.user.email && props.user.email} email and input the code
        </h3>
      </Row>

      <Row type='flex' justify='center' align='middle' className='login'>
        <Col span={12}>
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
              label='Verification Code'
              name='emailVerificationToken'
              rules={[
                {required: true, message: 'Please input verification code!',}
              ]}
            >
              <Input placeholder='Verification Code'/>
            </Form.Item>
            {
              props.validationErrors && //todo
              props.validationErrors.emailVerificationToken && //todo
              <span className='error'>{props.validationErrors.emailVerificationToken}</span> //todo
            }

             <Form.Item>
              <Button type='primary' htmlType='submit'>
                Verify
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>

    </div>
  );
};

export default Verify;
