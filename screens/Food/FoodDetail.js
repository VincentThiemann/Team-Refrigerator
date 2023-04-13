import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { FONTS, COLORS, SIZES, icons, images, dummyData, constants } from "../../constants"
import { Header, Separator, IconLabel } from "../../components";
import Display from '../../utils/Display';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const setStyle = isActive =>
    isActive
        ? styles.subMenuButtonText
        : { ...styles.subMenuButtonText, color: COLORS.DEFAULT_GREY };

const FoodDetail = ({navigation}) => {

    const [food, setFood] = React.useState(dummyData.vegBiryani);
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [qty, setQty] = React.useState(1);

    function handleFoodItem(passedFoodItem) {
        let foodItems = dummyData.menu.find(a => a.name == "All");
        setFood(foodItems?.list.find(a => a.name == passedFoodItem));
    }

    function renderHeader() {
        return (
            <Header

                containerStyle={{

                    positon: 'absolute',
                    height: 60,
                    top: Display.setHeight(3),
                    marginHorizontal: SIZES.padding,
                    margintop: 40,
                    backgroundColor: 'green'

                }}

                leftComponent={
                    <Ionicons name="ios-chevron-back-sharp" size={40} color="black" onPress={() => navigation.navigate("CustomDrawer")} />
                }
            // rightComponent={
            //     <View>
            //         <Icon type="material-community"
            //             name="cart-outline"
            //             containerStyle={styles.containerStyle}
            //             onPress={() => console.log("Cart")} />
            //         <Badge
            //             value={43}
            //             containerStyle={{
            //                 position: 'absolute',
            //                 top: 5,
            //                 right: 0,

            //             }}
            //             badgeStyle={{
            //                 alignItems: 'center',
            //                 justifyContent: 'center',
            //                 backgroundColor: COLORS.red,
            //             }}

            //         />
            //     </View>
            // }
            />


        )
    }

    return (
        <View
            style={{
                flex: 1,

            }}
        >
            <StatusBar barStyle="default" translucent backgroundColor="transparent" />

            <Image
                source={food?.image}
                style={styles.backgroundImage}
            />
            {/* Header */}
            {renderHeader()}


            {/* Body */}
            <ScrollView style={{ flex: 1 }}>

                <Separator height={Display.setWidth(100)} />
                <View style={styles.mainContainer}>
                    <View style={styles.titleHeaderContainer}>
                        <Text style={styles.titleText}>{food?.name}</Text>
                    </View>
                    <View style={styles.subHeaderContainer}>
                        <View style={styles.rowAndCenter}>
                            <FontAwesome
                                name="star"
                                size={20}
                                color={COLORS.DEFAULT_YELLOW}
                            />
                            <Text style={styles.ratingText}>4.2</Text>
                            <Text style={styles.reviewsText}>(255)</Text>
                        </View>
                        <View style={styles.rowAndCenter}>
                            <Image style={styles.iconImage} source={images.DELIVERY_TIME} />
                            <Text style={styles.deliveryText}>20 min</Text>
                        </View>
                        <View style={styles.rowAndCenter}>
                            <Image style={styles.iconImage} source={images.DELIVERY_CHARGE} />
                            <Text style={styles.deliveryText}>Free Delivery</Text>
                        </View>
                    </View>
                    <View style={styles.subMenuContainer}>
                        <TouchableOpacity
                            style={styles.subMenuButtonContainer}
                            onPress={() => console.log('Details')}>
                            <Text style={setStyle(false)}>
                                Details
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.subMenuButtonContainer}
                            onPress={() => console.log('Reviews')}
                            s>
                            <Text style={setStyle(false)}>
                                Reviews
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        {food?.description ? (
                            <>
                                <Text style={styles.detailHeader}>Description</Text>
                                <Text style={styles.detailContent}>{food?.description}</Text>
                            </>
                        ) : null}
                        {food?.ingredients ? (
                            <>
                                <Text style={styles.detailHeader}>Ingredients</Text>
                                <Text style={styles.detailContent}>{food?.ingredients}</Text>
                            </>
                        ) : null}
                    </View>
                    <View style={{
                        height: Display.setHeight(10),
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput
                            placeholder="Note to restaurant (Optional)"
                            placeholderTextColor={COLORS.darkGray2}
                            style={{
                                borderRadius: SIZES.radius,
                                height: Display.setHeight(9),
                                width: Display.setWidth(80),
                                color: 'black',
                                backgroundColor: COLORS.lightGray2,
                                ...FONTS.h5
                            }} />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <View style={styles.itemAddContainer}>
                            <AntDesign
                                name="minus"
                                color={COLORS.DEFAULT_YELLOW}
                                size={24}
                                onPress={() => {
                                    if (qty > 1) {
                                        setQty(qty - 1)
                                    }
                                }}
                            />
                            <Text style={styles.itemCountText}>{qty}</Text>
                            <AntDesign
                                name="plus"
                                color={COLORS.DEFAULT_YELLOW}
                                size={24}
                                onPress={() => {
                                        setQty(qty + 1)
                                }}
                            />
                        </View>

                    </View>

                    <View style={
                        styles.buttonsContainer
                    }>

                        <TouchableOpacity style={styles.cartButton}
                            onPress={() => navigation.navigate("Cart")}
                            activeOpacity={0.8}>
                            <Text style={styles.priceText}> Add to Basket - $ {food?.price*qty}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            {/* Footer */}

        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        width: 40,
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        tintColor: 'transparent',
        borderRadius: 20,

    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        height: Display.setWidth(100),
        width: Display.setWidth(100),
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.DEFAULT_WHITE,
    },
    image: {
        height: Display.setWidth(100),
        width: Display.setWidth(100),
    },
    mainContainer: {
        backgroundColor: COLORS.DEFAULT_WHITE,

    },
    titleHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    titleText: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        fontFamily: FONTS.POPPINS_SEMI_BOLD,
        color: COLORS.DEFAULT_BLACK,
    },
    priceText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
    subHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 15,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.DEFAULT_BLACK,
        marginLeft: 5,
    },
    reviewsText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.DEFAULT_BLACK,
        marginLeft: 5,
    },
    iconImage: {
        height: 20,
        width: 20,
    },
    deliveryText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.DEFAULT_BLACK,
        marginLeft: 3,
    },
    subMenuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        marginTop: 20,
        borderColor: COLORS.DEFAULT_GREY,
        justifyContent: 'space-evenly',
    },
    subMenuButtonContainer: {
        paddingVertical: 15,
        width: Display.setWidth(30),
        alignItems: 'center',
    },
    subMenuButtonText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: FONTS.POPPINS_SEMI_BOLD,
        color: COLORS.DEFAULT_BLACK,
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    detailHeader: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        fontFamily: FONTS.POPPINS_SEMI_BOLD,
        color: COLORS.DEFAULT_BLACK,
        marginTop: 10,
        marginBottom: 2,
    },
    detailContent: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: FONTS.POPPINS_SEMI_BOLD,
        color: COLORS.INACTIVE_GREY,
        textAlign: 'justify',
    },
    buttonsContainer: {
        height: Display.setHeight(10),
        flexDirection: 'row',
        paddingHorizontal: Display.setWidth(5),
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT_WHITE,
        width: Display.setWidth(100),
        paddingVertical: Display.setWidth(2.5),
    },
    itemAddContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.LIGHT_GREY2,
        height: Display.setHeight(6),
        width: Display.setWidth(30),
        justifyContent: 'center',
        borderRadius: 8,
    },
    itemCountText: {
        color: COLORS.DEFAULT_BLACK,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: FONTS.POPPINS_SEMI_BOLD,
        marginHorizontal: 8,
    },
    cartButton: {
        backgroundColor: COLORS.green,
        height: Display.setHeight(6),
        width: Display.setWidth(58),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.padding,
    },
    cartButtonText: {
        color: COLORS.DEFAULT_WHITE,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: FONTS.POPPINS_MEDIUM,
    },
    basketStyle: {
        backgroundColor: COLORS.green,
        width: Display.setWidth(80),
        height: Display.setHeight(6),
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.padding,
    }

});

export default FoodDetail;