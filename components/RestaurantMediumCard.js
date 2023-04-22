import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, images} from '../constants';
import Display from '../utils/Display';

const RestaurantMediumCard = ({name, images: {logo}, time, distance, tags}) => {
  return (
    <View style={styles.container}>
      <View>
        {/* <Image
          source={{uri: StaticImageService.getLogo(logo)}}
          style={styles.posterStyle}
        /> */}
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <View style={styles.rowAndCenter}>
            <FontAwesome />
            <Text style={styles.ratingText}>4.2</Text>
            <Text style={styles.reviewsText}>({233})</Text>
          </View>
        </View>
        <Text style={styles.tagsText}>{tags?.join(' • ')}</Text>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.rowAndCenter}>
            <Image
              source={images.DELIVERY_CHARGE}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image
              source={images.DELIVERY_TIME}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>{time} min</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image style={styles.deliveryDetailsIcon} />
            <Text style={styles.deliveryDetailsText}>{distance}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: 8,
    backgroundColor: COLORS.DEFAULT_WHITE,
    marginTop: 8,
  },
  posterStyle: {
    width: Display.setWidth(20),
    height: Display.setWidth(20),
    borderRadius: 10,
    margin: 5,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    FontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagsText: {
    FontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_GREY,
    marginBottom: 7,
  },
  deliveryDetailsText: {
    marginLeft: 3,
    FontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    FontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  reviewsText: {
    FontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_BLACK,
  },
});

export default RestaurantMediumCard;
