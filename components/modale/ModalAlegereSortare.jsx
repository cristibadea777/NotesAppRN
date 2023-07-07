import { Modal, Text, TouchableOpacity, View } from "react-native"
import BaraModal from "../bare/BaraModal"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useEffect, useRef, useState } from "react"
import SelectDropdown from "react-native-select-dropdown"

const ModalAlegereSortare = ( {visibilityModalAlegereSortare, setVisibilityModalAlegereSortare, culoarePictograme, sortBy, direction, setSortBy, setDirection, styles} ) => {

    const DDLsortBy        = ["Date created", "Date modified"]
    const DDLdirection     = ["Ascending",    "Descending"]


    const [tempSortBy,      setTempSortBy]      = useState('')
    const [tempDirection,   setTempDirection]   = useState('')

    useEffect(
        () => {
            setTempSortBy   (sortBy)
            setTempDirection(direction)
        }, [visibilityModalAlegereSortare]
    )

    useEffect(
        () => {
            console.log(tempSortBy)
            console.log(tempDirection)
        }, [tempSortBy, tempDirection]
    )

    const handleCloseModal  = () => {
        setVisibilityModalAlegereSortare(false)
    }

    const handleConfirmareSortare = () => {
        if(tempSortBy === 0)
            setSortBy("dataCreare")
        else
            setSortBy("dataModificare")
        if(tempDirection === 0)
            setDirection("ASC")
        else
            setDirection("DESC")
        handleCloseModal()
    }

    return(
        <Modal
            onRequestClose  = {handleCloseModal}
            visible         = {visibilityModalAlegereSortare}
            transparent     = {true}
        >
            <BaraModal
                styles                  = {styles}
                handleCloseModal        = {handleCloseModal} 
                culoarePictograme       = {culoarePictograme}
                vizualizareNotite       = {false}
                handleOpenModalSetari   = {""}
            />

            <View style={styles.containerModal}>

                <View style={styles.containerModalAlegereSortare}>
                    <View style={{width: "100%", height: "20%", alignItems: "center", justifyContent: "center", paddingBottom: 12}}> 
                        <Text style={[styles.textModalAlegereSortare, {fontSize: 33}]}>Sorting the notes</Text>
                    </View>
                    <View style={{width: "90%", height: "47%", alignItems: "center", flexDirection: "column"}}>
                        <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingBottom: 12, paddingTop: 12}}>
                            <Text style={[styles.textModalAlegereSortare, {paddingRight: 7}]}>Sort by</Text>
                            <SelectDropdown
                                data={DDLsortBy}
                                defaultValueByIndex={0}
                                onSelect={ (selectedItem, index) => { setTempSortBy(index) } }
                                buttonStyle={{width: "57%", height: "100%"}}
                                buttonTextStyle={{ fontSize: 20, color: 'black'}}
                                rowStyle={{backgroundColor: '#white'}}
                                rowTextStyle={{color: 'black', fontSize: 20}}
                            />
                        </View>

                        <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingTop: 12}}>
                            <Text style={[styles.textModalAlegereSortare, {paddingRight: 7}]}>Direction</Text>
                            <SelectDropdown
                                data={DDLdirection}
                                defaultValueByIndex={0}
                                onSelect={ (selectedItem, index) => { setTempDirection(index) } }
                                buttonStyle={{width: "57%", height: "100%"}}
                                buttonTextStyle={{ fontSize: 20, color: 'black'}}
                                rowStyle={{backgroundColor: '#white'}}
                                rowTextStyle={{color: 'black', fontSize: 20}}
                            />
                        </View>

                    </View>
                    <View style={{width: "100%", height: "30%", flexDirection: "row"}}>
                        <View style={{width: "50%", height: "100%", alignItems:"center", justifyContent:"center"}}>
                            <TouchableOpacity 
                                onPress={handleConfirmareSortare}
                                style={{width: "77%", height: "77%", alignItems:"center", justifyContent:"center", backgroundColor:"#00c3e3"}}
                            >
                                <Text style={styles.textModalConfirmare}>OK</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: "50%", height: "100%", alignItems:"center", justifyContent:"center"}}>
                            <TouchableOpacity 
                                onPress={handleCloseModal}
                                style={{width: "77%", height: "77%", alignItems:"center", justifyContent:"center", backgroundColor:"#EDEADE"}}
                            >
                                <Text style={styles.textModalConfirmare}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>

            

        </Modal>
    )
}
export default ModalAlegereSortare