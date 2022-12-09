import React, {useEffect, useState, useContext} from 'react';
import {Container, FlatList} from './styles';
import Item from './Item';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../componentes/Loading';
import AddFloatButton from '../../componentes/AddFloatButton';
import {UserContext} from '../../context/UserProvider';

const Users = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {users} = useContext(UserContext);
  const {getUsers} = useContext(UserContext);

  useEffect(() => {
    const unsubscribeUsers = getUsers();
    return () => {
      console.log('ao desmontar o componente Home');
      unsubscribeUsers;
    };
  }, []);
  useEffect(() => {
    setData(users);
    setLoading(false);
  }, [users]);

  const routeUser = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'User',
        params: {user: item},
      }),
    );
  };

  const routeAddUser = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'User',
        params: {user: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );
  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <AddFloatButton onClick={routeAddUser} />
      {loading && <Loading />}
    </Container>
  );
};
export default Users;
