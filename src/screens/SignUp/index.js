import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Body, TextInput} from './styles';
import MyButton from '../../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            let userF = auth().currentUser;
            let user = {};
            user.nome = nome;
            user.email = email;
            firestore()
              .collection('users')
              .doc(userF.uid)
              .set(user)
              .then(() => {
                console.log('SignUp, cadastrar: Usuário adicionado!');
                userF
                  .sendEmailVerification()
                  .then(() => {
                    Alert.alert(
                      'Informação',
                      'Foi enviado um email para ' +
                        email +
                        ' para verificação.',
                    );
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: 'AuthStack'}],
                      }),
                    );
                  })
                  .catch(error => {
                    console.log('SignUp, cadastrar: ' + error);
                  });
              })
              .catch(error => {
                console.log('SignUp, cadastrar: ' + error);
              });
          })
          .catch(error => {
            console.log('SignUp, cadastrar: ' + error);
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
          });
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
    </Body>
  );
};

export default SignUp;
