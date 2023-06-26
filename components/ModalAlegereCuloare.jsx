import { View, Modal, TouchableOpacity } from "react-native"
import styles from "./Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import ComponentaListaCulori from "./ComponentaListaCulori"


const ModalAlegereCuloare = ( { visibilityModalAlegereCuloare, setVisibilityModalAlegereCuloare, 
                                culoareCurenta, setCuloareCurenta, setareCurenta, 
                                culoareFundal, setCuloareFundal, culoareText, setCuloareText
                            } ) => {

    //inchidere modal, resetare setare curenta si culoare curenta, setare fundal/text cu culoarea curenta 
    const handleCloseModal = () => {
        setVisibilityModalAlegereCuloare(false)
    }

    useEffect(
        () => {
            if(setareCurenta === 'fundal')
                setCuloareFundal(culoareCurenta)
            else if(setareCurenta === 'text')
                setCuloareText(culoareCurenta)
            handleCloseModal()

        }, [culoareCurenta]
    )
    
    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalAlegereCuloare}
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
                <View style={styles.containerModalSetariNotite}>

                    <ComponentaListaCulori setCuloareCurenta={setCuloareCurenta} />

                </View>
            </View>

        </Modal>
    )

}
export default ModalAlegereCuloare
