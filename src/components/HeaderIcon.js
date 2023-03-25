import { AntDesign } from "@expo/vector-icons";

const HeaderIcon = ({ navigation, path = "Posts" }) => {
  return (
    <AntDesign
      name="arrowleft"
      style={{ marginLeft: 20 }}
      size={24}
      color="black"
      onPress={() => {
        navigation.navigate(path);
      }}
    />
  );
};

export default HeaderIcon;
