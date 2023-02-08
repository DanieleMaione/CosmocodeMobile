import * as React from 'react';
import {StyleSheet, SafeAreaView, View, Image, ScrollView} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {Response} from './components/Response';
import {Title} from './components/Title';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';
import {UIButton} from '../../components-shared/UIButton';

export const includeExtra = true;

export const ImageSelection = () => {
  var newPerson = {
    emailAddresses: [
      {
        label: 'work',
        email: 'c.palermo@bitrocket.dev',
      },
    ],
    phoneNumbers: [
      {
        label: 'mobile',
        number: '3339821302',
      },
    ],
    familyName: 'Palermo',
    givenName: 'Cristian',
  };
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

  const onClickDelete = () => {
    if (Platform.OS === 'ios') {
      Contacts.getContactsByEmailAddress(
        newPerson.emailAddresses[0].email,
      ).then(contact => Contacts.deleteContact(contact[0]));
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then(res => {
          console.log('Permission: ', res);
          Contacts.getContactsByEmailAddress(
            newPerson.emailAddresses[0].email,
          ).then(contact => Contacts.deleteContact(contact[0]));
        })
        .catch(error => {
          console.error('Permission error: ', error);
        });
    }
  };
  const onClickAdd = () => {
    if (Platform.OS === 'ios') {
      Contacts.openContactForm(newPerson);
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then(res => {
          console.log('Permission: ', res);
          Contacts.getContactsByEmailAddress(
            newPerson.emailAddresses[0].email,
          ).then(contact => Contacts.deleteContact(contact[0]));
        })
        .catch(error => {
          console.error('Permission error: ', error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>Image Picker</Title>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}, index) => {
            return (
              <UIButton
                label={title}
                key={index}
                onPress={() => onButtonPress(type, options)}
              />
            );
          })}
          <UIButton onPress={onClickAdd} label="Aggiungi Contatto" />
          <UIButton onPress={onClickDelete} label="Rimuovi Contatto" />
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
