import React, {useEffect, useState, useContext} from 'react';
import {ToastAndroid, Alert} from 'react-native';
import MyButton from '../../componentes/MyButton';
import {Container, TextInput} from './styles';
import Loading from '../../componentes/Loading';
import DeleteButton from '../../componentes/DeleteButton';
import {UserContext} from '../../context/UserProvider';

const User = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [uid, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const {deleteUser} = useContext(UserContext);
  const {saveUser} = useContext(UserContext);

  useEffect(() => {
    // console.log(route.params.user);
    setNome('');
    setEmail('');
    setLatitude('');
    setLongitude('');
    setId('');
    if (route.params.user) {
      setNome(route.params.user.nome);
      setEmail(route.params.user.email);
      setLatitude(route.params.user.latitude);
      setLongitude(route.params.user.longitude);
      setId(route.params.user.id);
    }
  }, [route]);

  const salvar = async () => {
    if (nome) {
      let usuario = {};
      usuario.nome = nome;
      usuario.email = email;
      usuario.latitude = latitude;
      usuario.longitude = longitude;
      usuario.uid = uid;
      setLoading(true);
      await saveUser(usuario);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite o nome.');
    }
  };

  const excluir = () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o usuário?', [
      {
        text: 'Não',
        onPress: () => {},
        styles: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          console.log(uid);
          if (await deleteUser(uid)) {
            setLoading(false);
            ToastAndroid.show('Usuário excluído.', ToastAndroid.SHORT);
            navigation.goBack();
          } else {
            Alert.alert('Erro', 'Não foi possível excluir o registro.');
          }
        },
      },
    ]);
  };
  if (uid === '') {
    return (
      <Container>
        <TextInput
          placeholder="Nome Completo"
          keyboardType="default"
          returnKeyType="go"
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="go"
          onChangeText={t => setEmail(t)}
          value={email}
        />
        <TextInput
          placeholder="Latitude em decimal"
          keyboardType="numeric"
          returnKeyType="go"
          onChangeText={t => setLatitude(t)}
          value={latitude}
        />
        <TextInput
          placeholder="Longitude em decimal"
          keyboardType="numeric"
          returnKeyType="go"
          onChangeText={t => setLongitude(t)}
          value={longitude}
        />
        <MyButton texto="Salvar" onClick={salvar} />
        <DeleteButton texto="Excluir" onClick={excluir} />
        {loading && <Loading />}
      </Container>
    );
  } else {
    return (
      <Container>
        <TextInput
          placeholder="Nome Completo"
          keyboardType="default"
          returnKeyType="go"
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          editable={false}
          value={email}
        />
        <TextInput
          placeholder="Latitude em decimal"
          keyboardType="numeric"
          returnKeyType="go"
          onChangeText={t => setLatitude(t)}
          value={latitude}
        />
        <TextInput
          placeholder="Longitude em decimal"
          keyboardType="numeric"
          returnKeyType="go"
          onChangeText={t => setLongitude(t)}
          value={longitude}
        />
        <MyButton texto="Salvar" onClick={salvar} />
        <DeleteButton texto="Excluir" onClick={excluir} />
        {loading && <Loading />}
      </Container>
    );
  }
};

export default User;
