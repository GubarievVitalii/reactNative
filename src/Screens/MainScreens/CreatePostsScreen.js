import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useAuthContext } from "../../hooks/useAuthContext";

const CreatePostsScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);

  const [camera, setCamera] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const locationRes = await Location.getCurrentPositionAsync({});
      console.log("location", locationRes);
      setLocation(locationRes.coords);
    })();
  }, []);

  const titleHandler = (text) => setTitle(text);
  const placeHandler = (text) => setPlace(text);

  const { setPhotos } = useAuthContext();

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const onCameraReady = () => {
    setCameraReady(true);
  };

  const reset = () => {
    setPhoto(null);
    setTitle("");
    setPlace("");
  };

  const publishPost = async () => {
    setPhotos((prev) => [
      ...prev,
      { photo, title, place, location, likes: [], comments: 0 },
    ]);
    console.log({ photo, title, place, location, likes: [], comments: 0 });
    navigation.navigate("Posts");
    reset();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {!photo && (
            <Camera
              style={styles.camera}
              ref={setCamera}
              onCameraReady={onCameraReady}
            >
              {cameraReady && (
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.iconContainer}
                >
                  <FontAwesome5 name="camera" size={20} color="#BDBDBD" />
                </TouchableOpacity>
              )}
            </Camera>
          )}
          {photo && (
            <ImageBackground source={{ uri: photo }} style={styles.background}>
              <TouchableOpacity
                onPress={() => setPhoto(null)}
                style={{
                  ...styles.iconContainer,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <FontAwesome5 name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
        <Text
          onPress={() => {
            if (!photo) return;
            setPhoto(null);
          }}
          style={styles.loadText}
        >
          {!photo ? "Загрузите фото" : "Редактировать фото"}
        </Text>
        <TextInput
          placeholder="Название..."
          value={title}
          onChangeText={titleHandler}
          placeholderTextColor="#BDBDBD"
          selectionColor="#212121"
          onFocus={() => setShowKeyboard(true)}
          onBlur={() => setShowKeyboard(false)}
          style={{
            ...styles.input,
            marginTop: Platform.OS === "android" && showKeyboard ? -20 : 0,
          }}
        />
        <View
          style={{
            ...styles.input,
            marginTop: Platform.OS === "android" && showKeyboard ? -20 : 0,
            marginBottom: 32,
            paddingLeft: 28,
            position: "relative",
          }}
        >
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            style={styles.iconLocation}
          />
          <TextInput
            placeholder="Местность..."
            value={place}
            onChangeText={placeHandler}
            placeholderTextColor="#BDBDBD"
            selectionColor="#212121"
            onFocus={() => setShowKeyboard(true)}
            onBlur={() => setShowKeyboard(false)}
          />
        </View>
        <TouchableOpacity
          onPress={publishPost}
          activeOpacity={0.8}
          style={{
            ...styles.btn,
            marginBottom: !showKeyboard ? "auto" : 20,
            backgroundColor: !title || !photo || !place ? "#F6F6F6" : "#FF6C00",
          }}
          disabled={!title || !photo || !place ? true : false}
        >
          <Text
            style={{
              ...styles.btnTitle,
              color: !title || !photo || !place ? "#BDBDBD" : "#FFF",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
        <View style={styles.blockDelete}>
          <TouchableOpacity
            style={styles.btnDelete}
            activeOpacity={0.6}
            onPress={reset}
          >
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
  },
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  cameraContainer: {
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    position: "relative",
    height: 50,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
    marginBottom: 16,
  },
  iconLocation: { position: "absolute", left: 0, top: 13 },
  btn: {
    borderRadius: 100,
    paddingVertical: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  blockDelete: { width: "100%", alignItems: "center" },
  btnDelete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
