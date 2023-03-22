import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import bgImage from "../assets/images/photo_bg.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureText, setSecureText] = useState("Показать");

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (!password) {
      setSecure(true);
      setSecureText("Показать");
    }
  }, [password]);

  const loginHandler = () => {
    if (!email || !password) {
      alert("Введите все данные");
      return;
    }
    console.log({ email, password });
    reset();
  };

  const showPassword = () => {
    if (password === "" && secure) return;
    if (secure) {
      setSecure(false);
      setSecureText("Скрыть");
      return;
    }
    setSecure(true);
    setSecureText("Показать");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.background}>
          <View
            style={{
              ...styles.form,
              paddingBottom: Platform.OS == "android" && showKeyboard ? 0 : 144,
            }}
          >
            <Text style={styles.title}>Войти</Text>
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => setIsActiveEmail(false)}
              onFocus={() => {
                setIsActiveEmail(true);
                setShowKeyboard(true);
              }}
              style={isActiveEmail ? styles.activeInput : styles.input}
            />
            <View
              style={{
                ...styles.lastInput,
                marginBottom:
                  Platform.OS == "android" && showKeyboard ? 32 : 43,
              }}
            >
              <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={passwordHandler}
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={secure}
                onBlur={() => setIsActivePassword(false)}
                onFocus={() => {
                  setIsActivePassword(true);
                  setShowKeyboard(true);
                }}
                style={
                  isActivePassword
                    ? {
                        ...styles.activeInput,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 100 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 100 : 0,
                      }
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={showPassword}
                style={styles.lastInputBtn}
              >
                <Text style={styles.lastInputText}>{secureText}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display:
                  Platform.OS == "android" && showKeyboard ? "none" : "flex",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={loginHandler}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: { flex: 1 },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",

    marginBottom: 33,
  },
  input: {
    height: 50,

    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    marginBottom: 16,
  },
  activeInput: {
    height: 50,

    backgroundColor: "#FFF",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    padding: 16,
    marginBottom: 16,
  },
  lastInput: {
    position: "relative",
  },
  lastInputBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  lastInputText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
});

export default LoginScreen;
