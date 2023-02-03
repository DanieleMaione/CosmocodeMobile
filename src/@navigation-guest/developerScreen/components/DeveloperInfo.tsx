/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {UIAvatar} from '../../../components-shared/Avatar';
import {UITabs} from '../../../components-shared/Tabs';

export interface Props {
  route: any;
  navigation: any;
}

export const DeveloperInfo = memo(({route, navigation}: Props) => {
  const {tab, followerList, followingList} = route.params;

  const [selected, setSelected] = useState<string>(tab);

  const onPressSelect = (newSelected: string) => setSelected(newSelected);

  const onPressNavigate = (username: string) => {
    navigation.navigate('DeveloperDetail', username);
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
          followerList.map((follow: any) => (
            <UIAvatar
              key={follow.username}
              srcImage={follow.avatar_url}
              alt={follow.username}
              title={follow.username}
              onPress={() => onPressNavigate(follow.username as string)}
            />
          ))}
        {selected === 'followings' &&
          followingList.map((follow: any) => (
            <UIAvatar
              key={follow.username}
              srcImage={follow.avatar_url}
              alt={follow.username}
              title={follow.username}
              onPress={() => onPressNavigate(follow.username as string)}
            />
          ))}
      </ScrollView>
    </>
  );
});
