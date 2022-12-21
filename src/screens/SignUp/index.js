import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';
import {Body, TextInput} from './styles';
import MyButton from '../../componentes/MyButton';
import {CommonActions} from '@react-navigation/native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import Loading from '../../componentes/Loading';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const {signUp} = useContext(AuthUserContext);

  const cadastrar = async () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        setLoading(true);
        await signUp(email, pass);
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'AuthStack'}],
          }),
        );
      } else {
        Alert.alert(
          'Erro',
          'A senha e a confirmação de senha devem ser iguais!',
        );
      }
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        onEndEditing={() => this.emailTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        onEndEditing={() => this.senhaTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.senhaTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
        onEndEditing={() => this.confirmSenhaTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.confirmSenhaTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirmPass(t)}
        onEndEditing={() => cadastrar()}
      />
      <MyButton texto="Cadastrar" onClick={cadastrar} />
      {loading && <Loading />}
    </Body>
  );
};

export default SignUp;
