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
import { getNotite, creareTabele, adaugaNotita, deleteNotita, dropDatabaseAsync, getNotiteGunoi, deleteNotitaPermanent, restaurareNotitaStearsa } from './components/BazaDeDate';
import ModalConfirmareActiune from './components/ModalConfirmareActiune';


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
    //de adaugat buton setari (setare culoare fundal, culoare text, font size) - la fel si pt modal creare 

//calculare offset notita selectata index si facut scroll la scrollview la modal selectare multipla
//preluare cat de scrollat este scrollu principal apoi pus pe scrollu modalului


//in modal deselectare sa se schimbe butoanele barei, in functie de ce fel de notitr se vizualizeaza

//de vazut daca pot sa las doar bara ca modal, ca sa pastrez functionalitatea de deselectare totala,
//sa se deschida doar bara ca modal si sa pot interactiona in continuare
//cu restul contentului, ca la whatsapp cand selectez un mesaj

//buton reciclare la gunoi - sterge toate notitele din gunoi


//modal confirmare stergere -- redenumit in modal confirmare si facut refactoring 


export default function App() {

  const [notite,            setNotite]            = useState([])
  const [vizualizareNotite, setVizualizareNotite] = useState(true)
  const [vizualizareGunoi,  setVizualizareGunoi]  = useState(false)
  const [vizualizareArhiva, setVizualizareArhiva] = useState(false)

  //pt cerere restaurare actiune de restaurare notita stearsa sau arhivata, pt modal confirmare actiune, 
  //se seteaza cu true in modal selectare multipla, apoi cu false dupa ce s-a savarsit actiunea de restaurare, in modalul de confirmare
  //stergerea e actiunea default nu-i mai fac variabila
  const [toBeRestored,      setToBeRestored]      = useState(false)

  useEffect(
    () => {
      populareNotite()
      console.log('n')
    }, [vizualizareNotite, vizualizareGunoi, vizualizareArhiva]
  )

  const populareNotite = () => {
    //populare notite = get notite din db apoi setare constanta notite
    if(vizualizareNotite === true){
      getNotite().then(
        notite => {
          setNotite(notite);  
        }
      ).catch(error => {
          console.log('Eroare: ', error);
        }
      )
    }
    if(vizualizareGunoi == true){
      getNotiteGunoi().then(
        notite => {
          setNotite(notite);  
        }
      ).catch(error => {
          console.log('Eroare: ', error);
        }
      )
    }
  }

  //ruleaza doar o singura data, cand porneste aplicatia
  useEffect( () => 
    {
      //drop database
      //dropDatabaseAsync()
      //creare tabele daca db se acceseaza pt prima oara (deci tabelele nu exista)
      creareTabele()
      populareNotite()
      //verificare notite ce trebuiesc sterse (daca data notita aruncata la gunoi are data de stergere > de 30 de zile atunci se sterge)
      
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
  //Modal confirmare actiune
  const [visibilityModalConfirmareActiune, setVisibilityModalConfirmareActiune] = useState(false)


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
          setVizualizareNotite                = {setVizualizareNotite}
          setVizualizareGunoi                 = {setVizualizareGunoi}
          setVizualizareArhiva                = {setVizualizareArhiva}
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
          setVisibilityModalConfirmareActiune  = {setVisibilityModalConfirmareActiune}
          vizualizareNotite                    = {vizualizareNotite}
          vizualizareGunoi                     = {vizualizareGunoi}
          vizualizareArhiva                    = {vizualizareArhiva}
          setToBeRestored                      = {setToBeRestored}
        />

        <ModalConfirmareActiune 
          visibilityModalConfirmareActiune      = {visibilityModalConfirmareActiune}
          setVisibilityModalConfirmareActiune   = {setVisibilityModalConfirmareActiune}
          listaNotiteSelectate                  = {listaNotiteSelectate}
          setVisibilityModalSelectareMultipla   = {setVisibilityModalSelectareMultipla}
          deleteNotita                          = {deleteNotita}
          populareNotite                        = {populareNotite}
          vizualizareGunoi                      = {vizualizareGunoi}
          deleteNotitaPermanent                 = {deleteNotitaPermanent}
          restaurareNotitaStearsa               = {restaurareNotitaStearsa}
          toBeRestored                          = {toBeRestored}
          setToBeRestored                       = {setToBeRestored}
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
