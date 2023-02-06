/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import IconHeart from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import {TLogin} from '../../slice/loginSlice';
import {TGist} from './types';
import {TUser} from '../../slice/userSlice';
// @ts-ignore
import SyntaxHighlighter from 'react-native-syntax-highlighter';
// @ts-ignore
import {tomorrow} from 'react-syntax-highlighter/styles/prism';

interface Props {
  gist?: TGist;
  userInfo?: boolean;
}

export const Gist = memo(({gist, userInfo = true}: Props) => {
  const navigation = useNavigation();
  const {login} = useSelector((state: TLogin) => state);
  const {user} = useSelector((state: TUser) => state);
  const [isClicked, setIsClicked] = useState<boolean>(
    !!gist?.likes.find(
      (like: {avatar_url: string; username: string}) =>
        user.username === like.username,
    ),
  );
  const isMyProfile = gist?.username === user.username;
  const [userList, setUserList] = useState(gist?.likes);

  const onClickLike = async () => {
    try {
      if (isClicked) {
        await Axios.delete(
          `https://cosmocode-test.herokuapp.com/gists/like/${gist?._id}`,
          {
            headers: {
              Authorization: `Bearer ${login.access_token}`,
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        );
        setIsClicked(false);
      } else {
        await Axios.post(
          `https://cosmocode-test.herokuapp.com/gists/like/${gist?._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${login.access_token}`,
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        );
        setIsClicked(true);
      }
      const {data: newLikes} = await Axios.get(
        `https://cosmocode-test.herokuapp.com/gists/like/detail/${gist?._id}`,
        {
          headers: {
            Authorization: `Bearer ${login.access_token}`,
            apiKey:
              'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
          },
        },
      );
      setUserList(newLikes);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressNavigate = (route: string, parameters?: any) => {
    // @ts-ignore
    navigation.navigate(route, parameters);
  };

  return (
    <>
      {gist ? (
        <View style={styles.gistContainer} key={gist?._id}>
          {userInfo && (
            <View style={styles.userContainer}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() => {
                  isMyProfile
                    ? onPressNavigate('Profile')
                    : onPressNavigate('DeveloperDetail', gist.username);
                }}>
                <View style={styles.statusContainer}>
                  <Image
                    source={{uri: `${gist?.avatar_url}`}}
                    style={styles.image}
                  />
                  <Text style={styles.username}>{gist?.username}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.title}>{gist?.title}</Text>
          <View style={styles.fileNameContainer}>
            <TouchableOpacity
              style={styles.fileName}
              onPress={() =>
                onPressNavigate('GistDetail', {
                  idGist: gist?._id,
                })
              }>
              <Text style={styles.fileName}>{gist?.filename}</Text>
            </TouchableOpacity>
          </View>
          <View style={{maxHeight: 450}}>
            <SyntaxHighlighter
              language={gist.language}
              style={tomorrow}
              highlighter={'prism'}>
              {gist.raw}
            </SyntaxHighlighter>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            <IconHeart
              onPress={() => onClickLike()}
              name={isClicked ? 'heart' : 'hearto'}
              size={30}
              color={isClicked ? '#4e57ef' : 'white'}
            />
            <View style={{maxWidth: 140}}>
              <ScrollView horizontal style={{flexDirection: 'row'}}>
                {gist?.tags.map((tag: string, index: React.Key) => {
                  return (
                    <View
                      style={{
                        height: 30,
                        borderColor: '#4e57ef',
                        backgroundColor: '#4e57ef',
                        borderWidth: 3,
                        borderRadius: 5,
                        marginHorizontal: 5,
                      }}
                      key={index}>
                      <Text style={{color: 'white'}}>{tag}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          {userList && userList?.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', marginHorizontal: 5}}>Piace a</Text>
              <TouchableOpacity
                onPress={() =>
                  onPressNavigate('DeveloperDetail', userList[0]?.username)
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 25, height: 25, borderRadius: 100}}
                  source={{uri: userList[0]?.avatar_url}}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    maxWidth: userList.length > 1 ? 140 : '100%',
                    color: 'white',
                    marginHorizontal: 5,
                  }}>
                  {userList[0]?.username}
                </Text>
              </TouchableOpacity>
              {userList.length > 1 && (
                <TouchableOpacity
                  onPress={() =>
                    onPressNavigate('GistLikes', {
                      likes: userList,
                      idPost: gist._id,
                    })
                  }>
                  <Text style={{color: 'white', marginHorizontal: 5}}>
                    e altri
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.title}>E' il tuo primo gist?</Text>
          <View style={{backgroundColor: 'rgb(0, 37, 54)', borderRadius: 10}}>
            <Text style={styles.title}>Comincia a seguire qualcuno </Text>
          </View>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  gistContainer: {
    backgroundColor: 'rgb(15, 23, 36)',
    paddingHorizontal: 15,
    paddingVertical: 30,
    position: 'relative',
    borderRadius: 5,
    boxShadow: '-1 6 10 1 #00000042',
    marginBottom: 30,
  },
  userContainer: {
    height: 60,
  },
  userInfo: {
    fontSize: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    width: '100%',
  },
  statusContainer: {
    position: 'relative',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
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
    opacity: 0.8,
    color: '#a0b3d7',
  },
  username: {
    fontSize: 20,
    marginLeft: 20,
    color: '#a0b3d7',
  },
  outer: {
    textAlign: 'center',
    paddingTop: 70,
  },
  pageTitle: {
    fontSize: 38,
    marginBottom: 0,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    paddingTop: 20,
    color: '#a0b3d7',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
