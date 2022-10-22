import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";

const AddButton = ({ onPress, color, ...props }) => {
	return (
		<TouchableOpacity style={{ ...styles.button, ...props }} onPress={onPress}>
			<Icon
				name="plus-circle-outline"
				style={{ ...styles.icon }}
				fill={color}
			/>
		</TouchableOpacity>
	);
};

export default AddButton;

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
