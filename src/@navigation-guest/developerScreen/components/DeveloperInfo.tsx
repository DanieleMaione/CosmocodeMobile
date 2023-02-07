/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {TUser} from '../../../../slice/userSlice';
import {UIAvatar} from '../../../components-shared/Avatar';
import {UITabs} from '../../../components-shared/Tabs';
import {TFollow} from '../../../components-shared/types';

export interface Props {
  route: any;
  navigation: any;
}

export const DeveloperInfo = memo(({route, navigation}: Props) => {
  const {tab, followerList, followingList} = route.params;

  const [selected, setSelected] = useState<string>(tab);

  const onPressSelect = (newSelected: string) => setSelected(newSelected);
  const {user} = useSelector((state: TUser) => state);

  const onPressNavigate = (username: string) => {
    if (username === user.username) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DeveloperDetail', username);
    }
  };

  return (
    <>
      <UITabs
        onPress={onPressSelect}
        selected={selected}
        options={[{name: 'followers'}, {name: 'followings'}]}
      />
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: '#171c25',
        }}>
        {selected === 'followers' &&
          followerList.map((follow: TFollow) => (
            <UIAvatar
              key={follow.username}
              srcImage={follow.avatar_url}
              alt={follow.username}
              title={follow.username}
              onPress={() => onPressNavigate(follow.username)}
            />
          ))}
        {selected === 'followings' &&
          followingList.map((follow: TFollow) => (
            <UIAvatar
              key={follow.username}
              srcImage={follow.avatar_url}
              alt={follow.username}
              title={follow.username}
              onPress={() => onPressNavigate(follow.username)}
            />
          ))}
      </ScrollView>
    </>
  );
});
