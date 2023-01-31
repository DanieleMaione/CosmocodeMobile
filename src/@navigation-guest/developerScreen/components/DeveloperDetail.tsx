import {useRoute} from '@react-navigation/native';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
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
import {TGist} from '../../homeScreen/components/HomeScreen';

export const DeveloperDetail = () => {
  const [gistList, setGistList] = useState<Array<TGist>>([]);
  const [user, setUser] = useState<{
    username: string;
    avatar_url: string;
    about: string;
    tags: Array<string>;
    github_url: string | null;
    total_gists: number;
    following: Array<{username: string; avatar_url: string}>;
    isRegistered: boolean;
    registrationNumber: number | null;
    sponsor?: {avatar_url: string; username: string};
  }>();
  const route = useRoute();
  const {dev} = route.params;

  useEffect(() => {
    const getGist = async () => {
      const {data: gists} = await Axios.get(
        `/users/${dev.username}/gists?page_size=5&page=1`,
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
      const {data: user} = await Axios.get(`/users/${dev.username}`, {
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
  }, []);
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
          source={{uri: dev.avatar_url}}
        />
        <View style={{gap: 15}}>
          <Text style={{color: 'white', fontSize: 17.5, fontWeight: 'bold'}}>
            {dev.username}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View style={styles.followers}>
              <Text style={styles.genericText}>Post</Text>
              <Text style={styles.publicNumber}>{dev.totalGists}</Text>
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

      {dev.totalGists <= 0 ? (
        dev.username !== 'cristianpalermo-bitrocketdev' ? (
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            Non ci sono post :C
          </Text>
        ) : (
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            Cristian è gay
          </Text>
        )
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
};

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
