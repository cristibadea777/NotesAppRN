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
         deleteNotitaPermanent, restaurareNotitaStearsa, deleteAllNotiteGunoi, 
         arhivareNotita, getNotiteArhivate, updateNotita, creareTabelNotita, creareTabelSetare, 
         creareSetariInitiale, preluareSetari, verificareExistentaSetari, updateSetari 
       } from './components/BazaDeDate';
import ModalConfirmareActiune from './components/modale/ModalConfirmareActiune';
import ModalSetariNotite from './components/modale/ModalSetariNotite';
import ModalAlegereCuloare from './components/modale/ModalAlegereCuloare';
import ModalSetariGenerale from './components/modale/ModalSetariGenerale';
import MainAppBar from './components/bare/MainAppBar';
import ModalDonate from './components/modale/ModalDonate';



export default function App() {

//TO DO


///DE REPARAT BUTOANELE DE LA TRASH SI ARHIVA

//adaugat datele creare+modificare+stergere/arhivare in modaluri

////calculare offset notita selectata index si facut scroll la scrollview la modal selectare multipla
////preluare cat de scrollat este scrollu principal apoi pus pe scrollu modalului

////de scos buton notita noua, buton editare notita iar text input sa fie dezactivat doar scrollabil daca vizualizareGunoi/vizualizareArhiva sunt true 
////buton schimbare font size titlu si text (defaultu se pastreaza daca nu se selecteaza nik)

////cand e gunoi sau arhiva, dezactivat toate butoanele, text input, etc inafara de buton inapoi
    ///container bara transformat intr-o componenta

///posibil in setari notita (pe langa culoare fundal, culoare text, size) - culoare titlu

///simple note/todo list la alegere.nu modal nou, ci in functie de optiune sa fie fie text inputu sau scroll in care se adauga optiuni

///de pus scroll in setari si adaugat culoare bara - bara facuta in componnenta, 
//buton default la setari (cu valorile initiale din creare setari) - se apasa si se seteaza
//adaugat coloane la tabel notite
//data modificare - modificata cand se editeaza cu data de azi
//data stergere - se reseteaza cu data de azi daca notita se recupereaza 
//data stergere 30 zile...notita se sterge de tot
//favorita (aici true/false - cand se creaza e initial pe fals) 
    //- se schimba din buton (si modal notita noua si modal vizualizare notita)
    //- apare ca o pictograma mica in colt dreapta al notitei (container titlu sa fie cu flex, pictograma sa ocupe 10% daca e notita.favorita e true)
//functionalitate sortare - buton pe bara - la fs existente sa se ca parametru in plus si  directie, camp (facute unele default in BD, se schimba in bd din butonu app bar)
////TRASH - se sterg din bd dupa 30 de zile dupa ce au fost aruncate -- adaugat bara si pictograma informatii, care sa faca vizibil un modal care spune chestia asta / sau alerta care sa dispara dupa 5 secunde dupa ce se acceseaza gunoiu
//backup si restore
//salvare teme de culori
  ///temele de culori = inregistrate in tabelu setare. prima inregistrare (id 1) va fi default

  ///si inca un tabel cu id tema curenta - care o sa  fie dat ca parametru (acum se selecteaza id = 1). initial o sa fie 1 (tema default)
  ///in modal alegere culoare in loc de if else facut un switch
///restore note button color 
///delete note button color
///schimbare culoare pt mai multe in modal selectare multipla


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

    //to do
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
    setCuloareGeneralaFundalNotita(culoareGeneralaFundalNotita)
    setCuloareGeneralaTextNotita(culoareGeneralaTextNotita)
    setCuloareFundalAplicatie(culoareFundalAplicatie)
    setCuloareTextAplicatie(culoareTextAplicatie)
    setCuloareButonNewNotita(culoareButonNewNotita)
    setCuloareButonEditNotita(culoareButonEditNotita)
    setCuloareBaraAplicatie(culoareBaraAplicatie)
    setCuloarePictograme(culoarePictograme)
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
  //Modal donate
  const [visibilityModalDonate,            setVisibilityModalDonate]            = useState(false)

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
      console.log("Setari schimbate, re-randare")
      setStyles(generareStiluri(culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareFundal, culoareText, culoareBaraAplicatie, culoarePictograme))
    }, [culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareFundal, culoareText, culoareBaraAplicatie, culoarePictograme]
  )

  //culoare curenta 
  const [culoareCurenta,                   setCuloareCurenta]                   = useState('')
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
  
  return (
    <View style={styles.containerPrincipal}>

    <StatusBar style="auto"> </StatusBar>

    <View style={styles.containerNotite}>

      <MainAppBar 
        vizualizareNotite                      = {vizualizareNotite} 
        vizualizareArhiva                      = {vizualizareArhiva} 
        vizualizareGunoi                       = {vizualizareGunoi}
        handleGolireCosGunoi                   = {handleGolireCosGunoi}
        handleOnPressOpenModalMeniu            = {handleOnPressOpenModalMeniu}
        culoarePictograme                      = {culoarePictograme}
        styles = {styles}
      /> 

      <ScrollView style={{flex: 1}}>        
        <ComponentaListaNotite 
          notite                               = {notite}
          setNotitaCurenta                     = {setNotitaCurenta}
          setVisibilityModalVizualizareNotita  = {setVisibilityModalVizualizareNotita}
          setVisibilityModalSelectareMultipla  = {setVisibilityModalSelectareMultipla}
          listaNotiteSelectate                 = {listaNotiteSelectate}
          setListaNotiteSelectate              = {setListaNotiteSelectate}
          styles                               = {styles}
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
        setTempCuloareFundal                = {setTempCuloareFundal} 
        setTempCuloareText                  = {setTempCuloareText}
        culoarePictograme                   = {culoarePictograme}
        styles                              = {styles}
      />

      <ModalMeniu
        visibilityModalMeniu                = {visibilityModalMeniu}
        setVisibilityModalMeniu             = {setVisibilityModalMeniu}
        setVizualizareNotite                = {setVizualizareNotite}
        setVizualizareGunoi                 = {setVizualizareGunoi}
        setVizualizareArhiva                = {setVizualizareArhiva}
        setVisibilityModalDonate            = {setVisibilityModalDonate}
        setVisibilityModalSetariGenerale    = {setVisibilityModalSetariGenerale}
        culoarePictograme                   = {culoarePictograme}    
        styles                              = {styles}
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
        setTempCuloareFundal                = {setTempCuloareFundal} 
        setTempCuloareText                  = {setTempCuloareText}
        vizualizareNotite                   = {vizualizareNotite}
        vizualizareArhiva                   = {vizualizareArhiva}
        vizualizareGunoi                    = {vizualizareGunoi}
        culoarePictograme                   = {culoarePictograme}
        setToBeRestored                     = {setToBeRestored}
        setVisibilityModalConfirmareActiune = {setVisibilityModalConfirmareActiune}
        styles                              = {styles}
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
        culoarePictograme                    = {culoarePictograme}
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
        deleteAllNotiteGunoi                  = {deleteAllNotiteGunoi}      
        toBeArchived                          = {toBeArchived}
        setToBeArchived                       = {setToBeArchived}
        arhivareNotita                        = {arhivareNotita}
        notitaCurenta                         = {notitaCurenta}
        setVisibilityModalVizualizareNotita   = {setVisibilityModalVizualizareNotita}
        styles                                = {styles}
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
        culoareCurenta                        = {culoareCurenta}
        setCuloareCurenta                     = {setCuloareCurenta}
        setareCurenta                         = {setareCurenta}
        setSetareCurenta                      = {setSetareCurenta}     
        setCuloareFundal                      = {setCuloareFundal}
        setCuloareText                        = {setCuloareText}
        setCuloareFundalAplicatie             = {setCuloareFundalAplicatie} 
        setCuloareTextAplicatie               = {setCuloareTextAplicatie}
        setCuloareGeneralaFundalNotita        = {setCuloareGeneralaFundalNotita}
        setCuloareGeneralaTextNotita          = {setCuloareGeneralaTextNotita}
        setCuloareButonNewNotita              = {setCuloareButonNewNotita}
        setCuloareButonEditNotita             = {setCuloareButonEditNotita}
        setCuloareBaraAplicatie               = {setCuloareBaraAplicatie}
        setCuloarePictograme                  = {setCuloarePictograme}
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

      <ModalDonate
        visibilityModalDonate                 = {visibilityModalDonate} 
        setVisibilityModalDonate              = {setVisibilityModalDonate}
        culoarePictograme                     = {culoarePictograme}
        styles                                = {styles}
      />

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