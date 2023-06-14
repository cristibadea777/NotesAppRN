import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAdd, faPlus, faSearch, faX} from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/ModalNotitaNoua';
import styles from './components/Styles';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'


export default function App() {

  const [notite,        setNotite] = useState([])

  //ruleaza doar o singura data, cand porneste aplicatia
  useEffect( () => 
    {
      //drop database
      //dropDatabaseAsync()
      
      //creare tabele daca db se acceseaza pt prima oara (deci tabelele nu exista)
      creareTabele()

      //populare notite
      getNotite()
    }, []
  )  

  //ruleaza de fiecare data cand notitele se schimba. important e ca declararea constantei sa fie inainte
  //altfel array-ul de dependente al hook-ului ( [notite] ) va fi gol (valoare initiala a constantei notite = array gol, inainte de declarare)
  //nu ar fi avut referinta catre constanta notite, si de asta useEffect nu ar fi rulat  
  useEffect(() => 
    {
      console.log(notite)
    }, [notite]
  )


  const [visibilityModalNotitaNoua, setVisibilityModalNotitaNoua] = React.useState(false)
  const handleOnPressOpenModalNotitaNoua = () => {
    setVisibilityModalNotitaNoua(true)
  }
  const handleOnPressCloseModalNotitaNoua = () => {
    setVisibilityModalNotitaNoua(false)
  }

  //Baza de Date
  //deschide baza de date / sau o creaza daca nu exista 
  const db = SQLite.openDatabase('notite.db');


  const creareTabele = () => {
    // Creare tabel Notita
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Notita (id INTEGER PRIMARY KEY AUTOINCREMENT, titlu TEXT, continut TEXT)',
          [],
          () => console.log('Table created successfully'),
          error => console.log('Error creating table: ', error)
        )
      }
    )
  }

  const getNotite = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Notita',
        [],
        (txObj, resultSet) => {
          setNotite(resultSet.rows._array);
        },
        error => console.log('Eroare:\n', error)
      );
    });
  }

  const adaugaNotita = (titlu, continut) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Notita (titlu, continut) VALUES (?, ?)',
        [titlu, continut],
        (txObj, resultSet) => {
          console.log('Notita inserată')
          let notiteExistente = [...notite]
          //id notita nou-inserata = resultSet.insertId
          getNotite()
        },
        error => console.log('Eroare:\n', error)
      );
    });
  }

  //functie de stergere a bazei de date 
  //functia este asincrona (async) ca sa putem utiliza "await" pt functia de stergere a bazei de date din sistem
  //functia de stergere este asincrona, deci folosim "await" pt a nu trece la alta functie pana ce nu termina de sters
  //daca vreau sa o folosesc intr-un useEffect, trebuie sa o infasor si intr-un useCallback(..cod functie.., [])
  const dropDatabaseAsync = async () => {
    //baza de date este in sistemul de fisiere, directorul sursa, /SQLite/
    const databaseFile = `${FileSystem.documentDirectory}SQLite/notite.db`
    try{
      await FileSystem.deleteAsync(databaseFile) //asteptam ca FileSystem sa termine de sters baza de date
      console.log("Baza de date stearsa")
    } 
    catch(error){
      console.log("Baza de date nu s-a sters, eroare:\n" + error)
    }
  }

  return (    
    <View style={styles.containerPrincipal}>

      <StatusBar style="auto"> </StatusBar>

      <View style={ [ styles.containerNotite, {} ] }>

        <ScrollView style={{flex: 1}}>
          <View style={{flexDirection: "row", width: "100%"}}>

            <TouchableOpacity style={styles.notita}> 
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.textNotita, {fontSize: 17}]}
                  numberOfLines={1}
                >
                    Titlu Titlu Titlu Titlu Titlu Titlu Titlu
                </Text>
              </View>
              <Text 
                  style={[styles.textNotita, {fontSize: 12}]}
                  numberOfLines={8}
              >
                There are men who fear legends but a man legends fear, he's a four holstered reaper, having bullets and tears. 
                When Silas Greaves finds you, there's nowhere to run
                When Silas Greaves finds you, there's nowhere to run
              </Text> 
            </TouchableOpacity>

          </View>

          
        </ScrollView>

        <ModalNotitaNoua
          visibilityModalNotitaNoua         = {visibilityModalNotitaNoua}
          handleOnPressCloseModalNotitaNoua = {handleOnPressCloseModalNotitaNoua}
        />

        <TouchableOpacity 
          style={[styles.floatingButton, {bottom: 15, right: 10} ]}
          onPress={handleOnPressOpenModalNotitaNoua}
        >
          <FontAwesomeIcon icon={faPlus} size={33} color='cyan'/>
        </TouchableOpacity>


        <TouchableOpacity 
          style={[styles.floatingButton, {bottom: 15, left: 10} ]}
          onPress={ () => adaugaNotita("w", "w") }
        >
          <FontAwesomeIcon icon={faAdd} size={33} color='blue'/>
        </TouchableOpacity>

      </View>
    
    </View>
  );
}
