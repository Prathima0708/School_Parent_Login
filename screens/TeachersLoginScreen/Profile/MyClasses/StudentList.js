import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { selectedData } from './MyClasses'
import { useRoute } from '@react-navigation/native'
import { MYCLASS, MYSECTION } from './DisplayClass'
import axios from 'axios'
import { DataTable } from 'react-native-paper'
import { subURL } from '../../../../components/utils/URL\'s'

const StudentList = () => {
    const route=useRoute()
    const [filteredData,setFilteredData]=useState([])
    console.log(MYCLASS,MYSECTION)
    useEffect(()=>{
   
    
        async function login() {
       
        
          try {
            const res = await axios.get(`${subURL}/Student/`);
            //console.log(class_name, section);
    
            let filteredclass = res.data.filter(
              (ele) => ele.class_name == MYCLASS
            );
    
            let filteredsection = res.data.filter((ele) => ele.section == MYSECTION);
    
            const filteredList = filteredclass && filteredsection;
    
            let filteredc = filteredList.filter(
              (ele) => ele.class_name == MYCLASS
            );
    
            // const id = filteredc.map((id) => id.reg_number);
            // console.log(id);
    
            // console.log(filteredc);
            // StudentList = filteredc;
            // console.log(StudentList);
    
            if (filteredc) {
              //console.log(studList);
             // setStudList(filteredc);
              setFilteredData(filteredc);
            }
    
            if (filteredc.length == 0) {
              Alert.alert("No data found", "No data found for respective search");
            }
          } catch (error) {
            console.log(error);
          }
        }
        login();
      
    },[])
        
  return (
    <View>
      
        <>
          {/* <SearchBar
            style={styles.searchBar}
            textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
            placeholder="Search here"
            onChangeText={(text) => searchFilter(text)}
            value={searchText}
          /> */}
          <ScrollView horizontal={true}>
            <DataTable style={styles.container}>
              <DataTable.Header style={styles.tableHeader}>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> REG NUMBER</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> STUDENT NAME</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> CLASS NAME</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> SECTION</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> ACTION</Text>
                </View>
              </DataTable.Header>

           

              {filteredData &&
                filteredData.map((data, key) => (
                  <DataTable.Row style={styles.tableRow} key={key}>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 50,
                      }}
                    >
                      {data.reg_number}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 80,
                      }}
                    >
                      {data.student_name}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 90,
                      }}
                    >
                      {data.class_name}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 70,
                      }}
                    >
                      {data.section}
                    </DataTable.Cell>

                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 70,
                      }}
                    >
                      {/* <Btn title="Add" onPress={() => addForm(data.id)} /> */}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </ScrollView>
        </>
      
    </View>
  )
}

export default StudentList

const styles=StyleSheet.create({
    th: {
        padding: 5,
        marginRight: 13,
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
        fontFamily: "HindMedium",
        fontSize: 20,
      },
      tableCell: {
        width: 110,
    
        marginLeft: 35,
      },
    
      tableMarks: {
        width: 10,
    
        marginLeft: 35,
      },
    
      tableRow: {
        height: "9%",
        borderBottomColor: "black",
        borderBottomWidth: 2,
      },
      space: {
        width: 20, // or whatever size you need
        height: 20,
      },
      searchBar: {
        //top: 10,
    
        marginTop: 10,
        marginBottom: 20,
      },
})



