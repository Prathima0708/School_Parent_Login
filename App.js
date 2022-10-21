import Login, { ParentGroup, TeacherGroup } from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Inter_900Black } from "@expo-google-fonts/inter";
import Chat from "./components/ChatApplication/Chat";
import ChatScreen from "./components/ChatApplication/ChatScreen";
import SingleUser from "./components/ChatApplication/SingleUser";
import TeachersLoginScreen from "./screens/TeachersLoginScreen/TeachersLoginScreen";
import ParentsLoginScreen from "./screens/ParentsLoginScreen/ParentsLoginScreen";
import LeaveScreen from "./screens/ParentsLoginScreen/Academics/Leave/LeaveScreen";
import TransportScreen from "./screens/ParentsLoginScreen/Transport/TransportScreen";
import CalenderScreen from "./screens/ParentsLoginScreen/Calendar/CalenderScreen";

import Academics from "./screens/ParentsLoginScreen/Academics/Academics";
import HomeworkScreen from "./screens/ParentsLoginScreen/Academics/Homework/HomeworkScreen";
import StudentCategories from "./screens/ParentsLoginScreen/StudentCategories";
import StudentsOverviewScreen from "./screens/ParentsLoginScreen/StudentsOverviewScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import IconButton from "./components/UI/IconButton";
import { useEffect, useState } from "react";

import Noticeboard from "./screens/ParentsLoginScreen/NoticeBoard/Noticeboard";
import Attendance from "./screens/ParentsLoginScreen/Academics/Attendance/Attendance";
import TeachersTransport from "./screens/TeachersLoginScreen/Transport/TeachersTransport";
import TimeTable from "./screens/ParentsLoginScreen/Academics/TimeTable/TimeTable";

import { useFonts } from "expo-font";
import TeachersAcademics from "./screens/TeachersLoginScreen/TeachersAcademics/TeachersAcademics";
import TeachersCalendar from "./screens/TeachersLoginScreen/Calendar/TeachersCalendar";
import ReportCard from "./screens/ParentsLoginScreen/Academics/ReportCard/ReportCard";
import TeachersTimetable from "./screens/TeachersLoginScreen/TimeTable/TeachersTimeTable";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { Token } from "./screens/Login";
import TeachersNoticeboard from "./screens/TeachersLoginScreen/TeachersAcademics/NoticeBoard/TeachersNoticeBoard";

import TeachersMarksheet from "./screens/TeachersLoginScreen/Marksheet/TeachersMarksheet";
import LandingScreen from "./screens/LandingScreen";
import TeachersProfile from "./screens/TeachersLoginScreen/Profile/TeachersProfile";
import ParentsProfile from "./screens/ParentsLoginScreen/Profile/ParentsProfile";
import TeacherHomeworkScreenBuild from "./screens/TeachersLoginScreen/TeachersAcademics/Homework/TeacherHomeworkScreenBuild";
import TeachersLeaveScreenBuild from "./screens/TeachersLoginScreen/Leave/TeachersLeaveScreenBuild";
import TeachersCalendarScreenBuild from "./screens/TeachersLoginScreen/Calendar/TeachersCalendarScreenBuild";
import { LogBox } from "react-native";
import TeachersAttendance from "./screens/TeachersLoginScreen/TeachersAcademics/Attendance/TeachersAttendance";
import { NativeBaseProvider } from "native-base";
var value, Group;
// function Bottom() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Teacher" component={TeachersLoginScreen} />
//       {/* <Tab.Screen name="Logout" component={TeachersHome} /> */}
//     </Tab.Navigator>
//   );
// }

export default function App() {
  let [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    Monsterrat: require("./assets/fonts/static/Montserrat-Medium.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
    MonsterratBold: require("./assets/fonts/static/Montserrat-Bold.ttf"),
    MainHeading: require("./assets/fonts/Libre_Franklin/static/LibreFranklin-Bold.ttf"),
    welcomeMsg: require("./assets/fonts/Libre_Franklin/static/LibreFranklin-Medium.ttf"),
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    HindRegular: require("./assets/fonts/Hind-Regular.ttf"),
    HindBold: require("./assets/fonts/Hind-Bold.ttf"),
    HindLight: require("./assets/fonts/Hind-Light.ttf"),
    HindMedium: require("./assets/fonts/Hind-Medium.ttf"),
    HindSemiBold: require("./assets/fonts/Hind-SemiBold.ttf"),
  });
  const [tokenIsPresent, setTokenIsPresent] = useState(false);
  const [showtab, setShowTab] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
    ]);
  }, []);

  useEffect(() => {
    async function getGroup() {
      Group = await AsyncStorage.getItem("datagroup");
      //console.log(Group);
    }
    getGroup();
  }, []);

  useEffect(() => {
    async function getToken() {
      value = await AsyncStorage.getItem("token");

      if (value == null) {
        console.log("no token" + "Group is", Group);
      } else {
        console.log("token is", value + "Group is", Group);
      }
      // if (value !== null) {
      //   // setTokenIsPresent(true);
      //   // console.log(tokenIsPresent);
      // } else {
      //   // setTokenIsPresent(false);
      //   // console.log(tokenIsPresent);
      // }
    }
    getToken();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{ title: "WelcomeScreen" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Kinara" }}
            />

            <Stack.Screen
              name="TeachersAcademics"
              component={TeachersAcademics}
            />
            <Stack.Screen
              name="TeachersTimetable"
              component={TeachersTimetable}
            />
            {/* <Stack.Screen name="TeachersCalendar" component={TeachersCalendar} /> */}
            <Stack.Screen
              name="TeachersCalendar"
              component={TeachersCalendarScreenBuild}
            />
            <Stack.Screen
              name="TeachersMarksheet"
              component={TeachersMarksheet}
            />
            {/* <Stack.Screen name="TeachersLeave" component={TeachersLeave} /> */}
            <Stack.Screen
              name="TeachersLeave"
              component={TeachersLeaveScreenBuild}
            />
            <Stack.Screen
              name="TeachersNoticeBoard"
              component={TeachersNoticeboard}
            />

            <Stack.Screen
              name="TeachersLogin"
              component={TeachersLoginScreen}
            />
            {/* <Stack.Screen
              name="TeachersLogin"
              component={Bottom}
              options={{ headerShown: false }}
            /> */}

            <Stack.Screen
              name="ParentsLoginScreen"
              component={ParentsLoginScreen}
            />

            <Stack.Screen name="Category" component={StudentCategories} />
            <Stack.Screen
              name="StudentsOverview"
              component={StudentsOverviewScreen}
            />
            <Stack.Screen name="Leave" component={LeaveScreen} />
            <Stack.Screen name="ParentsProfile" component={ParentsProfile} />
            <Stack.Screen name="Calender" component={CalenderScreen} />
            <Stack.Screen name="ReportCard" component={ReportCard} />
            {/* <Stack.Screen name="MarksCard" component={Exam} /> */}
            <Stack.Screen name="NoticeBoard" component={Noticeboard} />
            <Stack.Screen name="TimeTable" component={TimeTable} />
            <Stack.Screen name="Attendance" component={Attendance} />
            <Stack.Screen
              name="TeachersAttendance"
              component={TeachersAttendance}
            />
            <Stack.Screen name="Transport" component={TransportScreen} />
            <Stack.Screen
              name="TeachersTransport"
              component={TeachersTransport}
              options={{ title: "" }}
            />

            {/* <Stack.Screen name="TeachersHomework" component={TeachersHomework} /> */}
            <Stack.Screen
              name="TeachersHomework"
              component={TeacherHomeworkScreenBuild}
            />
            <Stack.Screen name="TeachersProfile" component={TeachersProfile} />
            {/* <Stack.Screen
              name="TeachersOverview"
              component={TeachersOverviewScreen}
            /> */}
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="SingleUser" component={SingleUser} />
            <Stack.Screen name="Academics" component={Academics} />
            <Stack.Screen name="Homework" component={HomeworkScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
}