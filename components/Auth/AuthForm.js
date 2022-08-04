import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredConfirmPhone, setEnteredConfirmPhone] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    phone: phoneIsInvalid,
    confirmPhone: phonsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "phone":
        setEnteredPhone(enteredValue);
        break;
      case "confirmPhone":
        setEnteredConfirmPhone(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      phone: enteredPhone,
      confirmPhone: enteredConfirmPhone,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Phone Number"
          onUpdateValue={updateInputValueHandler.bind(this, "phone")}
          value={enteredPhone}
          keyboardType="numeric"
          isInvalid={phoneIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Phone Number"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmPhone")}
            value={enteredConfirmPhone}
            keyboardType="numeric"
            isInvalid={phonsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
