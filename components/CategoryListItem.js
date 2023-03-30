import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants';

const CategoryListItem = ({name, isActive, selectCategory}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          isActive ? styles.activeCategoryText : styles.inActiveCategoryText
        }
        onPress={() => selectCategory(name)}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_YELLOW,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  activeCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.DEFAULT_BLACK,
  },
  inActiveCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: FONTS.POPPINS_SEMI_BOLD,
    color: COLORS.INACTIVE_GREY,
  },
});

export default CategoryListItem;
