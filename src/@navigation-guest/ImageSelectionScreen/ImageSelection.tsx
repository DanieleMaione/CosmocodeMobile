/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Text,
} from 'react-native';

import {Response} from './components/Response';
import {Title} from './components/Title';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';
import {UIButton} from '../../components-shared/UIButton';
import Geolocation from 'react-native-geolocation-service';
import {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';

export const includeExtra = true;

export const ImageSelection = () => {
  const newPerson = {
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
    //per android usare displayName
    displayName: 'Cristian Palermo',
  };
  const [response, setResponse] = useState<any>(null);
  const [location, setLocation] = useState<any>();
  const [contactList, setContactList] = useState<any>();

  useEffect(() => {
    Contacts.getAll().then(res => setContactList(res));
  });

  const onButtonPress = async (
    type: string,
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
  ) => {
    if (Platform.OS === 'ios') {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker.launchCamera(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            res => {
              console.log(res);
              setResponse(res);
            },
          );
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const onClickDelete = () => {
    const isContactFound = contactList.find((contact: any) => {
      return (
        contact.emailAddresses[0].email === newPerson.emailAddresses[0].email
      );
    });
    if (Platform.OS === 'ios') {
      isContactFound
        ? Contacts.getContactsByEmailAddress(
            newPerson.emailAddresses[0].email,
          ).then(contact => Contacts.deleteContact(contact[0]))
        : null;
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Location',
          message: 'This app would like to view your locations.',
          buttonPositive: 'Please accept bare mortal',
        },
      )
        .then(() => {
          isContactFound
            ? newPerson.emailAddresses[0].email &&
              Contacts.getContactsByEmailAddress(
                newPerson.emailAddresses[0].email,
              ).then(contact => Contacts.deleteContact(contact[0]))
            : null;
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
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      )
        .then(() => {
          Contacts.openContactForm(newPerson);
        })
        .catch(error => {
          console.error('Permission error: ', error);
        });
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ).then(res => {
          console.log('res is:', res);
          if (res) {
            Geolocation.getCurrentPosition(
              position => {
                console.log(position);
                setLocation(position);
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(false);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }
        });
        console.log('granted', granted);
        return granted;
      } else {
        const hasLocationPermission =
          !!Geolocation.requestAuthorization('whenInUse');
        if (hasLocationPermission) {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              setLocation(position);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      }
    } catch (err) {
      return false;
    }
  };

  const onPressClearLocaiton = () => {
    setLocation('');
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
          <UIButton label="Get Location" onPress={requestLocationPermission} />
          <UIButton label="Clear Location" onPress={onPressClearLocaiton} />
        </View>
        <View style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{color: 'white'}}>
            Latitude: {location ? location.coords.latitude : null}
          </Text>
          <Text style={{color: 'white'}}>
            Longitude: {location ? location.coords.longitude : null}
          </Text>
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
    title: 'Seleziona un immagine o un video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
