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
import { NativeBaseProvider, extendTheme } from "native-base";
import StudentDetails from "./screens/ParentsLoginScreen/Profile/StudentDetails";
import EditTransport from "./screens/TeachersLoginScreen/Transport/EditTransport";
import EditCalendar from "./screens/TeachersLoginScreen/Calendar/EditCalendar";
import ChatHeader from "./components/ChatApplication/ChatUI/ChatHeader";
import MyClasses from "./screens/TeachersLoginScreen/Profile/MyClasses/MyClasses";
import StudentList from "./screens/TeachersLoginScreen/Profile/MyClasses/StudentList";
import ExamTimeTableSubjects from "./screens/TeachersLoginScreen/TimeTable/ExamTimeTableSubjects";
import TeachersLeave from "./screens/TeachersLoginScreen/Leave/TeachersLeave";
import TeachersLeaveUpdated from "./screens/TeachersLoginScreen/Leave/TeachersLeaveUpdated";
import ExamTimeTable from "./screens/ParentsLoginScreen/Academics/TimeTable/ExamTimeTable";
import TeachersAttendanceBuild from "./screens/TeachersLoginScreen/TeachersAcademics/Attendance/TeachersAttendanceBuild";
import AttendanceReport from "./screens/TeachersLoginScreen/TeachersAcademics/Attendance/AttendanceReport";
var value, Group, GroupP, GroupT;
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
    LunchTypeItalic: require("./assets/fonts/Lunchtype23-Regular-Italic.ttf"),
  });
  const [tokenIsPresent, setTokenIsPresent] = useState(false);
  const [showtab, setShowTab] = useState(false);
  const theme = extendTheme({
    fontConfig: {
      Roboto: {
        100: {
          normal: "Hind-SemiBold",
        },

        // Add more variants
        //   700: {
        //     normal: 'Roboto-Bold',
        //   },
        //   800: {
        //     normal: 'Roboto-Bold',
        //     italic: 'Roboto-BoldItalic',
        //   },
        //   900: {
        //     normal: 'Roboto-Bold',
        //     italic: 'Roboto-BoldItalic',
        //   },
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "Hind-SemiBold",
    },
  });

  useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
    ]);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs([
      "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'",
    ]);
  }, []);

  console.disableYellowBox = true;
  useEffect(() => {
    async function getGroup() {
      Group = await AsyncStorage.getItem("datagroup");
      // console.log(Group);
    }
    getGroup();
  }, []);

  // useEffect(() => {
  //   async function getGroupPT() {
  //     GroupT = await AsyncStorage.getItem("GroupT");
  //     GroupP = await AsyncStorage.getItem("GroupP");
  //     // console.log(GroupT);
  //     // console.log(GroupP);
  //   }
  //   getGroupPT();
  // }, []);

  useEffect(() => {
    async function getToken() {
      value = await AsyncStorage.getItem("token");

      if (value == null) {
        //console.log(TeacherGroup);
      } else {
        // console.log(TeacherGroup);
        // console.log(ParentGroup);
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

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TeachersLogin"
          component={TeachersLoginScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="LadingScreen"
          component={LandingScreen}
          options={{ title: "Welcome Screen" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Kinara" }}
        />
        

        <Stack.Screen
          name="ParentsLoginScreen"
          component={ParentsLoginScreen}
          options={{ title: "Dashboard" }}
        />

        <Stack.Screen
          name="TeachersAcademics"
          component={TeachersAcademics}
          options={{ title: "Academics" }}
        />
        <Stack.Screen
          name="TeachersTimetable"
          component={TeachersTimetable}
          options={{ title: "Timetable" }}
        />
        {/* <Stack.Screen name="TeachersCalendar" component={TeachersCalendar} /> */}
        <Stack.Screen
          name="TeachersCalendar"
          component={TeachersCalendar}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="TeachersMarksheet"
          component={TeachersMarksheet}
          options={{ title: "Marksheet" }}
        />
        {/* <Stack.Screen name="TeachersLeave" component={TeachersLeave} /> */}
        {/* <Stack.Screen
          name="TeachersLeave"
          component={TeachersLeave}
          options={{ title: "Leave" }}
        /> */}
        <Stack.Screen
          name="TeachersLeave"
          component={TeachersLeaveUpdated}
          options={{ title: "Leave" }}
        />
        <Stack.Screen
          name="TeachersNoticeBoard"
          component={TeachersNoticeboard}
          options={{ title: "Notifications" }}
        />

        <Stack.Screen
          name="TeachersTransport"
          component={TeachersTransport}
          options={{ title: "Transport" }}
        />
        <Stack.Screen
          name="TeachersAttendance"
          component={TeachersAttendanceBuild}
          options={{ title: "Attendance" }}
        />
        <Stack.Screen
          name="AttendanceReport"
          component={AttendanceReport}
          options={{ title: "Report" }}
        />

        {/* <Stack.Screen name="TeachersHomework" component={TeachersHomework} /> */}
        <Stack.Screen
          name="TeachersHomework"
          component={TeacherHomeworkScreenBuild}
          options={{ title: "Homework" }}
        />
        <Stack.Screen
          name="TeachersProfile"
          component={TeachersProfile}
          options={{ title: "Profile" }}
        />
        {/* <Stack.Screen
          name="ParentsLoginScreen"
          component={ParentsLoginScreen}
        /> */}
        <Stack.Screen
          name="Category"
          component={StudentCategories}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="StudentsOverview"
          component={StudentsOverviewScreen}
        />
        <Stack.Screen
          name="Leave"
          component={LeaveScreen}
          options={{ title: "Leave" }}
        />
        <Stack.Screen
          name="ParentsProfile"
          component={ParentsProfile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Calender"
          component={CalenderScreen}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="ReportCard"
          component={ReportCard}
          options={{ title: "ReportCard" }}
        />
        {/* <Stack.Screen name="MarksCard" component={Exam} /> */}
        <Stack.Screen
          name="NoticeBoard"
          component={Noticeboard}
          options={{ title: "Notifications" }}
        />

        <Stack.Screen
          name="TimeTable"
          component={TimeTable}
          options={{ title: "Timetable" }}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{ title: "Attendance" }}
        />

        <Stack.Screen
          name="Transport"
          component={TransportScreen}
          options={{ title: "Transport" }}
        />

        {/* <Stack.Screen
              name="TeachersOverview"
              component={TeachersOverviewScreen}
            /> */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ title: "Chat" }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="SingleUser"
          component={SingleUser}
          options={{ title: "" }}
        />
        <Stack.Screen name="ChatHeader" component={ChatHeader} />
        <Stack.Screen
          name="Academics"
          component={Academics}
          options={{ title: "Academics" }}
        />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen
          name="Homework"
          component={HomeworkScreen}
          options={{ title: "Homework" }}
        />
        <Stack.Screen
          name="MyClasses"
          component={MyClasses}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentList}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ExamSubjects"
          component={ExamTimeTableSubjects}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ExamTimeTable"
          component={ExamTimeTable}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    );
  }
  function AuthenticatedP() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ParentsLoginScreen"
          component={ParentsLoginScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="LadingScreen"
          component={LandingScreen}
          options={{ title: "Welcome Screen" }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Kinara" }}
        />
        <Stack.Screen
          name="Category"
          component={StudentCategories}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="StudentsOverview"
          component={StudentsOverviewScreen}
        />
        <Stack.Screen
          name="Leave"
          component={LeaveScreen}
          options={{ title: "Leave" }}
        />
        <Stack.Screen
          name="ParentsProfile"
          component={ParentsProfile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Calender"
          component={CalenderScreen}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="ReportCard"
          component={ReportCard}
          options={{ title: "ReportCard" }}
        />
        {/* <Stack.Screen name="MarksCard" component={Exam} /> */}
        <Stack.Screen
          name="NoticeBoard"
          component={Noticeboard}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="TimeTable"
          component={TimeTable}
          options={{ title: "Timetable" }}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{ title: "Attendance" }}
        />

        <Stack.Screen
          name="Transport"
          component={TransportScreen}
          options={{ title: "Transport" }}
        />

        {/* <Stack.Screen
              name="TeachersOverview"
              component={TeachersOverviewScreen}
            /> */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ title: "Chat" }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="SingleUser"
          component={SingleUser}
          options={{ title: "" }}
        />
        <Stack.Screen name="Academics" component={Academics} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="Homework" component={HomeworkScreen} />
        <Stack.Screen
          name="ExamTimeTable"
          component={ExamTimeTable}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="TeachersLogin"
          component={TeachersLoginScreen}
          options={{ title: "Dashboard" }}
        />
        {/* <Stack.Screen
          name="LadingScreen"
          component={LandingScreen}
          options={{ title: "Welcome Screen" }}
        /> */}
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Kinara" }}
        /> */}

        <Stack.Screen
          name="TeachersAcademics"
          component={TeachersAcademics}
          options={{ title: "Academics" }}
        />
        <Stack.Screen
          name="TeachersTimetable"
          component={TeachersTimetable}
          options={{ title: "Timetable" }}
        />
        {/* <Stack.Screen name="TeachersCalendar" component={TeachersCalendar} /> */}
        <Stack.Screen
          name="TeachersCalendar"
          component={TeachersCalendar}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="TeachersMarksheet"
          component={TeachersMarksheet}
          options={{ title: "Marksheet" }}
        />
        {/* <Stack.Screen name="TeachersLeave" component={TeachersLeave} /> */}
        {/* <Stack.Screen
          name="TeachersLeave"
          component={TeachersLeave}
          options={{ title: "Leave" }}
        /> */}
        <Stack.Screen
          name="TeachersLeave"
          component={TeachersLeaveUpdated}
          options={{ title: "Leave" }}
        />
        <Stack.Screen
          name="TeachersNoticeBoard"
          component={TeachersNoticeboard}
          options={{ title: "Notifications" }}
        />

        <Stack.Screen
          name="TeachersTransport"
          component={TeachersTransport}
          options={{ title: "Transport" }}
        />

        {/* <Stack.Screen name="TeachersHomework" component={TeachersHomework} /> */}
        <Stack.Screen
          name="TeachersHomework"
          component={TeacherHomeworkScreenBuild}
          options={{ title: "Homework" }}
        />
        <Stack.Screen
          name="TeachersAttendance"
          component={TeachersAttendanceBuild}
          options={{ title: "Attendance" }}
        />
        <Stack.Screen
          name="AttendanceReport"
          component={AttendanceReport}
          options={{ title: "Report" }}
        />
        <Stack.Screen
          name="TeachersProfile"
          component={TeachersProfile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="MyClasses"
          component={MyClasses}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ExamSubjects"
          component={ExamTimeTableSubjects}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentList}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    );
  }
  function AuthenticatedT() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TeachersLogin"
          component={TeachersLoginScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="LadingScreen"
          component={LandingScreen}
          options={{ title: "Welcome Screen" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Kinara" }}
        />

        <Stack.Screen
          name="TeachersAcademics"
          component={TeachersAcademics}
          options={{ title: "Academics" }}
        />
        <Stack.Screen
          name="TeachersTimetable"
          component={TeachersTimetable}
          options={{ title: "Timetable" }}
        />
        {/* <Stack.Screen name="TeachersCalendar" component={TeachersCalendar} /> */}
        <Stack.Screen
          name="TeachersCalendar"
          component={TeachersCalendar}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="TeachersMarksheet"
          component={TeachersMarksheet}
          options={{ title: "Marksheet" }}
        />
        {/* <Stack.Screen name="TeachersLeave" component={TeachersLeave} /> */}
        {/* <Stack.Screen
          name="TeachersLeave"
          component={TeachersLeave}
          options={{ title: "Leave" }}
        /> */}
        <Stack.Screen
          name="TeachersLeave"
          component={TeachersLeaveUpdated}
          options={{ title: "Leave" }}
        />
        <Stack.Screen
          name="TeachersNoticeBoard"
          component={TeachersNoticeboard}
          options={{ title: "Notifications" }}
        />

        <Stack.Screen
          name="TeachersTransport"
          component={TeachersTransport}
          options={{ title: "Transport" }}
        />

        {/* <Stack.Screen name="TeachersHomework" component={TeachersHomework} /> */}
        <Stack.Screen
          name="TeachersHomework"
          component={TeacherHomeworkScreenBuild}
          options={{ title: "Homework" }}
        />
        <Stack.Screen
          name="TeachersAttendance"
          component={TeachersAttendanceBuild}
          options={{ title: "Attendance" }}
        />
        <Stack.Screen
          name="AttendanceReport"
          component={AttendanceReport}
          options={{ title: "Report" }}
        />
        <Stack.Screen
          name="TeachersProfile"
          component={TeachersProfile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="MyClasses"
          component={MyClasses}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ExamSubjects"
          component={ExamTimeTableSubjects}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentList}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="ParentsLoginScreen"
          component={ParentsLoginScreen}
          options={{ title: "Dashboard" }}
        />
        {/* <Stack.Screen
          name="LadingScreen"
          component={LandingScreen}
          options={{ title: "Welcome Screen" }}
        /> */}

        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Kinara" }}
        /> */}
        <Stack.Screen
          name="Category"
          component={StudentCategories}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="StudentsOverview"
          component={StudentsOverviewScreen}
        />
        <Stack.Screen
          name="Leave"
          component={LeaveScreen}
          options={{ title: "Leave" }}
        />
        <Stack.Screen
          name="ParentsProfile"
          component={ParentsProfile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Calender"
          component={CalenderScreen}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="ReportCard"
          component={ReportCard}
          options={{ title: "ReportCard" }}
        />
        {/* <Stack.Screen name="MarksCard" component={Exam} /> */}
        <Stack.Screen
          name="NoticeBoard"
          component={Noticeboard}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="TimeTable"
          component={TimeTable}
          options={{ title: "Timetable" }}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{ title: "Attendance" }}
        />

        <Stack.Screen
          name="Transport"
          component={TransportScreen}
          options={{ title: "Transport" }}
        />

        {/* <Stack.Screen
              name="TeachersOverview"
              component={TeachersOverviewScreen}
            /> */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ title: "Chat" }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="SingleUser"
          component={SingleUser}
          options={{ title: "" }}
        />
        <Stack.Screen name="Academics" component={Academics} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="Homework" component={HomeworkScreen} />
        <Stack.Screen
          name="ExamTimeTable"
          component={ExamTimeTable}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    );
  }

  function Navigation() {
    return (
      <NavigationContainer>
        {value == null && <AuthStack />}
        {value !== null && Group == "staff" && <AuthenticatedT />}
        {value !== null && Group == "parents" && <AuthenticatedP />}
      </NavigationContainer>
    );
  }
  return (
    <>
      <NativeBaseProvider theme={theme}>
        <Navigation />
      </NativeBaseProvider>
    </>
  );
}
