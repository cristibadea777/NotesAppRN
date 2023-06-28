import { View, Modal, Text, TouchableOpacity } from "react-native"
import styles from "./Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useCallback, useEffect, useState } from "react"


const ModalSetariNotite = ( { visibilityModalSetariNotite, setVisibilityModalSetariNotite, 
                              setVisibilityModalAlegereCuloare, setSetareCurenta, styles, 
                              culoareFundal, setCuloareFundal, culoareText, setCuloareText,
                              tempCuloareFundal, tempCuloareText
                            } ) => {

    //resetare valori si inchidere modal
    const handleCloseModal = () => {
        setVisibilityModalSetariNotite(false)
    }

    //in modal setari notita press cancel => culori fundal si text se reseteaza cu variabilele temp pt culori
    //press ok => se inchide modalu, ele fiind deja setate. se da click pebuton  "edit" in modal vizualizare => se salveaza si in BD 

    const handleCancel = () => {
        console.log("Valori resetate cu cele TEMP: " + tempCuloareFundal + ' ' + tempCuloareText)
        setCuloareFundal(tempCuloareFundal)
        setCuloareText(tempCuloareText)
        handleCloseModal()
    }

    const handleOk = () => {
        handleCloseModal()
    }


    const handlePressAlegereCuloareFundalNotita = () => {
        setSetareCurenta("fundal")
        setVisibilityModalAlegereCuloare(true)
    }
    const handlePressAlegereCuloareTextNotita = () => {
        setSetareCurenta("text")
        setVisibilityModalAlegereCuloare(true)
    }

    const randareContinutModal = useCallback( () =>
        {
        return(
            <View style={styles.containerModalSetariNotite}>
                <View style={{height:"25%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.textTitluModal}>Note colors</Text>
                </View>

                <View style={{flexDirection: "row", height:"25%"}}>

                    <View style={styles.elementModal}>
                        <Text style={styles.textModal}>Background color</Text>
                    </View>

                    <View style={[styles.elementModal, {alignItems: "center", justifyContent: "center"}]}> 
                        <TouchableOpacity 
                            activeOpacity={1}
                            style={styles.butonCuloare}
                            onPress={handlePressAlegereCuloareFundalNotita}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100}}>
                                <FontAwesomeIcon icon={faCircle} size={57} color={culoareFundal}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{flexDirection: "row", height:"25%"}}>
                    <View style={styles.elementModal}>
                        <Text style={styles.textModal}>Text color</Text>
                    </View>
                    <View style={[styles.elementModal, {alignItems: "center", justifyContent: "center"}]}> 
                        <TouchableOpacity 
                            activeOpacity={1}
                            style={styles.butonCuloare}
                            onPress={handlePressAlegereCuloareTextNotita}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100}}>
                                <FontAwesomeIcon icon={faCircle} size={57} color={culoareText}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                
                <View style={{flexDirection: "row", height:"25%"}}>
                    <View style={[styles.elementModal, {justifyContent: "center", alignItems: "center"}]}>
                        <TouchableOpacity 
                            style={[styles.butonModal, {backgroundColor:"#00c3e3"}]}
                            onPress={handleOk}
                        >
                            <Text style={styles.textButonModal}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={[styles.elementModal, {justifyContent: "center", alignItems: "center"}]}>
                        <TouchableOpacity 
                            style={[styles.butonModal, {backgroundColor:"#EDEADE"}]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.textButonModal}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            )
        }, [culoareFundal, culoareText]  
    )

    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalSetariNotite}
            onRequestClose={handleCloseModal}
        >
            <View style={[styles.containerBara, {backgroundColor: 'black'}]}>
                <View style={[styles.containerBaraStanga, {paddingLeft: 7} ]}> 
                    <TouchableOpacity 
                        onPress={handleCloseModal}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size={25} color='cyan'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>


                <>
                    {randareContinutModal()}
                </>

            </View>

        </Modal>
    )

}
export default ModalSetariNotite