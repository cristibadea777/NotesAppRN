import React, { useEffect } from 'react';
import { Modal, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBoxesPacking, faTrash, faTrashRestore, faX } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import ComponentaListaNotite from './ComponentaListaNotite';

//Modalul de selectare este pentru a deselecta tot apasand fie butonul <- fie butonul de inapoi al telefonului
//Butoanele barei de sus a modalului se schimba, in functie de ce fel de notite se vizualizeaza (active, aruncate, arhivate)
const ModalSelectareMultipla = ( { visibilityModalSelectareMultipla, setVisibilityModalSelectareMultipla, notite, setNotitaCurenta, 
                                   setVisibilityModalVizualizareNotita, listaNotiteSelectate, setListaNotiteSelectate, 
                                   setVisibilityModalConfirmareActiune, vizualizareNotite, vizualizareGunoi, vizualizareArhiva, setToBeRestored} 
                               ) => {

    const handleCloseModal = () => {
        setVisibilityModalSelectareMultipla(false)
        listaNotiteSelectate.splice(0, listaNotiteSelectate.length)
    }

    //activare modal confirmare actiune (stergere, stergere permanenta)
    const handleOnPressButonActiune = () => {
        setVisibilityModalConfirmareActiune(true)
    }

     //activare modal confirmare actiune (restaurare)
    const handleOnPressButonActiuneRestaurare = () => {
        setToBeRestored(true)
        setVisibilityModalConfirmareActiune(true)
    }

    useEffect(
        () => {
            if(listaNotiteSelectate.length === 0)
                handleCloseModal()
        }, [listaNotiteSelectate]
    )


    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalSelectareMultipla}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModal}>

                <View style={[styles.containerBara, {backgroundColor: "#1e1e1e"}]}>
                    <View style={[styles.containerBaraStanga, {paddingLeft: 7} ]}> 
                        <TouchableOpacity 
                            onPress={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size={25} color='cyan'/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.containerBaraDreapta}>
                        <View style={{flexDirection: "row"}}>
                            { 
                            vizualizareNotite ? (
                                <>
                                <TouchableOpacity 
                                    onPress={{}}
                                    style={{marginRight: 49}}
                                >
                                    <FontAwesomeIcon icon={faBoxesPacking} size={25} color='cyan'/>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiune}
                                    style={{paddingRight: 7}}
                                >
                                    <FontAwesomeIcon icon={faTrash} size={25} color='cyan'/>
                                </TouchableOpacity>
                                </>
                            )
                            : 
                            vizualizareGunoi ? (
                                <>
                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiuneRestaurare}
                                    style={{marginRight: 49}}
                                >
                                    <FontAwesomeIcon icon={faTrashRestore} size={25} color='cyan'/>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiune}
                                    style={{paddingRight: 7}}
                                >
                                    <FontAwesomeIcon icon={faX} size={25} color='cyan'/>
                                </TouchableOpacity>
                                </>
                            )
                            :
                            vizualizareArhiva ? (
                                <>
                                <Text>Arhiva</Text>
                                </>
                            )
                            : 
                            (
                                <></>
                            )
                            }

                        </View>
                    </View>


                </View>

                
                <ScrollView style={{flex: 1, backgroundColor: "#232B2B"}}>        
                    <ComponentaListaNotite 
                        notite                               = {notite}
                        setNotitaCurenta                     = {setNotitaCurenta}
                        setVisibilityModalVizualizareNotita  = {setVisibilityModalVizualizareNotita}
                        setVisibilityModalSelectareMultipla  = {setVisibilityModalSelectareMultipla}
                        listaNotiteSelectate                 = {listaNotiteSelectate}
                        setListaNotiteSelectate              = {setListaNotiteSelectate}
                    />      
                </ScrollView>
                
            </View>



        </Modal>
    )
}
export default ModalSelectareMultipla
