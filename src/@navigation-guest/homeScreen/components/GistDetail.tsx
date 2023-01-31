/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {FC, memo, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {utilityGetExtension} from '../../../../getExtention';
import {Header} from '../../../components-shared/Header';
import {TGist} from './HomeScreen';
import RenderHtml from 'react-native-render-html';

export interface Props {
  route: any;
}

export const GistDetail: FC<Props> = memo(({route}) => {
  const [userGist, setUserGist] = useState<TGist>();
  const [source, setSource] = useState<any>();
  const {idGist} = route.params;

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
            html: `
        <pre style='color: #a0b3d7'}>
          <code
            className={language-${utilityGetExtension(gist.filename)}}
            style={{fontSize: 15}}
          >${gist.html}</code>
        </pre>
      `,
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

  return (
    <>
      <Header title={userGist?.filename} firstPage={true} />
      <ScrollView style={{backgroundColor: '#171c25'}}>
        <View style={styles.userGistContainer} key={userGist?._id}>
          <View style={styles.userContainer}>
            <View style={styles.userInfo}>
              <View style={styles.statusContainer}>
                <Image
                  source={{uri: `${userGist?.avatar_url}`}}
                  style={styles.image}
                />
                <Text style={styles.username}>{userGist?.username}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>{userGist?.title}</Text>
          <View style={styles.fileNameContainer}>
            <View style={styles.fileName}>
              <Text style={styles.fileName}>{userGist?.filename}</Text>
            </View>
          </View>
          {source && <RenderHtml contentWidth={200} source={source} />}
        </View>
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  userGistContainer: {
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
