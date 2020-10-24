import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import {Layout} from 'antd';

import Header from '../../components/Header';

import './style.css'


const {Content} = Layout;
const PublicLayout = ({component: Component, ...rest}) => {
  return (
    <Route render={routeProps => (
      <Fragment>
        <Header isAuthenticated={rest.isAuthenticated}/>
        <Content>
          <Component
            {...rest}
            {...routeProps}
          />
        </Content>
      </Fragment>
    )}
    />
  )
};

export default PublicLayout;

