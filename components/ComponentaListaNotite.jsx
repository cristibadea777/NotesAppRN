import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';


const ComponentaListaNotite = ( {notite, setNotitaCurenta, setVisibilityModalVizualizareNotita} ) => {

    const handleOnPressOpenModalVizualizareNotita = () => {
        setVisibilityModalVizualizareNotita(true)
    }
    const [listaNotiteSelectate, setListaNotiteSelectate] = useState([])
    //handle long press notita
    //functionalitatea de selectare/deselectare
    const handleOnLongPressNotita = (notita) => {
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
                {randNotite.map( (notita) => (
                    <TouchableOpacity 
                        key={notita.id} 
                        style={[styles.notita, esteNotitaSelectata(notita) ? styles.notitaSelectata : null]}
                        onLongPress={() => handleOnLongPressNotita(notita)}
                        onPress={() => handleOnPressNotita(notita)}
                    >
                    <View style={{alignItems: "center"}}>
                        <Text style={[styles.textNotita, { fontSize: 17} ]} numberOflines={1}>
                            {notita.titlu}
                        </Text>
                    </View>
                    <Text style={[styles.textNotita, { fontSize: 12 } ]} numberOfLines={8}>
                        {notita.continut}
                    </Text>
                    </TouchableOpacity>
                ) ) }
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