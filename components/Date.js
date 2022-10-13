import { useState } from "react";
import { Layout, Text, Icon, Input } from "@ui-kitten/components";
import { Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";

const Date = ({ date, onPress }) => {
    const { id, dayOfWeek, dayOfMonth, isFocused } = date;
    
    return (
        <TouchableOpacity
            onPress={() => onPress(id)}
            style={{
                alignItems: "center",
                backgroundColor: isFocused ? COLORS.primary : "#F1F3FA",
                margin: SIZES.font,
                padding: SIZES.font,
                borderRadius: SIZES.font,
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: SIZES.font,
                }}
            >
                {dayOfWeek}
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.large,
                }}
            >
                {dayOfMonth}
            </Text>
        </TouchableOpacity>
    );
};
export default Date;
