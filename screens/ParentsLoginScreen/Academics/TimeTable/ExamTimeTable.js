import axios from "axios";
import { Alert, HStack, VStack,Text as NativeText, Box, Heading } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, Text } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { subURL } from "../../../../components/utils/URL's";
import ParentsHome from "../../BottomTab/ParentsHome";
import { ID } from "./TimeTable";

function ExamTimeTable(){

    const [data, setData] = useState([]);
    const [dataIsThere,setDataIsThere]=useState(false);

    console.log("ID"+ID)
    useEffect(()=>{
        async function viewExamList() {
            try{
                const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);
                console.log(res.data);
                setData(res.data)
                if(res.data.length > 0){
                    console.log('if part')
                    setDataIsThere(true);
                  }else{
                    console.log('else part')
                    setDataIsThere(false);
                  }
            }
            catch{
                console.log(error);
            }
        }
        viewExamList();
    },[]);

    return(
        <>
           <View style={styles.root}>
            <View style={{alignItems:'center',marginVertical:20}}>
                <Heading fontSize={20}>Exam Time Table</Heading>
            </View>
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row",marginVertical:20 }]}>
                    <View style={styles.tableHead}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={styles.tableHead}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 20 }}>
                      <ScrollView>
                        <View style={[styles.flexrow]}>
                          <View style={[styles.root,{}]}>
                            {data &&
                              data.map((data) => (
                                <>
                                  <View
                                    style={[
                                      styles.container,
                                      { flexDirection: "row" },
                                    ]}
                                  >
                                    <View style={[styles.colStyle]}>
                                      <Text
                                        style={[
                                          styles.tableTitle,
                                          { left: "35%" },
                                        ]}
                                      >
                                        {data.name}
                                      </Text>
                                    </View>
                                  </View>
                                </>
                              ))}
                          </View>
                          <View style={[styles.root, {}]}>
                            {data &&
                              data.map((data) => (
                                <>
                                  <View
                                    style={[
                                      styles.container,
                                      { flexDirection: "row" },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.colStyle,
                                        { left: "80%" },
                                      ]}
                                    >
                                      <Text style={[styles.tableTitle]}>
                                        {data.value}
                                      </Text>
                                    </View>
                                  </View>
                                </>
                              ))}
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
          </View>
          <View style={{ flex: 0.1 }}>
            <ParentsHome />
          </View>
        </>
    )
}

export default ExamTimeTable;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles=StyleSheet.create({

      alertStyle:{
        backgroundColor:'white',
        flex:1,
        paddingHorizontal:20,
      },
      tableTopStyle: {
        flex:4,
        padding: 10,
         bottom: 20,
      },
      tableHead: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "darkblue",
      },
      headingFont: {
        // fontFamily: "Hind-SemiBold",
        fontWeight: "bold",
        right:'15%',
        color: "white",
        fontSize: deviceWidth < 370 ? 14 : 14,
      },
      flexrow: {
        flex: 1,
        flexDirection: "row",
      },
      root: {
        flex: 2,
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 1,
      },
      colStyle: {
        padding: deviceHieght < 600 ? "5%" : "3%",
      },
      container: {
        padding: 10,
        borderWidth: 1,
      },
})