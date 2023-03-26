import { View, FlatList, StyleSheet } from "react-native";
import { useAuthContext } from "../../hooks/useAuthContext";

import Post from "../../components/Post";

const PostsScreen = ({ navigation }) => {
  const { posts } = useAuthContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});

export default PostsScreen;
