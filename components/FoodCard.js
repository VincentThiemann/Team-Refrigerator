import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ApiContants, COLORS, FONTS } from '../constants';
import Display from '../utils/Display';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ProgressiveImage } from "../components";
import cartActions from '../stores/cart/cartActions';
import storage from '@react-native-firebase/storage';
import { CartService } from '../services';


const FoodCard = ({ id, name, description, price, image, navigate }) => {
  const [urlSD, setUrlSD] = React.useState();
  const [urlHD, setUrlHD] = React.useState();

  React.useEffect(() => {
    const func = async () => {
      const referenceSD = storage().ref(`images/gallery/square/sd/${image}.png`);
      await referenceSD.getDownloadURL().then((x) => {
        setUrlSD(x);
      })
      const referenceHD = storage().ref(`images/gallery/square/hd/${image}.png`);
      await referenceHD.getDownloadURL().then((x) => {
        setUrlHD(x);
      })

    }
    if (urlSD == undefined) { func() };
  }, []);

  const dispatch = useDispatch();
  const itemCount = useSelector(
    state =>
      state?.cartState?.cart?.cartItems?.find(item => item?.foodId === id)
        ?.count,
  );
  const addToCart = foodId => {

    console.log(foodId)
  };
  const removeFromCart = foodId =>
    dispatch(cartActions.removeFromCart(foodId));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
        <ProgressiveImage
          thumbnailSource={{ uri: urlSD }}
          source={{ uri: urlHD }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
          <Text numberOfLines={1} style={styles.titleText}>
            {name}
          </Text>
          <Text numberOfLines={2} style={styles.descriptionText}>
            {description}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>$ {price}</Text>
          <View style={styles.itemAddContainer}>
            {itemCount > 0 ? (
              <>

                <Text style={styles.itemCountText}>{itemCount}</Text>
              </>
            ) : null}

            <AntDesign
              name="minus"
              color={COLORS.DEFAULT_YELLOW}
              size={18}
              onPress={() => removeFromCart(id)}
            />
              <Text style={styles.itemCountText}>0</Text>
            <AntDesign
              name="plus"
              color={COLORS.DEFAULT_YELLOW}
              size={24}
              onPress={() => CartService.addToCart(id)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: COLORS.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: Display.setWidth(60),
    color: COLORS.DEFAULT_BLACK,
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: Display.setWidth(60),
    color: COLORS.DEFAULT_GREY,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: COLORS.DEFAULT_YELLOW,
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: COLORS.DEFAULT_BLACK,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});

export default FoodCard;
