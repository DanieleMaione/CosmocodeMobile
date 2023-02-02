/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {FC, Fragment, memo, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {utilityGetExtension} from '../../../../getExtention';
import RenderHtml from 'react-native-render-html';
import {TGist} from '../../../components-shared/types';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconHeart from 'react-native-vector-icons/AntDesign';
import {TLogin} from '../../../../slice/loginSlice';
import {useSelector} from 'react-redux';

export interface Props {
  route: any;
}

export const GistDetail: FC<Props> = memo(({route}) => {
  const navigation = useNavigation();
  const [userGist, setUserGist] = useState<TGist>();
  const [source, setSource] = useState<any>();
  const {idGist} = route.params;
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const {login} = useSelector((state: TLogin) => state);

  useEffect(() => {
    const fetchGist = async () => {
      try {
        await Axios.get(
          `https://cosmocode-test.herokuapp.com/gists/${idGist}`,
          {
            headers: {
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        ).then(({data: gist}) => {
          const response = {
            html: `<pre style='color: #a0b3d7'}>
<code
  className={language-${utilityGetExtension(gist.filename)}}
  style={{fontSize: 15}}
>${gist.html}</code>
</pre>`,
          };
          setSource(response);
          setUserGist(gist);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickLike = async () => {
    try {
      if (isClicked) {
        await Axios.delete(
          `https://cosmocode-test.herokuapp.com/gists/like/${idGist}`,
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
          `https://cosmocode-test.herokuapp.com/gists/like/${idGist}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment key={userGist?._id}>
      <ScrollView style={{backgroundColor: 'black'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={() =>
            navigation.navigate('DeveloperDetail', userGist?.username)
          }>
          <Image
            source={{uri: `${userGist?.avatar_url}`}}
            style={{height: 100, width: 100, margin: 10, borderRadius: 100}}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.username}>{userGist?.username}</Text>
            <Text style={styles.title}>{userGist?.title}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'rgb(15, 23, 36)',
            padding: 10,
            minHeight: 190,
            justifyContent: 'space-between',
          }}>
          <View style={{backgroundColor: 'rgb(0, 37, 54)', borderRadius: 10}}>
            {source && <RenderHtml contentWidth={200} source={source} />}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <IconHeart
              onPress={() => onClickLike()}
              name={isClicked ? 'heart' : 'hearto'}
              size={30}
              color={isClicked ? 'rgb(17, 236, 229)' : 'white'}
            />
            <View style={{flexDirection: 'row'}}>
              {userGist?.tags.map((tag: string, index: React.Key) => {
                return (
                  <View
                    style={{
                      borderColor: 'rgb(17, 236, 229)',
                      backgroundColor: 'rgb(17, 236, 229)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 3,
                      borderRadius: 5,
                    }}
                    key={index}>
                    <Text>{tag}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    color: '#a0b3d7',
  },
  userContainer: {
    height: 60,
  },
  username: {
    fontSize: 20,
    color: '#a0b3d7',
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
});
