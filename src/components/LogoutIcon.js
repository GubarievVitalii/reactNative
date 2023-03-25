import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../hooks/useAuthContext";

const LogoutIcon = ({ style }) => {
  const { setIsAuth } = useAuthContext();

  return (
    <Ionicons
      name="exit-outline"
      style={style}
      size={24}
      color="rgba(33, 33, 33, 0.8)"
      onPress={() => setIsAuth(false)}
    />
  );
};

export default LogoutIcon;
