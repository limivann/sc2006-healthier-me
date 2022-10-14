import { Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

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
