import { useState } from "react";
import {
    Layout,
    Text,
    Button,
} from "@ui-kitten/components";
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { CodeInputField, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";

const VerificationCodeScreen = () => {
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState(false);
    const MAX_CODE_LENGTH = 4;
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
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Layout style={{ width: "85%" }}>
                        <Layout style={{ marginBottom: SIZES.extraLarge }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.bold,
                                    fontSize: SIZES.extraLarge,
                                    paddingVertical: SIZES.extraLarge,
                                }}
                            >
                                Enter verification code
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZES.font,
                                    color: COLORS.gray,
                                }}
                            >
                                Enter code sent to john***@example.com
                            </Text>
                        </Layout>
                        <CodeInputField
                            setPinReady={setPinReady}
                            code={code}
                            setCode={setCode}
                            maxLength={MAX_CODE_LENGTH}
                        />
                        <Layout>
                            <Button
                                status="success"
                                style={{
                                    backgroundColor: COLORS.primary,
                                    borderRadius: SIZES.font,
                                }}
                            >
                                Confirm
                            </Button>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: COLORS.gray,
                                    textDecorationLine: "underline",
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZES.font,
                                }}
                            >
                                Code not received?
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default VerificationCodeScreen;
