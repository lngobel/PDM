/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {AuthUserContext} from '../context/AuthUserProvider';
import {ApiContext} from '../context/ApiProvider';

const Preload = ({navigation}) => {
  const {signIn, retrieveUserSession} = useContext(AuthUserContext);
  const {getApi} = useContext(ApiContext);

  const entrar = async (email, password) => {
    if (email !== '' && password !== '') {
      try {
        await signIn(email, password);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } catch (error) {
        console.error('Preload, entrar: ' + error);
      }
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  async function loginAutomatico() {
    let localUser = await retrieveUserSession();
    if (localUser) {
      entrar(localUser.email, localUser.password);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SingIn'}],
        }),
      );
    }
  }

  useEffect(() => {
    loginAutomatico();
    getApi();
  }, []);

  return (
    <View>
      <Text>Preload</Text>
    </View>
  );
};

export default Preload;
