import { View, Text, StyleSheet, Image, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  className,
  Section,
  StudentName,
  StudentPhoto,
  StudentRegNo,
  FatherName,
  MotherName,
  DOB,
  Gendar,
  DateOfAddmission,
  StudentAddress,
  City,
  State,
  Country,
  Pincode,
  AcademicYear
} from "../../../components/StudentItem/StudentItem";
import { Button as NativeButton, Divider,Avatar as NativeAvatar, } from "native-base";
import ParentsHome from "../BottomTab/ParentsHome";
import moment from "moment";

const ParentsProfile = () => {

  const [isActive,setIsActive]=useState(true);

  const [parentInfoClicked,setParentInfoClicked]=useState(false);
  const [studentInfoClicked,setStudentInfoClicked]=useState(true);

  function studentInfoHanlder(){
    setStudentInfoClicked(true);
    setParentInfoClicked(false);
    setIsActive(true);
  }

  function parentInfoHanlder(){
    setParentInfoClicked(true);
    setStudentInfoClicked(false);
    setIsActive(true);
  }

  return (
    <>
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
          backgroundColor:'white'
        },
      ]}
    >
      <View style={{ flex: 0.6 }}>
        <View
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 3 }}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `http://10.0.2.2:8000${StudentPhoto}`,
                }}
                style={styles.image}
                width="100px"
              />
            </View>
          </View>
          <View style={{ flex: 5 }}>
            <View style={{ padding: 15, paddingTop: 0 }}>
              <Text
                style={{ fontFamily: "HindMedium", fontSize: 15, margin: 5 }}
              >
                Name :{StudentName}
              </Text>
              <Text
                style={{ fontFamily: "HindMedium", fontSize: 15, margin: 5 }}
              >
                Class : {className} {"-"} {Section}
              </Text>
              <Text
                style={{ fontFamily: "HindMedium", fontSize: 15, margin: 5 }}
              >
                Roll No : {StudentRegNo}
              </Text>
            </View>
          </View>
        </View>
      </View>
        <View style={[styles.tabHeader]}>
          <NativeButton 
            onPress={studentInfoHanlder} 
            variant="outline" 
            colorScheme='darkBlue'
            style={[
              styles.buttonStyle,
              studentInfoClicked && isActive && {borderBottomColor:'#4C49AB',borderBottomWidth:3,backgroundColor:'#D6D7FF'}]}>Student Info</NativeButton>
          <Divider
            bg="#4C49AB"
            thickness="2"
            orientation="vertical"
            // style={{ left: "60%" }}
          />
          <NativeButton 
            onPress={parentInfoHanlder} 
            variant="outline" 
            colorScheme='darkBlue'
            style={[
              styles.buttonStyle,
              parentInfoClicked && isActive && {borderBottomColor:'#4C49AB',borderBottomWidth:3,backgroundColor:'#D6D7FF'}]}>Parent Info</NativeButton>
        </View>

      {studentInfoClicked && 
        <View
          style={[styles.flexStyle,]}>
          <View style={[{paddingHorizontal:10,left:'5%'},{ flex: 1}]}>
            <ScrollView>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Date Of Birth</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{moment(DOB).format("DD/MM/YYYY")}</Text>
                </View>
              </View>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Gendar</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{Gendar}</Text>
                </View>
              </View>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Admission Date</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{moment(DateOfAddmission).format("DD/MM/YYYY")}</Text>
                </View>
              </View>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Student Address</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{StudentAddress}</Text>
                </View>
              </View>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>City</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{City}</Text>
                </View>
              </View>

              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>State</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{State}</Text>
                </View>
              </View>

              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Country</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{Country}</Text>
                </View>
              </View>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Pincode</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{Pincode}</Text>
                </View>
              </View>
              <View style={[styles.viewStyle]}>
                <View style={{ flex: 1}} >
                  <Text style={styles.labelStyle}>Academic Year</Text>
                </View>
                <View style={{ flex: 1 }} >
                  <Text style={styles.labelStyle}>{AcademicYear}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      }
      {parentInfoClicked && 
        <View
          style={styles.flexStyle}>
          <View style={{ flex: 8,}}>
            <ScrollView>
              <View style={[{flex:1}, {
                flexDirection: "column",
                top:'1%'
              }]}>
                <View style={{ flex: 1 }} >
                  <View style={[{flex:1}, {flexDirection: "row"}]}>
                    <View style={{ flex: 1 }} >
                      <View style={[{flex:1}, {
                        flexDirection: "column"
                      }]}>
                        <View style={{ flex: 1 }} >
                          <NativeAvatar 
                            bg="purple.600" 
                            alignSelf="center" 
                            size="xl"
                            source={{uri: "https://www.w3schools.com/css/img_lights.jpg"}}>
                          </NativeAvatar>
                        </View>
                        <View style={{ flex: 1,alignItems:'center' }} >
                          <Text style={[styles.labelStyle]}>{FatherName}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1 }} >
                      <View style={[{flex:1}, {flexDirection: "column"}]}>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>ABCD</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>9018212345</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>Lawyer</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.space} />
                <Divider
                  bg="#275932"
                  thickness="3"
                  orientation="horizontal"
                  style={{  }}
                />
                <View style={styles.space} />
                <View style={{ flex: 1,}} >
                 <View style={[{flex:1}, {flexDirection: "row"}]}>
                    <View style={{ flex: 1 }} >
                      <View style={[{flex:1}, {
                          flexDirection: "column"
                        }]}>
                          <View style={{ flex: 1 }} >
                            <NativeAvatar 
                              bg="purple.600" 
                              alignSelf="center" 
                              size="xl"
                              source={{uri: "https://www.w3schools.com/css/img_lights.jpg"}}>
                            </NativeAvatar>
                          </View>
                          <View style={{ flex: 1,alignItems:'center' }} >
                            <Text style={[styles.labelStyle]}>{MotherName}</Text>
                          </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                      <View style={[{flex:1}, {flexDirection: "column"}]}>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>PQR</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>0978231323</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>Teacher</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.space} />
                <Divider
                  bg="#275932"
                  thickness="3"
                  orientation="horizontal"
                  style={{  }}
                />
                <View style={styles.space} />
                <View style={{ flex: 1 }} >
                  <View style={[{flex:1}, {flexDirection: "row"}]}>
                    <View style={{ flex: 1 }} >
                      <View style={[{flex:1}, {
                          flexDirection: "column"
                        }]}>
                          <View style={{ flex: 1 }} >
                            <NativeAvatar 
                              bg="purple.600" 
                              alignSelf="center" 
                              size="xl"
                              source={{uri: "https://wallpaperaccess.com/full/317501.jpg"}}>
                            </NativeAvatar>
                          </View>
                          <View style={{ flex: 1,alignItems:'center' }} >
                            <Text style={[styles.labelStyle]}>Guardian</Text>
                          </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                      <View style={[{flex:1}, {flexDirection: "column"}]}>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>IOS</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>5676890912</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={styles.labelStyle}>Businessman</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      }
    </View>
    <View style={{ flex: 1 }}>
      <ParentsHome />
    </View>
    </>
  );
};

export default ParentsProfile;
const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: 20,
  },
  space: {
    width: 20,
    height: 10,
  },
  imageContainer: {
    backgroundColor: "white",

    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 90,
    width: 110,
  },
  fontStyle:{
    fontFamily:'HindBold',
    fontSize:16
  },
  tabHeader:{
    flexDirection:'row',
    // top:'20%',
    justifyContent:'space-between',
  },
  buttonStyle:{
    width:'50%',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderRadius:0
  },
  // space: {
  //   width: 20,
  //   height: 20,
  // },
  labelStyle:{
    fontFamily:'HindBold'
  },
  flexStyle:{
    flex: 1,
    flexDirection: "column", 
    backgroundColor: "white"
  },
  viewStyle:{
    flex:1,
    flexDirection: "row",
    paddingVertical:10
  }
});
