import { Layout, Text, Icon } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

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
				justifyContent: "space-between",
				alignItems: "center",
			}}
			onPress={onPress}
		>
			<Layout style={{ width: "90%", paddingRight: SIZES.base }}>
				<Text
					style={{
						paddingVertical: SIZES.base,
						fontFamily: FONTS.semiBold,
						fontSize: SIZES.large,
					}}
				>
					{title}
				</Text>
				<Layout
					style={{
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<Text
						style={{
							paddingVertical: SIZES.base,
							fontFamily: FONTS.regular,
							fontSize: SIZES.font,
							color: selectedActivity === index ? COLORS.primary : "black",
							width: "80%",
						}}
					>
						{description}
					</Text>
					<Layout style={{ width: "10%" }}>
						{selectedActivity === index ? (
							<Icon
								name="checkmark-outline"
								fill={COLORS.primary}
								style={{ width: 26, height: 26 }}
							/>
						) : (
							<></>
						)}
					</Layout>
				</Layout>
			</Layout>
		</TouchableOpacity>
	);
};

export default ActivityLevelButton;
