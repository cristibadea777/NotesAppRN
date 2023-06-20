import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBoxesPacking, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import ComponentaListaNotite from './ComponentaListaNotite';


const ModalSelectareMultipla = ( {visibilityModalSelectareMultipla, setVisibilityModalSelectareMultipla, notite, setNotitaCurenta, setVisibilityModalVizualizareNotita, listaNotiteSelectate, setListaNotiteSelectate, setVisibilityModalConfirmareStergere} ) => {

    const handleCloseModal = () => {
        setVisibilityModalSelectareMultipla(false)
        listaNotiteSelectate.splice(0, listaNotiteSelectate.length)
    }


    //activare modal confirmare stergere
    const handleOnPressButonStergere = () => {
        setVisibilityModalConfirmareStergere(true)
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
                            <TouchableOpacity 
                            onPress={{}}
                            style={{marginRight: 49}}
                            >
                                <FontAwesomeIcon icon={faBoxesPacking} size={25} color='cyan'/>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleOnPressButonStergere}
                                style={{paddingRight: 7}}
                            >
                                <FontAwesomeIcon icon={faTrash} size={25} color='cyan'/>
                            </TouchableOpacity>
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
