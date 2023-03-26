import { AntDesign } from "@expo/vector-icons";

const LikeIcon = ({ name, onPress }) => {
  return <AntDesign name={name} size={20} color="#FF6C00" onPress={onPress} />;
};

export default LikeIcon;
