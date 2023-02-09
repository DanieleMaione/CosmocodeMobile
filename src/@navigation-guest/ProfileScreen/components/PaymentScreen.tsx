/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {UIButton} from '../../../components-shared/UIButton';
import PaymentMethodCreateParams, {
  CardField,
  CardFieldInput,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {API_URL} from '../Config';

import {TextInput} from 'react-native';
import axios from 'axios';

export const PaymentScreen = () => {
  const [name, setName] = useState('');
  const {confirmPayment, loading} = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(
      `${API_URL}/create-payment-intent`,
      {
        paymentMethodType: 'card',
        currency: 'usd',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // const response = await fetch(`${API_URL}/create-payment-intent`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     paymentMethodType: 'card',
    //     currency: 'usd',
    //   }),
    // });
    console.log(response.data);

    const {clientSecret} = await response.data;

    return clientSecret;
  };

  const handlePayPress = async () => {
    // 1. fetch Intent Client Secret from backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // 2. Gather customer billing information (ex. email)
    const billingDetails: PaymentMethodCreateParams.BillingDetails = {
      name,
    };

    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
    });

    if (error) {
      console.log('Payment confirmation error', error.message);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

  return (
    <>
      <TextInput
        autoCapitalize="none"
        placeholder="Name"
        keyboardType="name-phone-pad"
        onChange={(value: any) => setName(value.nativeEvent.text)}
      />
      <CardField
        postalCodeEnabled={true}
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
      <UIButton
        label="conferma"
        onPress={() => handlePayPress()}
        disabled={loading}
      />
    </>
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
