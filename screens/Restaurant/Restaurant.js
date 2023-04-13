import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList, TouchableOpacity
} from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants"
import Search from '../Search/Search';
import { HorizontalFoodCard, VerticalFoodCard } from '../../components';

const List = () => {
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
                    height: 60,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    borderColor: COLORS.lightGreen
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
                            backgroundColor: selectedMenuType == item.id ? COLORS.lightGreen : COLORS.white,
                            padding: 10,
                            borderTopLeftRadius: 25,
                            borderBottomRightRadius: 25,
                            borderWidth: 1,
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }

                        }
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.white : COLORS.lightGreen,
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
                            backgroundColor: selectedCategoryId == item.id ? COLORS.lightGreen : COLORS.white,
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

    function renderDeliveryTo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        color: COLORS.lightGreen,
                        ...FONTS.body3,
                    }}
                >
                    Deliver to
                </Text>

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.base,

                }}>
                    <Text style={{ ...FONTS.h3 }}>
                        {dummyData?.myProfile?.address}
                    </Text>

                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width: 20,
                            tintColor: COLORS.green,
                        }}
                    />

                </TouchableOpacity>

            </View>
        )
    }

    return (<FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
            <View>
                <Section
                    title="Special Offers"
                    onPress={() => console.log("See All")}
                >
                    <FlatList
                        data={dummyData.offers}
                        keyExtractor={(item) => item.id}
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
    />)
}

export default List;
