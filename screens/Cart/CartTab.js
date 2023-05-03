import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS, FONTS, images } from '../../constants';
import { FoodCard, Separator } from '../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Display from '../../utils/Display';
import { useSelector } from 'react-redux';
import { CartService } from '../../services';
import cartActions from '../../stores/cart/cartActions';
import { useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';


const renderCards = async (id) => {
  const val = await firestore()
    .collection('Foods')
    // Filter results
    .doc(id)
    .get();
  const valData = val.data()
  return valData

}

const CartTab = ({ navigation }) => {
  const [foods, setFoods] = React.useState([])
  const dispatch = useDispatch();
  const cart = useSelector(state => state?.cartState?.cart);

  React.useEffect(() => {
    dispatch(cartActions.getCartItems());
    async function fetchData() {
      let foodArray = [];
      for (const id of cart?.cartItems) {
        let querySnap = await firestore().collection('Foods').doc(id.foodId.toString()).get();
        let queryData = querySnap.data()
        foodArray.push(queryData)
      }
      setFoods(foodArray)
      
    }
    fetchData();
    
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight + Display.setHeight(14)} />
      {/* <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>My Cart</Text>
      </View> */}
      {cart?.cartItems?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {foods
                ?.map(item => (
                  <FoodCard
                    key={item?.id}
                    {...item}
                    navigate={() =>
                      navigation.navigate('Food', { foodId: item?.id })
                    }
                  />
                ))}
            </View>
            <View style={styles.promoCodeContainer}>
              <View style={styles.rowAndCenter}>
                <Entypo name="ticket" size={30} color={COLORS.DEFAULT_YELLOW} />
                <Text style={styles.promoCodeText}>Add Promo Code</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={COLORS.DEFAULT_BLACK}
              />
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Item Total</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.itemsTotal?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Discount</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.discount?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <View style={styles.rowAndCenter}>
                <Ionicons
                  name="cart-outline"
                  color={COLORS.DEFAULT_WHITE}
                  size={20}
                />
                <Text style={styles.checkoutText}>Checkout</Text>
              </View>
              <Text style={styles.checkoutText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </TouchableOpacity>
            <Separator height={Display.setHeight(9)} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Cart Empty</Text>
          <Text style={styles.emptyCartSubText}>
            Go ahead and order some tasty food
          </Text>
          <TouchableOpacity style={styles.addButtonEmpty} >
            <AntDesign name="plus" color={COLORS.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Add Food</Text>
          </TouchableOpacity>
          <Separator height={Display.setHeight(15)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: Display.setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: COLORS.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: COLORS.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: COLORS.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: COLORS.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: Display.setWidth(80),
    backgroundColor: COLORS.DEFAULT_GREEN,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: Display.setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: COLORS.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: FONTS.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: COLORS.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: COLORS.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: COLORS.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: Display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: COLORS.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  },
});

export default CartTab;