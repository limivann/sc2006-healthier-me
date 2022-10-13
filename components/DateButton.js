import { useMemo, useState } from "react";
import { Layout, Text, Icon, Input } from "@ui-kitten/components";
import {
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
} from "react-native";
import { FocusedStatusBar } from ".";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";

const DateButton = () => {
    const [dateIsFocused, setDateIsFocused] = useState(false);
    const [date, setDate] = useState([
        {
            id: 1,
            dayOfWeek: "Sat",
            dayOfMonth: "26",
        },
        {
            id: 2,
            dayOfWeek: "Sun",
            dayOfMonth: "27",
        },
        {
            id: 3,
            dayOfWeek: "Mon",
            dayOfMonth: "28",
        },
        {
            id: 4,
            dayOfWeek: "Tue",
            dayOfMonth: "29",
        },
        {
            id: 5,
            dayOfWeek: "Wed",
            dayOfMonth: "30",
        },
    ]);
    const renderDate = ({ dayOfWeek, dayOfMonth, handleOnPress }) => {
        return (
            <TouchableOpacity
                onPress={handleOnPress}
                style={{
                    alignItems: "center",
                    backgroundColor: "#F1F3FA",
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

    const handleOnPress = () => {
        setDateIsFocused(true);
    };

    return (
        <Layout
            style={{
                flexDirection: "row",
                justifyContent: "space-around",
                
            }}
        >
            {date.map(renderDate)}
        </Layout>
    );
};

export default DateButton;
