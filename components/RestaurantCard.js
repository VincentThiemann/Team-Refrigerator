import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
// import {BookmarkAction} from '../actions';

const RestaurantCard = ({
  id,
  name,
  images: {poster},
  tags,
  distance,
  time,
  navigate,
}) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector(
    state =>
      state?.bookmarkState?.bookmarks?.filter(item => item?.restaurantId === id)
        ?.length > 0,
  );
  const addBookmark = () =>
    dispatch(BookmarkAction.addBookmark({restaurantId: id}));
  const removeBookmark = () =>
    dispatch(BookmarkAction.removeBookmark({restaurantId: id}));
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigate(id)}>
      <Ionicons
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        color={COLORS.DEFAULT_YELLOW}
        size={24}
        style={styles.bookmark}
        onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
      />
      <Image
        source={{uri: poster}}
        style={styles.posterStyle}
      />
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.tagText}>{tags?.join(' • ')}</Text>
      <View style={styles.footerContainer}>
        <View style={styles.rowAndCenter}>
          <FontAwesome name="star" size={14} color={COLORS.DEFAULT_YELLOW} />
          <Text style={styles.ratingText}>4</Text>
          <Text style={styles.reviewsText}>({10})</Text>
        </View>
        <View style={styles.rowAndCenter}>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="location-outline"
              color={COLORS.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{distance}</Text>
          </View>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="ios-time-outline"
              color={COLORS.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  posterStyle: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    marginLeft: 8,
    FontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    FontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_GREY,
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAndDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: COLORS.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    FontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DEFAULT_YELLOW,
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
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});

export default RestaurantCard;
