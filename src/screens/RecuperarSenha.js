import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';

// import { Container } from './styles';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          Alert.alert(
            'Atenção',
            'Foi enviado um email de recuperação de senha para o seguinte endereço: ' +
              email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(error => {
          console.error('RecuperarSenha, recover: ' + error);
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
        });
    } else {
      Alert.alert('Atenção', 'Você deve preencher um email.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButton texto="Recuperar" onClick={recover} />
    </View>
  );
};

export default RecuperarSenha;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    paddingLeft: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingBottom: 1,
  },
});
