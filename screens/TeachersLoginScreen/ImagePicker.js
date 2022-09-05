import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {launchCameraAsync,useCameraPermissions,PermissionStatus} from 'expo-image-picker';
import { useState } from "react";


function ImagePicker(){

    const[pickedImage,setPickedImage]=useState();
    const [cameraPermissionInformation,requestPermission]=useCameraPermissions();

    async function verifyPermissions(){
        if(cameraPermissionInformation.status===PermissionStatus.UNDERTERMINED){
            const permissionResponse=await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status===PermissionStatus.DENIED){
            Alert.alert('Insuffcient Permissions',
            'You need to grant camera permission to use this app.');
            return false;
        }
        return true;
    }
    async function takeImageHanlder(){
        const hasPermission=await verifyPermissions();

        if(!hasPermission){
            return;
        }
        const image=await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        setPickedImage(image.uri);
        // console.log(image);
    }
    let imagePreView=<Text>No image taken yet.</Text>;

    if(pickedImage){
        imagePreView=<Image style={styles.image} source={{uri:pickedImage}}/>;
    }
    return(
        <View>
            <View style={styles.imagePreView}>
                {imagePreView}
            </View>
            <Button title="take image" onPress={takeImageHanlder}/>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreView:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
    },
    image:{
        width:'100%',
        height:'100%'
    }
})