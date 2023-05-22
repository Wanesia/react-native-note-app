import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect, } from 'react';
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot((querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          const { note, title } = doc.data();
          newNotes.push({ note, title, id: doc.id });
        });
        setNotes(newNotes); // Add this line to update the state with the new notes
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Activities</Text>
      <View style={styles.listContainer}>
        {/* Replace FlashList with FlatList */}
        <FlatList
          data={notes}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={styles.singleElement}>
              <Pressable
                onPress={ () => navigation.navigate('Details',{item})}>
                <Text style={styles.title}>
                  {item.title}
                </Text>
                <Text>{item.note}</Text>
              </Pressable>
              
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NoteAdd')}>
        <Text style={styles.buttonText}>+</Text>
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
  listContainer: {
    flex: 1,

  },
  buttonText: {
    fontSize: 50,
    fontWeight: 300,
    color: '#fff',
  },
  button: {
    backgroundColor: 'green',
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginLeft: 275,
    marginBottom: 5,
  },
  singleElement:{
    backgroundColor: '#90ee90',
    padding:10,
    margin:10,
    borderRadius:10,
    borderWidth:3,
    borderColor: '#90ee90',
    borderBottomColor: 'green',
    elevation: 5,

    
  },
  mainText:{
    fontSize: 30,
    fontWeight: 600,
    marginVertical: 10,
  },
  title:{
    fontSize: 20,
    fontWeight: 600,
    marginVertical: 5,
  }
});
