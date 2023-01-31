/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {FC} from 'react';
import {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {utilityGetExtension} from '../../../../getExtention';
import RenderHtml from 'react-native-render-html';
import {Header} from '../../../components-shared/Header';

export interface TGist {
  _id?: string;
  idGithub: string;
  avatar_url: string;
  username: string;
  tags: Array<string>;
  filename: string;
  type: string;
  language: string;
  raw: string;
  size: number;
  title: string;
  description: string;
  private: boolean;
  createdAt: string;
  lastUpdate: Date;
  nft: string | null;
  verified: boolean;
  html: string;
  likes: Array<{avatar_url: string; username: string}>;
}

export interface Props {
  navigation: any;
}

export const HomeScreen: FC<Props> = ({navigation}) => {
  const [gistList, setGistList] = useState<Array<TGist>>([]);

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const {data: gists} = await axios.get(
          'https://cosmocode-test.herokuapp.com/gists/popular',
          {
            headers: {
              apiKey:
                'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
            },
          },
        );
        setGistList(gists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGists();
  }, []);

  return (
    <>
      <Header title="Home" firstPage={true} />
      <ScrollView style={{backgroundColor: '#171c25'}}>
        <View style={styles.outer}>
          <Text style={styles.pageTitle}>
            Connettiti con sviluppatori e aziende tech di tutto il mondo.
          </Text>
          <Text style={styles.description}>
            Condividi e scopri in tempo reale a quali attività stanno lavorando
            professionisti e realtà IT, ovunque nel mondo.
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
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
              <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                  <View style={styles.statusContainer}>
                    <Image
                      source={{uri: `${gist.avatar_url}`}}
                      style={styles.image}
                    />
                    <Text style={styles.username}>{gist.username}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.title}>{gist.title}</Text>
              <View style={styles.fileNameContainer}>
                <TouchableOpacity
                  style={styles.fileName}
                  onPress={() =>
                    navigation.navigate('Gist Detail', {
                      idGist: gist._id,
                    })
                  }>
                  <Text style={styles.fileName}>{gist.filename}</Text>
                </TouchableOpacity>
              </View>
              <RenderHtml contentWidth={200} source={source} />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  gistContainer: {
    backgroundColor: '#1b212c',
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
  btn: {
    width: '50%',
    borderColor: '#4f57ef',
    backgroundColor: '#4f57ef',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
});
