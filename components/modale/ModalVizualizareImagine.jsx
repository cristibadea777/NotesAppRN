import { Modal, Image, Text, View } from "react-native"
import BaraModal from "../bare/BaraModal"

const ModalVizualizareImagine = ({styles, notitaCurenta, visibilityModalVizualizareImagine, setVisibilityModalVizualizareImagine, culoarePictograme}) => {

    const handleCloseModal = () => {
        setVisibilityModalVizualizareImagine(false)
    }

    return(
        <Modal
            visible={visibilityModalVizualizareImagine}
            onRequestClose={handleCloseModal}
        >
            <BaraModal 
                handleCloseModal  = {handleCloseModal}
                vizualizareNotite = {false}
                styles            = {styles}
                culoarePictograme = {culoarePictograme}
            />
            

            {
            notitaCurenta && (
                <View style={{flexGrow: 1}}>
                    <Image source={{ uri: notitaCurenta.imagine }} style={{flexGrow: 1 }} resizeMode='contain'/>
                </View>
            )    
            }

        </Modal>
    )
}
export default ModalVizualizareImagine