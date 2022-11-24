import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyButton from '../componentes/MyButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

const OutraHome = () => {
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
    <View style={styles.container}>
      <MyButton texto="Sair" onClick={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default OutraHome;
