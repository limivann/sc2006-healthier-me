import { Icon } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const BackButton = ({ onPress, color, ...props }) => {
	return (
		<TouchableOpacity style={{ ...styles.button, ...props }} onPress={onPress}>
			<Icon
				name="arrow-circle-left-outline"
				style={{ ...styles.icon }}
				fill={color}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 40,
		height: TITLEBAR_HEIGHT,
		backgroundColor: COLORS.primary,
		position: "absolute",
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: SIZES.extraLarge,
	},
	icon: {
		width: 36,
		height: 36,
	},
});

export default BackButton;
