import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {utilityGetExtension} from '../../getExtention';

interface Props {
  gist: any;
  userInfo?: boolean;
}

export const Gist = memo(({gist, userInfo = true}: Props) => {
  const navigation = useNavigation();
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
