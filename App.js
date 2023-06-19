import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/ModalNotitaNoua';
import styles from './components/Styles';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'
import ModalMeniu from './components/ModalMeniu';
import ModalVizualizareNotita from './components/ModalVizualizareNotita';
import ComponentaListaNotite from './components/ComponentaListaNotite';
import ModalSelectareMultipla from './components/ModalSelectareMultipla';


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

  //Modal Notita Noua
  const [visibilityModalNotitaNoua, setVisibilityModalNotitaNoua] = React.useState(false)
  const handleOnPressOpenModalNotitaNoua = () => {
    setVisibilityModalNotitaNoua(true)
  }
  //Modal Meniu
  const [visibilityModalMeniu, setVisibilityModalMeniu] = React.useState(false)
  const handleOnPressOpenModalMeniu = () => {
    setVisibilityModalMeniu(true)
  }
  //Modal selectare multipla
  const [visibilityModalSelectareMultipla, setVisibilityModalSelectareMultipla] = useState(false)
  const handleOpenModalSelectareMultipla = () => {
      setVisibilityModalSelectareMultipla(true)
  } 
  //Modal Vizualizare Notita
  const [visibilityModalVizualizareNotita, setVisibilityModalVizualizareNotita] = React.useState(false)

  //notita curenta, setata in componenta lista notite - folosita pt modal vizualizare notita
  const [notitaCurenta, setNotitaCurenta] = useState([]) // pt modalul vizualizare notita curenta

  const [listaNotiteSelectate, setListaNotiteSelectate] = useState([])

//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
  //modul de multiple-select
  //cand se face long press pe o notita, notita se baga intr-o lista de notite selectate
  //daca lista de notite selectate nu e goala, cand facem press normal pe o notita (nu cu long press)
  //notita se va baga intr-o lista de notite selectate
  //cand se face press pe o notita care e deja selectata (se regaseste in lista) ea se deselecteaza
  //daca lista de notite selectate e goala (s-au deselectat toate notitele sau nu s-a selectat niciuna inca)
  //atunci la press noramal se deschide notita
  //plus adaugat un buton pe bara de sus, 'X' - care sa deselecteze notitele (sa goleasca lista)

  //cand se selecteaza, sa se deschida un modal cu notitele randate ??
  //pt ca atunci cand utilizatorul apasa pe butonul <- inapoi al telefonului, sa se deselecteze toate
  //bara modal 
    //buton inapoi
    //buton stergere
    //buton setare culoare
    //eliminat callbacku listaNotiteSelectate de aici, pus in modal
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””
//””””””””””””””””””””””””””””””””””””””””””””””””””””””””


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
          <ComponentaListaNotite 
            notite                               = {notite}
            setNotitaCurenta                     = {setNotitaCurenta}
            setVisibilityModalVizualizareNotita  = {setVisibilityModalVizualizareNotita}
            setVisibilityModalSelectareMultipla  = {setVisibilityModalSelectareMultipla}
            listaNotiteSelectate                 = {listaNotiteSelectate}
            setListaNotiteSelectate              = {setListaNotiteSelectate}
          />      
        </ScrollView>

        <ModalNotitaNoua
          visibilityModalNotitaNoua           = {visibilityModalNotitaNoua}
          setVisibilityModalNotitaNoua        = {setVisibilityModalNotitaNoua}
          adaugaNotita                        = {adaugaNotita}
        />

        <ModalMeniu
          visibilityModalMeniu                = {visibilityModalMeniu}
          setVisibilityModalMeniu             = {setVisibilityModalMeniu}
        />

        <ModalVizualizareNotita
          visibilityModalVizualizareNotita    = {visibilityModalVizualizareNotita}
          setVisibilityModalVizualizareNotita = {setVisibilityModalVizualizareNotita}
          notitaCurenta                       = {notitaCurenta}
        />

        <ModalSelectareMultipla 
          visibilityModalSelectareMultipla     = {visibilityModalSelectareMultipla}
          setVisibilityModalSelectareMultipla  = {setVisibilityModalSelectareMultipla}
          notite                               = {notite}
          setNotitaCurenta                     = {setNotitaCurenta}
          setVisibilityModalVizualizareNotita  = {setVisibilityModalVizualizareNotita}
          listaNotiteSelectate                 = {listaNotiteSelectate}
          setListaNotiteSelectate              = {setListaNotiteSelectate}
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
