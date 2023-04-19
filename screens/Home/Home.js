import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList, 
    TouchableOpacity
} from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants"
import Search from '../Search/Search';
import { HorizontalFoodCard, VerticalFoodCard } from '../../components';
import Display from '../../utils/Display';

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
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
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
    const [selectedMenuType, setSelectedMenuType] = React.useState(1);
    const [recommends, setRecommends] = React.useState([]);
    const [menuList, setMenuList] = React.useState([]);
    const [discounts, setDiscounts] = React.useState([]);

    React.useEffect(() => {
        //handler
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, []);



    function handleChangeCategory(categoryId, menuTypeId) {
        //retrieve discount data
        let selectedDiscount = dummyData.menu.find(a => a.name == "Discount")
        //retrieve recommened data
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended")
        //find menu by menutypeid
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId)

        //set recommened data
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))
        //set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
        //set recommened data
        setDiscounts(selectedDiscount?.list.filter(a => a.categories.includes(categoryId)))
    }

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
                        onPress={() => console.log('filter')}
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
                data={dummyData.menu}
                keyExtractor={(item) => `${item.id}`}
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
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0,
                            backgroundColor: selectedMenuType == item.id ? COLORS.green : COLORS.white,
                            padding: 10,
                            borderRadius: SIZES.padding,
                            borderWidth: 1,
                            borderColor: COLORS.green
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
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
                data={dummyData.categories}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 0,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.green : COLORS.white,
                        }}
                        onPress={() => {
                            setSelectedCategoryId(item.id)
                            handleChangeCategory(item.id, selectedMenuType)
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
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS.black,
                                ...FONTS.h3,
                            }}
                        >
                            {item.name}
                        </Text>

                    </TouchableOpacity>

                )}
            />

        )
    }

    return (
        <View
            style={{
                flex: 1,
                marginTop: Display.setHeight(14),
            }}
        >


            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Search */}
                        {renderSearch()}
                        <Section
                            title="Special Offers"
                            onPress={() => console.log("See All")}
                        >
                            <FlatList
                                data={dummyData.offers}
                                keyExtractor={(item) => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <HorizontalFoodCard
                                        containerStyle={{
                                            height: 180,
                                            width: SIZES.width * 0.85,
                                            marginLeft: index == 0 ? SIZES.padding : 18,
                                            marginRight: index ==
                                                dummyData.offers.length - 1 ? SIZES.padding : 0,
                                            paddingRight: SIZES.radius,
                                            alignItems: "center",
                                            marginTop: 20,
                                        }}
                                        imageStyle={{
                                            height: 180,
                                            width: SIZES.width * 0.85,
                                        }}
                                        item={item}
                                        onPress={() => console.log("Horiontal Food Card")}
                                    />
                                )}
                            />
                        </Section>

                        {renderFoodCategories()}
                        {renderDiscountSection()}
                        {renderRecommendedSection()}

                    </View>
                }

                renderItem={({ item, index }) => {
                    return (
                        <HorizontalFoodCard
                            item={item}
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius,
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110,
                            }}
                            onPress={() => console.log("Horizonal Food Card")}
                        />
                    )
                }}

                ListFooterComponent={
                    <View style={{ height: 200 }} />
                }
            />
        </View>
    )
}

export default Home;