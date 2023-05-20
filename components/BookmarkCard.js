import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, FONTS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressiveImage } from "../components";
import Display from "../utils/Display"
import bookmarkActions from '../stores/bookmark/bookmarkActions';
import storage from '@react-native-firebase/storage';

const BookmarkCard = ({id, name, images: { poster }, location, tags, navigate}) => {
  const [urlSD, setUrlSD] = React.useState();
  const [urlHD, setUrlHD] = React.useState();

  const dispatch = useDispatch();

  React.useEffect(() => {
    async function func() {
      const referenceSD = storage().ref(`images/poster/sd/${poster}.png`);
      await referenceSD.getDownloadURL().then((x) => {
        setUrlSD(x);
      })
      const referenceHD = storage().ref(`images/poster/hd/${poster}.png`);
      await referenceHD.getDownloadURL().then((x) => {
        setUrlHD(x);
      })
      
    }
    if (urlSD == undefined) { func() };
    
  }, []);




  const removeBookmark = () =>
    dispatch(bookmarkActions.removeBookmark(id));
  return (
    <View style={styles.container}>
      <Ionicons
        name="close-circle"
        color={COLORS.DEFAULT_GREY}
        size={22}
        style={styles.remomveIcon}
        onPress={() => removeBookmark()}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(id)}>
        <ProgressiveImage
          thumbnailSource={{ uri: urlSD }}
          source={{ uri: urlHD }}
          style={styles.posterStyle}
        />
      </TouchableOpacity>
      <View style={styles.labelContainer}>
        <Text style={styles.titleText}>{name}</Text>
        <View style={styles.rowAndCenter}>
          <Entypo name="location" size={10} color={COLORS.DEFAULT_GREY} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.tagText}>{tags?.slice(0, 3).join(' • ')}</Text>
        <View style={styles.buttonLabelRow}>
          <View style={styles.rowAndCenter}>
            <FontAwesome name="star" size={13} />
            <Text style={styles.ratingText}>4.3</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="ios-time-outline"
              color={COLORS.GOOGLE_BLUE}
              size={15}
            />
            <Text style={styles.ratingText}>20 mins</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="location-outline"
              color={COLORS.SECONDARY_GREEN}
              size={15}
            />
            <Text style={styles.ratingText}>10 KM</Text>
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
    alignItems: 'center',
  },
  posterStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  remomveIcon: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    right: 0,
  },
  labelContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    FONTSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagText: {
    FONTSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_GREY,
    marginBottom: 5,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    FONTSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.DEFAULT_GREY,
    marginBottom: 5,
    marginLeft: 5,
  },
  ratingText: {
    FONTSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLORS.DEFAULT_BLACK,
    marginLeft: 3,
  },
  buttonLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BookmarkCard;