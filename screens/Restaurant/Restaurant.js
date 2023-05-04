import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { CategoryListItem, FoodCard, Separator, ProgressiveImage } from '../../components';
import { ApiContants, COLORS, FONTS, images } from '../../constants';
import Display from '../../utils/Display';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
//import {BookmarkAction} from '../actions';

const ListHeader = () => (
  <View
    style={{
      flexDirection: 'row',
      flex: 1,
      width: 40,
      justifyContent: 'flex-end',
    }}>
    <View
      style={{
        backgroundColor: COLORS.LIGHT_YELLOW,
        width: 20,
        borderTopLeftRadius: 64,
        borderBottomLeftRadius: 64,
      }}
    />
  </View>
);

const ListFooter = () => (
  <View
    style={{
      flexDirection: 'row',
      flex: 1,
      width: 40,
    }}>
    <View
      style={{
        backgroundColor: COLORS.LIGHT_YELLOW,
        width: 20,
        borderTopRightRadius: 64,
        borderBottomRightRadius: 64,
      }}
    />
  </View>
);

const Restaurant = ({
  navigation,
  route: {
    params: { restaurantId },
  },
}) => {
  const [urlSD, setUrlSD] = React.useState();
  const [urlHD, setUrlHD] = React.useState();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foods, setFoods] = useState([]);
  //const [isBookmarked, setIsBookmarked] = useState(false);


  React.useEffect(() => {
    const func = async () => {
      let name = "";
      await firestore()
      .collection('Foods')
      // Filter results
      .where('restaurantId', '==', restaurantId)
      .get()
      .then(querySnapshot => {
        setFoods(querySnapshot.docs.map(doc => doc.data()))
        console.log(foods)
      });
      
      await firestore().collection('Restaurants').doc(restaurantId).get()
        .then((response) => {
          setRestaurant(response?.data())
          setSelectedCategory(response?.data().categories[0]);
          name = response?.data().images.cover;
          console.log(response?.data().categories[0])
        });

      const referenceSD = storage().ref(`images/gallery/square/sd/${name}.png`);
      await referenceSD.getDownloadURL().then((x) => {
        setUrlSD(x);
      })
      const referenceHD = storage().ref(`images/gallery/square/hd/${name}.png`);
      await referenceHD.getDownloadURL().then((x) => {
        setUrlHD(x);
      })
    }
    if (urlSD == undefined) { func() };
  }, []);

  const dispatch = useDispatch();
  const isBookmarked = useSelector(
    state =>
      state?.bookmarkState?.bookmarks?.filter(
        item => item?.restaurantId === restaurantId,
      )?.length > 0,
  );
  const addBookmark = () =>
    dispatch(BookmarkAction.addBookmark({ restaurantId }));
  const removeBookmark = () =>
    dispatch(BookmarkAction.removeBookmark({ restaurantId }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      <>
      <ProgressiveImage
          thumbnailSource={{ uri: urlSD }}
          source={{ uri: urlHD }}
          style={styles.backgroundImage}
        />

        <ScrollView>
          <Separator height={Display.setHeight(35)} />
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{restaurant?.name}</Text>
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                color={COLORS.DEFAULT_YELLOW}
                size={24}
                onPress={() =>
                  isBookmarked ? removeBookmark() : addBookmark()
                }
              />
            </View>
            <Text style={styles.tagText}>{restaurant?.tags?.join(' • ')}</Text>
            <View style={styles.ratingReviewsContainer}>
              <FontAwesome
                name="star"
                size={18}
                color={COLORS.DEFAULT_YELLOW}
              />
              <Text style={styles.ratingText}>4.2</Text>
              <Text style={styles.reviewsText}>(455 Reviews)</Text>
            </View>
            <View style={styles.deliveryDetailsContainer}>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={images.DELIVERY_CHARGE}
                />
                <Text style={styles.deliveryDetailText}>Free Delivery</Text>
              </View>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={images.DELIVERY_TIME}
                />
                <Text style={styles.deliveryDetailText}>
                  {restaurant?.time} min
                </Text>
              </View>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={images.MARKER}
                />
                <Text style={styles.deliveryDetailText}>
                  {(restaurant?.distance / 1000).toFixed(2)} km
                </Text>
              </View>
              <View style={styles.restaurantType}>
                <Text style={styles.restaurantTypeText}>
                  {restaurant?.type}
                </Text>
              </View>
            </View>
            <View style={styles.categoriesContainer}>
              <FlatList
                data={restaurant?.categories}
                keyExtractor={item => item}
                horizontal
                ListHeaderComponent={() => <ListHeader />}
                ListFooterComponent={() => <ListFooter />}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryListItem
                    name={item}
                    isActive={item === selectedCategory}
                    selectCategory={category => setSelectedCategory(category)}
                  />
                )}
              />
            </View>
            <View style={styles.foodList}>
              {foods
                ?.filter(food => food?.category === selectedCategory)
                ?.map(item => (
                  <FoodCard
                    key={item?.id}
                    {...item}
                    navigate={() =>
                      navigation.navigate('Food', { foodId: item?.id })
                    }
                  />
                ))}
              <Separator height={Display.setHeight(2)} />
            </View>
          </View>
        </ScrollView>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: Display.setWidth(100),
    width: Display.setWidth(100),
  },
  mainContainer: {
    backgroundColor: COLORS.SECONDARY_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 15,
  },
  title: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  tagText: {
    marginHorizontal: 25,
    marginTop: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLORS.DEFAULT_GREY,
  },
  ratingReviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  reviewsText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_BLACK,
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  deliveryDetailText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_BLACK,
  },
  deliveryDetailIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantType: {
    backgroundColor: COLORS.LIGHT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  restaurantTypeText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_YELLOW,
  },
  categoriesContainer: {
    marginVertical: 20,
  },
  foodList: {
    marginHorizontal: 15,
  },
});

export default Restaurant;

