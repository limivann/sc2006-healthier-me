import { useState } from "react";
import { Layout, Text, Avatar } from "@ui-kitten/components";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { FocusedStatusBar, DateButton, HomePageIcon } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import {
    VictoryArea,
    VictoryChart,
    VictoryContainer,
    VictoryGroup,
    VictoryLabel,
    VictoryLine,
    VictoryPie,
} from "victory-native";

const { screenWidth } = Dimensions.get("screen");

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

    const [caloriesData, setCaloriesData] = useState([
        {
            baseGoal: 2940,
            Food: 370,
            Exercise: 0,
        },
    ]);

    const focusDate = (id) => {
        const temp = [];
        date.forEach((d) => {
            if (d.id === id) {
                temp.push({ ...d, isFocused: true });
            } else {
                temp.push({ ...d, isFocused: false });
            }
        });
        setDate(temp);
    };

    const MiddleLabel = () => {
        return (
            <Layout style={styles.midLabel}>
                <Text style={styles.caloriesText}>2560</Text>
                <Text style={styles.remainingText}>Remaining</Text>
            </Layout>
        );
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
                    <Avatar source={assets.avatar} size="giant" />
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
                        <Layout
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: "60%",
                            }}
                        >
                            <VictoryPie
                                data={[
                                    { x: "Cats", y: 30 },
                                    { x: "Dogs", y: 40 },
                                    { x: "Birds", y: 55 },
                                ]}
                                width={200}
                                innerRadius={64}
                                labels={() => null}
                                style={{
                                    data: {
                                        fill: ({ datum }) => {
                                            return datum.x === "Cats"
                                                ? COLORS.primary
                                                : "#e4e6eb";
                                        },
                                    },
                                }}
                            />
                            <MiddleLabel />
                        </Layout>
                        <Layout
                            style={{
                                width: "40%",
                            }}
                        >
                            <HomePageIcon
                                source={assets.flagIcon}
                                title="Base Goal"
                                data={2940}
                            />
                            <HomePageIcon
                                source={assets.eatIcon}
                                title="Food"
                                data={370}
                            />
                            <HomePageIcon
                                source={assets.fireIcon}
                                title="Exercise"
                                data={0}
                            />
                        </Layout>
                    </Layout>
                </Layout>
                <Layout
                    style={{
                        width: "100%",
                        height: "25%",
                        marginTop: "10%",
                    }}
                >
                    <VictoryGroup
                        padding={{ top: 10, bottom: 200, right:300 }}
						width={600}
						height={400}
						domain={{x: [0, 5], y: [0, 60]}}
                    >
                        <VictoryArea
							interpolation="natural"
                            animate
                            data={[
                                { x: 1, y: 20 },
                                { x: 2, y: 30 },
                                { x: 3, y: 25 },
                                { x: 4, y: 28 },
                                { x: 5, y: 33 },
                            ]}
                            style={{
                                data: { fill: "#C9F4E9", stroke: "#855CF8" },
                            }}
							labels={({ datum }) => datum.y}

                        />
                    </VictoryGroup>
      
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    midLabel: {
        position: "absolute",
        alignItems: "center",
    },
    caloriesText: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.extraLarge,
        color: "black",
    },
    remainingText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    lineChart: {
        width: 123,
        height: 200,
    },
});
