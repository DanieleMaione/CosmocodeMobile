/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import Axios from 'axios';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Header} from '../../../components-shared/Header';
import {useSelector} from 'react-redux';
import {TLogin} from '../../../../slice/loginSlice';

export type TStack = {
  name: string;
};

export default function Stacks() {
  const [stacks, setStacks] = useState<Array<TStack>>([]);
  // @ts-ignore
  const {login} = useSelector((state: TLogin) => state);
  useEffect(() => {
    const getStacks = async () => {
      const response = await Axios.get('/stacks', {
        baseURL: 'https://cosmocode-test.herokuapp.com',
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      });
      setStacks(response.data);
    };

    getStacks();
  }, [login]);

  return (
    <>
      <Header title="Stacks" firstPage={true} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#463f3f'}}>
        {login?.username !== '' ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {stacks.length > 0 && (
              <View style={styles.container}>
                {stacks.map((stack, index) => {
                  return (
                    <View key={index} style={styles.containerTwo}>
                      <Text style={styles.text}>{stack.name}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
        ) : (
          <Text>non sei loggato</Text>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {color: 'white', textAlign: 'left', marginBottom: '2%', marginLeft: 2},
  card: {
    width: '90%',
    borderRadius: 5,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: 'rgb(32, 38, 49)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: 10,
    boxShadow: '-1px 6px 10px 1px #00000042',
  },
  scrollView: {backgroundColor: '#171c25'},
  userImg: {
    marginTop: 10,
    marginBottom: 10,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerTwo: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTwo: {
    marginTop: 2,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
});
