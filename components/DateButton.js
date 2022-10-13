import { useState } from "react";
import { Layout, Text, Icon, Input } from "@ui-kitten/components";
import { Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import Date from "./Date";

const DateButton = ({ date, onPress }) => {
    return (
        <>
            {date.map((d) => {
                return <Date key={d.id} date={d} onPress={onPress} />;
            })}
        </>
    );
};

export default DateButton;
