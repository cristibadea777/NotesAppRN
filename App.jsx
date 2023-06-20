import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/ModalNotitaNoua';
import styles from './components/Styles';
import ModalMeniu from './components/ModalMeniu';
import ModalVizualizareNotita from './components/ModalVizualizareNotita';
import ComponentaListaNotite from './components/ComponentaListaNotite';
import ModalSelectareMultipla from './components/ModalSelectareMultipla';
import { getNotite, creareTabele, adaugaNotita, deleteNotita, dropDatabaseAsync } from './components/BazaDeDate';
import ModalConfirmareStergere from './components/ModalConfirmareStergere';


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
//bara modal multiple select
    //de adaugat buton setari (setare culoare fundal, culoare text, font size) 

//calculare offset notita selectata index si facut scroll la scrollview la modal selectare multipla
//preluare cat de scrollat este scrollu principal apoi pus pe scrollu modalului

export default function App() {

  const [notite,        setNotite] = useState([])

  const populareNotite = () => {
    //populare notite = get notite din db apoi setare constanta notite
    getNotite().then(
      notite => {
        setNotite(notite);  
      }
    ).catch(error => {
        console.log('Eroare: ', error);
      }
    )
  }

  //ruleaza doar o singura data, cand porneste aplicatia
  useEffect( () => 
    {
      //drop database
      //dropDatabaseAsync()
      //creare tabele daca db se acceseaza pt prima oara (deci tabelele nu exista)
      creareTabele()
      populareNotite()
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
  //Modal confirmare stergere
  const [visibilityModalConfirmareStergere, setVisibilityModalConfirmareStergere] = useState(false)


  //notita curenta, setata in componenta lista notite - folosita pt modal vizualizare notita
  const [notitaCurenta, setNotitaCurenta] = useState([]) // pt modalul vizualizare notita curenta

  const [listaNotiteSelectate, setListaNotiteSelectate] = useState([])
  

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
          populareNotite                      = {populareNotite}
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
          setVisibilityModalConfirmareStergere = {setVisibilityModalConfirmareStergere}
        />

        <ModalConfirmareStergere 
          visibilityModalConfirmareStergere     = {visibilityModalConfirmareStergere}
          setVisibilityModalConfirmareStergere  = {setVisibilityModalConfirmareStergere}
          listaNotiteSelectate                  = {listaNotiteSelectate}
          setVisibilityModalSelectareMultipla   = {setVisibilityModalSelectareMultipla}
          deleteNotita                          = {deleteNotita}
          populareNotite                        = {populareNotite}
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
