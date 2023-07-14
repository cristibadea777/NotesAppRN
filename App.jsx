import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/modale/ModalNotitaNoua';
import styles, { generareStiluri } from './components/Styles';
import ModalMeniu from './components/modale/ModalMeniu';
import ModalVizualizareNotita from './components/modale/ModalVizualizareNotita';
import ComponentaListaNotite from './components/liste/ComponentaListaNotite';
import ModalSelectareMultipla from './components/modale/ModalSelectareMultipla';
import { getNotite, adaugaNotita, deleteNotita, dropDatabaseAsync, getNotiteGunoi, 
         deleteNotitaPermanent, restaurareNotitaStearsa,
         arhivareNotita, getNotiteArhivate, updateNotita, creareTabelNotita, creareTabelSetare, 
         creareSetariInitiale, preluareSetari, verificareExistentaSetari, updateSetari, deleteFisierImagine, deleteFolderImagini, initializareFolderImagini, listFoldersInCurrentDirectory, stergereFolderImagini 
       } from './components/BazaDeDate';
import ModalConfirmareActiune from './components/modale/ModalConfirmareActiune';
import ModalSetariNotite from './components/modale/ModalSetariNotite';
import ModalAlegereCuloare from './components/modale/ModalAlegereCuloare';
import ModalSetariGenerale from './components/modale/ModalSetariGenerale';
import MainAppBar from './components/bare/MainAppBar';
import ModalDonate from './components/modale/ModalDonate';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as FileSystem from 'expo-file-system';
import ModalVizualizareImagine from './components/modale/ModalVizualizareImagine';
import ModalAlegereSortare from './components/modale/ModalAlegereSortare';
import ModalBackup from './components/modale/ModalBackup';
import ModalIncarcare from './components/modale/ModalIncarcare';


export default function App() {

//TO DO
////adaugat buton schimbare font size titlu si text (defaultu se pastreaza daca nu se selecteaza nik) + culoare titlu
///simple note/todo list la alegere.nu modal nou, ci in functie de optiune sa fie fie text inputu sau scroll in care se adauga optiuni

//backup si restore

//salvare teme de culori
  ///temele de culori = inregistrate in tabelu setare. prima inregistrare (id 1) va fi default
  ///si inca un tabel cu id tema curenta - care o sa  fie dat ca parametru (acum se selecteaza id = 1). initial o sa fie 1 (tema default)
  //de facut temp titlu, continut, culori. favorita - si daca la on request close valorile de atunci cu cele temp nu corespund (s-au facut modificari)
    //de pus modal confirmare ne-salvare
//marime fisier notita (poza + inregistrare din db) 
//poze de background pt notite
//buton share al pozei in modal vizualizare imagine


  const [setariSuntSetate, setSetariSuntSetate] = useState(false)

  //ruleaza doar o singura data, cand porneste aplicatia
  useEffect( () => 
  {
    //drop database 
    //dropDatabaseAsync()
    //stergereFolderImagini()
    //imaginile se salveaza in folderul  /ImagePicker/ - deci NU mai am nevoie de un folder separat pt imagini. 
    //cand se va face backup, pozele vor fi copiate din folderul /ImagePicker/. cand se importa, se copiaza din backup in /ImagePicker/
    console.log(NOTES_FOLDER)
    //creare tabele daca db se acceseaza pt prima oara (deci tabelele nu exista)
    creareTabelNotita()
    creareTabelSetare()
    initializareFolderImagini()
    
    verificareExistentaSetari().then(result => { //asteptare pt functia asincrona. dupa ce termina de executat THEN...manipulam rezultatul returnat de functie
      //daca nu exista inregistrari in tabelul de setari atunci se vor crea setarile initiale, dupa care se deschide modalul, ca userul sa-si aleaga el altele
      if(result === 0){        
        creareSetariInitiale().then(
          setari => {
            //setarile initiale le hardcodez in functia creareSetariInitiale. 
            //cand nu s-a mai deschis aplicatia (deci tabelu setari nu exista)
            //dupa ce se salveaza setarile hardcodate, o sa se deschida si modalu de setari, ca useru sa-si aleaga el setarile
            //dupa ce se creaza setarile setam constantele de setari pe care le utilizam in cod
            console.log("Setari initiale create\n")
            
            //le setez  pe cele create in DB si in contextu aplicatiei inainte sa se deschida modalu de unde useru poate sa le seteze oricum vrea
            setCuloareGeneralaFundalNotita("#1e1e1e") 
            setCuloareGeneralaTextNotita("white")
            setCuloareFundalAplicatie("#232B2B")
            setCuloareTextAplicatie("cyan")
            setCuloareButonNewNotita("#1e1e1e")
            setCuloareButonEditNotita("#232B2B")
            setCuloareBaraAplicatie("black")
            setCuloarePictograme("#00FFFF")
            setCuloareButonArchive("yellow")
            setCuloareButonDelete("red")
            setCuloareButonRestore("white")
            setCuloareNotitaSelectata("cyan")

            //setarile au fost setate
            setSetariSuntSetate(true)

            //apoi deschid si modalu de setari pt user
            setVisibilityModalSetariGenerale(true)
          }
        )   
      }
      else{
        //se preiau setarile daca ele exista, si se seteaza
        //functie preluare setari
        preluareSetari().then(setari => {
            setareSetari(setari)
            console.log("Setari preluate din BD")
          }
        )          
        //modalu nu se deschide, nu are rost la fiecare deschidere a aplicatiei. se mai poate accesa modalul din meniu
      }
    });

    populareNotite()
  }, []
)  

  const [notite,            setNotite]            = useState([])
  const [reRandare,         setReRandare]         = useState(false)
  const [vizualizareNotite, setVizualizareNotite] = useState(true)
  const [vizualizareGunoi,  setVizualizareGunoi]  = useState(false)
  const [vizualizareArhiva, setVizualizareArhiva] = useState(false)
  const [sortBy,            setSortBy]            = useState("dataCreare")
  const [direction,         setDirection]         = useState("DESC")
  const [indexSortBy,       setIndexSortBy]       = useState(0)
  const [indexDirection,    setIndexDirection]    = useState(1)

  //pt cerere restaurare actiune de restaurare notita stearsa sau arhivata, pt modal confirmare actiune, 
  //se seteaza cu true in modal selectare multipla, apoi cu false dupa ce s-a savarsit actiunea de restaurare, in modalul de confirmare
  //stergerea e actiunea default nu-i mai fac variabila
  const [toBeRestored,      setToBeRestored]      = useState(false)
  //pt golirea cosului de gunoi 
  const [toBeDeletedAll,    setToBeDeletedAll]    = useState(false)
  const handleGolireCosGunoi = () => {
    setToBeDeletedAll(true)
    setVisibilityModalConfirmareActiune(true)
  }
  //pt arhivare 
  const [toBeArchived,      setToBeArchived]      = useState(false)
  //pt delete 
  const [toBeDeleted,       setToBeDeleted]       = useState(false)
  
  useEffect(
    () => {
      //setarile se preiau din DB / sau se creaza pt prima oara  daca nu exista, in useEffect mai sus
      //nu se randeaza nimic pana ce setarile nu sunt setate, altfel avem erori
      //randarea depinde de lista de notite pt ca ea e folosita in elementele jsx, si pana ce ea nu isi schimba starea prin functia populareNotite, nu se face randarea 
      if(setariSuntSetate === true){
        populareNotite()
      }
    }, [vizualizareNotite, vizualizareGunoi, vizualizareArhiva, setariSuntSetate, direction, sortBy]
  )


  const populareNotite = () => {
    //populare notite = get notite din db apoi setare constanta notite
    if(vizualizareNotite === true){
      getNotite(direction, sortBy).then(
        notite => {
          setNotite(notite);  
        }
      ).catch(error => {
          console.log('Eroare:\n' + error);
        }
      )
    }
    if(vizualizareGunoi === true){
      getNotiteGunoi().then(
        notite => {
          setNotite(notite);  
        }
      ).catch(error => {
          console.log('Eroare:\n' + error);
        }
      )
    }
    if(vizualizareArhiva === true){
      getNotiteArhivate().then(
        notite => {
          setNotite(notite)
        }
      ).catch(error => {
          console.log('Eroare:\n' + error)
        }
      )
    }
    
  }



  //pentru alegere imagine 
  const [imagine,                   setImagine]                 = useState(null);
  //folderul curent
  const NOTES_FOLDER                                            = `${FileSystem.documentDirectory}`
  //pentru scoaterea pozei din modal notita noua si scoatere poza modal vizualizeaza notita + delete poza din folder
  const [flagDeleteImagine,         setFlagDeleteImagine]       = useState(false)
  //pt scoatere imagine si pt afisare buton scoatere imagine in modal notita noua
  const [flagNotitaNoua,            setFlagNotitaNoua]          = useState(false)

  //SETARE SETARI
  const setareSetari = (setari) => {
    let culoareGeneralaFundalNotita = setari[0].culoareGeneralaFundalNotita
    let culoareGeneralaTextNotita   = setari[0].culoareGeneralaTextNotita
    let culoareFundalAplicatie      = setari[0].culoareFundalAplicatie 
    let culoareTextAplicatie        = setari[0].culoareTextAplicatie  
    let culoareButonNewNotita       = setari[0].culoareButonNewNotita
    let culoareButonEditNotita      = setari[0].culoareButonEditNotita
    let culoareBaraAplicatie        = setari[0].culoareBaraAplicatie
    let culoarePictograme           = setari[0].culoarePictograme
    let culoareButonRestore         = setari[0].culoareButonRestore 
    let culoareButonDelete          = setari[0].culoareButonDelete 
    let culoareButonArchive         = setari[0].culoareButonArchive 
    let culoareNotitaSelectata      = setari[0].culoareNotitaSelectata
    setCuloareGeneralaFundalNotita  (culoareGeneralaFundalNotita)
    setCuloareGeneralaTextNotita    (culoareGeneralaTextNotita)
    setCuloareFundalAplicatie       (culoareFundalAplicatie)
    setCuloareTextAplicatie         (culoareTextAplicatie)
    setCuloareButonNewNotita        (culoareButonNewNotita)
    setCuloareButonEditNotita       (culoareButonEditNotita)
    setCuloareBaraAplicatie         (culoareBaraAplicatie)
    setCuloarePictograme            (culoarePictograme)
    setCuloareButonRestore          (culoareButonRestore)
    setCuloareButonDelete           (culoareButonDelete)
    setCuloareButonArchive          (culoareButonArchive)
    setCuloareNotitaSelectata       (culoareNotitaSelectata)
    setSetariSuntSetate(true) //dupa ce se seteaza setarile, app se poate randa
  }

  //ruleaza de fiecare data cand notitele se schimba. important e ca declararea constantei sa fie inainte
  //altfel array-ul de dependente al hook-ului ( [notite] ) va fi gol (valoare initiala a constantei notite = array gol, inainte de declarare)
  //nu ar fi avut referinta catre constanta notite, si de asta useEffect nu ar fi rulat  
  useEffect(() => 
    {
      //atunci cand se adauga/modifica vreo notita use effect porneste  
      //dupa ce se inchid modalele de notita noua sau editare notita
      //asta pentru ca daca se adauga/modifica o poza, modificarile nu au efect imediat ca sa vedem si poza noua 
      //pt ca intai se salveaza in folder apoi in bd, deci trebuie re-randare 
      //populareNotite() atunci cand se sterge se cheama direct in functiile respective
      if(reRandare === true){
        populareNotite()
        console.log("RE RANDARE")
        setReRandare(false)
      }      
    }, [notite]
  )

  //Modal Notita Noua
  const [visibilityModalNotitaNoua, setVisibilityModalNotitaNoua] = useState(false)
  
  const handleOnPressOpenModalNotitaNoua = () => {
    //se seteaza si notita curenta cu null, ca sa avem schema de culori default in modalul setari notite 
    const notitaNull = null
    setNotitaCurenta(notitaNull)
    setFlagNotitaNoua(true)
    setVisibilityModalNotitaNoua(true)
  }
  //Modal Meniu
  const [visibilityModalMeniu, setVisibilityModalMeniu] = useState(false)
  const handleOnPressOpenModalMeniu = () => {
    setVisibilityModalMeniu(true)
  }
  //Modal selectare multipla
  const [visibilityModalSelectareMultipla,  setVisibilityModalSelectareMultipla]  = useState(false)
  //Modal Vizualizare Notita
  const [visibilityModalVizualizareNotita,  setVisibilityModalVizualizareNotita]  = useState(false)
  //Modal confirmare actiune
  const [visibilityModalConfirmareActiune,  setVisibilityModalConfirmareActiune]  = useState(false)
  //Modal setari notite
  const [visibilityModalSetariNotite,       setVisibilityModalSetariNotite]       = useState(false)
  //Modal setari generale 
  const [visibilityModalSetariGenerale,     setVisibilityModalSetariGenerale]     = useState(false)
  //Modal donate
  const [visibilityModalDonate,             setVisibilityModalDonate]             = useState(false)
  //Modal deschidere imagine 
  const [visibilityModalVizualizareImagine, setVisibilityModalVizualizareImagine] = useState(false)
  //Modal alegere sortare
  const [visibilityModalAlegereSortare,     setVisibilityModalAlegereSortare]     = useState(false)
  //modal backup
  const [visibilityModalBackup,             setVisibilityModalBackup]             = useState(false)
  //modal incarcare
  const [visibilityModalIncarcare,          setVisibilityModalIncarcare]          = useState(true)
  //pt culori generale notita si text notita - valorile sunt luate din baza de date
  //valorile sunt folosite in modal notita noua modal selectare multipla, componenta lista notite, modal setari notita (cand notitaCurenta e null deci se creaza una noua, si se iau valorile default)
  //culorile pt modal vizualizare notita - valorile sunt luate din notita curenta, astea sunt culorile generale, default pt toate notitele
  const [culoareGeneralaFundalNotita, setCuloareGeneralaFundalNotita]   = useState('white')
  const [culoareGeneralaTextNotita,   setCuloareGeneralaTextNotita]     = useState('white')
  //pt restul setarilor, identic
  const [culoareFundalAplicatie,      setCuloareFundalAplicatie]        = useState('white')
  const [culoareTextAplicatie,        setCuloareTextAplicatie]          = useState('white')
  const [culoareButonNewNotita,       setCuloareButonNewNotita]         = useState('white')
  const [culoareButonEditNotita,      setCuloareButonEditNotita]        = useState('white')
  const [culoareBaraAplicatie,        setCuloareBaraAplicatie]          = useState("white")
  const [culoarePictograme,           setCuloarePictograme]             = useState("white")
  const [culoareButonRestore,         setCuloareButonRestore]           = useState("white")
  const [culoareButonDelete,          setCuloareButonDelete]            = useState("white")
  const [culoareButonArchive,         setCuloareButonArchive]           = useState("white")
  const [culoareNotitaSelectata,      setCuloareNotitaSelectata]        = useState("white")


  //PT NOTITA NOUA, EDITARE NOTITA CURENTA
  //fundal si text notita noua. initial au culoarea culorii default a unei notite (doar in modalu setari notita)
  const [culoareFundal,               setCuloareFundal]                 = useState("white")
  const [culoareText,                 setCuloareText]                   = useState("white")
  //temp, daca user da cancel
  const [tempCuloareFundal,           setTempCuloareFundal]             = useState('')
  const [tempCuloareText,             setTempCuloareText]               = useState('')
  //variabile care tin locu culorilor initiale 
  //se seteaza in useEffect in modal notita noua pt atunci cand se deschide modalul notita noua (setate cu valorile generale) 
  //sau setate in useEffect in modal vizualizare notita cand se deschide modalul vizualizare notita (setate cu valorile notitei)

  //constanta stiluri. purtata peste tot prin app. cand se schimba in modalu de setari generale, se re-randeaza app-ul dupa ce se seteaza in useEffect
  const [styles, setStyles] = useState('')
  useEffect(
    () => {
     if(setariSuntSetate){
      setVisibilityModalIncarcare(false)
      console.log("Setari schimbate, re-randare")
      console.log([culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareFundal, culoareText, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata ])
      setStyles(generareStiluri(culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareFundal, culoareText, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata ))
     }
    }, [setariSuntSetate, culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareFundal, culoareText, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata ]
  )

  //Modal alegere culoare 
  const [visibilityModalAlegereCuloare,    setVisibilityModalAlegereCuloare]    = useState(false)
  //  la deschidere culoarea curenta se seteaza null 
  //  se seteaza culoarea curenta in modal alegere culoare
  //  la inchidere, se seteaza culoarea curenta - daca s-a ales, daca nu, ramane cea initiala, fie a notitei curente fie default
  //setare curenta 
  const [setareCurenta,                    setSetareCurenta]                    = useState('')

  //notita curenta, setata in componenta lista notite - folosita pt modal vizualizare notita
  const [notitaCurenta, setNotitaCurenta] = useState([]) // pt modalul vizualizare notita curenta

  const [listaNotiteSelectate, setListaNotiteSelectate] = useState([])

  //cand se deschide modalu selectare multipla, sa fie scrollat automat cu valoare scroll-ului
  //de exemplu se selecteaza notita de la sfarsit, sa se scrolleze pana la sfarsit
  //si invers, cand se inchide modalu selectare multipla, sa nu se reseteze scroll-ul, ramane unde a fost
  const [offsetScroll, setOffsetScroll] = useState(0)
  
  return (
    <View style={styles.containerPrincipal}>

    <StatusBar style="auto" backgroundColor={"black"} barStyle={'light-content'}> </StatusBar>

    <View style={styles.containerNotite}>

      <MainAppBar 
        vizualizareNotite                      = {vizualizareNotite} 
        vizualizareArhiva                      = {vizualizareArhiva} 
        vizualizareGunoi                       = {vizualizareGunoi}
        handleGolireCosGunoi                   = {handleGolireCosGunoi}
        handleOnPressOpenModalMeniu            = {handleOnPressOpenModalMeniu}
        culoarePictograme                      = {culoarePictograme}
        setVisibilityModalAlegereSortare       = {setVisibilityModalAlegereSortare}
        styles = {styles}
      /> 

      <ScrollView 
        style={{flex: 1}}
        onScroll={
          event => {
            setOffsetScroll(event.nativeEvent.contentOffset.y)
          }
        }
      >        
        <ComponentaListaNotite 
          notite                               = {notite}
          setNotitaCurenta                     = {setNotitaCurenta}
          setVisibilityModalVizualizareNotita  = {setVisibilityModalVizualizareNotita}
          setVisibilityModalSelectareMultipla  = {setVisibilityModalSelectareMultipla}
          listaNotiteSelectate                 = {listaNotiteSelectate}
          setListaNotiteSelectate              = {setListaNotiteSelectate}
          culoarePictograme                    = {culoarePictograme}
          styles                               = {styles}
        />      
      </ScrollView>

      <ModalNotitaNoua
        visibilityModalNotitaNoua            = {visibilityModalNotitaNoua}
        setVisibilityModalNotitaNoua         = {setVisibilityModalNotitaNoua}
        adaugaNotita                         = {adaugaNotita}
        populareNotite                       = {populareNotite}
        setVisibilityModalSetariNotite       = {setVisibilityModalSetariNotite}
        culoareGeneralaTextNotita            = {culoareGeneralaTextNotita}
        culoareGeneralaFundalNotita          = {culoareGeneralaFundalNotita}    
        setNotitaCurenta                     = {setNotitaCurenta}     
        culoareFundal                        = {culoareFundal}
        setCuloareFundal                     = {setCuloareFundal}
        culoareText                          = {culoareText}
        setCuloareText                       = {setCuloareText}
        setTempCuloareFundal                 = {setTempCuloareFundal} 
        setTempCuloareText                   = {setTempCuloareText}
        culoarePictograme                    = {culoarePictograme}
        imagine                              = {imagine}
        setImagine                           = {setImagine}
        setReRandare                         = {setReRandare}
        setVisibilityModalConfirmareActiune  = {setVisibilityModalConfirmareActiune}
        flagNotitaNoua                       = {flagNotitaNoua}
        setFlagNotitaNoua                    = {setFlagNotitaNoua}
        flagDeleteImagine                    = {flagDeleteImagine}     
        setFlagDeleteImagine                 = {setFlagDeleteImagine}              
        styles                               = {styles}
      />

      <ModalMeniu
        visibilityModalMeniu                 = {visibilityModalMeniu}
        setVisibilityModalMeniu              = {setVisibilityModalMeniu}
        setVizualizareNotite                 = {setVizualizareNotite}
        setVizualizareGunoi                  = {setVizualizareGunoi}
        setVizualizareArhiva                 = {setVizualizareArhiva}
        setVisibilityModalDonate             = {setVisibilityModalDonate}
        setVisibilityModalSetariGenerale     = {setVisibilityModalSetariGenerale}
        setVisibilityModalBackup             = {setVisibilityModalBackup}
        culoarePictograme                    = {culoarePictograme}    
        styles                               = {styles}
      />

      <ModalVizualizareNotita
        visibilityModalVizualizareNotita     = {visibilityModalVizualizareNotita}
        setVisibilityModalVizualizareNotita  = {setVisibilityModalVizualizareNotita}
        notitaCurenta                        = {notitaCurenta}
        updateNotita                         = {updateNotita}
        populareNotite                       = {populareNotite}
        setVisibilityModalSetariNotite       = {setVisibilityModalSetariNotite}   
        culoareFundal                        = {culoareFundal}
        setCuloareFundal                     = {setCuloareFundal}
        culoareText                          = {culoareText}
        setCuloareText                       = {setCuloareText}
        setTempCuloareFundal                 = {setTempCuloareFundal} 
        setTempCuloareText                   = {setTempCuloareText}
        vizualizareNotite                    = {vizualizareNotite}
        vizualizareArhiva                    = {vizualizareArhiva}
        vizualizareGunoi                     = {vizualizareGunoi}
        culoarePictograme                    = {culoarePictograme}
        setToBeRestored                      = {setToBeRestored}
        setVisibilityModalConfirmareActiune  = {setVisibilityModalConfirmareActiune}
        setVisibilityModalVizualizareImagine = {setVisibilityModalVizualizareImagine}
        styles                               = {styles}
        setFlagDeleteImagine                 = {setFlagDeleteImagine}
        imagine                              = {imagine}
        setImagine                           = {setImagine}
        deleteFisierImagine                  = {deleteFisierImagine}
        setReRandare                         = {setReRandare}
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
        setToBeArchived                      = {setToBeArchived}
        setToBeDeleted                       = {setToBeDeleted}
        culoarePictograme                    = {culoarePictograme}
        offsetScroll                         = {offsetScroll}
        styles                               = {styles}
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
        toBeDeletedAll                        = {toBeDeletedAll}
        setToBeDeletedAll                     = {setToBeDeletedAll}
        toBeArchived                          = {toBeArchived}
        setToBeArchived                       = {setToBeArchived}
        toBeDeleted                           = {toBeDeleted}
        setToBeDeleted                        = {setToBeDeleted}
        arhivareNotita                        = {arhivareNotita}
        notitaCurenta                         = {notitaCurenta}
        setVisibilityModalVizualizareNotita   = {setVisibilityModalVizualizareNotita}
        styles                                = {styles}
        showMessage                           = {showMessage}
        flagDeleteImagine                     = {flagDeleteImagine}
        setImagine                            = {setImagine}
        imagine                               = {imagine}
        setFlagDeleteImagine                  = {setFlagDeleteImagine}
        getNotiteGunoi                        = {getNotiteGunoi}
      />
      <ModalSetariNotite
        visibilityModalSetariNotite           = {visibilityModalSetariNotite}
        setVisibilityModalSetariNotite        = {setVisibilityModalSetariNotite}
        notitaCurenta                         = {notitaCurenta}         
        setVisibilityModalAlegereCuloare      = {setVisibilityModalAlegereCuloare}
        setSetareCurenta                      = {setSetareCurenta}
        culoareFundal                         = {culoareFundal}
        setCuloareFundal                      = {setCuloareFundal}
        culoareText                           = {culoareText}
        setCuloareText                        = {setCuloareText}
        tempCuloareFundal                     = {tempCuloareFundal} 
        tempCuloareText                       = {tempCuloareText}
        culoarePictograme                     = {culoarePictograme}
        styles                                = {styles}
      />
      <ModalAlegereCuloare
        visibilityModalAlegereCuloare         = {visibilityModalAlegereCuloare}
        setVisibilityModalAlegereCuloare      = {setVisibilityModalAlegereCuloare}
        setareCurenta                         = {setareCurenta}
        setCuloareFundal                      = {setCuloareFundal}
        setCuloareText                        = {setCuloareText}
        setCuloareFundalAplicatie             = {setCuloareFundalAplicatie} 
        setCuloareTextAplicatie               = {setCuloareTextAplicatie}
        setCuloareGeneralaFundalNotita        = {setCuloareGeneralaFundalNotita}
        setCuloareGeneralaTextNotita          = {setCuloareGeneralaTextNotita}
        setCuloareButonNewNotita              = {setCuloareButonNewNotita}
        setCuloareBaraAplicatie               = {setCuloareBaraAplicatie}
        setCuloarePictograme                  = {setCuloarePictograme}
        setCuloareButonEditNotita             = {setCuloareButonEditNotita}
        setCuloareButonRestore                = {setCuloareButonRestore}
        setCuloareButonDelete                 = { setCuloareButonDelete}
        setCuloareButonArchive                = {setCuloareButonArchive}
        setCuloareNotitaSelectata             = {setCuloareNotitaSelectata}
        culoarePictograme                     = {culoarePictograme} 
        styles                                = {styles}
      />
      <ModalSetariGenerale
        visibilityModalSetariGenerale         = {visibilityModalSetariGenerale}
        setVisibilityModalSetariGenerale      = {setVisibilityModalSetariGenerale}
        setVisibilityModalAlegereCuloare      = {setVisibilityModalAlegereCuloare}
        setSetareCurenta                      = {setSetareCurenta}
        culoareFundalAplicatie                = {culoareFundalAplicatie}
        culoareTextAplicatie                  = {culoareTextAplicatie}
        culoareGeneralaFundalNotita           = {culoareGeneralaFundalNotita}
        culoareGeneralaTextNotita             = {culoareGeneralaTextNotita}
        culoareButonNewNotita                 = {culoareButonNewNotita}
        culoareButonEditNotita                = {culoareButonEditNotita}
        culoareBaraAplicatie                  = {culoareBaraAplicatie}
        culoarePictograme                     = {culoarePictograme}
        culoareButonRestore                   = {culoareButonRestore}         
        culoareButonDelete                    = {culoareButonDelete}
        culoareButonArchive                   = {culoareButonArchive}
        culoareNotitaSelectata                = {culoareNotitaSelectata}
        setCuloareButonRestore                = {setCuloareButonRestore}
        setCuloareButonDelete                 = {setCuloareButonDelete}
        setCuloareButonArchive                = {setCuloareButonArchive}
        setCuloareNotitaSelectata             = {setCuloareNotitaSelectata}
        setCuloareFundalAplicatie             = {setCuloareFundalAplicatie} 
        setCuloareTextAplicatie               = {setCuloareTextAplicatie}
        setCuloareGeneralaFundalNotita        = {setCuloareGeneralaFundalNotita}
        setCuloareGeneralaTextNotita          = {setCuloareGeneralaTextNotita}
        setCuloareButonNewNotita              = {setCuloareButonNewNotita}
        setCuloareButonEditNotita             = {setCuloareButonEditNotita}
        setCuloareBaraAplicatie               = {setCuloareBaraAplicatie}
        setCuloarePictograme                  = {setCuloarePictograme}
        updateSetari                          = {updateSetari}
        styles                                = {styles}
      /> 

      <ModalVizualizareImagine
        notitaCurenta                         = {notitaCurenta}
        visibilityModalVizualizareImagine     = {visibilityModalVizualizareImagine}
        setVisibilityModalVizualizareImagine  = {setVisibilityModalVizualizareImagine}
        culoarePictograme                     = {culoarePictograme}
        styles                                = {styles}
      />

      <ModalAlegereSortare 
        visibilityModalAlegereSortare         = {visibilityModalAlegereSortare}
        setVisibilityModalAlegereSortare      = {setVisibilityModalAlegereSortare}
        culoarePictograme                     = {culoarePictograme}
        sortBy                                = {sortBy}
        setSortBy                             = {setSortBy}
        direction                             = {direction}
        setDirection                          = {setDirection}
        indexSortBy                           = {indexSortBy}
        indexDirection                        = {indexDirection}
        setIndexSortBy                        = {setIndexSortBy}
        setIndexDirection                     = {setIndexDirection}
        styles                                = {styles}
      />

      <ModalDonate
        visibilityModalDonate                 = {visibilityModalDonate} 
        setVisibilityModalDonate              = {setVisibilityModalDonate}
        culoarePictograme                     = {culoarePictograme}
        styles                                = {styles}
      />

      <ModalBackup 
        visibilityModalBackup                 = {visibilityModalBackup}      
        setVisibilityModalBackup              = {setVisibilityModalBackup}
        culoarePictograme                     = {culoarePictograme}
        styles                                = {styles}
      />

      <ModalIncarcare 
        visibilityModalIncarcare              = {visibilityModalIncarcare}
      />



      <FlashMessage position="top" />

    {
      vizualizareNotite ? 
      (
        <TouchableOpacity 
          style={styles.floatingButtonNew}
          onPress={handleOnPressOpenModalNotitaNoua}
        >
          <FontAwesomeIcon icon={faPlus} size={33} color={culoarePictograme}/>
        </TouchableOpacity>
      ) 
      : 
      (
        <></>
      )
    }

    </View>
  
  </View>    
  )
}