import React, {useState, useContext} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import MyButton from '../componentes/MyButton';
import {AuthUserContext} from '../context/AuthUserProvider';

// import { Container } from './styles';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {recoverPass} = useContext(AuthUserContext);

  const recover = async () => {
    if (email !== '') {
      if (await recoverPass(email)) {
        Alert.alert(
          'Atenção',
          'Enviamos um email de recuperação para o seguinte endereço' + email,
          [{text: 'Ok', onPress: () => navigation.goBack()}],
        );
      }
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
