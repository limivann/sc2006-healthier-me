import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, Platform } from "react-native";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 64 : 56;

const NavbarIcons = ({ icon }) => {
	return (
		<TouchableOpacity
			style={{
				height: TITLEBAR_HEIGHT,
				justifyContent: "center",
				alignItems: "center",
				paddingBottom: Platform.OS === "ios" ? 10 : 0,
			}}
		>
			<Image source={icon} style={{ width: 28, height: 28 }} />
		</TouchableOpacity>
	);
};

export default NavbarIcons;
