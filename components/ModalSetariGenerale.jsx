///daca e pt prima oara (nu se gasesc tabele in db) - se seteaza o variabila cu true
///var = true => nu se poate inchide decat cand se salveaza - buton cancel, bara de sus a modalului - dezactivate - nu se randeaza
///in rest, modalu o sa fie cel obisnuit pt alegerea schemei de culori 

import { Modal, View } from "react-native"

///app background color, 
///app text color, 
///new note button color, 
///edit note button color, 
///note body default color, 
///note text default color  

const ModalSetariGenerale = ( {visibilityModalSetariGenerale, setVisibilityModalSetariGenerale} ) => {

    const handleCloseModal = () => {
        setVisibilityModalSetariGenerale(false)
    }

    return (
        <Modal
            visible={visibilityModalSetariGenerale}
            onRequestClose={handleCloseModal}
            animationType="slide"
        >
            <View style={{flex: 1, backgroundColor: "yellow"}}>
                
            </View>

        </Modal>
    )
}
export default ModalSetariGenerale