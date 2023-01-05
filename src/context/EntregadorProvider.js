import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const EntregadorContext = createContext({});

export const EntregadorProvider = ({children}) => {
  const [entregadores, setEntregadores] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getEntregadores = async () => {
    try {
      const response = await api.get('/entregadores');
      console.log('Dados buscados via API');
      //   console.log(response);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/projeto-pdm-41d78/databases/(default)/documents/entregadores/',
        );
        data.push({
          nome: d.fields.nome.stringValue,
          email: d.fields.email.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => a.nome.localeCompare(b.nome));
      setEntregadores(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API');
      console.log(response);
    }
  };

  const saveEntregador = async val => {
    try {
      await api.post('/entregadores/', {
        fields: {
          nome: {stringValue: val.nome},
          email: {stringValue: val.email},
        },
      });
      showToast('Dados salvos.');
      getEntregadores();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao salvar via API.');
      console.log(response);
    }
  };

  const updateEntregador = async val => {
    try {
      await api.patch('/entregadores/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          email: {stringValue: val.email},
        },
      });
      showToast('Dados salvos.');
      getEntregadores();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao atualizar via API.');
      console.log(response);
    }
  };

  const deleteEntregador = async val => {
    try {
      await api.delete('/entregadores/' + val);
      showToast('Entregador excluído.');
      getEntregadores();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao excluír via API.');
      console.log(response);
    }
  };

  return (
    <EntregadorContext.Provider
      value={{
        entregadores,
        getEntregadores,
        saveEntregador,
        updateEntregador,
        deleteEntregador,
      }}>
      {children}
    </EntregadorContext.Provider>
  );
};
