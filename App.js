import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAdd, faBars, faCircle, faClock, faCog, faHamburger, faHistory, faPlus, faReorder, faRotate, faSearch, faX} from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/ModalNotitaNoua';
import styles from './components/Styles';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'
import ModalMeniu from './components/ModalMeniu';


//TO DO
//BUTON CEAS PT SCHIMBARE ORDINE - ULTIMA NOTITA INSERATA (CEA MAI NOUA) SA FIE PUSA PRIMA - LISTA SA FIE INVERSATA (2 OPTIUNI PRIMELE NOI, PRIMELE VECHI)
//TOUCHABLE SELECTABILE - MULTIPLE, ETC
//EDIT - DESCHIDERE MODAL 
//DELETE - PE CEA SELECTATA SAU MULTIPLE
//COS DE GUNOI - notita va avea -data stergere- si -stare = stearsa-
//ABILITATE ARHIVARE - notita va avea -stare = arhivata-
//buton meniu (Modal pe stanga care sa ocupe 33% din ecran) cu
    //SETARI 
        //  - aici sa se puna si setare - show new notes first / show old notes first
        //  - default note color 
        //  - background color 
        //  - backup
        //  - restore
    //TRASH - se sterg din bd dupa 30 de zile dupa ce au fost aruncate
        //buton recuperare
        //buton sterge definitiv
    //ARCHIVED NOTES - notita arhivata nu se poate sterge decat daca se dezarhiveaza
        //buton dezarhivare
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

  const [visibilityModalMeniu, setVisibilityModalMeniu] = React.useState(false)
  const handleOnPressOpenModalMeniu = () => {
    setVisibilityModalMeniu(true)
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


  //functie pt randarea notitelor
  const randareNotite = () => {
    //constanta ce va stoca toate randurile
    //un rand consta din 3 elemente de tip View
    const randuri = []
    //impartim notitele pe bucati 
    //fiecare bucata (rand) e compusa din maxim 3 notite 
    for(let i = 0; i < notite.length; i += 3){
      const randNotite = notite.slice(i, i + 3) //3 notite pe rand
      //fiecare rand, mapat la bucatile de notite 
      //se va mapa fiecare bucata 
      //iar apoi se vor introduce in constanta randuri
      const rand = (
        <View  key={i} style={{flexDirection: "row"}}>
          {randNotite.map( (notita) => (
            <View key={notita.id} style={styles.notita}>
              <View style={{alignItems: "center"}}>
                <Text style={[styles.textNotita, { fontSize: 17} ]} numberOflines={1}>
                  {notita.titlu}
                </Text>
              </View>
              <Text style={[styles.textNotita, { fontSize: 12 } ]} numberOfLines={8}>
                {notita.continut}
              </Text>
            </View>
          ) ) }
        </View>
      )
      randuri.push(rand)
    }
    //la final se returneaza componenta, ce este compusa din toate randurile de notite
    return randuri
  }

  

  return (    
    <View style={styles.containerPrincipal}>

      <StatusBar style="auto"> </StatusBar>

      <View style={ [ styles.containerNotite, {} ] }>

        <View style={[styles.containerBara, {backgroundColor: '#1e1e1e'}]}>

          <View style={styles.containerBaraStanga}>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity 
                    onPress={handleOnPressOpenModalMeniu}
                    style={{paddingLeft: 7}}
                >
                    <FontAwesomeIcon icon={faBars} size={33} color='cyan'/>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerBaraDreapta}>

          </View>
        </View>

        <ScrollView style={{flex: 1}}>        
          {randareNotite()}          
        </ScrollView>

        <ModalNotitaNoua
          visibilityModalNotitaNoua         = {visibilityModalNotitaNoua}
          setVisibilityModalNotitaNoua      = {setVisibilityModalNotitaNoua}
          adaugaNotita                      = {adaugaNotita}
        />

        <ModalMeniu
          visibilityModalMeniu              = {visibilityModalMeniu}
          setVisibilityModalMeniu           = {setVisibilityModalMeniu}
        />

        <TouchableOpacity 
          style={[styles.floatingButton, {bottom: 15, right: 10} ]}
          onPress={handleOnPressOpenModalNotitaNoua}
        >
          <FontAwesomeIcon icon={faPlus} size={33} color='cyan'/>
        </TouchableOpacity>

      </View>
    
    </View>
  );
}
