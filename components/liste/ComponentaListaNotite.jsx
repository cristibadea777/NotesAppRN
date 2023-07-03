import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


  //~~~~~~~~~~~~ modul de multiple-select ~~~~~~~~~~~~
  //cand se face long press pe o notita, notita se baga intr-o lista de notite selectate
  //daca lista de notite selectate nu e goala, cand facem press normal pe o notita (nu cu long press)
  //notita se va baga intr-o lista de notite selectate
  //cand se face press pe o notita care e deja selectata (se regaseste in lista) ea se deselecteaza
  //daca lista de notite selectate e goala (s-au deselectat toate notitele sau nu s-a selectat niciuna inca)
  //atunci la press noramal se deschide notita
  //cand se selecteaza,  se deschide un modal cu notitele randate (Modal Selectare Multipla)
  //pt ca atunci cand utilizatorul apasa pe butonul <- inapoi al telefonului, sa se deselecteze toate

  
const ComponentaListaNotite = ( {notite, setNotitaCurenta, setVisibilityModalVizualizareNotita, setVisibilityModalSelectareMultipla, listaNotiteSelectate, setListaNotiteSelectate, styles, culoarePictograme} ) => {

    const handleOpenModalSelectareMultipla = () => {
        setVisibilityModalSelectareMultipla(true)
    }

    const handleOnPressOpenModalVizualizareNotita = () => {
        setVisibilityModalVizualizareNotita(true)
    }
    
    //handle long press notita
    //functionalitatea de selectare/deselectare
    const handleOnLongPressNotita = (notita) => {
      handleOpenModalSelectareMultipla()
      //cream o lista cu aceleasi elemente cu a listei de notite selectate
      //operatiile le facem pe ea iar la final o setam sa fie lista de notite 
      //asta pentru a schimba starea listei de notite selectate, pt a se activa callback-ul functiei de randare notite
      //daca notita deja exista in lista, se scoate. daca nu, se adauga
      const lista = [...listaNotiteSelectate]
      //daca notita.id exista in lista (se itereaza prin id-urile elementelor listei notitelor selectate) se filtreaza
      if(listaNotiteSelectate.includes(notita))
        setListaNotiteSelectate(lista.filter((elementListaNotiteSelectate) => elementListaNotiteSelectate.id !== notita.id))      
      else {
        lista.push(notita)
        setListaNotiteSelectate(lista)
      }
    }
    const esteNotitaSelectata = (notita) => {
      if(listaNotiteSelectate.includes(notita))
        return true
      return false
    }
    
    //handle press simplu notita
    //daca lista de notite selectate este goala atunci se va deschide notita
    //daca exista notite selectate deja, atunci se activeaza functionalitatea de selectare/deselectare pt notita in cauza (handleOnLongPressNotita)
    //notita selectata va fi notita curenta, care se seteaza apoi si se trimite modalului de vizualizare notita
    const handleOnPressNotita = (notita) => {
      if(listaNotiteSelectate.length === 0){
        setNotitaCurenta(notita)
        handleDeschidereNotita()  //se poate deschide notita curenta
      }
      else
        handleOnLongPressNotita(notita) //se poate face selectia/deselectia prin apasare simpla a notitei
    }
    //afisare modal cu notita 
    const handleDeschidereNotita = () =>{
        handleOnPressOpenModalVizualizareNotita()
    }


    //functie pt randarea notitelor
    //se re-randeaza de fiecare data cand notite, listaNotiteSelectate se schimba, cu ajutorul hook-ului useCallback
    const randareNotite = useCallback( ()  => 
        {
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
                    {
                    randNotite.map( (notita) => (
                      <TouchableOpacity 
                        key={notita.id} 
                        style={[styles.notita, esteNotitaSelectata(notita) ? styles.notitaSelectata : null, {backgroundColor: notita.culoareFundal}]}
                        onLongPress={() => handleOnLongPressNotita(notita)}
                        onPress={() => handleOnPressNotita(notita)}
                      >
                        <View style={{flexDirection: "row", alignItems: "flex-start", height: "15%", backgroundColor: "black"}}>
                          <View style={{flex: 1}}>
                            <Text style={[styles.textNotita, { fontSize: 17, color: notita.culoareText} ]} numberOfLines={1}> {notita.titlu} </Text>
                          </View>
                          {notita.favorita === "true" && (
                            <View style={{alignItems: "center", justifyContent: "center", width: "15%", margin: 1}}>
                              <FontAwesomeIcon icon={faStar} color={culoarePictograme}/>
                            </View>
                          )}
                        </View>
                        {
                        /*
                        notita.poza === NU E EMPTY ? (
                          <View style={{alignItems: "center", justifyContent: "center", height: "45%", backgroundColor: "yellow"}}>
                            
                          </View>
                        ) : (
                          <>
                          </>
                        )
                        */
                        }
                        <View style={{alignItems: "center", flex: 1}}>
                            <Text style={[styles.textNotita, { fontSize: 12, color: notita.culoareText } ]} numberOfLines={8}>
                                {notita.continut}
                            </Text>
                        </View>
                      </TouchableOpacity>
                    ) ) 
                    }
                  </View>
              )
              randuri.push(rand)
            }
            //la final se returneaza componenta, ce este compusa din toate randurile de notite
            return randuri
        }, [notite, listaNotiteSelectate] 
        //se re-randeaza cand se schimba ori notitele (delete, edit, insert) ori listaNotiteSelectate (selectare, deselectare) 
    )

    return(
        <>
            {randareNotite()}
        </>
    )
}
export default ComponentaListaNotite