import React, {FC, memo} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
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
                  navigation.navigate(
                    'DeveloperDetail',
                    developer.item.username,
                  )
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
