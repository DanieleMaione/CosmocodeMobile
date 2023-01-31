/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {utilityGetExtension} from '../../../../getExtention';
import {TGist} from '../../homeScreen/components/HomeScreen';

export interface Props {
  route: any;
}

export const StackDetail: FC<Props> = ({route}) => {
  const {stack} = route.params;
  const [gistList, setGistList] = useState<Array<TGist>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const {data: gists} = await axios
          .get(
            `https://cosmocode-test.herokuapp.com/search/gists?page=0&tag=${stack.item.name}&page_size=5`,
            {
              headers: {
                apiKey:
                  'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
              },
            },
          )
          .finally(() => setLoading(false));
        setGistList(gists.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGists();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gistList.length, loading, stack.item.name]);

  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginLeft: 10,
          marginBottom: -15,
        }}>
        <Image
          source={{
            uri: stack.item.url,
          }}
          style={[styles.image, {marginRight: 10}]}
        />

        <Text style={styles.text}>{stack.item.name}</Text>
      </View>
      <Text style={styles.subTitle}>Trovati {stack.item.total} gist</Text>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : gistList.length > 0 ? (
        gistList.map((gist: TGist) => {
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
                <View style={styles.fileName}>
                  <Text>{gist.filename}</Text>
                </View>
              </View>
              <RenderHTML contentWidth={200} source={source} />
            </View>
          );
        })
      ) : (
        <View style={styles.gistContainer}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            non ci sono gist per questo tags
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {backgroundColor: '#171c25'},
  text: {color: 'white', fontSize: 36, fontWeight: 'bold'},
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
  },
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
  subTitle: {
    fontSize: 16,
    marginBottom: 5,
    marginHorizontal: 75,
    color: '#a0b3d7',
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
});
