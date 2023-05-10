import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { BookmarkCard, Separator } from '../../components';
import Display from '../../utils/Display';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import bookmarkActions from '../../stores/bookmark/bookmarkActions';
import { useDispatch } from 'react-redux';

const ListItemSeparator = () => (
    <View
        style={{
            height: 0.8,
            backgroundColor: COLORS.DEFAULT_GREY,
            width: '100%',
            marginVertical: 10,
        }}
    />
);

const Favourite = ({ navigation }) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state?.bookmarkState?.bookmarks?.restaurants);

    React.useEffect(() => {
        dispatch(bookmarkActions.getBookmarks());

    }, [])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.DEFAULT_WHITE}
                translucent
            />
            <Separator height={Display.setHeight(14)} />
            <FlatList
                style={styles.bookmarkList}
                data={bookmarks}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Separator height={10} />}
                ListFooterComponent={() => <Separator height={10} />}
                ItemSeparatorComponent={() => <ListItemSeparator />}
                renderItem={({ item }) => 
                    <BookmarkCard
                        {...item}
                        navigate={restaurantId =>
                            navigation.navigate('Restaurant', { restaurantId })
                        }
                    />
                }
            />
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
    bookmarkList: {
        marginHorizontal: 20,
    },
});

export default Favourite;