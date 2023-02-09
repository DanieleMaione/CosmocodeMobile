/* eslint-disable react/no-unstable-nested-components */
import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {NavigatorApp} from './NavigatorApp';
import {initStripe} from '@stripe/stripe-react-native';

export default function App() {
  useEffect(() => {
    initStripe({
      publishableKey:
        'pk_test_51MZGVVGVqBE14xrHOs8PeJ645CnhHjlbvnfNyFAuQIS7kWhIgpvcWWunhKgIRxLQrXkDLW74NIjrADMkwGrPCfme004PmOuzR2',
    });
  }, []);

  return (
    <StripeProvider
      publishableKey={
        'pk_test_51MZGVVGVqBE14xrHOs8PeJ645CnhHjlbvnfNyFAuQIS7kWhIgpvcWWunhKgIRxLQrXkDLW74NIjrADMkwGrPCfme004PmOuzR2'
      }
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Provider store={store}>
        <NavigatorApp />
      </Provider>
    </StripeProvider>
  );
}
