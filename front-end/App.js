import React, { useReducer, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import JSONTree from 'react-native-json-tree';
import AdyenConnector from './lib/adyen';

const initialState = {
  create_account: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        create_account: action.value
      };
    default:
      throw new Error();
  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  _onCreateCustomer = () => {
    AdyenConnector.getInstance().sendToServer("createAccount", {
      firstName: 'Maxime',
      lastName: 'Gfr'
    }).then((res) => {
      dispatch({type: 'SET_COUNT', value: res})
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="auto" />
      <Button onPress={_onCreateCustomer} title="Create customer"/>
      <JSONTree data={state.create_account} />
    </ScrollView>
  );
}
