import React, {useState, createContext} from 'react';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function storeUserSession(localUser) {
    try {
      await EncryptedStorage.setItem('user_session', JSON.stringify(localUser));
    } catch (error) {
      console.error('SingIn, storeUserSession: ' + error);
    }
  }

  const signUp = async (email, pass) => {
    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      let userF = auth().currentUser;
      userF.sendEmailVerification().then(() => {
        Alert.alert(
          'Atenção',
          'Foi enviado um email para: ' + email + ' para verificação.',
        );
      });
    } catch (error) {
      console.log('AuthUserProvider, signUp: ' + error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Erro', 'Este email já está em uso.');
          break;
        case 'auth/operation-not-allowed':
          Alert.alert('Erro', 'Problemas ao cadastrar o usuário.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/weak-password':
          Alert.alert('Erro', 'Por facor, digite uma senha mais forte.');
          break;
      }
    }
  };

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session) {
        let localUser = JSON.parse(session);
        return localUser;
      }
      return null;
    } catch (error) {
      console.error('AuthUserProvider, retrieveUserSession: ' + error);
    }
  }

  const signIn = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      if (!auth().currentUser.emailVerified) {
        Alert.alert('Erro!', 'Confirme seu cadastro no email ' + email);
        return false;
      }
      await storeUserSession({
        email,
        password,
      });
      return true;
    } catch (error) {
      console.error('AuthUserProvider, signIn: ' + error);
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Erro', 'Usuário não cadastrado.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Erro', 'Erro na senha.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/user-disabled':
          Alert.alert('Erro', 'Usuário desabilitado.');
          break;
      }
    }
  };

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

  const recoverPass = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.error('AuthUserProvider, recoverPass: ' + error);
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Erro', 'Usuário não cadastrado.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/user-disabled':
          Alert.alert('Erro', 'Usuário desabilitado.');
          break;
      }
      return false;
    }
  };

  return (
    <AuthUserContext.Provider
      value={{
        user,
        setUser,
        logOut,
        signUp,
        signIn,
        recoverPass,
        retrieveUserSession,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
