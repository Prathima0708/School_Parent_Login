import { View, StyleSheet, ScrollView, Button, FlatList } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import SelectList from 'react-native-dropdown-select-list'
import axios from "axios";
import { useEffect } from "react";
import { Checkbox } from 'react-native-paper';
import StudentItem from "../../../components/StudentItem/StudentItem";
import SearchBar from "react-native-dynamic-search-bar";
import StudentAttendance from "../../../components/StudentItem/StudentAttendance";

const Attendance = () => {
  
  const [data,setData]=useState([])
  const [searchText,setSearchText]=useState()
  var todayDate;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  todayDate= date + '-' + month + '-' + year;//format: d-m-y;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function renderStudentDetails(itemData) {
    return <StudentAttendance {...itemData.item} />;
  }

  function handleOnChangeText(text){
    setSearchText(text);
  }
  return (
    <>
        <SearchBar
          placeholder="Search here"
          onChangeText={handleOnChangeText}
          value={searchText}
        />
        <ScrollView>
          <FlatList data={data} renderItem={renderStudentDetails}/>
        </ScrollView>
        
    </>
  );
};
export default Attendance;

const styles = StyleSheet.create({

  
});

