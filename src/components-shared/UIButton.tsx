import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const UIButton = memo(({label, onPress, disabled = false}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => onPress()}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  btn: {
    borderColor: 'rgb(17, 236, 229)',
    backgroundColor: 'rgb(17, 236, 229)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 10,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: '50%',
  },
  text: {
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
