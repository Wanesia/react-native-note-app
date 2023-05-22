import { View, Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Details({ route }) {
  const navigation = useNavigation();
  const [noteText, setNoteText] = useState(route.params.item.note);
  const [noteTitle, setNoteTitle] = useState(route.params.item.title);

  const handleUpdate = () => {
    if (noteTitle && noteTitle.length > 0) {
      firebase
        .firestore()
        .collection('notes')
        .doc(route.params.item.id)
        .update({
          title: noteTitle,
          note: noteText,
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleDelete = () => {
    firebase.firestore().collection('notes').doc(route.params.item.id).delete()
    .then(() => {
      navigation.navigate('Home');
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
      placeholder = 'Title'
      value={noteTitle}
      onChangeText={(text)=>setNoteTitle(text)}
      style={styles.inputField}>
      </TextInput>

      <TextInput 
      placeholder = 'Note'
      value={noteText}
      onChangeText={(text)=>setNoteText(text)}
      style={styles.inputFieldLong}
      multiline={true}
      >
      
      </TextInput>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button}
          onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete}
          onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  containerButtons:{
    flexDirection: 'row',
    marginTop: 10,

  },
  inputField: {
    fontSize: 16,
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    elevation: 2,

  },
  inputFieldLong:{
    fontSize: 16,
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    paddingBottom: 100,
    elevation: 2,

  },
  button:{
    margin: 5,
    backgroundColor: 'green',
    borderRadius: 20,
    paddingHorizontal: 10,
    elevation: 5,


  },
  buttonText:{
    color: 'white',
    padding: 10,
    fontSize: 30,
  },
  buttonDelete:{
    margin: 5,
    marginTop: 2,
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 10,
    elevation: 5,

  },
});
