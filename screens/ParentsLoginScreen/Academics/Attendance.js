import { View, StyleSheet, ScrollView, Button, FlatList } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import StudentAttendance from "../../../components/StudentItem/StudentAttendance";

const Attendance = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.teachers
          ? item.teachers.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(data);
      setSearchText(text);
    }
  };
  function renderStudentDetails(itemData) {
    return <StudentAttendance {...itemData.item} />;
  }

  return (
    <>
      <SearchBar
        style={styles.searchBar}
        placeholder="Search here by name"
        onChangeText={(text) => searchFilter(text)}
        value={searchText}
      />

      <ScrollView>
        <FlatList
          data={filteredData}
          renderItem={renderStudentDetails}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </>
  );
};
export default Attendance;

const styles = StyleSheet.create({
  searchBar: {
    top: 10,
  },
});
