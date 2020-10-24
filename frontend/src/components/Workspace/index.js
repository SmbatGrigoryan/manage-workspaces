import React, {Fragment, useEffect, useState} from 'react';
import {Form, Input, Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import './style.css';

import useDebounce from './use-debounce';


const Workspace = (props) => {

  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then(results => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults('');
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  async function searchCharacters(search) {
    const token = localStorage.getItem('token');
    return await fetch(
      `http://localhost:8080/api/v1/workspaces/suggest_subdomain`,
      {
        method: 'POST',
        body: JSON.stringify({subDomain: search}),
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    ).then(r => r.json());
  }

  useEffect(() => {
    props.getWorkspacesStart()
  }, [])

  useEffect(() => {
      props.getWorkspacesStart()
    }, [props.createWorkspaceSuccess, props.deleteWorkspaceSuccess,]
  )

  const onFinish = values => {
    const {name, subDomain} = values;
    props.createWorkspaceStart({name, subDomain})
    form.resetFields()
    setResults('')
  };


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row type='flex' justify='center' align='middle' className='login'>
        <Col span={12}>
          <Form
            form={form}
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
            <p>Is Available :  {results}</p>

            <Form.Item
              label='Workspace subDomain'
              name='subDomain'
              rules={[
                {required: true, message: 'Please input New Workspace!',}
              ]}
            >
              <Input
                placeholder='Workspace subDomain'
                onChange={e => {
                  setSearchTerm(e.target.value)
                }}
              />

            </Form.Item>
            {
              props.validationErrors && //todo
              props.validationErrors.subDomain && //todo
              <span className='error'>{props.validationErrors.subDomain}</span> //todo
            }

            <Form.Item
              label='Workspace Name'
              name='name'
              rules={[
                {required: true, message: 'Please input New Workspace!',}
              ]}
            >
              <Input placeholder='Workspace Name'/>
            </Form.Item>
            {
              props.validationErrors && //todo
              props.validationErrors.name && //todo
              <span className='error'>{props.validationErrors.name}</span> //todo
            }

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Create
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>

      <Fragment>
        {
          props.workspaces && props.workspaces.length &&
          props.workspaces.map(workspace => {

            const {name, subDomain, id} = workspace;

            return <Row justify='space-between' style={{padding: '6px 12px'}} key={id}>
              <Col span={12} align='left'>
                name: {name}, subDomain: {subDomain}
              </Col>
              <Col span={12} align='right'>
                <Button
                  type='danger'
                  onClick={e => {
                    props.deleteWorkspaceStart(id)
                  }}
                >Delete</Button>
              </Col>
            </Row>
          })
        }
      </Fragment>
    </div>
  );
};

export default Workspace;
