import { Icon } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const EditButton = ({ onPress, color }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Icon name="edit-outline" style={styles.icon} fill={color} />
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
		paddingRight: SIZES.extraLarge,
		paddingBottom: SIZES.base,
		top: 0,
		right: 0,
	},
	icon: {
		width: 36,
		height: 36,
	},
});

export default EditButton;
