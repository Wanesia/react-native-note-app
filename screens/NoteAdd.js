import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function NoteAdd() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    firebase
      .firestore()
      .collection('notes')
      .add({
        title,
        note,
      })
      .then(() => {
        setTitle('');
        setNote('');
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.inputField}
      />

      <TextInput
        placeholder="Note"
        value={note}
        onChangeText={(text) => setNote(text)}
        style={styles.inputFieldLong}
        multiline={true}
        numberOfLines={4} // You can adjust the number of lines as needed
      />

      <TouchableOpacity onPress={handleAdd} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    fontSize: 16,
    backgroundColor: 'white',
    width: '80%',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  inputFieldLong: {
    fontSize: 16,
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    paddingBottom: 80,
  },
  button: {
    margin: 5,
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    padding: 10,
    fontSize: 30,
  },
});
