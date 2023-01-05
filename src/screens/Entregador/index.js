import React, {useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import MyButton from '../../componentes/MyButton';
import DeleteButton from '../../componentes/DeleteButton';
import Loading from '../../componentes/Loading';
import {EntregadorContext} from '../../context/EntregadorProvider';

const Entregador = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveEntregador, updateEntregador, deleteEntregador} =
    useContext(EntregadorContext);

  useEffect(() => {
    //console.log(route.params.entregador);
    setNome('');
    setEmail('');
    setUid('');
    if (route.params.entregador) {
      setNome(route.params.entregador.nome);
      setEmail(route.params.entregador.email);
      setUid(route.params.entregador.uid);
    }
    return () => {
      console.log('desmontou Entregador');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && email) {
      let entregador = {};
      entregador.uid = uid;
      entregador.nome = nome;
      entregador.email = email;
      setLoading(true);
      if (uid) {
        await updateEntregador(entregador);
      } else {
        await saveEntregador(entregador);
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja excluir o entregador?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            await deleteEntregador(uid);
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome do Entregador"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email"
        returnKeyType="go"
        onChangeText={e => setEmail(e)}
        value={email}
      />
      <MyButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Entregador;
