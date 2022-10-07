import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { FocusedStatusBar, Navbar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { SafeAreaView } from "react-native";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const TermsAndConditionsScreen = () => {
    return (
        <Layout style={{ flex: 1 }}>
            <FocusedStatusBar
                backgroundColor={COLORS.primary}
                barStyle="dark-content"
            />
            <Layout
                style={{
                    width: "100%",
                    position: "absolute",
                }}
            ></Layout>
            <SafeAreaView style={{ flex: 1 }}>
                <Layout
                    style={{
                        width: "100%",
                        height: TITLEBAR_HEIGHT,
                        backgroundColor: COLORS.primary,
                        justifyContent: "flex-end",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.bold,
                            textAlign: "center",
                            paddingBottom: SIZES.base,
                            color: COLORS.white,
                            fontSize: SIZES.large,
                        }}
                    >
                        Terms And Conditions
                    </Text>
                </Layout>
                <Layout
                    style={{
                        width: "85%",
                        margin: SIZES.font,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.large,
                            paddingBottom: SIZES.font,
                        }}
                    >
                        Lorem ipsum
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: SIZES.font,
                            color: COLORS.gray,
                            textAlign: "justify",
                        }}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Architecto perferendis nostrum sed cupiditate
                        distinctio accusantium animi, fugiat harum corporis
                        necessitatibus excepturi adipisci ea porro aspernatur
                        reprehenderit. Facere sed corrupti voluptatem.
                    </Text>
                </Layout>
                <Layout
                    style={{
                        width: "85%",
                        margin: SIZES.font,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.large,
                            paddingBottom: SIZES.font,
                        }}
                    >
                        Lorem ipsum
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: SIZES.font,
                            color: COLORS.gray,
                            textAlign: "justify",
                        }}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Architecto perferendis nostrum sed cupiditate
                        distinctio accusantium animi, fugiat harum corporis
                        necessitatibus excepturi adipisci ea porro aspernatur
                        reprehenderit. Facere sed corrupti voluptatem.
                    </Text>
                </Layout>
                <Navbar />
            </SafeAreaView>
        </Layout>
    );
};

export default TermsAndConditionsScreen;
