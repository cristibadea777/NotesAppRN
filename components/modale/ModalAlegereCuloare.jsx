import { View, Modal, TouchableOpacity } from "react-native"
import styles from "../Styles"
import { useEffect } from "react"
import ComponentaListaCulori from "../liste/ComponentaListaCulori"
import BaraModal from "../bare/BaraModal"


const ModalAlegereCuloare = ( { visibilityModalAlegereCuloare, setVisibilityModalAlegereCuloare, 
                                setCuloareCurenta, setareCurenta, styles, setCuloareBaraAplicatie,
                                setCuloareFundal, setCuloareText, setCuloareFundalAplicatie,  setCuloareTextAplicatie, 
                                setCuloareGeneralaFundalNotita, setCuloareGeneralaTextNotita, setCuloareButonNewNotita, setCuloareButonEditNotita,
                                setCuloarePictograme, culoarePictograme, setCuloareNotitaSelectata, setCuloareButonArchive, setCuloareButonDelete, setCuloareButonRestore
                            } ) => {

    //inchidere modal, resetare setare curenta si culoare curenta, setare fundal/text cu culoarea curenta 
    const handleCloseModal = () => {
        setVisibilityModalAlegereCuloare(false)
    }

    const setareCuloareSetare = (culoare) => {
        switch(setareCurenta){
            ///~~~ pt notita curenta editata, notita noua
            case 'fundal':
                setCuloareFundal(culoare)
                break
            case 'text':
                setCuloareText(culoare)
                break
            ///~~~ pt setarile generale
            case 'fundalAplicatie':
                setCuloareFundalAplicatie(culoare)
                break
            case 'textAplicatie':
                setCuloareTextAplicatie(culoare)
                break
            case 'fundalNotitaDefault':
                setCuloareGeneralaFundalNotita(culoare)
                break
            case 'textNotitaDefault':
                setCuloareGeneralaTextNotita(culoare)
                break
            case 'butonNewNotita':
                setCuloareButonNewNotita(culoare)
                break
            case 'butonEditNotita':
                setCuloareButonEditNotita(culoare)
                break
            case 'baraAplicatie':
                setCuloareBaraAplicatie(culoare)
                break
            case 'pictograme':
                setCuloarePictograme(culoare)
                break
            case 'selectieNotita':
                setCuloareNotitaSelectata(culoare)
                break
            case 'butonArhiva':
                setCuloareButonArchive(culoare)
                break
            case 'butonDelete':
                setCuloareButonDelete(culoare)
                break
            case 'butonRestore':
                setCuloareButonRestore(culoare)
                break
            default:
                console.log("Eroare alegere setare")
        }
        handleCloseModal() //inchidere modal
    }

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

                    <ComponentaListaCulori setCuloareCurenta={setCuloareCurenta} styles={styles} setareCuloareSetare={setareCuloareSetare}/>

                </View>
            </View>

        </Modal>
    )

}
export default ModalAlegereCuloare
