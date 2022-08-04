import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Colors } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import FlatButton from "../UI/FlatButton";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    phone: false,
    password: false,
    confirmPhone: false,
    confirmPhone: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }
  function submitHandler(credentials) {
    let { phone, confirmPhone, password, confirmPassword } = credentials;

    phone = phone.trim();
    password = password.trim();

    const phoneIsValid = phone.length === 10;
    const passwordIsValid = password.length > 6;
    const phonesAreEqual = phone === confirmPhone;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !phoneIsValid ||
      !passwordIsValid ||
      (!isLogin && (!phonesAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        phone: !phoneIsValid,
        confirmPhone: !phoneIsValid || !phonesAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ phone, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
