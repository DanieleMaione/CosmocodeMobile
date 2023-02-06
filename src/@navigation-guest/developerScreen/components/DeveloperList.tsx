/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {TUser} from '../../../../slice/userSlice';
import {UIAvatar} from '../../../components-shared/Avatar';
import {Header} from '../../../components-shared/Header';
import {useDevelopers} from '../../../components-shared/useDevelopers';

export interface Props {
  navigation: any;
}
export const DeveloperList: FC<Props> = memo(({navigation}) => {
  const [value, setValue] = useState('');
  const developers = useDevelopers();
  const {user} = useSelector((state: TUser) => state);

  const onPressNavigate = (route: string, parameters?: any) => {
    // @ts-ignore
    navigation.navigate(route, parameters);
  };

  return (
    <>
      <Header title="Developers" firstPage={true} />
      <SafeAreaView
        style={{
          backgroundColor: 'black',
          height: '100%',
        }}>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Cerca uno sviluppatore"
          onChangeText={setValue}
          value={value}
        />
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          data={developers}
          numColumns={1}
          renderItem={developer => {
            const isMyProfile = developer.item.username === user.username;
            const showStack = developer.item.username
              .toLowerCase()
              .includes(value.toLowerCase());

            if (!showStack) {
              return null;
            }
            return (
              <>
                <UIAvatar
                  onPress={() => {
                    isMyProfile
                      ? onPressNavigate('Profile')
                      : onPressNavigate(
                          'DeveloperDetail',
                          developer.item.username,
                        );
                  }}
                  key={developer.item.username}
                  srcImage={developer.item.avatar_url}
                  alt={developer.item.username}
                  title={developer.item.username}
                  subtitle={`Post: ${developer.item.totalGists} - Followers: ${developer.item.totalFollowers}`}
                  isBordered
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
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 14},
  subTitle: {color: '#a0b3d7', fontSize: 12},
  userImg: {
    padding: 50,
    borderRadius: 100,
    margin: 3,
    height: 115,
    width: 115,
  },
  wrapUser: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    borderColor: 'rgb(17, 236, 229)',
    padding: 10,
    color: 'white',
    alignSelf: 'center',
  },
});
