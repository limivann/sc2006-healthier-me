import { View, Text, TouchableOpacity } from "react-native";
import { FONTS, SIZES } from "../constants";

const CustomButton = ({ onPress, text, children, ...props }) => {
	return (
		<TouchableOpacity
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "row",
				alignItems: "center",
				marginBottom: SIZES.medium,
				borderRadius: SIZES.font,
				paddingVertical: 12,
				...props,
			}}
			onPress={onPress}
		>
			{children}
			<Text
				style={{
					fontFamily: FONTS.bold,
					fontSize: SIZES.font,
					color: "#fff",
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
