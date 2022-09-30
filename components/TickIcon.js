import React from "react";
import { Image } from "react-native";
import { assets } from "../constants";

const TickIcon = () => {
	return (
		<Image
			resizeMode="contain"
			source={assets.checkmarkIcon}
			style={{ width: 26, height: 26 }}
		></Image>
	);
};

export default TickIcon;
