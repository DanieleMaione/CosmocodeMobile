/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {UIAvatar} from '../../components-shared/Avatar';

export interface Props {
  route: any;
  navigation: any;
}

export const GistLikes = memo(({route, navigation}: Props) => {
  const {likes} = route.params;

  const onPressNavigate = (username: string) => {
    navigation.navigate('DeveloperDetail', username);
  };

  return (
    <>
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: 'black',
        }}>
        {likes.map((like: any) => (
          <UIAvatar
            key={like.username}
            srcImage={like.avatar_url}
            alt={like.username}
            title={like.username}
            onPress={() => onPressNavigate(like.username as string)}
          />
        ))}
      </ScrollView>
    </>
  );
});
