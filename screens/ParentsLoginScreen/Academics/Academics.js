import { FlatList, StyleSheet, View } from "react-native";
import CategoryGridTile from "../../../components/StudentItem/CategoryGridTile";
import ParentAcademicsGridTile from "../../../components/StudentItem/ParentsAcademicsGridTile";
import { ACADEMICS } from "../../../components/utils/Academics";
import ParentsHome from "../BottomTab/ParentsHome";

function Academics({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.id === "c1") {
        navigation.navigate("Homework", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c2") {
        navigation.navigate("TimeTable", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c3") {
        navigation.navigate("Attendance", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c4") {
        navigation.navigate("ReportCard", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c5") {
        navigation.navigate("Leave", {
          stdId: itemData.item.id,
        });
      }
    }
    return (
      <View style={styles.rootContainer}>
        <ParentAcademicsGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
          txtclr={itemData.item.txtclr}
        />
      </View>
    );
  }
  return (
    <>
      <View
        style={[{flex:1, flexDirection: 'column'}]}>
        <View style={{flex: 2, backgroundColor: 'white',alignItems:'center'}} >
          <FlatList
            style={styles.test}
            data={ACADEMICS}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
          />
        </View>
        <View style={{flex: 0.1}} >
          <ParentsHome />
        </View>
      </View>

     {/* <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        style={styles.test}
        data={ACADEMICS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
      <ParentsHome />
      </View> */}
    </>
  );
}
export default Academics;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop:'2%',
    justifyContent: "center",
    alignItems: "center",
   // backgroundColor:'red'
    //padding: 32,
  },
  // test: {
  //   top: 15,
  //   //backgroundColor:'white'
  // },
});
