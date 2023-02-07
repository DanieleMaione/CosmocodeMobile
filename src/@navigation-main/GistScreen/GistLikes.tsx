/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {memo, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {TLogin} from '../../../slice/loginSlice';
import {TUser} from '../../../slice/userSlice';
import {UIAvatar} from '../../components-shared/Avatar';

export interface Props {
  route: any;
  navigation: any;
}

export const GistLikes = memo(({route, navigation}: Props) => {
  const {likes, idPost} = route.params;
  const {user} = useSelector((state: TUser) => state);
  const [userList, setUserList] = useState(likes);
  const {login} = useSelector((state: TLogin) => state);

  const onPressNavigate = (username: string) => {
    if (username === user.username) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DeveloperDetail', username);
    }
  };
  useEffect(() => {
    const fetchPostLikes = async () => {
      const {data: newLikes} = await Axios.get(
        `https://cosmocode-test.herokuapp.com/gists/like/detail/${idPost}`,
        {
          headers: {
            Authorization: `Bearer ${login.access_token}`,
            apiKey:
              'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
          },
        },
      );
      setUserList(newLikes);
    };
    fetchPostLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPost]);

  return (
    <>
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: '#171c25',
        }}>
        {userList.map((user: any) => (
          <UIAvatar
            key={user.username}
            srcImage={user.avatar_url}
            alt={user.username}
            title={user.username}
            onPress={() => onPressNavigate(user.username)}
          />
        ))}
      </ScrollView>
    </>
  );
});
