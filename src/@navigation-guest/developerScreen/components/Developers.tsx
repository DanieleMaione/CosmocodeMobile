import Axios from 'axios';
import React, {FC, memo, useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native';
import {Header} from '../../../components-shared/Header';

export type TDeveloper = {
  username: string;
  totalGists: string;
  avatar_url: string;
};
export interface Props {
  navigation: any;
}
export const Developers: FC<Props> = memo(({navigation}) => {
  const [developers, setDevelopers] = useState<Array<TDeveloper>>([]);

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
      <SafeAreaView>
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          style={{
            backgroundColor: '#171c25',
            height: '100%',
          }}
          data={developers}
          numColumns={2}
          renderItem={developer => {
            return (
              <TouchableOpacity
                style={styles.wrapUser}
                onPress={() =>
                  navigation.navigate('DeveloperDetail', {developer})
                }>
                <Image
                  style={styles.userImg}
                  source={{
                    uri: developer.item.avatar_url,
                  }}
                />
                <Text style={styles.subTitle}>
                  {developer.item.totalGists} Gist
                </Text>
                <Text style={styles.text}>{developer.item.username}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 12},
  subTitle: {color: '#a0b3d7', fontSize: 11},
  userImg: {
    padding: 50,
    borderRadius: 100,
    marginVertical: 10,
    height: 125,
    width: 125,
  },
  wrapUser: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
