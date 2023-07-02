import React, { useEffect } from 'react';
import { Modal, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faFolderOpen, faFolderPlus, faRecycle, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import styles from '../Styles';
import ComponentaListaNotite from '../liste/ComponentaListaNotite';

//Modalul de selectare este pentru a deselecta tot apasand fie butonul <- fie butonul de inapoi al telefonului
//Butoanele barei de sus a modalului se schimba, in functie de ce fel de notite se vizualizeaza (active, aruncate, arhivate)
const ModalSelectareMultipla = ( { visibilityModalSelectareMultipla, setVisibilityModalSelectareMultipla, notite, setNotitaCurenta, styles,
                                   setVisibilityModalVizualizareNotita, listaNotiteSelectate, setListaNotiteSelectate, setToBeArchived, culoarePictograme,
                                   setVisibilityModalConfirmareActiune, vizualizareNotite, vizualizareGunoi, vizualizareArhiva, setToBeRestored, offsetScroll} 
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

    //activare modal confirmare actiune (arhivare)
    const handleOnPressButonActiuneArhivare = () => {
        setToBeArchived(true)
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
            <View style={styles.containerPrincipal}>

                <View style={styles.containerBara}>
                    <View style={[styles.containerBaraStanga, {paddingLeft: 7} ]}> 
                        <TouchableOpacity 
                            onPress={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size={25} color={culoarePictograme}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.containerBaraDreapta}>
                        <View style={{flexDirection: "row"}}>
                            { 
                            vizualizareNotite ? (
                                <>
                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiuneArhivare}
                                    style={{marginRight: 49}}
                                >
                                    <FontAwesomeIcon icon={faFolderPlus} size={25} color={culoarePictograme}/>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiune}
                                    style={{paddingRight: 7}}
                                >
                                    <FontAwesomeIcon icon={faTrash} size={25} color={culoarePictograme}/>
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
                                    <FontAwesomeIcon icon={faTrashRestore} size={25} color={culoarePictograme}/>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiune}
                                    style={{paddingRight: 7}}
                                >
                                    <FontAwesomeIcon icon={faRecycle} size={25} color={culoarePictograme}/>
                                </TouchableOpacity>
                                </>
                            )
                            :
                            vizualizareArhiva ? (
                                <>
                                <TouchableOpacity 
                                    onPress={handleOnPressButonActiuneRestaurare}
                                    style={{paddingRight: 7}}
                                >
                                    <FontAwesomeIcon icon={faFolderOpen} size={25} color={culoarePictograme}/>
                                </TouchableOpacity>
                                </>
                            )
                            : 
                            (
                                <>
                                </>
                            )
                            }

                        </View>
                    </View>


                </View>

                
                <ScrollView 
                    style={{flex: 1}}
                    contentOffset={{x: 0, y: offsetScroll}}
                >        
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
                
            </View>



        </Modal>
    )
}
export default ModalSelectareMultipla
