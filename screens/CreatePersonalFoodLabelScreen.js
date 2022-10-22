import { useState } from "react";
import {
    Layout,
    Text,
    Input,
    Tab,
    TabBar,
    TabView,
} from "@ui-kitten/components";
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from "react-native";
import { FocusedStatusBar, CustomButton } from "../components";
import { COLORS, FONTS, SIZES, assets, SHADOWS } from "../constants";

const CreateByCaloriesScreen = () => {
    return (
        <Layout style={styles.contentContainer}>
            <Layout>
                <Text style={styles.text}>Food Name</Text>
                <Input
                    style={styles.input}
                    placeholder="John Doe's Chicken Rice"
                />
            </Layout>
            <Layout>
                <Text style={styles.text}>Calories</Text>
                <Input
                    style={styles.input}
                    placeholder="500"
                    keyboardType="numeric"
                />
            </Layout>
            <Layout style={styles.buttonContainer}>
                <CustomButton
                    text={"Create"}
                    backgroundColor={COLORS.primary}
                    width="60%"
                    borderRadius={SIZES.large}
                />
            </Layout>
        </Layout>
    );
};

const CreateByIngredientsScreen = () => {
    return (
        <Layout style={styles.contentContainer}>
            <Layout>
                <Text style={styles.text}>Food Name</Text>
                <Input
                    style={styles.input}
                    placeholder="John Doe's Chicken Rice"
                />
            </Layout>
        </Layout>
    );
};

const CreatePersonalFoodLabelScreen = () => {
    const [tabSelectedIndex, setTabSelectedIndex] = useState(0);

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
                <Layout>
                    <Layout style={styles.headerContainer}>
                        <Text style={styles.header}>
                            Create Personal Food Label
                        </Text>
                    </Layout>
                    <Layout style={{ width: "100%" }}>
                        <TabBar
                            selectedIndex={tabSelectedIndex}
                            onSelect={(index) => setTabSelectedIndex(index)}
                        >
                            <Tab title="Create by Calories" />
                            <Tab title="Create by Ingredients" />
                        </TabBar>
                    </Layout>
                    {tabSelectedIndex === 0 ? (
                        <CreateByCaloriesScreen />
                    ) : (
                        <CreateByIngredientsScreen />
                    )}
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        backgroundColor: "#F9F9F9",
        alignItems: "center",
        paddingVertical: "5%",
        ...SHADOWS.dark,
    },
    header: {
        color: COLORS.primary,
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
    },
    contentContainer: {
        width: "90%",
        height: "80%",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
    },
    text: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        paddingLeft: SIZES.font,
        paddingBottom: 5,
    },
    input: {
        ...SHADOWS.light,
        marginBottom: SIZES.large,
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        height: "40%",
    },
});
export default CreatePersonalFoodLabelScreen;
