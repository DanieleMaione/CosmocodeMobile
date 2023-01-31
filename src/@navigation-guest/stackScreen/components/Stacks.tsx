/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';

import Axios from 'axios';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {Header} from '../../../components-shared/Header';
import {useSelector} from 'react-redux';
import {TLogin} from '../../../../slice/loginSlice';

export type TStack = {
  name: string;
};

export interface Props {
  navigation: any;
}

export const Stacks: FC<Props> = ({navigation}) => {
  const [stacks, setStacks] = useState<Array<any>>([]);
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
      <SafeAreaView>
        {/* {stacks.length > 0 && ( */}
        {/* <View style={styles.container}> */}
        <FlatList
          style={{backgroundColor: '#171c25', height: '100%'}}
          data={stacks}
          numColumns={3}
          renderItem={stack => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#1b212c',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 15,
                }}
                onPress={() => navigation.navigate('StackDetail', {stack})}>
                <Image
                  style={styles.image}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png',
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  {stack.item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {/* </View> */}
        {/* )} */}
        {/* {login?.username !== '' ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {stacks.length > 0 && stacks[0].name && (
              <View style={styles.container}>
                <FlatList
                  data={stacks}
                  numColumns={3}
                  renderItem={stack => {
                    return (
                      <View>
                        <Text>{stack.name}</Text>
                      </View>
                    );
                  }}
                />
                {stacks.map((stack, index) => {
                  return (
                    <>
                      <View style={styles.card} key={index}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png',
                          }}
                        />
                        <TouchableOpacity
                          style={styles.containerTwo}
                          onPress={() =>
                            navigation.navigate('StackDetail', {stack})
                          }>
                          <Text style={styles.text}>{stack.name}</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                })}
              </View>
            )}
          </ScrollView>
        ) : (
          <Text>non sei loggato</Text>
        )} */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {color: 'white', textAlign: 'left', marginBottom: '2%', marginLeft: 2},
  card: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'rgb(32, 38, 49)',
    position: 'relative',
    marginTop: 10,
    boxShadow: '-1px 6px 10px 1px #00000042',
  },
  scrollView: {backgroundColor: '#171c25'},
  image: {
    width: 60,
    height: 60,
    overflow: 'hidden',
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
