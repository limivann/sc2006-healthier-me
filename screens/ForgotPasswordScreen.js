import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { useState } from "react";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
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
            width: "100%",
            height: "100%",
          }}
        >
          <Layout
            style={{
              marginTop: "10%",
              paddingVertical: "20%",
              paddingHorizontal: "5%",
            }}
          >
            <Text category="h1">Forgot Password</Text>
            <Text
              style={{
                paddingVertical: "10%",
                fontFamily: FONTS.light,
                fontSize: SIZES.large,
              }}
            >
              Enter your email and we will send you a reset code.
            </Text>
          </Layout>
          <Layout
            style={{
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.large,
                color: COLORS.gray,
                paddingBottom: "3%",
                paddingLeft: "5%",
              }}
            >
              Email
            </Text>
            <Input
              placeholder="johndoe@example.com"
              autoCompleteType="email"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
              style={{
                borderRadius: SIZES.base,
                ...SHADOWS.light,
                fontFamily: FONTS.regular,
                fontSize: SIZES.font,
              }}
            />
            <Layout
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Layout
                style={{
                  paddingTop: 50,
                  width: "80%",
                }}
              >
                <Button
                  status="success"
                  style={{
                    marginBottom: SIZES.extraLarge,
                    backgroundColor: COLORS.primary,
                    borderRadius: SIZES.font,
                  }}
                >
                  Continue
                </Button>
              </Layout>
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: SIZES.font,
                  fontFamily: FONTS.regular,
                }}
              >
                Already have an account? Login
              </Text>
            </Layout>
          </Layout>
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
