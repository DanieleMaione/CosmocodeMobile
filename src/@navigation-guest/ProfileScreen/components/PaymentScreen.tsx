/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {UIButton} from '../../../components-shared/UIButton';
import {useStripe} from '@stripe/stripe-react-native';

import {View, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export const PaymentScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [key, setKey] = useState('');
  const [loading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (loading) {
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
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]),
  );

  const handleSheet = () => {
    setIsLoading(true);
    presentPaymentSheet();
  };
  return (
    <View>
      <UIButton label="supporta" onPress={handleSheet} />
    </View>
  );
};
