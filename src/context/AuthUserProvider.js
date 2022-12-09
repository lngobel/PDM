import React, {useState, createContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const logOut = () => {
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch(error => {
            console.log('OutraHome, logOut: ' + error);
          });
        RNRestart.Restart();
      })
      .catch(error => {
        console.log('OutraHome, logOut: ' + error);
      });
  };

  return (
    <AuthUserContext.Provider value={{user, setUser, logOut}}>
      {children}
    </AuthUserContext.Provider>
  );
};
