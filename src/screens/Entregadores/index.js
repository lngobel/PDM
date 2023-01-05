import React, {useContext, useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './item';
import AddFloatButton from '../../componentes/AddFloatButton';
import Loading from '../../componentes/Loading';
import {EntregadorContext} from '../../context/EntregadorProvider';

const Entregadores = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getEntregadores, entregadores} = useContext(EntregadorContext);

  const fetchData = async () => {
    await getEntregadores();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //console.log(entregadores);
    setData(entregadores);
  }, [entregadores]);

  const routeEntregador = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Entregador',
        params: {entregador: item},
      }),
    );
  };

  const routeAddEntregador = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Entregador',
        params: {entregador: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeEntregador(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddEntregador} />
      {loading && <Loading />}
    </Container>
  );
};
export default Entregadores;
