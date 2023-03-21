import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Text,
  ImageBackground,
} from "react-native";
import photo from "../assets/images/photo_bg.png";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const registerHandler = () => {
    if (!login || !email || !password) alert("Введите все данные");
    console.log({ login, email, password });
    reset();
  };

  return (
    <>
      <ImageBackground source={photo} style={styles.background} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Регистрация</Text>
          <TextInput
            placeholder="Логин"
            value={login}
            onChangeText={loginHandler}
            style={styles.input}
          />
          <TextInput
            placeholder="Адрес электронной почты"
            value={email}
            onChangeText={emailHandler}
            style={styles.input}
          />
          <TextInput
            placeholder="Пароль"
            value={password}
            onChangeText={passwordHandler}
            style={styles.input}
          />
          <Button
            title="Зарегистрироваться"
            style={styles.btn}
            onPress={registerHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  background: { width: "100%", height: "100%" },
  title: {
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    marginBottom: 16,
  },
  btn: {
    width: "100%",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
});

export default RegistrationScreen;
