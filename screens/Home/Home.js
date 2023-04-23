import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView
} from 'react-native';
import { Separator, BackgroundCurvedView, CategoryMenuItem, RestaurantCard, RestaurantMediumCard } from "../../components"
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants"
import { HorizontalFoodCard, VerticalFoodCard } from '../../components';
import Display from '../../utils/Display';
import { keys } from '../../apiKeys';
import { Mock } from "../../constants";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const YELP_API_KEY = keys.YELP_API_KEY;

const sortStyle = isActive =>
    isActive
        ? styles.sortListItem
        : { ...styles.sortListItem, borderBottomColor: COLORS.DEFAULT_WHITE };



const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginBottom: 12
                }}
            >
                <Text
                    style={{ flex: 1, ...FONTS.h3 }}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: COLORS.green, ...FONTS.body3 }}>
                        Show All
                    </Text>
                </TouchableOpacity>
            </View>

            {/* children */}
            {children}
        </View>
    )
}

const Home = () => {
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [selectedMenuType, setSelectedMenuType] = React.useState(1);
    const [recommends, setRecommends] = React.useState([]);
    const [discounts, setDiscounts] = React.useState([]);
    const [restaurantData, setRestaurantData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [activeCategory, setActiveCategory] = React.useState();
    const [activeSortItem, setActiveSortItem] = React.useState('recent');
    const navigation = useNavigation();

    React.useEffect(() => {
        //handler
        getRestaurantsFromYelp();

    }, []);



    function getCategoryFromRestaurant(restaurantData) {
        setCategories(restaurantData.map(obj => obj.categories).flat());
    }

    function handleChangeCategory(category) {
        //retrieve discount data
        setDiscounts(dummyData.menu.find(a => a.name == "Discount").list)
        //retrieve recommened data
        // let selectedRecommend = restaurantData.find(a => a.rating >= 4.0)
        //find menu by menutypeid
        if (category != undefined) {
            let selectedMenu = restaurantData.filter(a => a.categories.includes(category))
            setRestaurantData(selectedMenu)
        }
        //set recommened data
        // setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))
        // setRecommends(selectedRecommend)
        //set the menu based on the categoryId
        //set recommened data
        // setDiscounts(selectedDiscount?.list.filter(a => a.categories.includes(categoryId)))
    }


    const getRestaurantsFromYelp = async () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=1576 E 115th St, Cleveland, OH 44106&radius=32000&limit=5&sort_by=distance`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${YELP_API_KEY}`
            }
        };

        const restaurant = await firestore().collection('Restaurants').get()
            .then((res) => {
                setRestaurantData(res.docs.map(doc => doc.data()))
                console.log(restaurantData);
            });

        // const res = await fetch(yelpUrl, options)
        //     .then(response => response.json())
        //     .then(json => {
        //         setRestaurantData(
        //             json.businesses)
        //         getCategoryFromRestaurant(restaurantData)
        //     }
        //     )
        //     .catch(err => console.error(err));
    };

    //render
    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: Display.setHeight(7),
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                }}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black,
                    }}
                />

                {/* Text Input */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        marginRight: SIZES.radius,
                        ...FONTS.body3,
                        textAlign: 'left',
                        fontStyle: 'italic',
                        alignSelf: 'center',
                        borderRadius: SIZES.radius,
                        textAlignVertical: "top"
                    }}
                    placeholder="What are you craving?"
                    placeholderTextColor={COLORS.black}
                />

                {/* filter */}
                <TouchableOpacity
                    onPress={() => console.log("Horizontal")}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => `${item.alias}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 0,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 42,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == categories.length - 1 ? SIZES.padding : 0,
                            backgroundColor: selectedMenuType != item.alias ? COLORS.green : COLORS.white,
                            padding: 10,
                            borderRadius: SIZES.padding,
                            borderWidth: 1,
                            borderColor: COLORS.green
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.alias)
                            console.log(selectedMenuType)
                            handleChangeCategory(selectedCategory)
                        }

                        }
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.white : COLORS.green,
                                alignSelf: 'center',
                                ...FONTS.h5,
                                marginHorizontal: 12
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>

                )}
            />
        )
    }

    function renderRecommendedSection() {
        return (
            <Section
                title="Recommended for you"
                onPress={() => console.log("See All")}
            >
                {renderMenuTypes()}
            </Section>
        )
    }

    function renderDiscountSection() {
        return (
            <Section
                title="Discount Guaranteed"
                onPress={() => console.log("See All")}
            >
                <FlatList
                    data={discounts}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 20
                    }}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index ==
                                    discounts.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: "center"
                            }}
                            item={item}
                            onPress={() => console.log("Vertical Food Card")}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderFoodCategories() {
        return (
            <FlatList
                data={categories}
                keyExtractor={(item) => `${item.alias}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 0,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategory == item.alias ? COLORS.white : COLORS.green,
                        }}
                        onPress={() => {
                            setSelectedCategory(item.alias)
                            handleChangeCategory(item.alias, selectedMenuType)
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{
                                height: 50,
                                width: 50,
                                marginTop: 5,
                            }}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                color: selectedCategory == item.alias ? COLORS.black : COLORS.white,
                                ...FONTS.h3,
                            }}
                        >
                            {item.title}
                        </Text>

                    </TouchableOpacity>

                )}
            />

        )
    }

    return (
        // <View
        //     style={{
        //         flex: 1,
        //         marginTop: Display.setHeight(14),
        //     }}
        // >


        //     {/* List */}
        //     <FlatList
        //         data={restaurantData}
        //         keyExtractor={(item) => `${item.id}`}
        //         showsVerticalScrollIndicator={false}
        //         ListHeaderComponent={
        //             <View>
        //                 {/* Search */}
        //                 {renderSearch()}


        //                 {renderFoodCategories()}

        //                 {/* {renderRecommendedSection()} */}



        //             </View>
        //         }

        //         renderItem={({ item, index }) => {
        //             return (
        //                 <HorizontalFoodCard
        //                     item={item}
        //                     containerStyle={{
        //                         height: 130,
        //                         alignItems: 'center',
        //                         marginHorizontal: SIZES.padding,
        //                         marginBottom: SIZES.radius,
        //                     }}
        //                     imageStyle={{
        //                         marginVertical: 10,
        //                         marginLeft: 5,
        //                         borderRadius: SIZES.radius,
        //                         height: 110,
        //                         width: 110,
        //                     }}
        //                     onPress={() => console.log("Horizonal Food Card")}
        //                 />
        //             )
        //         }}

        //         ListFooterComponent={
        //             <>
        //                 {renderDiscountSection()}
        //                 <Section
        //                     title="Special Offers"
        //                     onPress={() => console.log("See All")}
        //                 >
        //                     <FlatList
        //                         data={dummyData.offers}
        //                         keyExtractor={(item) => `${item.id}`}
        //                         horizontal
        //                         showsHorizontalScrollIndicator={false}
        //                         renderItem={({ item, index }) => (
        //                             <HorizontalFoodCard
        //                                 containerStyle={{
        //                                     height: 180,
        //                                     width: SIZES.width * 0.85,
        //                                     marginLeft: index == 0 ? SIZES.padding : 18,
        //                                     marginRight: index ==
        //                                         dummyData.offers.length - 1 ? SIZES.padding : 0,
        //                                     paddingRight: SIZES.radius,
        //                                     alignItems: "center",
        //                                     marginTop: 20,
        //                                 }}
        //                                 imageStyle={{
        //                                     height: 180,
        //                                     width: SIZES.width * 0.85,
        //                                 }}
        //                                 item={item}
        //                                 onPress={() => console.log("Horiontal Food Card")}
        //                             />
        //                         )}
        //                     />
        //                 </Section>
        //                 <View style={{ height: 200 }} />
        //             </>
        //         }
        //     />
        // </View>

        <View style={{
            flex: 1,
            marginTop: Display.setHeight(10),
        }}>
            <Separator height={StatusBar.currentHeight} />
            <BackgroundCurvedView pos={2000} />
            {renderSearch()}
            <View style={styles.categoriesContainer}>
                {Mock.CATEGORIES.map(({ name, logo }) => (
                    <CategoryMenuItem
                        name={name}
                        logo={logo}
                        key={name}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                ))}
            </View>
            <Separator height={Display.setHeight(3.5)} />
            <ScrollView style={styles.listContainer}>

                <View>
                    {/* List */}
                    <FlatList
                        data={restaurantData}
                        keyExtractor={(item, index) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <RestaurantCard {...item}
                                navigate={restaurantId =>
                                    navigation.navigate('Restaurant', { restaurantId })}
                            />
                        }
                        ListHeaderComponent={
                            <View style={{ paddingTop: 32 }}>
                                <Section title="Top Rated" />
                            </View>
                        }

                    />
                </View>
                <View style={styles.sortListContainer}>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'recent')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('recent')}>
                        <Text style={styles.sortListItemText}>Recent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'favorite')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('favorite')}>
                        <Text style={styles.sortListItemText}>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'rating')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('rating')}>
                        <Text style={styles.sortListItemText}>Rating</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'popular')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('popular')}>
                        <Text style={styles.sortListItemText}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'trending')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('trending')}>
                        <Text style={styles.sortListItemText}>Trending</Text>
                    </TouchableOpacity>
                </View>
                {restaurantData?.map(item => (
                    <RestaurantMediumCard {...item} key={item?.id} />
                ))}

                <Separator height={Display.setHeight(15)} />
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY_WHITE,
    },
    headerContainer: {
        justifyContent: 'space-evenly',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
    },
    locationText: {
        color: COLORS.DEFAULT_WHITE,
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
    },
    selectedLocationText: {
        color: COLORS.DEFAULT_YELLOW,
        marginLeft: 5,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
    },
    searchContainer: {
        backgroundColor: COLORS.DEFAULT_WHITE,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    searchText: {
        color: COLORS.DEFAULT_GREY,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
        marginLeft: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    listContainer: {
        paddingVertical: 5,
        zIndex: -5,
    },
    horizontalListContainer: {
        marginTop: 30,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 5,
    },
    listHeaderTitle: {
        color: COLORS.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
    },
    listHeaderSubtitle: {
        color: COLORS.DEFAULT_YELLOW,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
    },
    sortListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT_WHITE,
        marginTop: 8,
        elevation: 1,
    },
    sortListItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.DEFAULT_YELLOW,
        height: 40,
    },
    sortListItemText: {
        color: COLORS.DEFAULT_BLACK,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: FONTS.POPPINS_SEMI_BOLD,
    },
});


export default Home;