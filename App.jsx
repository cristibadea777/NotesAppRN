import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/ModalNotitaNoua';
import styles from './components/Styles';
import ModalMeniu from './components/ModalMeniu';
import ModalVizualizareNotita from './components/ModalVizualizareNotita';
import ComponentaListaNotite from './components/ComponentaListaNotite';
import ModalSelectareMultipla from './components/ModalSelectareMultipla';
import { getNotite, adaugaNotita, deleteNotita, dropDatabaseAsync, getNotiteGunoi, deleteNotitaPermanent, restaurareNotitaStearsa, deleteAllNotiteGunoi, arhivareNotita, getNotiteArhivate, updateNotita, creareTabelNotita, creareTabelSetare, creareSetariInitiale, preluareSetari, verificareExistentaSetari } from './components/BazaDeDate';
import ModalConfirmareActiune from './components/ModalConfirmareActiune';
import ModalSetariNotite from './components/ModalSetariNotite';
import ModalAlegereCuloare from './components/ModalAlegereCuloare';
import ModalSetariGenerale from './components/ModalSetariGenerale';


//TO DO
/////BUTON ORDERING PT SCHIMBARE ORDINE - ULTIMA NOTITA INSERATA (CEA MAI NOUA) SA FIE PUSA PRIMA - LISTA SA FIE INVERSATA (2 OPTIUNI PRIMELE NOI, PRIMELE VECHI)
////SETARI 
        //  - aici sa se puna si setare - show new notes first / show old notes first
        //  - default note color 
        //  - background color 
        //  - backup
        //  - restore
        //  - teme de culori
        //  - number of notes per row 1/2/3 
////TRASH - se sterg din bd dupa 30 de zile dupa ce au fost aruncate
////bara modal multiple select
        //de adaugat buton setari (setare culoare fundal, culoare text, font size) - la fel si pt modal creare 
////calculare offset notita selectata index si facut scroll la scrollview la modal selectare multipla
////preluare cat de scrollat este scrollu principal apoi pus pe scrollu modalului
////de vazut daca pot sa las doar bara ca modal, ca sa pastrez functionalitatea de deselectare totala,
        //sa se deschida doar bara ca modal si sa pot interactiona in continuare
        //cu restul contentului, ca la whatsapp cand selectez un mesaj        
////de scos buton notita noua, buton editare notita iar text input sa fie dezactivat doar scrollabil daca vizualizareGunoi/vizualizareArhiva sunt true 
////cand se adauga notita noua - adaugat si buton schimbare culoare, buton schimbare font size titlu si text (defaultu se pastreaza daca nu se selecteaza nik)



////daca app se porneste pt prima oara (daca nu exista tabele) atunci utilizatoru sa-si aleaga tema de culori



////cand e gunoi sau arhiva, dezactivat toate butoanele, text input, etc inafara de buton inapoi
    ///container bara transformat intr-o componenta
///creat tabel nou - setari - unde pun inregistrare pt culoareFundalNotita, culoareTextNotita - cu valori default de  #1e1e1e respectiv white
///temele de culori = inregistrate in tabelu setare. prima inregistrare (id 1) va fi default
///apoi inca un tabel care sa stocheze id-ul temei alese 
///posibil in setari notita (pe langa culoare fundal, culoare text, size) - culoare titlu
///simple note/todo list la alegere.nu modal nou, ci in functie de optiune sa fie fie text inputu sau scroll in care se adauga optiuni



export default function App() {






  
  //de scos valorile hardcodate si sa le preiau din database
  //intai fac cu culoarea notitei si culoarea textului 
  //facut functie de test care sa schimbe culorile in db, ca test sa vad daca se re-randeaza ok





  const [setariSuntSetate, setSetariSuntSetate] = useState(false)

  //ruleaza doar o singura data, cand porneste aplicatia
  useEffect( () => 
  {
    //drop database
    //dropDatabaseAsync()
    //creare tabele daca db se acceseaza pt prima oara (deci tabelele nu exista)
    creareTabelNotita()
    creareTabelSetare()
    

    //daca bd nu exista 
    //cand se creaza pt prima oara, sunt probleme cu setarea setarilor

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
            
            //dupa ce sunt create, trebuie sa fie si preluate
            preluareSetari().then(setari => {
                setareSetari(setari)
                console.log("Setari preluate din BD")
              }
            )     
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
    //verificare notite ce trebuiesc sterse (daca data notita aruncata la gunoi are data de stergere > de 30 de zile atunci se sterge)
  }, []
)  



  const [notite,            setNotite]            = useState([])
  const [vizualizareNotite, setVizualizareNotite] = useState(true)
  const [vizualizareGunoi,  setVizualizareGunoi]  = useState(false)
  const [vizualizareArhiva, setVizualizareArhiva] = useState(false)

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
  const [toBeArchived, setToBeArchived]           = useState(false)


  useEffect(
    () => {
      //setarile se preiau din DB / sau se creaza pt prima oara  daca nu exista, in useEffect mai sus
      //nu se randeaza nimic pana ce setarile nu sunt setate, altfel avem erori
      //randarea depinde de lista de notite pt ca ea e folosita in elementele jsx, si pana ce ea nu isi schimba starea prin functia populareNotite, nu se face randarea 
      if(setariSuntSetate === true){
        populareNotite()
      }
    }, [vizualizareNotite, vizualizareGunoi, vizualizareArhiva, setariSuntSetate]
  )

  const populareNotite = () => {
    //populare notite = get notite din db apoi setare constanta notite
    if(vizualizareNotite === true){
      getNotite().then(
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


  const setareSetari = (setari) => {
    let culoareGeneralaFundalNotita = setari[0].culoareGeneralaFundalNotita
    let culoareGeneralaTextNotita   = setari[0].culoareGeneralaTextNotita
    setCuloareGeneralaFundalNotita(culoareGeneralaFundalNotita)
    setCuloareGeneralaTextNotita(culoareGeneralaTextNotita)
    setSetariSuntSetate(true) //dupa ce se seteaza setarile, app se poate randa
  }


  //ruleaza de fiecare data cand notitele se schimba. important e ca declararea constantei sa fie inainte
  //altfel array-ul de dependente al hook-ului ( [notite] ) va fi gol (valoare initiala a constantei notite = array gol, inainte de declarare)
  //nu ar fi avut referinta catre constanta notite, si de asta useEffect nu ar fi rulat  
  useEffect(() => 
    {
      //console.log(notite)
    }, [notite]
  )

  //Modal Notita Noua
  const [visibilityModalNotitaNoua, setVisibilityModalNotitaNoua] = useState(false)
  
  const handleOnPressOpenModalNotitaNoua = () => {
    //se seteaza si notita curenta cu null, ca sa avem schema de culori default in modalul setari notite 
    const notitaNull = null
    setNotitaCurenta(notitaNull)
    setVisibilityModalNotitaNoua(true)
  }
  //Modal Meniu
  const [visibilityModalMeniu, setVisibilityModalMeniu] = useState(false)
  const handleOnPressOpenModalMeniu = () => {
    setVisibilityModalMeniu(true)
  }
  //Modal selectare multipla
  const [visibilityModalSelectareMultipla, setVisibilityModalSelectareMultipla] = useState(false)
  //Modal Vizualizare Notita
  const [visibilityModalVizualizareNotita, setVisibilityModalVizualizareNotita] = useState(false)
  //Modal confirmare actiune
  const [visibilityModalConfirmareActiune, setVisibilityModalConfirmareActiune] = useState(false)
  //Modal setari notite
  const [visibilityModalSetariNotite,      setVisibilityModalSetariNotite]      = useState(false)
  //Modal setari generale 
  const [visibilityModalSetariGenerale,    setVisibilityModalSetariGenerale]    = useState(false)


  //pt culori generale notita si text notita - valorile sunt luate din baza de date
  //valorile sunt folosite in modal notita noua modal selectare multipla, componenta lista notite, modal setari notita (cand notitaCurenta e null deci se creaza una noua, si se iau valorile default)
  //culorile pt modal vizualizare notita - valorile sunt luate din notita curenta, astea sunt culorile generale, default pt toate notitele
  const [culoareGeneralaFundalNotita, setCuloareGeneralaFundalNotita]   = useState('')
  const [culoareGeneralaTextNotita,   setCuloareGeneralaTextNotita]     = useState('')


  useEffect(
    () => {
      console.log(culoareGeneralaFundalNotita)
      console.log(culoareGeneralaTextNotita)
    }, [culoareGeneralaFundalNotita, culoareGeneralaTextNotita]
  )


  /*
  aici functie de preluare din bd a valorilor culorilor si setare a lor. cand se schimba setarile se cheama functia si functia populare notite
  */

  //culoare curenta 
  const [culoareCurenta,                   setCuloareCurenta]                   = useState('')
  //Modal alegere culoare 
  const [visibilityModalAlegereCuloare,    setVisibilityModalAlegereCuloare]    = useState(false)
  //  la deschidere culoarea curenta se seteaza null 
  //  se seteaza culoarea curenta in modal alegere culoare
  //  la inchidere, se seteaza culoarea curenta - daca s-a ales, daca nu, ramane cea initiala, fie a notitei curente fie default
  //setare curenta 
  const [setareCurenta,                    setSetareCurenta]                    = useState('')
  const [culoareFundal,                    setCuloareFundal]                    = useState(culoareGeneralaFundalNotita)
  const [culoareText,                      setCuloareText]                      = useState(culoareGeneralaTextNotita)

  //notita curenta, setata in componenta lista notite - folosita pt modal vizualizare notita
  const [notitaCurenta, setNotitaCurenta] = useState([]) // pt modalul vizualizare notita curenta

  const [listaNotiteSelectate, setListaNotiteSelectate] = useState([])
  
  return (
    <View style={styles.containerPrincipal}>

    <StatusBar style="auto"> </StatusBar>

    <View style={ [ styles.containerNotite, {} ] }>

      <View style={[styles.containerBara, {backgroundColor: '#1e1e1e'}]}>

        <View style={styles.containerBaraStanga}>
          <TouchableOpacity 
              onPress={handleOnPressOpenModalMeniu}
              style={{paddingLeft: 7}}
          >
              <FontAwesomeIcon icon={faBars} size={33} color='cyan'/>
          </TouchableOpacity>
          {
                vizualizareNotite ? (
                  <Text style={styles.textBara}>All Notes</Text>
                )
                :
                vizualizareArhiva ? (
                  <Text style={styles.textBara}>Archive</Text>
                )
                :
                vizualizareGunoi ? (
                  <Text style={styles.textBara}>Trash</Text>
                )
                :
                (
                  <>
                  </>
                )
              }
        </View>

        <View style={styles.containerBaraDreapta}>
          {
            vizualizareGunoi ? (
              <TouchableOpacity 
                onPress={handleGolireCosGunoi}
                style={{paddingRight: 7}}
              >
                <FontAwesomeIcon icon={faRecycle} size={25} color='cyan'/>
              </TouchableOpacity>
            ) : (
              <>
              </>
            )
          }

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
        setVisibilityModalSetariNotite      = {setVisibilityModalSetariNotite}
        culoareGeneralaTextNotita           = {culoareGeneralaTextNotita}
        culoareGeneralaFundalNotita         = {culoareGeneralaFundalNotita}    
        setNotitaCurenta                    = {setNotitaCurenta}     
        culoareFundal                       = {culoareFundal}
        setCuloareFundal                    = {setCuloareFundal}
        culoareText                         = {culoareText}
        setCuloareText                      = {setCuloareText}
      />

      <ModalMeniu
        visibilityModalMeniu                = {visibilityModalMeniu}
        setVisibilityModalMeniu             = {setVisibilityModalMeniu}
        setVizualizareNotite                = {setVizualizareNotite}
        setVizualizareGunoi                 = {setVizualizareGunoi}
        setVizualizareArhiva                = {setVizualizareArhiva}
        setVisibilityModalSetariGenerale    = {setVisibilityModalSetariGenerale}
      />

      <ModalVizualizareNotita
        visibilityModalVizualizareNotita    = {visibilityModalVizualizareNotita}
        setVisibilityModalVizualizareNotita = {setVisibilityModalVizualizareNotita}
        notitaCurenta                       = {notitaCurenta}
        updateNotita                        = {updateNotita}
        populareNotite                      = {populareNotite}
        setVisibilityModalSetariNotite      = {setVisibilityModalSetariNotite}   
        culoareFundal                       = {culoareFundal}
        setCuloareFundal                    = {setCuloareFundal}
        culoareText                         = {culoareText}
        setCuloareText                      = {setCuloareText}
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
        deleteAllNotiteGunoi                  = {deleteAllNotiteGunoi}      
        toBeArchived                          = {toBeArchived}
        setToBeArchived                       = {setToBeArchived}
        arhivareNotita                        = {arhivareNotita}
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
      />
      <ModalAlegereCuloare
        visibilityModalAlegereCuloare         = {visibilityModalAlegereCuloare}
        setVisibilityModalAlegereCuloare      = {setVisibilityModalAlegereCuloare}
        culoareCurenta                        = {culoareCurenta}
        setCuloareCurenta                     = {setCuloareCurenta}
        setareCurenta                         = {setareCurenta}
        setSetareCurenta                      = {setSetareCurenta}     
        culoareFundal                         = {culoareFundal}
        setCuloareFundal                      = {setCuloareFundal}
        culoareText                           = {culoareText}
        setCuloareText                        = {setCuloareText}
      />
      <ModalSetariGenerale
        visibilityModalSetariGenerale         = {visibilityModalSetariGenerale}
        setVisibilityModalSetariGenerale      = {setVisibilityModalSetariGenerale}
        /> 

    {
      vizualizareNotite ? 
      (
        <TouchableOpacity 
          style={[styles.floatingButton, {bottom: 15, right: 10} ]}
          onPress={handleOnPressOpenModalNotitaNoua}
        >
          <FontAwesomeIcon icon={faPlus} size={33} color='cyan'/>
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
