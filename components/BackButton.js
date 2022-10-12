import { Icon } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";

const BackButton = ({ onPress, color }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Icon name="arrow-circle-left-outline" style={styles.icon} fill={color} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 40,
		height: 40,
		backgroundColor: COLORS.primary,
		position: "absolute",
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: SIZES.large,
	},
	icon: {
		width: 36,
		height: 36,
	},
});

export default BackButton;
