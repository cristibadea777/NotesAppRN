import { View, Modal, TouchableOpacity } from "react-native"
import styles from "../Styles"
import { useEffect } from "react"
import ComponentaListaCulori from "../liste/ComponentaListaCulori"
import BaraModal from "../app-bars/BaraModal"


const ModalAlegereCuloare = ( { visibilityModalAlegereCuloare, setVisibilityModalAlegereCuloare, 
                                culoareCurenta, setCuloareCurenta, setareCurenta, styles, setCuloareBaraAplicatie,
                                setCuloareFundal, setCuloareText, setCuloareFundalAplicatie,  setCuloareTextAplicatie, 
                                setCuloareGeneralaFundalNotita, setCuloareGeneralaTextNotita, setCuloareButonNewNotita, setCuloareButonEditNotita,
                                setCuloarePictograme, culoarePictograme
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
            else if(setareCurenta === 'baraAplicatie')
                setCuloareBaraAplicatie(culoareCurenta)
            else if(setareCurenta === 'pictograme')
                setCuloarePictograme(culoareCurenta)
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
            
            <BaraModal
                    styles                  = {styles}
                    handleCloseModal        = {handleCloseModal} 
                    culoarePictograme       = {culoarePictograme}
                    vizualizareNotite       = {false}
                    handleOpenModalSetari   = {""}
            />


            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <View style={styles.containerModalAlegereCuloare}>

                    <ComponentaListaCulori setCuloareCurenta={setCuloareCurenta} />

                </View>
            </View>

        </Modal>
    )

}
export default ModalAlegereCuloare
