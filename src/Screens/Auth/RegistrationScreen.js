import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import bgImage from "../../assets/images/photo_bg.png";
import InputAvatar from "../../components/InputAvatar";
import { useAuthContext } from "../../hooks/useAuthContext";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureText, setSecureText] = useState("Показать");
  const [photo, setPhoto] = useState(null);

  const { isAuth, setIsAuth } = useAuthContext();

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  useEffect(() => {
    if (!password) {
      setSecure(true);
      setSecureText("Показать");
    }
  }, [password]);

  const showPassword = () => {
    if (!password && secure) return;
    if (secure) {
      setSecure(false);
      setSecureText("Скрыть");
      return;
    }
    setSecure(true);
    setSecureText("Показать");
  };

  const changePhotoAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const registerHandler = () => {
    if (!login || !email || !password) {
      alert("Введите все данные");
      return;
    }
    console.log({ login, email, password, photo });
    setIsAuth(true);
    reset();
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
              paddingBottom: Platform.OS == "android" && showKeyboard ? 0 : 78,
            }}
          >
            <InputAvatar
              photo={photo}
              deletePhoto={deletePhoto}
              changePhotoAvatar={changePhotoAvatar}
            />
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
              placeholder="Логин"
              value={login}
              onChangeText={loginHandler}
              placeholderTextColor="#BDBDBD"
              onBlur={() => {
                setIsActiveLogin(false);
              }}
              onFocus={() => {
                setIsActiveLogin(true);
                setShowKeyboard(true);
              }}
              style={isActiveLogin ? styles.activeInput : styles.input}
            />
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              onBlur={() => {
                setIsActiveEmail(false);
              }}
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
                secureTextEntry={secure}
                onBlur={() => {
                  setIsActivePassword(false);
                }}
                onFocus={() => {
                  setIsActivePassword(true);
                  setShowKeyboard(true);
                }}
                style={
                  isActivePassword
                    ? {
                        ...styles.activeInput,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 165 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 165 : 0,
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={registerHandler}
            >
              <Text style={styles.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
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
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
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
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
    textAlign: "center",
  },
});

export default RegistrationScreen;
