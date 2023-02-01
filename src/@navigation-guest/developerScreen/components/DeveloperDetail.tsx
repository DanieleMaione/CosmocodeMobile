import Axios from 'axios';
import React, {FC, memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {utilityGetExtension} from '../../../../getExtention';
import {TGist} from '../../../components-shared/types';

export interface Props {
  route: any;
}

export const DeveloperDetail: FC<Props> = memo(({route}) => {
  const {params} = route;

  const [gistList, setGistList] = useState<Array<TGist>>([]);
  const [user, setUser] = useState<{
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

  useEffect(() => {
    const getGist = async () => {
      const {data: gists} = await Axios.get(
        `/users/${params}/gists?page_size=5&page=0`,
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
      const {data: user} = await Axios.get(`/users/${params}`, {
        baseURL: 'https://cosmocode-test.herokuapp.com',
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      });
      setUser(user);
    };

    getGist();
    getUser();
  }, [params]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#171c25'}}>
      <View
        style={{
          width: '100%',
          padding: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Image
          style={{height: 100, width: 100, borderRadius: 100}}
          source={{uri: user?.avatar_url}}
        />
        <View style={{gap: 15}}>
          <Text style={{color: 'white', fontSize: 17.5, fontWeight: 'bold'}}>
            {params}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View style={styles.followers}>
              <Text style={styles.genericText}>Post</Text>
              <Text style={styles.publicNumber}>{user?.total_gists}</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.genericText}>Follower</Text>
              <Text style={styles.publicNumber}>{user?.following.length}</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.genericText}>Seguiti</Text>
              <Text style={styles.publicNumber}>{user?.followers.length}</Text>
            </View>
          </View>
        </View>
      </View>

      {user && user.total_gists <= 0 ? (
        <Text
          style={{
            width: '100%',
            fontSize: 15,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          Non ci sono post :c
        </Text>
      ) : (
        <ScrollView style={{backgroundColor: '#171c25'}}>
          {gistList.map((gist: TGist) => {
            const source = {
              html: `
            <pre style='color: #a0b3d7'}>
              <code
                className={language-${utilityGetExtension(gist.filename)}}
                style={{fontSize: 15}}
              >${gist.html}</code>
            </pre>
          `,
            };

            return (
              <View style={styles.gistContainer} key={gist._id}>
                <Text style={styles.title}>{gist.title}</Text>
                <View style={styles.fileNameContainer}>
                  <View style={styles.fileName}>
                    <Text>{gist.filename}</Text>
                  </View>
                </View>
                <RenderHTML contentWidth={200} source={source} />
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
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
