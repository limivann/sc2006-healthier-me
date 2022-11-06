import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONTS, SIZES } from "../constants";

const CustomButton = ({
	onPress,
	text,
	fontColor = "white",
	children,
	...props
}) => {
	return (
		<TouchableOpacity style={{ ...styles.button, ...props }} onPress={onPress}>
			{children}
			<Text style={{ ...styles.buttonText, color: fontColor }}>{text}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	button: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: SIZES.medium,
		borderRadius: SIZES.font,
		paddingVertical: 12,
	},
	buttonText: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.font,
	},
});
