import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUserId } from "../../redux/auth/authSelectors";
import Comment from "../../components/Comment";

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;

  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState();
  const [showKeyboard, setShowKeyboard] = useState(false);

  const userId = useSelector(getUserId);

  const commentHandler = (text) => setComment(text);

  const addComment = async () => {
    if (!comment) {
      alert("Введите комментарий");
      return;
    }
    const date = new Date();
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      date,
      userId,
    });

    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    await updateDoc(docRef, { comments: docData.comments + 1 });

    setComment("");
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  const getAllComments = async () => {
    onSnapshot(collection(db, "posts", postId, "comments"), (querySnapshot) => {
      const commentsArray = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => a.date.seconds - b.date.seconds);
      setAllComments(commentsArray);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.img} />
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Comment item={item} />}
        />
        <View
          style={{
            ...styles.blockInput,
            marginBottom: Platform.OS === "ios" && showKeyboard ? 220 : 16,
          }}
        >
          <TextInput
            placeholder="Комментировать..."
            value={comment}
            onChangeText={commentHandler}
            onFocus={() => setShowKeyboard(true)}
            onBlur={() => setShowKeyboard(false)}
            placeholderTextColor="#BDBDBD"
            selectionColor="#212121"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.btnArrow}
            opacity={0.6}
            onPress={addComment}
          >
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  img: { width: "100%", height: 240, borderRadius: 8, marginBottom: 32 },
  btnArrow: {
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
  },
  blockInput: { width: "100%", position: "relative", height: 50 },
  input: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
  },
});

export default CommentsScreen;
