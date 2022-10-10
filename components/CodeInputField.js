import { useRef, useState } from "react";
import { Layout, Text, } from "@ui-kitten/components";
import { COLORS, FONTS, SIZES } from "../constants";
import { Pressable, TextInput } from "react-native";
const CodeInputField = ({ setPinReady, code, setCode, maxLength }) => {
    const codeDigitsArray = new Array(maxLength).fill(0);

    const textInputRef = useRef(null);
    const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    };

    const toCodeDigitsInput = (value, index) => {
        const emptyInputChar = " ";
        const digit = code[index] || emptyInputChar;

        return (
            <Layout
                style={{
                    minWidth: "15%",
                    borderRadius: SIZES.font,
                    backgroundColor: "#F0F0F1",
                    padding: SIZES.medium,
                }}
            >
                <Text
                    style={{
                        fontFamily: FONTS.semiBold,
                        alignSelf: "center",
                    }}
                >
                    {digit}
                </Text>
            </Layout>
        );
    };

    return (
        <Layout
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Pressable
                onPress={handleOnPress}
                style={{
                    width: "80%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 40,
                }}
            >
                {codeDigitsArray.map(toCodeDigitsInput)}
            </Pressable>
            <TextInput
                value={code}
                onChangeText={setCode}
                maxLength={maxLength}
                keyboardType="number-pad"
                returnKeyType="done"
                textContentType="oneTimeCode"
                ref={textInputRef}
                style={{
                    position: "absolute",
                    opacity: 0,
                }}
            />
        </Layout>
    );
};

export default CodeInputField;
