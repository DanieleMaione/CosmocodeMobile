import React, {useState, useContext} from 'react';
import {UIButton} from '../../../components-shared/UIButton';
import {useStripe} from '@stripe/stripe-react-native';

import {View, Alert} from 'react-native';
import {Context} from '../../../Context';

export const PaymentScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [key, setKey] = useState('');
  const {isPaid, setIsPaid} = useContext(Context);

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

    presentPaymentSheet().then(res =>
      res.error ? console.log(res.error) : setIsPaid(true),
    );
  };
  return (
    <View>
      <UIButton label="supporta" onPress={handleSheet} />
    </View>
  );
};
