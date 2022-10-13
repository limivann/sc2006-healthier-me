import { useState } from "react";
import {
    Layout,
    Text,
    Icon,
    Input,
    Button,
    Divider,
    Avatar,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import {
    FocusedStatusBar,
    DateButton,
    HomePageIcon,
} from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import eatIcon from "../assets/icons/eat-icon.png";
import fireIcon from "../assets/icons/fire-icon.png";
import flagIcon from "../assets/icons/flag-icon.png";

const HomeScreen = () => {
    const [date, setDate] = useState([
        {
            id: 1,
            dayOfWeek: "Sat",
            dayOfMonth: "26",
            isFocused: false,
        },
        {
            id: 2,
            dayOfWeek: "Sun",
            dayOfMonth: "27",
            isFocused: false,
        },
        {
            id: 3,
            dayOfWeek: "Mon",
            dayOfMonth: "28",
            isFocused: false,
        },
        {
            id: 4,
            dayOfWeek: "Tue",
            dayOfMonth: "29",
            isFocused: false,
        },
        {
            id: 5,
            dayOfWeek: "Wed",
            dayOfMonth: "30",
            isFocused: false,
        },
    ]);

    const focusDate = (id) => {
        const temp = []
        date.forEach((d) => {
            if (d.id === id) {
                temp.push({ ...d, isFocused: true });
            } else {
                temp.push({ ...d, isFocused: false });
            }
        });
        setDate(temp);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <Layout
                style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: SIZES.font,
                }}
            >
                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "90%",
                        marginBottom: SIZES.large,
                    }}
                >
                    <Layout>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.font,
                                color: COLORS.gray,
                                paddingBottom: SIZES.font,
                            }}
                        >
                            Good Morning!
                        </Text>
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.extraLarge,
                                paddingLeft: SIZES.medium,
                            }}
                        >
                            Victoria
                        </Text>
                    </Layout>
                    <Avatar
                        source={require("../assets/icons/avatar.png")}
                        size="giant"
                    />
                </Layout>

                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <DateButton date={date} onPress={focusDate} />
                </Layout>
                <Layout
                    style={{
                        width: "90%",
                        height: "35%",
                        borderRadius: SIZES.font,
                        ...SHADOWS.dark,
                    }}
                >
                    <Layout
                        style={{
                            padding: SIZES.font,
                            paddingBottom: 0,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.large,
                            }}
                        >
                            Calories
                        </Text>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.font,
                            }}
                        >
                            Remaining = Goal - Food + Exercise
                        </Text>
                    </Layout>
                    <Layout
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: "70%",
                        }}
                    >
                        <Layout>
                            <Text>hello</Text>
                        </Layout>
                        <Layout style={{
                            width: "40%",
                        }}>
                            <HomePageIcon
                                source={flagIcon}
                                title="Base Goal"
                                data={2940}
                            />
                            <HomePageIcon
                                source={eatIcon}
                                title="Food"
                                data={370}
                            />
                            <HomePageIcon
                                source={fireIcon}
                                title="Exercise"
                                data={0}
                            />
                        </Layout>
                    </Layout>
                </Layout>
                <Layout style={{
                    borderWidth: 2,
                    width: "90%",
                    height: "25%",
                    marginTop: "10%",
                }}>
                    <Text>
                        Hello
                    </Text>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

export default HomeScreen;
