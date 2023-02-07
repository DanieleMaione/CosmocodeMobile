/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {FC, memo, useEffect, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {TGist} from '../../../components-shared/types';
import {useNavigation} from '@react-navigation/native';
import {TLogin} from '../../../../slice/loginSlice';
import {useSelector} from 'react-redux';
import {Gist} from '../../../components-shared/Gist';
import {UIAvatar} from '../../../components-shared/Avatar';

export interface Props {
  route: any;
}

export const GistDetail: FC<Props> = memo(({route}) => {
  const navigation = useNavigation();
  const [userGist, setUserGist] = useState<TGist>();
  const [similarGists, setSimilarGists] = useState<Array<TGist>>([]);
  const {idGist} = route.params;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            // @ts-ignore
            navigation.navigate('DeveloperDetail', userGist.username)
          }
        />
        <Gist gist={userGist} userInfo={false} />
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 25,
            marginTop: 20,
            marginHorizontal: 5,
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
