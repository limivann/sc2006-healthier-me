import { SafeAreaView, Image, TouchableOpacity } from "react-native";
import { Text, Button, Layout, Icon, Divider } from "@ui-kitten/components";
import React, { useState } from "react";
import {
	FocusedStatusBar,
	CircularDots,
	TickIcon,
	ActivityLevelButton,
} from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const SignupScreen2 = () => {
	const [selectedActivity, setSelectedActivity] = useState(0);
	const navigation = useNavigation();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<Layout
				style={{
					flex: 1,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<Layout
					style={{
						width: "100%",
						paddingTop: "0%",
						paddingBottom: "5%",
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontFamily: FONTS.bold,
							fontSize: SIZES.extraLarge,
							color: COLORS.primary,
						}}
					>
						Step 2 of 3
					</Text>
				</Layout>
				<Layout
					style={{
						width: "100%",
						marginBottom: 36,
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontFamily: FONTS.bold,
							fontSize: SIZES.extraLarge,
						}}
					>
						Select your activity level
					</Text>
				</Layout>
				<Layout
					style={{
						width: "85%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityLevelButton
						title={"Not Very Active"}
						description={"Spend most of the day sitting (e.g. desk job)."}
						index={0}
						selectedActivity={selectedActivity}
						onPress={() => setSelectedActivity(0)}
					/>
					<Divider
						style={{
							height: 2,
							backgroundColor: COLORS.lightgray,
							width: "95%",
							alignSelf: "center",
							marginVertical: SIZES.base,
						}}
					/>
					<ActivityLevelButton
						title={"Lightly Active"}
						description={
							"Spend a good part of the day on your feet (e.g. teacher)"
						}
						index={1}
						selectedActivity={selectedActivity}
						onPress={() => setSelectedActivity(1)}
					/>
					<Divider
						style={{
							height: 2,
							backgroundColor: COLORS.lightgray,
							width: "95%",
							alignSelf: "center",
							marginVertical: SIZES.base,
						}}
					/>
					<ActivityLevelButton
						title={"Active"}
						description={
							"Spend a good part of the day doing some physical activity (e.g. waiter)"
						}
						index={2}
						selectedActivity={selectedActivity}
						onPress={() => setSelectedActivity(2)}
					/>
					<Divider
						style={{
							height: 2,
							backgroundColor: COLORS.lightgray,
							width: "95%",
							alignSelf: "center",
							marginVertical: SIZES.base,
						}}
					/>
					<ActivityLevelButton
						title={"Very Active"}
						description={
							"Spend a good part of the day doing heavy physical activity (e.g. carpenter)"
						}
						index={3}
						selectedActivity={selectedActivity}
						onPress={() => setSelectedActivity(3)}
					/>
				</Layout>

				<Layout
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Layout style={{ paddingTop: 50, width: "80%" }}>
						<Button
							status="success"
							style={{
								marginBottom: SIZES.extraLarge,
								backgroundColor: COLORS.primary,
								borderRadius: SIZES.font,
							}}
							onPress={() => navigation.navigate("SignupPage3")}
						>
							Login
						</Button>
					</Layout>
					<Layout
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CircularDots bgColor={COLORS.gray} />
						<CircularDots bgColor={COLORS.primary} />
						<CircularDots bgColor={COLORS.gray} />
					</Layout>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};

export default SignupScreen2;
