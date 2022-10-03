import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { Card, DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import ParentsHome from "../ParentsHome";
import { Image } from "react-native";
import {
  className,
  studentId,
  StudentName,
  StudentRegNo,
} from "../../../components/StudentItem/StudentItem";

const ReportCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Marksheet/`
        );
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Marksheet</BgButton>
      </View> */}
      {/* <View style={{ height: "100%",backgroundColor:'#AEFDFF' }}>
        <View style={styles.studentItem}>
          <Text style={[styles.textBase, styles.description]}>
            Student Name: {StudentName}
          </Text>
          <Text style={[styles.textBase, styles.description]}>
            Student Class: {className}
          </Text>
        </View>
        {data &&
            data.map((data, key) => (
              <>
                <View style={[ { flexDirection: "row",flex:1,top:10,padding:10 }]}>
                  <View style={{ flex: 1 }} >
                    <Text style={styles.textStyle}>Subject</Text>
                  </View>
                  <View style={{ flex: 1 }} >
                    <Text style={styles.textStyle}>Obtained Mark</Text>
                  </View>
                  <View style={{ flex: 1,left:20}} >
                    <Text style={styles.textStyle}>Maximum {"\n"}    Mark</Text>
                  </View>
                </View>
                <View style={[{flexDirection: "row",flex:1,position:'absolute',top:180,padding:10}]}>
                  <View style={{ flex: 1 }} >
                  <View style={{padding:5}}><Text style={styles.subStyle}>Maths</Text></View>
                  <View style={{padding:5}}><Text style={styles.subStyle}>English</Text></View>
                  <View style={{padding:5}}><Text style={styles.subStyle}>Science</Text></View>
                  <View style={{padding:5}}><Text style={styles.subStyle}>Hindi</Text></View>
                  <View style={{padding:5}}><Text style={styles.subStyle}>Social</Text></View>
                  <View style={{padding:5}}><Text style={styles.subStyle}>Kannada</Text></View>
                  <View style={{padding:5}}><Text style={styles.subStyle}>Computer</Text></View>
                  </View>
                  <View style={{ flex: 1 }} >
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.maths_obt_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.english_obt_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.science_obt_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.hindi_obt_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.social_obt_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.kannada_obt_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.kannada_obt_mark}</Text></View>
                  </View>
                  <View style={{ flex: 1 }} >
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.maths_tot_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.english_tot_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.science_tot_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.hindi_tot_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.social_tot_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.kannada_tot_mark}</Text></View>
                  <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.computer_tot_mark}</Text></View>
                  </View>
                </View>
                <View style={[{flexDirection: "row",flex:1,position:'absolute',top:490,padding:10}]}>
                  <View style={{ flex: 1 }} >
                  <View style={{padding:5}}><Text style={[styles.subStyle,{fontWeight:'bold'}]}>Total</Text></View>
                    <View style={{padding:5}}><Text style={[styles.subStyle,{fontWeight:'bold'}]}>Percentage</Text></View>
                  </View>
                  <View style={{ flex: 1 }} >
                  <View style={[styles.markStyleView,{right:100}]}>
                      <Text style={styles.markStyle}>
                        {data.maths_obt_mark +
                            data.english_obt_mark +
                            data.science_obt_mark +
                            data.hindi_obt_mark +
                            data.social_obt_mark +
                            data.kannada_obt_mark +
                            data.computer_obt_mark}
                      </Text>
                    </View>
                    <View style={[styles.markStyleView,{right:100}]}>
                      <Text style={styles.markStyle}>
                      {(
                          (data.maths_obt_mark +
                            data.english_obt_mark +
                            data.science_obt_mark +
                            data.hindi_obt_mark +
                            data.social_obt_mark +
                            data.kannada_obt_mark +
                            data.computer_obt_mark) /
                          7
                        ).toFixed(2)}{" "}
                        {"%"}
                      </Text>
                    </View>
                  </View>
                </View>
              </>  
        ))} */}

        {/* <View style={{ flex: 1, left: 10}}>
         
        </View>
        <View style={{ flex: 1, left: 10}}>
          
        </View> */}
      {/* </View> */}
          {/* {data &&
            data.map((data, key) => (
          <>
          <View style={[{flexDirection: "row",flex: 1,padding:10}]}>
            <View style={{ flex: 2}}>
            <Card style={styles.cardStyle} key={data.id}>
              <Card.Title title="Maths"/>
                <Card.Content>
                  <Text>Total marks:{data.maths_tot_mark}</Text>
                   <Text>Obtained marks:{data.maths_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
            <View style={styles.space} />
            <View style={{ flex: 2 }}>
            <Card>
              <Card.Title title="English"/>
                <Card.Content>
                  <Text>Total marks:{data.english_tot_mark}</Text>
                  <Text>Obtained marks:{data.english_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
          </View>

          <View style={[{flexDirection: "row",flex: 1,padding:10}]}>
            <View style={{ flex: 2}}>
            <Card>
              <Card.Title title="Science"/>
                <Card.Content>
                  <Text>Total marks:{data.science_tot_mark}</Text>
                  <Text>Obtained marks:{data.science_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
            <View style={styles.space} />
            <View style={{ flex: 2 }}>
            <Card>
              <Card.Title title="Hindi"/>
                <Card.Content>
                  <Text>Total marks:{data.hindi_tot_mark}</Text>
                  <Text>Obtained marks:{data.hindi_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
          </View>

          <View style={[{flexDirection: "row",flex: 1,padding:10}]}>
            <View style={{ flex: 2}}>
            <Card>
              <Card.Title title="Social"/>
                <Card.Content>
                  <Text>Total marks:{data.social_tot_mark}</Text>
                  <Text>Obtained marks:{data.social_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
            <View style={styles.space} />
            <View style={{ flex: 2 }}>
            <Card>
              <Card.Title title="Kannada"/>
                <Card.Content>
                  <Text>Total marks:{data.social_tot_mark}</Text>
                  <Text>Obtained marks:{data.kannada_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
          </View>
          <View style={[{flexDirection: "row",flex: 1,padding:10}]}>
            <View style={{ flex: 2}}>
            <Card>
              <Card.Title title="Computer"/>
                <Card.Content>
                  <Text>Total marks:{data.computer_tot_mark}</Text>
                  <Text>Obtained marks:{data.computer_obt_mark}</Text>
                </Card.Content>
            </Card>
            </View>
          </View>
          </>
      ))} */}
      <ParentsHome />
    </>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: 220,
  },
  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 5,
    marginRight: 13,
    fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  tableCell: {
    width: 20,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  inputForm: {
    padding: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels: {
    marginTop: 2,
  },
  btnSubmit: {
    marginTop: 5,
  },
  studentItem: {
    width: "80%",
    marginHorizontal: 35,
    padding: 19,
    marginVertical: 8,
    top:10,
    backgroundColor: "#23215b",

    borderRadius: 16,
  },
  textBase: {
    // color: "#0D98BA",
    color:'white',
    fontFamily: "HindRegular",
    // marginRight: 33,
  },
  description: {
    fontSize: 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    // fontWeight: "bold",
  },
  space: {
    width: 20,
    height: 20,
  },
  textStyle:{
    fontSize:18,
    fontWeight:'bold',
    fontFamily: "HindRegular",
  },
  subStyle:{
    fontSize:16,
    fontFamily: "HindRegular",
    padding:5
  },
  markStyle:{
    fontSize:16,
    backgroundColor:'white',
    fontFamily: "HindRegular",
    padding:5,
    paddingRight:20,
    paddingLeft:20
  },
  markStyleView:{
    padding:5,justifyContent:'center',alignItems:"center"
  }
});
