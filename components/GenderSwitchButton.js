import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const GenderSwitchButton = ({ isMale, isMaleToggled, setIsMaleToggled }) => {
	const handlePress = () => {
		if (isMaleToggled && !isMale) {
			setIsMaleToggled(prev => !prev);
		}
		if (!isMaleToggled && isMale) {
			setIsMaleToggled(prev => !prev);
		}
	};
	return (
		<TouchableOpacity style={{ width: 75 }} onPress={() => handlePress()}>
			<Text
				style={{
					textAlign: "center",
					fontFamily: FONTS.regular,
					fontSize: SIZES.small,
					paddingHorizontal: SIZES.small,
					paddingVertical: SIZES.base,
					backgroundColor:
						(isMale && isMaleToggled) || (!isMale && !isMaleToggled)
							? COLORS.primary
							: COLORS.white,
					color:
						(isMale && isMaleToggled) || (!isMale && !isMaleToggled)
							? COLORS.white
							: "black",
					borderTopLeftRadius: isMale ? SIZES.base : 0,
					borderTopRightRadius: !isMale ? SIZES.base : 0,
					borderBottomLeftRadius: isMale ? SIZES.base : 0,
					borderBottomRightRadius: !isMale ? SIZES.base : 0,
					borderColor: COLORS.primary,
					borderStyle: "solid",
					borderWidth: 1,
				}}
			>
				{isMale ? "Male" : "Female"}
			</Text>
		</TouchableOpacity>
	);
};

export default GenderSwitchButton;
