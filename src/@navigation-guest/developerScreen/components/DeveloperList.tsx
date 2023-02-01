/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native';
import {Header} from '../../../components-shared/Header';
import {useDevelopers} from '../../../components-shared/useDevelopers';

export interface Props {
  navigation: any;
}
export const DeveloperList: FC<Props> = memo(({navigation}) => {
  const developers = useDevelopers();

  return (
    <>
      <Header title="Developers" firstPage={true} />
      <SafeAreaView
        style={{
          backgroundColor: 'black',
        }}>
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          data={developers}
          numColumns={2}
          renderItem={developer => {
            return (
              <TouchableOpacity
                style={styles.wrapUser}
                onPress={() =>
                  navigation.navigate(
                    'DeveloperDetail',
                    developer.item.username,
                  )
                }>
                <View
                  style={{
                    backgroundColor: 'rgb(17, 236, 229)',
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
});
