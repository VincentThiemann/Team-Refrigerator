
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const username = auth()?.currentUser.uid;

const getBookmarks = async () => {
  try {
    const data = await firestore().collection('Bookmark').doc(username).get();
    return {
      status: true,
      message: "Bookmark fetched Successfully",
      data: data.data()
    };
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return {
      status: false,
      message: "Cart items fetched Failed",
    };
  }
};

const addBookmark = async (restaurantId) => {
  console.log(`BookmarkService | addBookmark`);
  const bookmarkRef = firestore().collection('Bookmark').doc(username);
  try {
    const ref = (await firestore().collection('Restaurants').doc(restaurantId).get()).data();
    await bookmarkRef.update({
      "restaurants": firestore.FieldValue.arrayUnion(ref),
      "restaurantsId": firestore.FieldValue.arrayUnion(restaurantId),
    });
    console.log('Item added to array field successfully');

    let bookmarkResponse = await getCartItems();
    return {
      status: true,
      message: "Item Bookmarked Successfully",
      data: bookmarkResponse?.data,
    };
  } catch (error) {
    console.error('Error updating array field:', error);
    return {
      status: false,
      message: "Item Bookmarked Addition Failed",
    };
  }


};

const removeBookmark = async (restaurantId) => {
  console.log(`BookmarkService | removeBookmark`);
  const bookmarkRef = firestore().collection('Bookmark').doc(username);
  try {
    const ref = firestore().collection('Restaurant').doc(restaurantId)
    await bookmarkRef.update({
      "restaurants": firestore.FieldValue.arrayRemove(ref),
    });
    console.log('Item removed from array field successfully');

    let bookmarkResponse = await getCartItems();
    return {
      status: true,
      message: "Item Bookmarked Successfully",
      data: bookmarkResponse?.data,
    };

  } catch (error) {
    console.error('Error updating array field:', error);
    return {
      status: false,
      message: "Item Bookmarked Removal Failed",
    };
  }

};

export default { getBookmarks, addBookmark, removeBookmark };