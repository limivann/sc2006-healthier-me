import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text, Button, Layout, Divider, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { FocusedStatusBar, CircularDots, TickIcon } from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const SignupScreen3 = () => {
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState(0);

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
              Step 3 of 3
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
              Personal Details
            </Text>
          </Layout>
          <Layout
            style={{
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Divider
              style={{
                height: 2,
                backgroundColor: COLORS.lightgray,
                width: "95%",
                alignSelf: "center",
                marginVertical: SIZES.base,
              }}
            />
            <Layout
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingRight: 210,
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.extraLarge,
                  color: COLORS.gray,
                }}
              >
                Age
              </Text>
              <Input
                style={{
                  color: "#72BE79",
                }}
                value={age}
                onChange={(nextValue) => setAge(parseInt(nextValue))}
              />
            </Layout>
          </Layout>
          <Layout
            style={{
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Divider
              style={{
                height: 2,
                backgroundColor: COLORS.lightgray,
                width: "95%",
                alignSelf: "center",
                marginVertical: SIZES.base,
              }}
            />
            <Layout
              style={{
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingRight: 150,
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.extraLarge,
                  color: COLORS.gray,
                }}
              >
                Height
              </Text>
              <Input
                style={{
                  color: "#72BE79",
                }}
                value={height}
                onChange={(nextValue) => setHeight(parseFloat(nextValue))}
              />
              <Text
                style={{
                  color: "#72BE79",
                  fontFamily: FONTS.regular,
                  fontSize: SIZES.large,
                  paddingHorizontal: 10,
                }}
              >
                cm
              </Text>
            </Layout>
          </Layout>
          <Layout
            style={{
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Divider
              style={{
                height: 2,
                backgroundColor: COLORS.lightgray,
                width: "95%",
                alignSelf: "center",
                marginVertical: SIZES.base,
              }}
            />
            <Layout
              style={{
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingRight: 150,
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.extraLarge,
                  color: COLORS.gray,
                }}
              >
                Weight
              </Text>
              <Input
                style={{
                  color: "#72BE79",
                }}
                value={weight}
                onChange={(nextValue) => setWeight(parseFloat(nextValue))}
              />
              <Text
                style={{
                  color: "#72BE79",
                  fontFamily: FONTS.regular,
                  fontSize: SIZES.large,
                  paddingHorizontal: 10,
                }}
              >
                kg
              </Text>
            </Layout>
          </Layout>
          <Layout
            style={{
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Divider
              style={{
                height: 2,
                backgroundColor: COLORS.lightgray,
                width: "95%",
                alignSelf: "center",
                marginVertical: SIZES.base,
              }}
            />
            <Text
              style={{
                paddingRight: 240,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.extraLarge,
                color: COLORS.gray,
              }}
            >
              Gender
            </Text>
            <Divider
              style={{
                height: 2,
                backgroundColor: COLORS.lightgray,
                width: "95%",
                alignSelf: "center",
                marginVertical: SIZES.base,
              }}
            />
          </Layout>
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
              Start
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
            <CircularDots bgColor={COLORS.gray} />
            <CircularDots bgColor={COLORS.primary} />
          </Layout>
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen3;
