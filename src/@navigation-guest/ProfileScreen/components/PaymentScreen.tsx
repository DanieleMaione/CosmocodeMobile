/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {UIButton} from '../../../components-shared/UIButton';
import {useStripe} from '@stripe/stripe-react-native';

import {View, Alert} from 'react-native';

export const PaymentScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [key, setKey] = useState('');

  const handleSheet = () => {
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        setKey((res as {clientSecret: string}).clientSecret);
        initPaymentSheet({
          paymentIntentClientSecret: key,
          merchantDisplayName: 'COSMOCODE',
        });
      })
      .catch(e => Alert.alert(e.message));

    presentPaymentSheet();
  };
  return (
    <View>
      <UIButton label="supporta" onPress={handleSheet} />
    </View>
  );
};
