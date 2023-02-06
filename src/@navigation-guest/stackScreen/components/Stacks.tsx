/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useEffect, useState} from 'react';

import Axios from 'axios';
import {SafeAreaView, FlatList, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Header} from '../../../components-shared/Header';
import {TLogin} from '../../../../slice/loginSlice';
import {UIAvatar} from '../../../components-shared/Avatar';
import {useSelector} from 'react-redux';

export type TStack = {
  name: string;
};

export interface Props {
  navigation: any;
}

export const Stacks: FC<Props> = memo(({navigation}) => {
  const [stacks, setStacks] = useState<Array<any>>([]);
  const [value, setValue] = useState('');
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
      <SafeAreaView
        style={{
          backgroundColor: '#171c25',
          height: '100%',
        }}>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            placeholder="Cerca uno stack"
            onChangeText={setValue}
            value={value}
          />
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          data={stacks}
          numColumns={1}
          renderItem={stack => {
            const showStack = stack.item.name
              .toLowerCase()
              .includes(value.toLowerCase());

            if (!showStack) {
              return null;
            }
            return (
              <>
                <UIAvatar
                  onPress={() => navigation.navigate('StackDetail', {stack})}
                  key={stack.item.url}
                  srcImage={stack.item.url}
                  alt={stack.item.name}
                  title={stack.item.name}
                  subtitle={`Gists: ${stack.item.totalGists} - Users: ${stack.item.totalUsers}`}
                />
              </>
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
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    borderColor: '#4e57ef',
    padding: 10,
    color: 'white',
  },
});
