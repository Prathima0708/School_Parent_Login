import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Dimensions, Button, Alert, Platform} from 'react-native';
import MapView from 'react-native-maps';
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async ()=>{
    return {
      shouldPlaySound: false,
      shouldSetBadge:false,
      shouldShowAlert:true
    }
  }
});

export default function PushNotification() {

  const [pushTkn,setPushTkn]=useState()
  useEffect(()=>{

    async function configurePushNotifications(){
      const {status}=await Notifications.getPermissionsAsync();
      let finalStatus=status;

      if(finalStatus!=='granted'){
        const {status}=await Notifications.requestPermissionsAsync();
        finalStatus=status;
      }

      if(finalStatus!=='granted'){
        Alert.alert('permission required',
        'Push notifications need the appropriate permissions.');
        return;
      }

        const pushTokenData=await Notifications.getExpoPushTokenAsync().then((pushToken)=>{
        console.log(pushToken);
        setPushTkn(pushToken)

        if(Platform.OS==='android'){
          Notifications.setNotificationChannelAsync("default",{
            name:'default',
            importance:Notifications.AndroidImportance.DEFAULT
          });
        }
      });
    }

    configurePushNotifications();
    
  },[]);

  useEffect(()=>{
   const subscription1= Notifications.addNotificationReceivedListener(
      (notification)=>{
        console.log('Notification received')
        // console.log("token",notification)
      });

      const subscription2=Notifications.addNotificationResponseReceivedListener((response)=>{
        console.log('Notification response received')
        //console.log(response)
      });
      return()=>{
        subscription1.remove();
        subscription2.remove();
      };

  },[]);

  function scheduleNotificationsHanlder(){
    Notifications.scheduleNotificationAsync({
      content: {
        title:'My first local notification',
        body:'This is the body of the notification.',
        data:{
          userName:'Max'
        }},
        trigger:{
          seconds:5
        }
      });
    }

    function sendPushNotificationHanlder(){
      fetch('https://exp.host/--/api/v2/push/send',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          to:{pushTkn},
          title:'Test--sent from a device',
          body:'This is a test'
        })
      })
    }

  return (
    <View style={styles.container}>
      <Button 
        title='Schedule Notification'
        onPress={scheduleNotificationsHanlder}/>
         <Button 
        title='Send Notification'
        onPress={sendPushNotificationHanlder}/>
      <View style={styles.container}>
      {/* <MapView style={styles.map} /> */}
    </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top:100
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
