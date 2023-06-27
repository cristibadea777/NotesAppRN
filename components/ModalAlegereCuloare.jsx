import { View, Modal, TouchableOpacity } from "react-native"
import styles from "./Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import ComponentaListaCulori from "./ComponentaListaCulori"


const ModalAlegereCuloare = ( { visibilityModalAlegereCuloare, setVisibilityModalAlegereCuloare, 
                                culoareCurenta, setCuloareCurenta, setareCurenta, styles,
                                setCuloareFundal, setCuloareText, setCuloareFundalAplicatie,  setCuloareTextAplicatie, 
                                setCuloareGeneralaFundalNotita, setCuloareGeneralaTextNotita, setCuloareButonNewNotita, setCuloareButonEditNotita,
                            } ) => {

    //inchidere modal, resetare setare curenta si culoare curenta, setare fundal/text cu culoarea curenta 
    const handleCloseModal = () => {
        setVisibilityModalAlegereCuloare(false)
    }

    //cand se alege culoarea, starea culorii curente se schimba, si porneste useEffectul ce seteaza culoarea setarii
    useEffect(
        () => {
            ///~~~ pt notita curenta editata, notita noua
            if(setareCurenta === 'fundal')
                setCuloareFundal(culoareCurenta)
            else if(setareCurenta === 'text')
                setCuloareText(culoareCurenta)
            ///~~~ pt setarile generale
            else if(setareCurenta === 'fundalAplicatie')
                setCuloareFundalAplicatie(culoareCurenta)
            else if(setareCurenta === 'textAplicatie')
                setCuloareTextAplicatie(culoareCurenta)
            else if(setareCurenta === 'fundalNotitaDefault')
                setCuloareGeneralaFundalNotita(culoareCurenta)
            else if(setareCurenta === 'textNotitaDefault')
                setCuloareGeneralaTextNotita(culoareCurenta)
            else if(setareCurenta === 'butonNewNotita')
                setCuloareButonNewNotita(culoareCurenta)
            else if(setareCurenta === 'butonEditNotita')
                setCuloareButonEditNotita(culoareCurenta)
            handleCloseModal() //inchidere modal
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
