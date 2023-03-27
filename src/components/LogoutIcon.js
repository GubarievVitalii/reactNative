import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../redux/auth/authOperations";

const LogoutIcon = ({ style }) => {
  const dispatch = useDispatch();

  return (
    <Ionicons
      name="exit-outline"
      style={style}
      size={24}
      color="rgba(33, 33, 33, 0.8)"
      onPress={() => dispatch(logoutUser())}
    />
  );
};

export default LogoutIcon;
