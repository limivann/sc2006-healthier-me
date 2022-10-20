import { Layout } from "@ui-kitten/components";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FocusedStatusBar, RestaurantItem, SearchBar } from "../../components";
import { assets, COLORS, FONTS, SIZES } from "../../constants";

const data = [
    {
        id: 1,
        title: "The Crowded Bowl",
        restaurantImg: assets.theCrowdedBowlImg,
        distance: 1.0,
        shortDesc: "Organic Greens, Salads",
        longDesc:
            "DIY vegetarian salad bowl restaurants. Among the options are pasta, potato salad, and olive fried rice",
        openingTime: "7.00 am ~ 9.00 pm",
        status: true,
        isDineInAvail: true,
		isTakeawayAvail: true,
    },
    {
        id: 2,
        title: "The Crowded Bowl",
        restaurantImg: assets.theCrowdedBowlImg,
        distance: 1.2,
        shortDesc: "Organic Greens, Salads",
        longDesc:
            "DIY vegetarian salad bowl restaurants. Among the options are pasta, potato salad, and olive fried rice",
        openingTime: "8.30 am ~ 8.00 pm",
        status: false,
        isDineInAvail: true,
		isTakeawayAvail: true,
    },
    {
        id: 3,
        title: "The Crowded Bowl",
        restaurantImg: assets.theCrowdedBowlImg,
        distance: 0.5,
        shortDesc: "Organic Greens, Salads",
        longDesc:
            "DIY vegetarian salad bowl restaurants. Among the options are pasta, potato salad, and olive fried rice",
        openingTime: "10.00 am ~ 7.30 pm",
        status: true,
        isDineInAvail: true,
		isTakeawayAvail: false,
    },
    {
        id: 4,
        title: "The Crowded Bowl",
        restaurantImg: assets.theCrowdedBowlImg,
        distance: 1.0,
        shortDesc: "Organic Greens, Salads",
        longDesc:
            "DIY vegetarian salad bowl restaurants. Among the options are pasta, potato salad, and olive fried rice",
        openingTime: "7.00am ~ 12.00 pm, 1.00pm ~ 9.00 pm",
        status: false,
        isDineInAvail: true,
		isTakeawayAvail: false,
    },
];

const GetDietHeader = () => {
    return (
        <Layout style={styles.headerContainer}>
            <Text style={styles.headerText}>
                What restaurant would you like to explore today?
            </Text>
            <Layout style={styles.searchBar}>
                <SearchBar
                    onSearch={() => {}}
                    placeholder="Search for a restaurant"
                />
            </Layout>
        </Layout>
    );
};

const GetRestaurantsScreen = ({ navigation }) => {
    const handlePress = (id) => {
        const filterData = data.filter((item) => item.id == id);
        navigation.navigate("RestaurantDetailsPage", { data: filterData[0] });
    };

    return (
        <Layout style={{ flex: 1 }}>
            <FocusedStatusBar
                backgroundColor={COLORS.primary}
                barStyle="dark-content"
            />
            <Layout
                style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <Layout
                    style={{
                        zIndex: 0,
                        flex: 1,
                        width: "100%",
                        backgroundColor: COLORS.primary,
                    }}
                >
                    <GetDietHeader />
                    <Layout style={styles.borders}>
                        <Text style={styles.bordersText}>
                            Healthy food near you
                        </Text>
                    </Layout>
                    <Layout style={styles.contentContainer}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <RestaurantItem
                                    data={item}
                                    onPress={handlePress}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            style={{ width: "100%" }}
                        />
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default GetRestaurantsScreen;

const styles = StyleSheet.create({
    borders: {
        backgroundColor: "white",
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        minHeight: 20,
    },
    bordersText: {
        paddingVertical: SIZES.large,
        paddingHorizontal: "5%",
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
    },
    headerContainer: {
        width: "100%",
        backgroundColor: COLORS.primary,
        paddingBottom: "5%",
    },
    headerText: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: "white",
        paddingHorizontal: "5%",
        paddingVertical: SIZES.large,
    },
    searchBar: {
        backgroundColor: "transparent",
        paddingHorizontal: "5%",
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingTop: 0,
    },
});
