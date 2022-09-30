import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import TickIcon from "./TickIcon";

const ActivityLevelButton = ({
	title,
	description,
	index,
	selectedActivity,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
			}}
			onPress={onPress}
		>
			<Layout style={{ width: "85%", paddingRight: SIZES.base }}>
				<Text
					style={{
						paddingVertical: SIZES.base,
						fontFamily: FONTS.semiBold,
						fontSize: SIZES.large,
					}}
				>
					{title}
				</Text>
				<Text
					style={{
						paddingVertical: SIZES.base,
						fontFamily: FONTS.regular,
						fontSize: SIZES.font,
						color: selectedActivity === index ? COLORS.primary : "black",
					}}
				>
					{description}
				</Text>
			</Layout>
			<Layout style={{ width: "15%" }}>
				{selectedActivity === index ? <TickIcon /> : <></>}
			</Layout>
		</TouchableOpacity>
	);
};

export default ActivityLevelButton;
