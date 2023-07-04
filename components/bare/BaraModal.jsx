import {faImage, faImagePortrait, faStar as steaPlina} from "@fortawesome/free-solid-svg-icons"
import {faStar as steaGoala} from "@fortawesome/free-regular-svg-icons"
import { faArrowLeft, faPalette } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"
import { defavorizeazaNotita, favorizeazaNotita } from "../BazaDeDate"
import { useCallback, useState } from "react"

import * as ImagePicker from 'expo-image-picker';

const BaraModal = ( {styles, handleCloseModal, handleOpenModalSetari, culoarePictograme, vizualizareNotite, notitaCurenta, favorita, setFavorita, setImagine} ) => {
    
    const handleOpenImagePicker = async () => {
      //Nu necesita permisiuni pt alegerea unei imagini din galerie
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      })
      if (!result.canceled) {
        console.log("Imagine selectata: " + result.assets[0].uri)
        setImagine(result.assets[0].uri);
      }
    }

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
                        style={{paddingRight: 33}}
                    >
                        <FontAwesomeIcon icon={faPalette} size={25} color={culoarePictograme}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={handleOpenImagePicker}
                        style={{paddingRight: 7}}
                    >
                        <FontAwesomeIcon icon={faImage} size={25} color={culoarePictograme}/>
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