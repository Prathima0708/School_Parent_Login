import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const DataList = () => {
  const [homework, setHomeWork] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://10.0.2.2:8000/school/Homework/");
        console.log(res.data);

        setHomeWork(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>CLASSNAME</th>
        <th>SECTION</th>
      </tr>
      {homework && homework.length > 0 ? (
        homework.map((hw) => (
          <tr>
            <td>{hw.id}</td>
            <td>{hw.class_name}</td>
            <td>{hw.section}</td>
          </tr>
        ))
      ) : (
        <Text>Error message:</Text>
      )}
    </table>
  );
};

export default DataList;
