import React, { useReducer, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import JSONTree from 'react-native-json-tree';
import ServerConnector from './lib/server';

const initialState = {
  json: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_JSON':
      return {
        ...state,
        json: action.value
      };
    default:
      throw new Error();
  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  _onCreateCustomer = () => {
    ServerConnector.getInstance().sendToServer("createAccount", {
      firstName: 'Maxime',
      lastName: 'Gfr',
      email: 'contact@sisilafamille.fr',
      country: 'FR'
    }).then((res) => {
      dispatch({type: 'SET_JSON', value: res})
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="auto" />
      <Button onPress={_onCreateCustomer} title="Create customer"/>
      <JSONTree data={state.json} />
    </ScrollView>
  );
}
