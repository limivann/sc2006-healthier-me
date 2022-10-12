import { useState } from "react";
import {
	Layout,
	Text,
	Icon,
	Input,
	Button,
	Divider,
} from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Image,
	Platform,
    TextInput
} from "react-native";	
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";


const SupportScreen = () => {

    const [email, setEmail] = useState("");
	const [password, setProblem] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);


	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};




	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.select({
				ios: () => -200,
				android: () => -200,
			})()}
		>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "flex-end",
						marginBottom: "20%",
					}}
				>
					<Layout style={{ width: "85%" }}>

						<Layout>
							<Layout style={{ marginBottom: SIZES.base }}>
								<Text
									style={{
										paddingLeft: SIZES.large,
										paddingTop: SIZES.base,
										color: COLORS.gray,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
									}}
								>
									What do you need from us?
								</Text>

								<Input
									placeholder="Email"
									autoCompleteType="email"
									value={email}
									onChangeText={nextValue => setEmail(nextValue)}
									style={{
										borderRadius: SIZES.base,
										...SHADOWS.light,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
									}}
								/>
							</Layout>
							<Layout>
								<Text
									style={{
										paddingLeft: SIZES.large,
										paddingTop: SIZES.base,
										color: COLORS.gray,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
                                        
									}}
								>
									
								</Text>
								<TextInput
                                    multiline = {true}
                                    numberOfLines={4}
									placeholder="  Enter your problem"
									autoCompleteType="Enter your problem"
									value={password}
									onChangeText={nextValue => setProblem(nextValue)}
									secureTextEntry={secureTextEntry}
									style={{
                                        addingTop: SIZES.base,
										borderRadius: SIZES.base,
										...SHADOWS.light,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
                                        borderBottomWidth : 1.0
									}}
								/>
							</Layout>
							
						</Layout>
						
					</Layout>
					<Layout style={{ paddingTop: 400, width: "80%" }}>
						<Button
							status="success"
							style={{
								marginBottom: SIZES.extraLarge,
								backgroundColor: "#72BE79",
								borderRadius: SIZES.font,

	
							}}
						>
							Send
						</Button>

					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SupportScreen;