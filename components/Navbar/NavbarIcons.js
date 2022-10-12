import { TouchableOpacity } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { Icon } from "@ui-kitten/components";
import { SIZES } from "../../constants";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 64 : 56;

const NavbarIcons = ({ iconName, fill, onPress }) => {
	const name = fill ? iconName : `${iconName}-outline`;
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				height: TITLEBAR_HEIGHT,
				justifyContent: "center",
				alignItems: "center",
				paddingBottom: Platform.OS === "ios" ? 10 : 0,
				flex: 1,
				paddingHorizontal: SIZES.medium,
			}}
		>
			<Icon name={name} fill="white" style={{ width: 32, height: 32 }} />
		</TouchableOpacity>
	);
};

export default NavbarIcons;
