/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {FC, memo, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {utilityGetExtension} from '../../../../getExtention';
import RenderHtml from 'react-native-render-html';
import {TGist} from '../../../components-shared/types';
import {useNavigation} from '@react-navigation/native';
import IconHeart from 'react-native-vector-icons/AntDesign';
import {TLogin} from '../../../../slice/loginSlice';
import {useSelector} from 'react-redux';
import {Gist} from '../../../components-shared/Gist';
import {UIAvatar} from '../../../components-shared/Avatar';
import {utilityFormatTimestampToDate} from '../../../../utils/formatTimestampToDate';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import {tomorrow} from 'react-syntax-highlighter/styles/prism';

export interface Props {
  route: any;
}

export const GistDetail: FC<Props> = memo(({route}) => {
  const navigation = useNavigation();
  const [userGist, setUserGist] = useState<TGist>();
  const [similarGists, setSimilarGists] = useState<Array<TGist>>([]);
  const [source, setSource] = useState<any>();
  const {idGist} = route.params;
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const {login} = useSelector((state: TLogin) => state);

  //#region ::: fetchGist
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

    const fetchSimilarGist = async () => {
      let queryParams = '';
      userGist?.tags.forEach(
        tag => (queryParams = `${queryParams}&tag=${tag}`),
      );
      const {data} = await Axios.get(
        `https://cosmocode-test.herokuapp.com/search/gists?${queryParams}&page_size=5`,
        {
          headers: {
            Authorization: `Bearer ${login.access_token}`,
            apiKey:
              'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
          },
        },
      );
      const {results: gists} = data;
      setSimilarGists(gists);
    };

    fetchGist();
    fetchSimilarGist();
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

  //#endregion

  if (!userGist) {
    return null;
  }

  return (
    <>
      <ScrollView style={{backgroundColor: '#171c25'}}>
        <UIAvatar
          srcImage={userGist.avatar_url}
          alt={userGist.username}
          width={100}
          height={100}
          title={userGist.username}
          subtitle={''}
          onPress={() =>
            navigation.navigate('DeveloperDetail', userGist.username)
          }
        />

        <Text style={styles.title}>{userGist.title}</Text>
        <Text style={styles.subtitle}>
          {`creato il: ${utilityFormatTimestampToDate(userGist.createdAt)}`}
        </Text>
        <View
          style={{
            backgroundColor: 'rgb(15, 23, 36)',
            padding: 10,
            minHeight: 170,
            justifyContent: 'space-between',
          }}>
          <SyntaxHighlighter
            language={userGist.language}
            style={tomorrow}
            highlighter={'prism'}>
            {userGist.raw}
          </SyntaxHighlighter>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <View>
              <IconHeart
                onPress={() => onClickLike()}
                name={isClicked ? 'heart' : 'hearto'}
                size={30}
                color={isClicked ? '#4e57ef' : 'white'}
              />
              {userGist.likes.length > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text style={{color: 'white', marginHorizontal: 5}}>
                    Piace a
                  </Text>
                  <Image
                    style={{width: 25, height: 25, borderRadius: 100}}
                    source={{uri: userGist.likes[0].avatar_url}}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      maxWidth: 140,
                      color: 'white',
                      marginHorizontal: 5,
                    }}>
                    {userGist.likes[0].username}
                  </Text>
                  <Text style={{color: 'white', marginHorizontal: 5}}>
                    e altri
                  </Text>
                </View>
              )}
            </View>

            <View style={{flexDirection: 'row'}}>
              {userGist.tags.map((tag: string, index: React.Key) => {
                return (
                  <View
                    style={{
                      height: 30,
                      borderColor: '#4e57ef',
                      backgroundColor: '#4e57ef',
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
        <Text
          style={{
            color: '#4e57ef',
            fontSize: 18,
            fontWeight: '900',
            marginVertical: 50,
          }}>
          Post che potrebbero interessarti
        </Text>
        {similarGists.map(gist => (
          <Gist key={gist._id} gist={gist} />
        ))}
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 25,
    color: '#a0b3d7',
  },
  subtitle: {
    fontSize: 15,
    marginVertical: 5,
    color: '#a0b3d7',
    textAlign: 'right',
  },
});
