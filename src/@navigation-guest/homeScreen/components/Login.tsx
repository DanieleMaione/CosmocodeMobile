import Axios from 'axios';
import React, {memo, useState} from 'react';
import {View, ScrollView, SafeAreaView, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {createLogin} from '../../../../slice/loginSlice';
import {UIButton} from '../../../components-shared/UIButton';

export const Login = memo(() => {
  const dispatch = useDispatch();
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const onClickLogin = async () => {
    const response = await Axios.post(
      'https://cosmocode-test.herokuapp.com/auth/signin',
      {username: userName, email: email},
      {
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      },
    );
    const user = response?.config?.data?.username;
    dispatch(
      createLogin({
        id: Math.random() * 100,
        // @ts-ignore
        username: user,
        email: response?.config?.data?.email,
      }),
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            placeholder="inserisci username"
            onChangeText={setUsername}
            value={userName}
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
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171c25',
    height: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
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
