import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faPalette } from '@fortawesome/free-solid-svg-icons';
import styles from '../Styles';
import BaraModal from '../bare/BaraModal';


const ModalNotitaNoua = ( { visibilityModalNotitaNoua, setVisibilityModalNotitaNoua, adaugaNotita, populareNotite,
                            setVisibilityModalSetariNotite, culoareGeneralaTextNotita, culoareGeneralaFundalNotita, 
                            culoareFundal, culoareText, setCuloareFundal, setCuloareText, styles, flagDeleteImagine, setFlagDeleteImagine,
                            setTempCuloareFundal, setTempCuloareText, culoarePictograme, imagine, setImagine, flagNotitaNoua, setFlagNotitaNoua,
                            setVisibilityModalConfirmareActiune
                        } ) => {

    const [titlu,       setTitlu]       = useState('')
    const [continut,    setContinut]    = useState('')


    useEffect( () => {
            if(visibilityModalNotitaNoua){
                setCuloareFundal    (culoareGeneralaFundalNotita)
                setCuloareText      (culoareGeneralaTextNotita)  
                setTempCuloareFundal(culoareGeneralaFundalNotita)
                setTempCuloareText  (culoareGeneralaTextNotita)
                setImagine          (null)
                //nu am nevoie de temp imagine pt ca nu am o "imagine default" pt fiecare notita noua care in caz ca dau cancel sa se reseteze
            }
        }, [visibilityModalNotitaNoua]
    )

    //resetare valori
    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setFlagNotitaNoua(false)
        setVisibilityModalNotitaNoua(false)
        setImagine(null)
    }

    const handleSaveNotita = async () => {
        //console.log(culoareText)
        //console.log(culoareFundal)
        adaugaNotita(titlu, continut, culoareText, culoareFundal, imagine)
        handleCloseModal()
        populareNotite()
    }
    
    const handleOpenModalSetari = () => {
        setVisibilityModalSetariNotite(true)
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibilityModalNotitaNoua}
            onRequestClose={handleCloseModal}
        >
          <View style={styles.containerModalNotita}>

                <BaraModal
                    styles                              = {styles}
                    handleCloseModal                    = {handleCloseModal} 
                    culoarePictograme                   = {culoarePictograme}
                    vizualizareNotite                   = {true}
                    handleOpenModalSetari               = {handleOpenModalSetari}
                    setImagine                          = {setImagine}
                    imagine                             = {imagine}
                    flagNotitaNoua                      = {flagNotitaNoua}
                    setFlagDeleteImagine                = {setFlagDeleteImagine}
                    setVisibilityModalConfirmareActiune = {setVisibilityModalConfirmareActiune}
                />
                
                {imagine && 
                <View style={{width: "100%", height: "35%"}}>
                    <Image source={{ uri: imagine }} style={{ flex: 1 }} />
                </View>
                }
                

                <View style={styles.containerModalNotita}>
                    <TextInput 
                        multiline={false} 
                        placeholder='Titlu' 
                        placeholderTextColor={culoareText} 
                        style={[styles.textInput, {textAlign: "center"}]}
                        numberOfLines={1}
                        onChangeText={newText => setTitlu(newText)}
                        defaultValue={titlu}
                    />
                    <ScrollView>
                        <TextInput 
                            multiline={true}  
                            placeholder='Text'  
                            placeholderTextColor={culoareText} 
                            style={[styles.textInput]}
                            onChangeText={newText => setContinut(newText)}
                            defaultValue={continut}
                        />
                    </ScrollView>
                </View>
                

                <TouchableOpacity 
                    style={[styles.floatingButtonEdit]}
                    onPress={handleSaveNotita}
                >
                    <FontAwesomeIcon icon={faSave} size={33} color={culoarePictograme}/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default ModalNotitaNoua