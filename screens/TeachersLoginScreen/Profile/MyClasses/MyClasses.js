import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import DisplayClass from "./DisplayClass";
import StudentList from "./StudentList";
export var selectedData;
const MyClasses = () => {
    const navigation=useNavigation()
    const [data, setData] = useState([]);
const [selected,setSelected]=useState("")
    const [showClass,setShowClass]=useState(true)
    const [showStudList,setShowStudList]=useState(false)

    useEffect(() => {
        async function fetchStudentClass() {
          axios
            .get("http://10.0.2.2:8000/school/Studentclass/")
            .then((response) => {
              let newArray = response.data.map((item) => {
                return {
                  value: item.class_name + " - " + item.section,
                };
              });
            
            
              
 
              setData(response.data);
              console.log(response.data[0].class_name);
              console.log(response.data.section);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        fetchStudentClass();
      }, []);

function pressHandler(){
//setShowClass(false)
//setShowStudList(true)
navigation.navigate("StudentList",{
    //id
})
}

function renderClass(itemData){
    return <DisplayClass {...itemData.item}/>
}
  return (
    <>
  { showClass && <ScrollView>
    <View style={{flexDirection:'column',alignItems:'center'}}>

 
    <View>
    
    {/* {data.map((data,key)=>(
        <Pressable onPress={pressHandler}>
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
              {data.class_name} {"-"} {data.section}
            </Text>
          </View>
         

          
        
      
      </Card.Content>
    </Card>
    </Pressable>
    ))} */}
    <FlatList data={data} renderItem={renderClass}/>
    </View>
  </View>
  </ScrollView>}

  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "white",
  },
  labelInput: {
    color: "#673AB7",
    fontSize: 20,
  },
  formInput: {
    borderBottomWidth: 1.5,
    marginLeft: 20,
    borderColor: "#333",
  },
  input: {
    borderWidth: 0,
  },
  eventName: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    margin: 10,
    marginTop: 0,
  },
  home: {
    marginTop: 29,
  },
  root: {
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
    height: "200%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },


  space: {
    width: 20,
    height: 20,
  },
  th: {
    padding: 5,

    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  flexStyleCol: {
    flex: 1,
    flexDirection: "column",
  },
  tableCell: {
    width: 50,
    //  fontFamily: "Montserrat_600SemiBold",
    left: 10,

    maxWidth: 200,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    whiteSpace: "pre-line",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor: "white",
    backgroundColor: "#F0F3F4",

    // height:deviceWidth < 370 ? "6%" : "6%",
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
  //  fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    // color: "#A7ADAD",
    color: "#AEB6BF",
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    // bottom: 0,
    //fontSize: deviceWidth < 370 ? 13 : 16,
    letterSpacing: 0.5,
  },
  submitLabel: {
    color: "grey",
    color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
  //  fontSize: deviceWidth < 370 ? 13 : 15,
  },
  btnSubmit1: {
    marginTop: 90,
    marginBottom: 30,
    marginLeft: 190,
    width: "50%",
  },
  cancel: {
    marginTop: -140,
    marginLeft: -15,
    width: "50%",
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
  focusStyle: {
    borderColor: "blue",
  },
  test: {
    position: "absolute",
   // top: deviceWidth < 370 ? 2 : 10,
    //left: deviceWidth < 370 ? 40 : 50,
  },
  testSuccess: {
    position: "absolute",
  //  top: deviceWidth < 370 ? 28 : 32,
    left: 50,
  },
  descriptionUp: {
    position: "absolute",
   // top: deviceWidth < 370 ? 68 : 87,
    //left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDown: {
    position: "absolute",
    //top: deviceWidth < 370 ? 93 : 107,
    left: 50,
  },
  descriptionUpExtra: {
    position: "absolute",
 //   top: deviceWidth < 370 ? 90 : 115,
   // left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDownExtra: {
    position: "absolute",
   // top: deviceWidth < 370 ? 115 : 137,
    left: 50,
  },

  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default MyClasses;