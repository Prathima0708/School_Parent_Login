import { View,Text,StyleSheet } from "react-native"

function VerticalLine({children,style}){
    return(
    <View style={styles.lineContainer}>
        <Text 
        style={[styles.text, { ...style }]}
        >{children}</Text>
    </View>
    )
}

export default VerticalLine;

const styles=StyleSheet.create({
    lineContainer:{
        marginTop:5
    },
    text:{
        color:'black',
        fontWeight:'bold'
    }
})