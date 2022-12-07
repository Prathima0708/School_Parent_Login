import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { subURL } from "../../../components/utils/URL's";
import { Card } from "react-native-paper";
import { ID } from "./TecahersExamTimeTable";
import { Alert, Box, CloseIcon, Heading,HStack,IconButton,Text as NativeText, VStack } from 'native-base';
import moment from "moment";
import TeachersHome from "../BottomTab/TeachersHome";

const ExamTimeTableSubjects = () => {
  const [data, setData] = useState([]);
  const [dataIsThere,setDataIsThere]=useState(false);

 //console.log("id -", ID);
  useEffect(() => {
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);
      //  console.log(res.data);

        setData(res.data);

        if(res.data.length > 0){
          console.log('if part')
          setDataIsThere(true);
        }else{
          console.log('else part')
          setDataIsThere(false);
        }

      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
  }, []);

  return (
    <>
    {dataIsThere ? <View style={{flex:1,backgroundColor:'white'}}>
    <Heading size='md' color='black' left='30%' top='7%'>Exam Time Table</Heading>
      <View style={[styles.tableHead]}>
        <View style={[styles.HeadingStyle]} >
          <Heading size='md' color='white'>Exam date</Heading>
        </View>
        <View style={{ flex: 1,alignItems:'center' }} >
          <Heading size='md' color='white'>Exam name</Heading>
        </View>
      </View>
      <View style={[styles.tableColumn]}>
        <View style={styles.columnStyle} >
          {data &&
            data.map((data,key)=>(
              <>
                <NativeText bold>{data.name}</NativeText>
                <View style={styles.space} />
              </>
          ))}
        </View>
        
        <View style={styles.columnStyle} >
          {data &&
              data.map((data,key)=>(
                <>
                  <NativeText bold>{data.value}</NativeText>
                  <View style={styles.space} />
                </>
          ))}
        </View>
      </View>
    </View> :
      // <View style={{alignItems:'center',backgroundColor:'white',flex:1}}>
      //   <NativeText 
      //     fontSize="xl" 
      //     bold color='error.900' 
      //     alignItems='center' 
      //     top='40%'
      //     justifyContent='center'>No Data Found</NativeText>
      // </View>
      <View style={styles.alertStyle}>
        <Alert maxW="1300" status="error" top='30%'>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <NativeText fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                  Data not found
                </NativeText>
              </HStack>
            </HStack>
            <Box pl="6" _dark={{
            _text: {
              color: "coolGray.600"
            }
            }}>
              There is no exam time table for selected class
            </Box>
          </VStack>
        </Alert>
      </View>
      
      }
    <TeachersHome />
    </>
  );
};

export default ExamTimeTableSubjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingFont:{
    fontFamily:'HindBold',
  },
  space: {
    width: 20,
    height: 20,
  },
  tableHead:{
    flex:0.05,
    padding:10,
    top:'20%', 
    flexDirection: "row",
    borderWidth:1,
    marginHorizontal:20,
    backgroundColor:"darkblue"
  },
  tableColumn:{
    flex:0.4,
    padding:10,
    top:'20%', 
    flexDirection: "row",
    borderWidth:1,
    marginHorizontal:20
  },
  HeadingStyle:{
    flex: 1,
    alignItems:'center',
    borderRightWidth:1,
    borderRightColor:'white'
  },
  columnStyle:{
    flex: 1,
    paddingVertical:10 ,
    alignItems:'center'
  },
  alertStyle:{
    backgroundColor:'white',
    flex:1,
    paddingHorizontal:20,
  }
});
