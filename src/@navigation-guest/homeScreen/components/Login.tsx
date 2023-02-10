/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {memo, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createLogin} from '../../../../slice/loginSlice';
import {userInfo} from '../../../../slice/userSlice';
import {Header} from '../../../components-shared/Header';
import {UIButton} from '../../../components-shared/UIButton';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const Login = memo(() => {
  const ref_emailInput = useRef<any>();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const rnBiometrics = new ReactNativeBiometrics();

  const onPressLogin = async () => {
    const {data: session} = await Axios.post(
      'https://cosmocode-test.herokuapp.com/auth/login',
      {username, email},
      {
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      },
    );

    dispatch(createLogin(session));

    const {data: me} = await Axios.get(
      'https://cosmocode-test.herokuapp.com/auth/me',
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      },
    );
    dispatch(userInfo(me));
  };

  const onSignInByometrics = async () => {
    const {data: session} = await Axios.post(
      'https://cosmocode-test.herokuapp.com/auth/login',
      {
        username: 'cristianpalermo-bitrocketdev',
        email: 'c.palermo@bitrocket.dev',
      },
      {
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      },
    );

    dispatch(createLogin(session));

    const {data: me} = await Axios.get(
      'https://cosmocode-test.herokuapp.com/auth/me',
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      },
    );
    dispatch(userInfo(me));
  };

  const onBiometrycsSupported = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm TouchID'})
      .then(res => {
        const {success} = res;

        if (success) {
          console.log('successful biometrics provided');
          onSignInByometrics();
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const onAuthenticate = () => {
    rnBiometrics.isSensorAvailable().then(async resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
        onBiometrycsSupported();
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
        onBiometrycsSupported();
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
        onBiometrycsSupported();
      } else {
        console.log('Biometrics not supported');
      }
    });
  };

  return (
    <>
      <Header title="Cosmocode" />
      <View style={styles.outer}>
        <Text style={styles.pageTitle}>
          Connettiti con sviluppatori e aziende tech di tutto il mondo.
        </Text>
        <Text style={styles.description}>
          Condividi e scopri in tempo reale a quali attività stanno lavorando
          professionisti e realtà IT, ovunque nel mondo.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#171c25',
        }}>
        <Text style={styles.subtitle}>MADE WITH ♥️ BY</Text>
        <Text
          onPress={() => Linking.openURL('https://www.bitrocket.dev')}
          style={styles.link}>
          BITROCKET.DEV
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              autoFocus={true}
              onSubmitEditing={() =>
                ref_emailInput.current && ref_emailInput.current.focus()
              }
              style={styles.textInput}
              placeholderTextColor="white"
              placeholder="inserisci username"
              onChangeText={setUsername}
              blurOnSubmit={false}
              value={username}
            />
            <TextInput
              ref={ref_emailInput}
              blurOnSubmit={false}
              style={styles.textInput}
              placeholderTextColor="white"
              placeholder="inserisci email"
              onChangeText={setEmail}
              value={email}
            />
            <UIButton label="login" onPress={() => onPressLogin()} />
            <UIButton
              label="Byometrics Login"
              onPress={() => onAuthenticate()}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171c25',
    height: '100%',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-start',
  },

  textInput: {
    margin: 12,
    borderWidth: 1,
    borderColor: '#4e57ef',
    padding: 10,
    color: 'white',
    height: 40,
  },
  outer: {
    backgroundColor: '#171c25',
    textAlign: 'center',
    paddingTop: 20,
  },
  pageTitle: {
    paddingHorizontal: 5,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    padding: 15,
    color: '#a0b3d7',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#a0b3d7',
    textAlign: 'center',
  },
  link: {
    fontSize: 12,
    paddingHorizontal: 2,
    color: '#4e57ef',
    textAlign: 'center',
  },
});
