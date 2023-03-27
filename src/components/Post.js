import { useMemo } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { getUserId, getUserName } from "../redux/auth/authSelectors";
import CommentsIcon from "./CommentsIcon";
import LikeIcon from "./LikeIcon";

const Post = ({ post, navigation }) => {
  const {
    photo,
    photoId,
    title,
    place,
    location,
    id,
    comments,
    likes,
    userId: itemUserId,
  } = post;

  const userId = useSelector(getUserId);
  const userName = useSelector(getUserName);
  const route = useRoute();

  const userLike = useMemo(
    () => likes.find((item) => item.userId === userId),
    [likes]
  );

  const addLike = async () => {
    if (itemUserId === userId) {
      alert("Это ваша публикация, вы не можете ее лайкать");
      return;
    }

    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const ourLike = docData.likes.find((item) => item.userId === userId);
      if (ourLike) {
        await updateDoc(docRef, {
          likes: docData.likes.filter((item) => item.userId !== userId),
        });
        return;
      }
      await updateDoc(docRef, {
        likes: [...docData.likes, { userId, userName }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "posts", id));
      const desertRef = ref(storage, `postImages/${photoId}`);
      await deleteObject(desertRef);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToComments = () => {
    navigation.navigate("AddInfo", {
      screen: "Comments",
      params: {
        postId: id,
        photo,
        back: route.name,
      },
    });
  };

  const navigateToMap = () => {
    navigation.navigate("AddInfo", {
      screen: "Map",
      params: {
        latitude: location ? location.latitude : 0,
        longitude: location ? location.longitude : 0,
        back: route.name,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.img} />
      {route.name === "Profile" && (
        <AntDesign
          name="closecircleo"
          size={20}
          color="#FF6C00"
          style={styles.btnDelete}
          onPress={() => deletePost()}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          ...styles.iconsContainer,
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.iconsContainer}>
          {comments > 0 ? (
            <CommentsIcon name="comment" onPress={navigateToComments} />
          ) : (
            <CommentsIcon name="comment-o" onPress={navigateToComments} />
          )}
          <Text style={styles.commentsText}>{comments}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: 24 }}>
          {!userLike ? (
            <LikeIcon name="like2" onPress={addLike} />
          ) : (
            <LikeIcon name="like1" onPress={addLike} />
          )}
          <Text style={styles.commentsText}>{likes.length}</Text>
        </View>
        <View style={{ ...styles.iconsContainer, marginLeft: "auto" }}>
          <EvilIcons
            name="location"
            size={24}
            color="#FF6C00"
            onPress={navigateToMap}
          />
          <Text style={styles.placeText}>{place}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 32,
  },
  img: { width: "100%", height: 240, borderRadius: 8, marginBottom: 8 },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commentsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  placeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
    marginLeft: 4,
  },
  btnDelete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Post;
