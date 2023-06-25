import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableOpacity, View } from "react-native"

const ComponentaListaCulori = ( {setCuloareCurenta} ) => {

    const listaCulori = [
            "#FBF595", "#FCDA90", "#FBCC96", "#F7AF97", "#F7A097", "#F7B0B6", "#F59FBC", 
            "#E0AACC", "#CDA4CC", "#B6A4CC", "#92AAD0", "#7FBBDF", "#8DD7F2", "#A6ECF2", 
            "#99DBDA", "#92D6BD", "#9ED9A1", "#C2E2A3", "#E2EC96", "#CBCBCB", "#000000",
			"blue"   , "yellow" , "red",     "#232B2B", "#1e1e1e", "#11574a", "white",	 	
	]


    const randareCulori = () => {

        const randuri = []
        //impartim lista de culori pe bucati 
        //fiecare bucata (rand) e compusa din maxim 3 culori 
        for(let i = 0; i < listaCulori.length; i += 7){
            const randCulori = listaCulori.slice(i, i + 7) //5 culori pe rand
            //fiecare rand, mapat la bucatile de listaCulori 
            //se va mapa fiecare bucata 
            //iar apoi se vor introduce in constanta randuri
            const rand = (
                <View  key={i} style={{flexDirection: "row", height:"25%"}}>
                    <View style={{height: "100%", flexDirection:"row", backgroundColor: "white", width: "100%", alignItems: "center", justifyContent: "center"}}> 
                        {randCulori.map( (culoare) => (
                                <TouchableOpacity 
                                    activeOpacity={1}
                                    onPress={() => {
                                        setCuloareCurenta(culoare)
                                    }}
                                >
                                    <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                        <FontAwesomeIcon icon={faCircle} size={37} color={culoare}/>
                                    </View>
                                </TouchableOpacity>
                            ) ) 
                        }
                    </View>
                </View>
            )
            randuri.push(rand)
        }
        //la final se returneaza componenta, ce este compusa din toate randurile de listaCulori
        return randuri

    }

    return(
        <>
        {randareCulori()}
        </>
    )


}
export default ComponentaListaCulori