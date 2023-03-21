import { View, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const InputAvatar = ({ photo, deletePhoto, changePhotoAvatar }) => {
  return (
    <View style={styles.photoBlock}>
      {photo ? (
        <>
          <Image source={{ uri: photo }} style={styles.img} />
          <AntDesign
            name="closecircleo"
            size={24}
            color="#FF6C00"
            style={styles.btn}
            onPress={deletePhoto}
          />
        </>
      ) : (
        <View style={styles.img}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="#FF6C00"
            onPress={changePhotoAvatar}
            style={styles.btn}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  photoBlock: {
    position: "absolute",
    top: -60,
    left: "36%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    right: -12,
    bottom: 18,
  },
});
export default InputAvatar;
