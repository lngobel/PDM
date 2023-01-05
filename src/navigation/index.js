import React from 'react';
import {ApiProvider} from '../context/ApiProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {EntregadorProvider} from '../context/EntregadorProvider';
import {UserProvider} from '../context/UserProvider';
import Navigator from './navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <UserProvider>
          <EntregadorProvider>
            <Navigator />
          </EntregadorProvider>
        </UserProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
