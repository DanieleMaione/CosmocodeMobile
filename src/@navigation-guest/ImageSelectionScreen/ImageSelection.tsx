import * as React from 'react';
import {StyleSheet, SafeAreaView, View, Image, ScrollView} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {Button} from './components/Button';
import {Response} from './components/Response';
import {Title} from './components/Title';

export const includeExtra = true;

export const ImageSelection = () => {
  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = React.useCallback(
    (
      type: string,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
    ) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title>Image Picker</Title>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}) => {
            return (
              <Button key={title} onPress={() => onButtonPress(type, options)}>
                {title}
              </Button>
            );
          })}
        </View>
        <Response>{response}</Response>

        {response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: uri}}
              />
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(15, 23, 36)',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Fai una foto',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Seleziona un immagine',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Fai un video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Seleziona un video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Seleziona un immagine o un video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
