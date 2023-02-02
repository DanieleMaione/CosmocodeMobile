/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {memo} from 'react';
import {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Linking,
  TextInput,
} from 'react-native';
import {Header} from '../../../components-shared/Header';
import {TGist} from '../../../components-shared/types';
import {Gist} from '../../../components-shared/Gist';
import {useSelector} from 'react-redux';
import {TLogin} from '../../../../slice/loginSlice';

export const HomeScreen = memo(() => {
  const [gistList, setGistList] = useState<Array<TGist>>([]);
  const {login} = useSelector((state: TLogin) => state);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const {data: gists} = await axios.get(
          'https://cosmocode-test.herokuapp.com/gists/feed?page_size=6&page=0',
          {
            headers: {
              Authorization: `Bearer ${login.access_token}`,
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        );
        setGistList(gists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGists();
  }, [login.access_token]);

  return (
    <>
      <Header title="Home" firstPage={true} />
      <ScrollView style={{backgroundColor: 'black'}}>
        <View style={styles.outer}>
          <Text style={styles.pageTitle}>
            Connettiti con sviluppatori e aziende tech di tutto il mondo.
          </Text>
          <Text style={styles.description}>
            Condividi e scopri in tempo reale a quali attività stanno lavorando
            professionisti e realtà IT, ovunque nel mondo.
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
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Cerca un post"
          onChangeText={setValue}
          value={value}
        />
        {gistList.map((gist: TGist, index) => {
          const showStack = gist.title
            .toLowerCase()
            .includes(value.toLowerCase());

          if (!showStack) {
            return null;
          }
          return <Gist gist={gist} key={index} />;
        })}
      </ScrollView>
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
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    borderColor: 'rgb(17, 236, 229)',
    padding: 10,
    color: 'white',
    background: 'none',
    alignSelf: 'center',
  },
});
