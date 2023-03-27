import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { getUserId } from "../redux/auth/authSelectors";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const Comment = ({ item }) => {
  const { comment, date, userId } = item;
  const [photoUrl, setPhotoUrl] = useState(null);
  const id = useSelector(getUserId);

  useEffect(() => {
    async function downloadAvatar() {
      try {
        const url = await getDownloadURL(ref(storage, `authImages/${userId}`));
        setPhotoUrl(url);
      } catch (error) {
        console.log(error.message);
      }
    }
    downloadAvatar();
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: userId !== id ? "row" : "row-reverse",
      }}
    >
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={{ ...styles.img, marginLeft: userId !== id ? 0 : 16 }}
        />
      ) : (
        <View
          style={{
            ...styles.img,
            backgroundColor: "#F6F6F6",
            marginLeft: userId !== id ? 0 : 16,
          }}
        ></View>
      )}
      <View
        style={{
          ...styles.blockCommentText,
          marginLeft: userId !== id ? 16 : 0,
          borderTopStartRadius: userId !== id ? 0 : 6,
          borderTopEndRadius: userId !== id ? 6 : 0,
        }}
      >
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>
          {moment(date.seconds * 1000).format("DD MMMM, YYYY")}&nbsp;|&nbsp;
          {moment(date.seconds * 1000).format("hh:mm")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", display: "flex", marginBottom: 24 },
  img: { height: 28, width: 28, borderRadius: 50 },
  blockCommentText: {
    flex: 1,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
  },
  comment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
});

export default Comment;
