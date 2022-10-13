import { useMemo, useState } from "react";
import {
    Layout,
    Text,
    Icon,
    Input,
    Button,
    Divider,
    Avatar,
} from "@ui-kitten/components";
import { SafeAreaView, Image, TouchableOpacity } from "react-native";
import { FocusedStatusBar, Navbar, DateButton } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";

const HomeScreen = () => {
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
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: SIZES.font,
                }}
            >
                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "90%",
                        marginBottom: SIZES.large,
                    }}
                >
                    <Layout >
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.font,
                                color: COLORS.gray,
								paddingBottom: SIZES.font,
                            }}
                        >
                            Good Morning!
                        </Text>
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.extraLarge,
                                paddingLeft: SIZES.medium,
                            }}
                        >
                            Victoria
                        </Text>
                    </Layout>
                    <Avatar
                        source={require("../assets/icons/avatar.png")}
                        size="giant"
                    />
                </Layout>
				<Layout >
					<DateButton />
				</Layout>
            </Layout>
        </SafeAreaView>
    );
};

export default HomeScreen;
