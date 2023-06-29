import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faClockRotateLeft, faFolderOpen, faPalette, faPallet, faPenNib, faRecycle, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import styles from '../Styles';
import BaraModal from '../bare/BaraModal';


const ModalVizualizareNotita = ( {  visibilityModalVizualizareNotita, setVisibilityModalVizualizareNotita, notitaCurenta, updateNotita, styles,
                                    populareNotite, setVisibilityModalSetariNotite, culoareFundal, setCuloareFundal, culoareText, setCuloareText,
                                    setTempCuloareFundal, setTempCuloareText, vizualizareNotite, culoarePictograme, vizualizareArhiva, vizualizareGunoi,
                                    setToBeRestored, setVisibilityModalConfirmareActiune,
                                } ) => {


    const [titlu,           setTitlu]           = useState('')
    const [continut,        setContinut]        = useState('')


    useEffect(
        () => {
            if(notitaCurenta !== null ){
                console.log(notitaCurenta)
                setTitlu            (notitaCurenta.titlu)
                setContinut         (notitaCurenta.continut)
                setCuloareFundal    (notitaCurenta.culoareFundal)
                setCuloareText      (notitaCurenta.culoareText) 
                setTempCuloareFundal(notitaCurenta.culoareFundal)
                setTempCuloareText  (notitaCurenta.culoareText)
            }
        }, [visibilityModalVizualizareNotita]
    )

    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setVisibilityModalVizualizareNotita(false)
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



    //salvare notita editata (titlu si continut)
    const handleSaveNotita = () => {
        updateNotita(notitaCurenta, titlu, continut, culoareText, culoareFundal)
        populareNotite()
        handleCloseModal()
    }

    //deschidere modal setari 
    const handleOpenModalSetari = () => {
        setVisibilityModalSetariNotite(true)
    }

    return(
        <Modal  
            animationType="slide"
            transparent={true}
            visible={visibilityModalVizualizareNotita}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModalNotita}>

                <BaraModal 
                    styles                  = {styles}
                    handleCloseModal        = {handleCloseModal} 
                    culoarePictograme       = {culoarePictograme}
                    vizualizareNotite       = {vizualizareNotite}
                    handleOpenModalSetari   = {handleOpenModalSetari}
                />

                <View style={styles.containerTextNotitaModal}>
                    <TextInput 
                        placeholder='Titlu' 
                        placeholderTextColor={culoareText}
                        multiline={false} 
                        style={[styles.textInput, {textAlign: "center"}]}
                        numberOfLines={1}
                        onChangeText={newText => setTitlu(newText)}      
                        defaultValue={titlu}   
                        editable={vizualizareNotite}               
                    />
                    <TextInput 
                        placeholder='Continut' 
                        placeholderTextColor={culoareText}
                        multiline={true}  
                        style={[styles.textInput]}
                        onChangeText={newText => setContinut(newText)}
                        defaultValue={continut}
                        editable={vizualizareNotite}  
                    />
                </View>
                

                {
                    vizualizareNotite ? (
                        <TouchableOpacity 
                            style={[styles.floatingButtonEdit]}
                            onPress={handleSaveNotita}
                        >
                            <FontAwesomeIcon icon={faPenNib} size={33} color={culoarePictograme}/>
                        </TouchableOpacity>
                    ) 
                    :
                    vizualizareArhiva ? (
                        <TouchableOpacity 
                            style={[styles.floatingButtonEdit]}
                            onPress={handleOnPressButonActiuneRestaurare}
                        >
                            <FontAwesomeIcon icon={faFolderOpen} size={33} color={culoarePictograme}/>
                        </TouchableOpacity>
                    )
                    : 
                    vizualizareGunoi ? (
                        <>
                            <TouchableOpacity 
                                style={[styles.floatingButtonEdit]}
                                onPress={handleOnPressButonActiuneRestaurare}
                            >
                                <FontAwesomeIcon icon={faTrashRestore} size={33} color={culoarePictograme}/>
                            </TouchableOpacity>            
                            <TouchableOpacity 
                                style={[styles.floatingButtonEdit, {left: 7}]}
                                onPress={handleOnPressButonActiune}
                            >
                                <FontAwesomeIcon icon={faRecycle} size={33} color={culoarePictograme}/>
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
        </Modal>
    )
}
export default ModalVizualizareNotita
