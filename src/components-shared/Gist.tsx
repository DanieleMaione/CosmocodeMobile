/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {utilityGetExtension} from '../../getExtention';
import IconHeart from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import {TLogin} from '../../slice/loginSlice';

interface Props {
  gist: any;
  userInfo?: boolean;
}

export const Gist = memo(({gist, userInfo = true}: Props) => {
  const navigation = useNavigation();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const {login} = useSelector((state: TLogin) => state);

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

  const onClickLike = async () => {
    try {
      if (isClicked) {
        await Axios.delete(
          `https://cosmocode-test.herokuapp.com/gists/like/${gist._id}`,
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
          `https://cosmocode-test.herokuapp.com/gists/like/${gist._id}`,
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
    <View style={styles.gistContainer} key={gist._id}>
      {userInfo && (
        <View style={styles.userContainer}>
          <TouchableOpacity
            style={styles.userInfo}
            onPress={() =>
              navigation.navigate('DeveloperDetail', gist.username)
            }>
            <View style={styles.statusContainer}>
              <Image
                source={{uri: `${gist.avatar_url}`}}
                style={styles.image}
              />
              <Text style={styles.username}>{gist.username}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.title}>{gist.title}</Text>
      <View style={styles.fileNameContainer}>
        <TouchableOpacity
          style={styles.fileName}
          onPress={() =>
            navigation.navigate('GistDetail', {
              idGist: gist._id,
            })
          }>
          <Text style={styles.fileName}>{gist.filename}</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'rgb(0, 37, 54)', borderRadius: 10}}>
        <RenderHTML contentWidth={200} source={source} />
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
          {gist.tags.map((tag: string, index: React.Key) => {
            return (
              <View
                style={{
                  borderColor: 'rgb(17, 236, 229)',
                  backgroundColor: 'rgb(17, 236, 229)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
                key={index}>
                <Text>{tag}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  gistContainer: {
    backgroundColor: 'rgb(15, 23, 36)',
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
});
