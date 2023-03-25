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

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text
                    style={{ flex: 1, ...FONTS.h3 }}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
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
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
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
                        ...FONTS.body4,
                        textAlign: 'left',
                        fontStyle: 'italic',
                        backgroundColor: COLORS.lightGreen,
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
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0,
                            backgroundColor: selectedMenuType == item.id ? COLORS.green : COLORS.white,
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }

                        }
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.green : COLORS.black,
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
                <FlatList
                    data={recommends}
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
                                recommends.length - 1? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: "center"
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150,
                            }}
                            item={item}
                            onPress={() => console.log("Horiontal Food Card")}
                        />
                    )}                 
                />
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
                    renderItem={({ item, index }) => (  
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == 
                                discounts.length - 1? SIZES.padding : 0,
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

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Search */}
            {renderSearch()}

            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Discount */}
                        {renderDiscountSection()}
                        {/* Recommended */}
                        {renderRecommendedSection()}
                        {/* Menu */}
                        {renderMenuTypes()}
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
            />
        </View>
    )
}

export default Home;