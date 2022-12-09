import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {UserProvider} from '../context/UserProvider';
import Navigator from './navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </AuthUserProvider>
  );
}
