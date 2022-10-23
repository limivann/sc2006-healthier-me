import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";

const CloseButton = ({ onPress, color, ...props }) => {
	return (
		<TouchableOpacity style={{ ...styles.button, ...props }} onPress={onPress}>
			<Icon
				name="close-circle-outline"
				style={{ ...styles.icon }}
				fill={color}
			/>
		</TouchableOpacity>
	);
};

export default CloseButton;

const styles = StyleSheet.create({
	button: {
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	icon: {
		width: 36,
		height: 36,
	},
});
