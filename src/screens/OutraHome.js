import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import MyButton from '../componentes/MyButton';
import {AuthUserContext} from '../context/AuthUserProvider';

const OutraHome = () => {
  const {logOut} = useContext(AuthUserContext);

  return (
    <View style={styles.container}>
      <MyButton texto="Sair" onClick={() => logOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default OutraHome;
