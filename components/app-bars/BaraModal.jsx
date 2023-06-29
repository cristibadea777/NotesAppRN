import { faArrowLeft, faPalette } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"

const BaraModal = ( {styles, handleCloseModal, handleOpenModalSetari, culoarePictograme, vizualizareNotite} ) => {

    //bara modal 
    //butonul din stanga (arrow left) vizibil peste tot
    //butoanele pe dreapta vor fi vizibile in functie de ce notite se vizualizeza (normale, arhivate, sterse)
    //doar pt normale apare pictograma setare culoare
    return(
        <View style={[styles.containerBara]}>
            <View style={styles.containerBaraStanga}> 
                <TouchableOpacity 
                    onPress={handleCloseModal}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={25} color={culoarePictograme}/>
                </TouchableOpacity>
            </View>
        
            {
            vizualizareNotite ? (
            <View style={styles.containerBaraDreapta}>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity 
                        onPress={handleOpenModalSetari}
                        style={{paddingRight: 7}}
                    >
                        <FontAwesomeIcon icon={faPalette} size={25} color={culoarePictograme}/>
                    </TouchableOpacity>
                </View>
            </View>
            ) 
            : 
            (
            <>
            </>
            )
            }


        </View>
    )

}
export default BaraModal