import { Layout } from "@ui-kitten/components";
import React from "react";

const CircularDots = ({ bgColor }) => {
	return (
		<Layout
			style={{
				width: 10,
				height: 10,
				backgroundColor: bgColor,
				borderRadius: 10,
				marginHorizontal: 10,
			}}
		></Layout>
	);
};

export default CircularDots;
