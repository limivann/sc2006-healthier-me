import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import {
  Layout,
  Text,
  Icon,
  Input,
  Button,
  Divider,
} from "@ui-kitten/components";
import { useState } from "react";
export default function ForgotPasswordScreen() {
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
              marginLeft: "5%",
              marginRight: "5%",
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
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  fontFamily: FONTS.regular,
                  backgroundColor: "#72BE79",
                  borderRadius: 50,
                  position: "absolute",
                  marginTop: "50%",
                  marginBottom: "5%",
                  width: "90%",
                  height: "10%",
                  fontSize: SIZES.font
                }}
              >
                Continue
              </Button>
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: SIZES.font,
                  fontFamily: FONTS.regular,
                  paddingTop: "65%"
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
}
