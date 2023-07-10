import { Modal, Text, TouchableOpacity, View } from "react-native"
import BaraModal from "../bare/BaraModal"
import { useEffect, useRef, useState } from "react"
import SelectDropdown from "react-native-select-dropdown"

const ModalAlegereSortare = ( {visibilityModalAlegereSortare, setVisibilityModalAlegereSortare, culoarePictograme, sortBy, direction, setSortBy, setDirection, indexSortBy, indexDirection, setIndexSortBy, setIndexDirection, styles} ) => {

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

    const handleCloseModal  = () => {
        setVisibilityModalAlegereSortare(false)
    }

    const handleConfirmareSortare = () => {
        if(tempSortBy === 0){
            setSortBy("dataCreare")
            setIndexSortBy(0)
        }
        else if(tempSortBy === 1){
            setSortBy("dataModificare")
            setIndexSortBy(1)
        }
        

        if(tempDirection === 0){
            setDirection("ASC")
            setIndexDirection(0)
        }
        else if(tempDirection === 1){
            setDirection("DESC")
            setIndexDirection(1)
        }
        
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
                                defaultValueByIndex={indexSortBy}
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
                                defaultValueByIndex={indexDirection}
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