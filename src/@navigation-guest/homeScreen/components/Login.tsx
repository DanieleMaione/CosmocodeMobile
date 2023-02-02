import Axios from 'axios';
import React, {memo, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Text,
  Linking,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {createLogin} from '../../../../slice/loginSlice';
import {userInfo} from '../../../../slice/userSlice';
import {Header} from '../../../components-shared/Header';
import {UIButton} from '../../../components-shared/UIButton';

export const Login = memo(() => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState('');

  const onClickLogin = async () => {
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

  return (
    <>
      <Header title="Cosmocode" />
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.outer}>
            <Text style={styles.pageTitle}>
              Connettiti con sviluppatori e aziende tech di tutto il mondo.
            </Text>
            <Text style={styles.description}>
              Condividi e scopri in tempo reale a quali attività stanno
              lavorando professionisti e realtà IT, ovunque nel mondo.
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.subtitle}>MADE WITH ♥️ BY</Text>
            <Text
              onPress={() => Linking.openURL('https://www.bitrocket.dev')}
              style={styles.link}>
              BITROCKET.DEV
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor="white"
              placeholder="inserisci username"
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="white"
              placeholder="inserisci email"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <UIButton label="login" onPress={() => onClickLogin()} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  outer: {
    textAlign: 'center',
    paddingTop: 70,
  },
  pageTitle: {
    fontSize: 38,
    marginBottom: 0,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    paddingTop: 20,
    color: '#a0b3d7',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    paddingVertical: 10,
    color: '#a0b3d7',
    textAlign: 'center',
  },
  link: {
    fontSize: 10,
    paddingVertical: 10,
    paddingHorizontal: 2,
    color: 'rgb(17, 236, 229)',
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'black',
    height: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'rgb(17, 236, 229)',
    padding: 10,
    color: 'white',
  },
  btn: {
    borderColor: 'rgb(17, 236, 229)',
    backgroundColor: 'rgb(17, 236, 229)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 10,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: '40%',
  },
  text: {
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
