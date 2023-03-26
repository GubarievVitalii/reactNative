import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const CommentsIcon = ({ name, onPress }) => {
  return (
    <FontAwesome
      name={name}
      size={20}
      color="#FF6C00"
      style={styles.icon}
      onPress={onPress}
    />
  );
};

export default CommentsIcon;

const styles = StyleSheet.create({
  icon: {
    transform: [{ scaleX: -1 }],
  },
});
