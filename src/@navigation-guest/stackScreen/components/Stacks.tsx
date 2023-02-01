/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useEffect, useState} from 'react';

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
import {SvgUri} from 'react-native-svg';

export type TStack = {
  name: string;
};

export interface Props {
  navigation: any;
}

export const Stacks: FC<Props> = memo(({navigation}) => {
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
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          style={{backgroundColor: '#171c25', height: '100%'}}
          data={stacks}
          numColumns={3}
          renderItem={stack => {
            return (
              <TouchableOpacity
                style={styles.wrapStack}
                onPress={() => navigation.navigate('StackDetail', {stack})}>
                {stack.item.url.includes('.svg') ? (
                  <SvgUri width="70" height="70" uri={stack.item.url} />
                ) : (
                  <Image
                    style={styles.image}
                    source={{
                      uri: stack.item.url,
                    }}
                  />
                )}

                <Text style={styles.text}>{stack.item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  wrapStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: 'white', fontSize: 14},
  image: {
    borderRadius: 100,
    marginVertical: 10,
    height: 70,
    width: 70,
  },
});
