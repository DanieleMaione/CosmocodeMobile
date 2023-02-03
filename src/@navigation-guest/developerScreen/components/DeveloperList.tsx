/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {TUser} from '../../../../slice/userSlice';
import {Header} from '../../../components-shared/Header';
import {useDevelopers} from '../../../components-shared/useDevelopers';

export interface Props {
  navigation: any;
}
export const DeveloperList: FC<Props> = memo(({navigation}) => {
  const [value, setValue] = useState('');
  const developers = useDevelopers();
  const {user} = useSelector((state: TUser) => state);

  return (
    <>
      <Header title="Developers" firstPage={true} />
      <SafeAreaView
        style={{
          backgroundColor: '#171c25',
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
          numColumns={2}
          renderItem={developer => {
            const isMyProfile = developer.item.username === user.username;
            const showStack = developer.item.username
              .toLowerCase()
              .includes(value.toLowerCase());

            if (!showStack) {
              return null;
            }
            return (
              <TouchableOpacity
                style={styles.wrapUser}
                onPress={() => {
                  isMyProfile
                    ? navigation.navigate('Profile')
                    : navigation.navigate(
                        'DeveloperDetail',
                        developer.item.username,
                      );
                }}>
                <View
                  style={{
                    backgroundColor: '#4e57ef',
                    borderRadius: 100,
                    marginVertical: 10,
                  }}>
                  <Image
                    style={styles.userImg}
                    source={{
                      uri: developer.item.avatar_url,
                    }}
                  />
                </View>
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
    borderColor: '#4e57ef',
    padding: 10,
    color: 'white',
    background: 'none',
    alignSelf: 'center',
  },
});
