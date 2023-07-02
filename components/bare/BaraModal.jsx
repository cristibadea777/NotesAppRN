import {faStar as steaPlina} from "@fortawesome/free-solid-svg-icons"
import {faStar as steaGoala} from "@fortawesome/free-regular-svg-icons"
import { faArrowLeft, faPalette } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"
import { defavorizeazaNotita, favorizeazaNotita } from "../BazaDeDate"
import { useCallback, useState } from "react"

const BaraModal = ( {styles, handleCloseModal, handleOpenModalSetari, culoarePictograme, vizualizareNotite, notitaCurenta, favorita, setFavorita} ) => {


    const handlePressFavorite = () => {
        if(favorita === "true")
            setFavorita("false")        
        else
            setFavorita("true")
    }

    //se re-randeaza cand se schimba starea campului favorita 
    const randareStea = useCallback(
        () => {
            return(
                <TouchableOpacity 
                    onPress={handlePressFavorite}
                    style={{paddingRight: 37}}
                >
                    {
                        favorita === "true" ? 
                        (
                        <FontAwesomeIcon icon={steaPlina} size={25} color={culoarePictograme}/>
                        )
                        : 
                        (
                        <FontAwesomeIcon icon={steaGoala} size={25} color={culoarePictograme}/>
                        )
                    }
                </TouchableOpacity>
            )
        }, [favorita]
    )

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

                    { //randare stea daca notita curenta exista (deci nu e modal notita noua)
                        notitaCurenta && (
                            randareStea()
                        )
                    }

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