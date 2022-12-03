import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
export var MYCLASS,MYSECTION
const DisplayClass = ({class_name,section}) => {
    const naviagtion=useNavigation()
    function navigateHander(){
        naviagtion.navigate('StudentList')
        MYCLASS=class_name;
        MYSECTION=section;
    }
  return (
    <View>
       <Pressable onPress={navigateHander} >
        <Card
      // key={key}
      style={{
        marginVertical: 15,
        marginHorizontal: 20,
        
        elevation: 5,
        borderRadius: 10,
        paddingBottom: 20,
        backgroundColor:'darkblue',
        width:'80%',
        
      }}
    >
      <Card.Content style={{ margin: 5, marginTop: 0 }}>
       

        

          <View style={{  top:10 }}>
            <Text
              style={{
                fontSize:  15,
                fontFamily: "HindSemiBold",
                color: "white",
              }}
            >
              {class_name} {"-"} {section}
            </Text>
          </View>
         

          
        
      
      </Card.Content>
    </Card>
    </Pressable>
    </View>
  )
}

export default DisplayClass