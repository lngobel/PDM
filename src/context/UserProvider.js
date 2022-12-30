import React, {useState, createContext} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getUsers = async () => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const val = {
              id: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
            };
            d.push(val);
          });
          //console.log(d);
          setUsers(d);
        },
        error => {
          console.log('Home, getUsers: ' + error);
        },
      );

    return unsubscribe;
  };

  const saveUser = async val => {
    await firestore()
      .collection('users')
      .doc(val.uid)
      .set(
        {
          nome: val.nome,
          email: val.email,
          latitude: val.latitude,
          longitude: val.longitude,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch(error => {
        console.log('UserProvider, saveUser: ' + error);
      });
  };

  const deleteUser = async uid => {
    try {
      await firestore().collection('users').doc(uid).delete();
      return true;
    } catch (error) {
      console.error('UserProvider, deleteUser: ' + error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{users, getUsers, saveUser, deleteUser}}>
      {children}
    </UserContext.Provider>
  );
};
