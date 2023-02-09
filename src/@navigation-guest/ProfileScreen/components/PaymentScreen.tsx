/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {UIButton} from '../../../components-shared/UIButton';
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';

import {View, Alert} from 'react-native';

export const PaymentScreen = () => {
  const {confirmPayment} = useStripe();

  const [key, setKey] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        setKey((res as {clientSecret: string}).clientSecret);
      })
      .catch(e => Alert.alert(e.message));
  }, []);

  const handleConfirmation = async () => {
    if (key) {
      const {paymentIntent, error} = await confirmPayment(key, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: 'John@email.com',
          },
        },
      });

      if (!error) {
        Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
      } else {
        console.log('errori');
        Alert.alert('Error', error.message);
      }
    }
  };
  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={inputStyles}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <UIButton label="Confirm payment" onPress={handleConfirmation} />
    </View>
  );
};

const inputStyles: CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#999999',
};
