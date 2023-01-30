import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {Header} from './Header';

export type TDevelopers = {
  username: string;
  totalGists: string;
  avatar_url: string;
};

export default function Developers() {
  const [developers, setDevelopers] = useState<Array<TDevelopers>>([]);
  useEffect(() => {
    const getDevelopers = async () => {
      const response = await Axios.get('/users', {
        baseURL: 'https://cosmocode-test.herokuapp.com',
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      });
      setDevelopers(response.data);
    };

    getDevelopers();
  }, []);
  return (
    <>
      <Header title="Developers" firstPage={true} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#463f3f'}}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {developers.length > 0 && (
            <View style={styles.container}>
              {developers.map((dev, index) => {
                return (
                  <View key={index} style={styles.containerTwo}>
                    <Image
                      style={{height: 150, width: 150, borderRadius: 20}}
                      source={{uri: dev.avatar_url}}
                    />

                    <Text style={styles.textTwo}>
                      {dev.username} {dev.totalGists}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
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
