/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import Axios from 'axios';
import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {TUser} from '../../../../slice/userSlice';
import {Gist} from '../../../components-shared/Gist';
import {Header} from '../../../components-shared/Header';
import {TGist} from '../../../components-shared/types';
import Contacts from 'react-native-contacts';

export interface Props {
  navigation: any;
}

export const Profile: FC<Props> = memo(({navigation}) => {
  const {user} = useSelector((state: TUser) => state);
  const username = user.username;
  const [gistList, setGistList] = useState<Array<TGist>>([]);
  const [userData, setUserData] = useState<{
    username: string;
    avatar_url: string;
    about: string;
    tags: Array<string>;
    github_url: string | null;
    total_gists: number;
    following: Array<{username: string; avatar_url: string}>;
    followers: Array<{username: string; avatar_url: string}>;
    isRegistered: boolean;
    registrationNumber: number | null;
    sponsor?: {avatar_url: string; username: string};
  }>();
  const [followingList, setFollowingList] = useState(userData?.following || []);
  const [followerList, setFollowerList] = useState(userData?.followers || []);

  useFocusEffect(
    useCallback(() => {
      const handleFollow = async () => {
        const follower = await Axios.get(
          `https://cosmocode-test.herokuapp.com/users/${username}/followers`,
          {
            headers: {
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        );
        const following = await Axios.get(
          `https://cosmocode-test.herokuapp.com/users/${username}/following`,
          {
            headers: {
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        );
        setFollowingList(following.data);
        setFollowerList(follower.data);
      };
      handleFollow();
    }, [username]),
  );

  useEffect(() => {
    const getGist = async () => {
      const {data: gists} = await Axios.get(
        `/users/${username}/gists?page_size=5&page=0`,
        {
          baseURL: 'https://cosmocode-test.herokuapp.com',
          headers: {
            apiKey:
              'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
          },
        },
      );
      setGistList(gists);
    };
    const getUser = async () => {
      const {data: actualUser} = await Axios.get(`/users/${username}`, {
        baseURL: 'https://cosmocode-test.herokuapp.com',
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      });
      setUserData(actualUser);
    };

    getGist();
    getUser();
    Contacts.getAll().then(contacts => {
      //funzione fatta solo per esercizi sui contatti
      return contacts;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressNavigate = (tab: string) => {
    navigation.navigate('DeveloperInfo', {tab, followerList, followingList});
  };

  return (
    <>
      <Header title="Profile" firstPage={true} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#171c25',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={{height: 100, width: 100, margin: 10, borderRadius: 100}}
            source={{uri: user?.avatar_url}}
          />
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'flex-end',
              minWidth: 250,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {username}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingVertical: 15,
              }}>
              <View style={styles.followers}>
                <Text style={styles.genericText}>Post</Text>
                <Text style={styles.publicNumber}>{userData?.total_gists}</Text>
              </View>
              <TouchableOpacity
                onPress={() => onPressNavigate('followers')}
                style={styles.followers}>
                <Text style={styles.genericText}>Followers</Text>
                <Text style={styles.publicNumber}>{followerList.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPressNavigate('followings')}
                style={styles.followers}>
                <Text style={styles.genericText}>Seguiti</Text>
                <Text style={styles.publicNumber}>{followingList.length}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {userData && userData.total_gists <= 0 ? (
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginTop: 25,
            }}>
            Non ci sono post :c
          </Text>
        ) : (
          <View
            style={{
              backgroundColor: '#171c25',
              marginTop: 40,
              marginHorizontal: 5,
            }}>
            {gistList.map((gist: TGist, index) => {
              return <Gist gist={gist} userInfo={false} key={index} />;
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  gistContainer: {
    backgroundColor: '#1b2123',
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: 'relative',
    borderRadius: 10,
    boxShadow: '-1 6 10 1 #00000042',
    marginBottom: 40,
  },
  followers: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
  },
  publicNumber: {
    fontSize: 15,
    color: 'white',
  },
  genericText: {
    fontSize: 15,
    color: 'white',
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 3,
    color: '#a0b3d7',
  },
  fileNameContainer: {
    alignItems: 'flex-end',
  },
  fileName: {
    opacity: 0.5,
  },
  username: {
    fontSize: 20,
    marginLeft: 20,
    color: '#a0b3d7',
  },
});
