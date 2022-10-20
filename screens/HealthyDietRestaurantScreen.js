import { useState } from "react";
import { Layout, Text, Input, ListItem, Avatar, Button, TouchableHighlight} from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { BackButton, CustomButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const HealthyDietRestaurantScreen = ({ navigation }) => {
	

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
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout style={{ flex: 1 }}>
					<BackButton onPress={() => navigation.goBack()} color="white" />
					<Layout
						style={{
							width: "100%",
							height: TITLEBAR_HEIGHT,
							backgroundColor: COLORS.primary,
							justifyContent: "flex-end",
                            padding: 10
						}}
					>
						<Text
							style={{
								fontFamily: FONTS.bold,
								textAlign: "center",
								paddingBottom: SIZES.font,
								color: COLORS.white,
								fontSize: SIZES.large,
                                
							}}
						>
							Navigation
						</Text>
					</Layout>
					<Layout style={styles.supportContainer}>
						
						<Layout style={{ width: "100%", position: "absolute", bottom: 300}}>
                            <TouchableOpacity>
                                <Image style={styles.img} source={require('../assets/images/D1.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image style={styles.img} source={require('../assets/images/R1.png')} />
                            </TouchableOpacity>

                            
						</Layout>
                        
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default HealthyDietRestaurantScreen;

const styles = StyleSheet.create({
	supportContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: "7.5%",
	},
	titleText: {
		paddingVertical: "7.5%",
		color: "black",
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.extraLarge,
	},
    img: {
        height:200,
        width:370
    }
});

const InstallButton = (props) => (
    <Button size='large'>
      Get!
    </Button>
  );
  
  const ItemImage = (props) => (
    <Avatar
      {...props}
      style={[props.style, { tintColor: null}]}
      source={require('../assets/images/Diet.png')}
      
    />
  );

  const InstallButton1 = (props) => (
    <Button size='large'>
      Get!
    </Button>
  );
  
  const ItemImage1 = (props) => (
    <Avatar
      {...props}
      style={[props.style, { tintColor: null }]}
      source={require('../assets/images/Restaurant.png')}
    />
  );
