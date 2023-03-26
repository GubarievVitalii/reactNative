import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import CommentsIcon from "./CommentsIcon";
import LikeIcon from "./LikeIcon";

const Post = ({ post, navigation }) => {
  const { photo, title, place, location, comments, likes } = post;

  const route = useRoute();

  const navigateToComments = () => {
    navigation.navigate("AddInfo", {
      screen: "Comments",
      params: {
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
          <LikeIcon name="like2" />
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
});

export default Post;
