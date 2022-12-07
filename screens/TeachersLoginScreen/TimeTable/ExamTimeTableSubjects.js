import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { subURL } from "../../../components/utils/URL's";
import { Card } from "react-native-paper";
import { ID } from "./TecahersExamTimeTable";

const ExamTimeTableSubjects = () => {
  const [data, setData] = useState([]);
  console.log("id -", ID);
  useEffect(() => {
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
  }, []);
  return (
    <>
      {data.map((key, data) => (
        <Card
          style={{
            marginTop: 20,
            marginVertical: 1,
            marginHorizontal: 20,
            elevation: 5,
            borderRadius: 10,
          }}
          key={key}
        >
          <Card.Content>
            <View style={[{}, { flexDirection: "row" }]}>
              <View style={{ flex: 2 }}>
                <Text style={styles.cardTextStyle}>Exam Date</Text>
                <Text style={styles.cardTextStyle}>Exam name</Text>
              </View>
              <View style={{}}>
                <Text
                  style={[
                    styles.cardTextStyle,
                    {
                      color: "grey",
                      fontSize: 16,
                    },
                  ]}
                >
                  {data.name}ds
                </Text>
                <Text
                  style={[
                    styles.cardTextStyle,
                    {
                      width: "120%",
                      color: "grey",
                      fontSize: 16,
                    },
                  ]}
                >
                  {data.value}df
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default ExamTimeTableSubjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
