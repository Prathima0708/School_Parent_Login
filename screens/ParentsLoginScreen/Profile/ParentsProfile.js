import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
  AcademicYear,
  ContactNumber,
  AlternateNumber,
} from "../../../components/StudentItem/StudentItem";
import {
  Button as NativeButton,
  Divider,
  Avatar as NativeAvatar,
  Image as NativeImage,
} from "native-base";
import ParentsHome from "../BottomTab/ParentsHome";
import moment from "moment";
import { mainURL } from "../../../components/utils/URL's";

const ParentsProfile = () => {
  const [isActive, setIsActive] = useState(true);
  const [parentInfoClicked, setParentInfoClicked] = useState(false);
  const [studentInfoClicked, setStudentInfoClicked] = useState(true);

  function studentInfoHanlder() {
    setStudentInfoClicked(true);
    setParentInfoClicked(false);
    setIsActive(true);
  }

  function parentInfoHanlder() {
    setParentInfoClicked(true);
    setStudentInfoClicked(false);
    setIsActive(true);
  }
  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        borderWidth: 3,
        borderColor: "black",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
            backgroundColor: "white",
          },
        ]}
      >
        <View style={{ flex: 0.4 }}>
          <View
            style={[
              styles.container,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 0.4 }}>
              <View style={styles.imageContainer}>
                <NativeImage
                  source={{
                    uri: `${mainURL}${StudentPhoto}`,
                  }}
                  alt="Student Image"
                  size="lg"
                  resizeMode="contain"
                  ref={myRef}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "row",
                  },
                ]}
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={[styles.description]}>Name</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.textStyleStudInfo]}>{StudentName.charAt(0).toUpperCase() + StudentName.slice(1)}</Text>
                </View>
              </View>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "row",
                  },
                ]}
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={[styles.description]}>Class</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.textStyleStudInfo]}>
                    {className.charAt(0).toUpperCase() + className.slice(1)} - {Section.charAt(0).toUpperCase() + Section.slice(1)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "row",
                  },
                ]}
              >
                <View
                  style={{ flex: 1, alignItems: "center", marginLeft: "4%" }}
                >
                  <Text style={[styles.description]}>Reg No</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.textStyleStudInfo]}>{StudentRegNo}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.tabHeader]}>
          <NativeButton
            onPress={studentInfoHanlder}
            variant="outline"
            colorScheme="darkBlue"
            style={[
              styles.buttonStyle,
              studentInfoClicked && isActive && styles.activeStyle,
            ]}
          >
            <Text
              style={{
                fontFamily: "HindSemiBold",
                fontSize: 17,
                color: "#1E84A4",
              }}
            >
              Student Info
            </Text>
          </NativeButton>
          <Divider
            bg="#4C49AB"
            thickness="2"
            orientation="vertical"
          />
          <NativeButton
            onPress={parentInfoHanlder}
            variant="outline"
            colorScheme="darkBlue"
            style={[
              styles.buttonStyle,
              parentInfoClicked && isActive && styles.activeStyle,
            ]}
          >
            <Text
              style={{
                fontFamily: "HindSemiBold",
                fontSize: 17,
                color: "#1E84A4",
              }}
            >
              Parent Info
            </Text>
          </NativeButton>
        </View>

        {studentInfoClicked && (
            <View
              style={[
                { flex: 1 },
                { flexDirection: "column", backgroundColor: "white" },
              ]}
            >
              <View style={{ flex: 8, bottom: 10 }}>
                <ScrollView>
                  <View style={styles.root}>
                  <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Date Of Birth</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>
                      {moment(DOB).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Gender</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{Gendar.charAt(0).toUpperCase() + Gendar.slice(1)}</Text>
                  </View>
                </View>
                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Admission Date</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>
                      {moment(DateOfAddmission).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Student Address</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{StudentAddress.charAt(0).toUpperCase() + StudentAddress.slice(1)}</Text>
                  </View>
                </View>
                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>City</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{City.charAt(0).toUpperCase() + City.slice(1)}</Text>
                  </View>
                </View>

                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>State</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{State.charAt(0).toUpperCase() + State.slice(1)}</Text>
                  </View>
                </View>

                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Country</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{Country.charAt(0).toUpperCase() + Country.slice(1)}</Text>
                  </View>
                </View>
                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Pincode</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{Pincode}</Text>
                  </View>
                </View>
                <View style={[styles.viewStyle]}>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyle}>Academic Year</Text>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <Text style={styles.labelStyleValue}>{AcademicYear}</Text>
                  </View>
                </View>
                  </View>
              </ScrollView>
              </View>
            </View>
        )}
        {parentInfoClicked && (
          <View style={styles.flexStyle}>
            <View style={{ flex: 8 }}>
              <ScrollView>
                <View
                  style={[
                    { flex: 1 },
                    {
                      flexDirection: "column",
                      top: "1%",
                    },
                  ]}
                >
                  <View style={{ flex: 1, padding: "5%" }}>
                    <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                      <View style={{ flex: 1 }}>
                        <View
                          style={[
                            { flex: 1 },
                            { flexDirection: "column", alignItems: "center" },
                          ]}
                        >
                          <View style={{ flex: 1, right: "10%" }}>
                            <Text style={styles.labelStyle}>
                              Father Name : {FatherName.charAt(0).toUpperCase() + FatherName.slice(1)}
                            </Text>
                          </View>
                          <View style={styles.space} />
                          <View style={{ flex: 1,right:'5%' }}>
                            <Text style={styles.labelStyle}>
                              Conatct Number : {ContactNumber}{" "}
                            </Text>
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
                    style={{}}
                  />
                  <View style={styles.space} />
                  <View style={{ flex: 1 }}>
                    <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                      <View style={{ flex: 1, padding: "5%" }}>
                        <View
                          style={[
                            { flex: 1 },
                            { flexDirection: "column", alignItems: "center" },
                          ]}
                        >
                          <View style={{ flex: 1, right: "10%" }}>
                            <Text style={styles.labelStyle}>
                              Mother name : {MotherName.charAt(0).toUpperCase() + MotherName.slice(1)}
                            </Text>
                          </View>
                          <View style={styles.space} />
                          <View style={{ flex: 1,right:'7%' }}>
                            <Text style={styles.labelStyle}>
                              Contact Number : {AlternateNumber}
                            </Text>
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
                    style={{}}
                  />
                  <View style={styles.space} />
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
      <View style={{ flex: 0.3 }}>
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
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  tabHeader: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 17,
    fontFamily: "HindSemiBold",
    color: "#1E84A4",
  },
  commonViewStyle:{
    flex: 1, 
    alignItems: "center"
  },
  textStyleStudInfo: {
    fontSize: 17,
    fontFamily: "HindMedium",
    color: "#1E84A4",
  },
  buttonStyle: {
    width: "50%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  labelStyle: {
    fontFamily: "HindMedium",
    fontSize: 16,
  },
  labelStyleValue: {
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  flexStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },
  activeStyle: {
    borderBottomColor: "#4C49AB",
    borderBottomWidth: 3,
    backgroundColor: "#D6D7FF",
  },
});
