import { StyleSheet } from "react-native";
import { TextInput, View } from "react-native";

function Input({onChangeText,placeholder,keyboardType,value,style,blur}){
    return(
        <View>
            <TextInput onChangeText={onChangeText} 
                style={[styles.inputStyle,{...style}]} 
                placeholder={placeholder} 
                keyboardType={keyboardType}
                value={value}
                onBlur={blur}
            />
        </View>
    )
}

export default Input;

const styles=StyleSheet.create({
      inputStyle: {
        color: "black",
        borderBottomWidth: 2,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
        borderBottomColor:'#010691',
        // borderColor: "#C9D4FF",
        // borderColor:'0000FF',
        padding: 10,
        margin: 15,
        paddingVertical: 5,
        backgroundColor:'#B1CDFF',
        fontSize: 18,
      },
})