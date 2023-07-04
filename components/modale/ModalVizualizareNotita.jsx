import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, ScrollView, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFolderOpen, faPenNib, faRecycle, faTrashRestore, faX } from '@fortawesome/free-solid-svg-icons';
import styles from '../Styles';
import BaraModal from '../bare/BaraModal';


const ModalVizualizareNotita = ( {  visibilityModalVizualizareNotita, setVisibilityModalVizualizareNotita, notitaCurenta, updateNotita, styles,
                                    populareNotite, setVisibilityModalSetariNotite, culoareFundal, setCuloareFundal, culoareText, setCuloareText,
                                    setTempCuloareFundal, setTempCuloareText, vizualizareNotite, culoarePictograme, vizualizareArhiva, vizualizareGunoi,
                                    setToBeRestored, setVisibilityModalConfirmareActiune, setVisibilityModalVizualizareImagine, setFlagDeleteImagine,
                                    imagine, setImagine
                                } ) => {


    const [titlu,           setTitlu]           = useState('')
    const [continut,        setContinut]        = useState('')
    const [dataCreare,      setDataCreare]      = useState('') 
    const [dataModificare,  setDataModificare]  = useState('')
    const [favorita,        setFavorita]        = useState('')


    useEffect(
        () => {
            if(notitaCurenta !== null ){
                //console.log(notitaCurenta)
                setTitlu            (notitaCurenta.titlu)
                setContinut         (notitaCurenta.continut)
                setCuloareFundal    (notitaCurenta.culoareFundal)
                setCuloareText      (notitaCurenta.culoareText) 
                setTempCuloareFundal(notitaCurenta.culoareFundal)
                setTempCuloareText  (notitaCurenta.culoareText)
                setDataCreare       (notitaCurenta.dataCreare)
                setDataModificare   (notitaCurenta.dataModificare)
                setFavorita         (notitaCurenta.favorita)
                setImagine          (notitaCurenta.imagine)
            }
        }, [visibilityModalVizualizareNotita]
    )

    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setImagine(null)
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
    //nu se poate (pt ca nu vreau asa) arhiva direct din notita, doar la selectare multipla. totusi las codu 
    const handleOnPressButonActiuneArhivare = () => {
        setToBeArchived(true)
        setVisibilityModalConfirmareActiune(true)
    }

    //salvare notita editata (titlu si continut)
    const handleSaveNotita = () => {
        updateNotita(notitaCurenta, titlu, continut, culoareText, culoareFundal, favorita, imagine)
        populareNotite()
        handleCloseModal()
    }

    //deschidere modal setari 
    const handleOpenModalSetari = () => {
        setVisibilityModalSetariNotite(true)
    }

    return(
        <Modal  
            animationType="none"
            transparent={true}
            visible={visibilityModalVizualizareNotita}
            onRequestClose={handleCloseModal}
        >

            <View style={styles.containerModalNotita}>

                <BaraModal 
                    styles                              = {styles}
                    handleCloseModal                    = {handleCloseModal} 
                    culoarePictograme                   = {culoarePictograme}
                    vizualizareNotite                   = {vizualizareNotite}
                    handleOpenModalSetari               = {handleOpenModalSetari}
                    notitaCurenta                       = {notitaCurenta}
                    favorita                            = {favorita}
                    setFavorita                         = {setFavorita}
                    setImagine                          = {setImagine}
                    imagine                             = {imagine}
                    setFlagDeleteImagine                = {setFlagDeleteImagine}
                    setVisibilityModalConfirmareActiune = {setVisibilityModalConfirmareActiune}
                />

                {imagine && (
                    <View
                        style={{width: "100%", height: "35%"}}
                    >
                        <TouchableOpacity 
                            style={{flexGrow: 1}}
                            onPress={
                                () => {setVisibilityModalVizualizareImagine(true)}
                            }
                        >
                            <Image source={{ uri: imagine }} style={{ flex: 1 }} resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={[styles.containerTextNotitaModal, {height: "45%"}]}>
                    <TextInput 
                        placeholder='Titlu' 
                        placeholderTextColor={culoareText}
                        multiline={false} 
                        style={[styles.textInput, {textAlign: "center"}]}
                        numberOfLines={1}
                        onChangeText={newText => setTitlu(newText)}      
                        defaultValue={titlu}   
                        editable={vizualizareNotite}  
                        scrollEnabled={true}         
                    />
                    <ScrollView>
                        <TextInput 
                            placeholder='Continut' 
                            placeholderTextColor={culoareText}
                            multiline={true}  
                            style={[styles.textInput]}
                            onChangeText={newText => setContinut(newText)}
                            defaultValue={continut}
                            editable={vizualizareNotite}  
                            scrollEnabled={true}
                        />
                    </ScrollView>
                </View>
                

                {
                    vizualizareNotite ? (
                        <>
                        <TouchableOpacity 
                            style={[styles.floatingButtonEdit]}
                            onPress={handleSaveNotita}
                        >
                            <FontAwesomeIcon icon={faPenNib} size={33} color={culoarePictograme}/>
                        </TouchableOpacity>
                        <View
                            style={styles.containerModalData}
                        >
                            <Text style={styles.textData}> Date created:    {dataCreare}</Text>
                            <Text style={styles.textData}> Date modified: {dataModificare}</Text>
                        </View>
                        </>
                    ) 
                    :
                    vizualizareArhiva ? (
                        <>
                        <TouchableOpacity 
                            style={[styles.floatingButtonArchive]}
                            onPress={handleOnPressButonActiuneRestaurare}
                        >
                            <FontAwesomeIcon icon={faFolderOpen} size={33} color={culoarePictograme}/>
                        </TouchableOpacity>
                        <View
                            style={styles.containerModalData}
                        >
                            <Text style={styles.textData}></Text>
                            <Text style={styles.textData}>  Date archived: {dataModificare}</Text>
                        </View>
                        </>
                    )
                    : 
                    vizualizareGunoi ? (
                        <>
                            <TouchableOpacity 
                                style={[styles.floatingButtonRestore]}
                                onPress={handleOnPressButonActiuneRestaurare}
                            >
                                <FontAwesomeIcon icon={faTrashRestore} size={33} color={culoarePictograme}/>
                            </TouchableOpacity>            
                            <TouchableOpacity 
                                style={styles.floatingButtonDelete}
                                onPress={handleOnPressButonActiune}
                            >
                                <FontAwesomeIcon icon={faRecycle} size={33} color={culoarePictograme}/>
                            </TouchableOpacity>    
                        <View
                            style={styles.containerModalData}
                        >
                            <Text style={styles.textData}></Text>
                            <Text style={styles.textData}>  Date deleted: {dataModificare}</Text>
                        </View>
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
