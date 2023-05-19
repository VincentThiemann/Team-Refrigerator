
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const username = auth()?.currentUser?.uid;

const getBookmarks = async () => {
  try {
    if (username != null) {
      let data;
      await firestore().collection('Bookmark').doc(username).get()
      .then(res => data = res?.data())
      .catch(error => console.log(error));
      
      return {
        status: true,
        message: "Bookmark fetched Successfully",
        data: data
      };
    }
  } catch (error) {
    console.error("Error fetching data from Firestore a:", error);
    return {
      status: false,
      message: "Cart items fetched Failed",
    };
  }
};

const addBookmark = async (restaurantId) => {
  console.log(`BookmarkService | addBookmark`);
  if (username != null) {
    const bookmarkRef = firestore().collection('Bookmark').doc(username);
    try {
      // const ref = (await firestore().collection('Restaurants').doc(restaurantId).get()).data();
      let ref;
      await firestore().collection('Restaurants').doc(restaurantId).get()
      .then(res => ref = res.data())
      await bookmarkRef.update({
        "restaurants": firestore.FieldValue.arrayUnion(ref),
        "restaurantsId": firestore.FieldValue.arrayUnion(restaurantId),
      });
      console.log('Item added to array field successfully');

      let bookmarkResponse = await getBookmarks();
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
  }
};

const removeBookmark = async (restaurantId) => {
  console.log(`BookmarkService | removeBookmark`);
  if (username != null) {
    const bookmarkRef = firestore().collection('Bookmark').doc(username);
    try {
      const ref = await firestore().collection('Restaurants').doc(restaurantId).get();
      await bookmarkRef.update({
        "restaurants": firestore.FieldValue.arrayRemove(ref.data()),
        "restaurantsId": firestore.FieldValue.arrayRemove(restaurantId),
      })
      console.log('Item removed from array field successfully')


      let bookmarkResponse = await getBookmarks();
      return {
        status: true,
        message: "Item Bookmarked Successfully",
        data: bookmarkResponse?.data,
      };

    } catch (error) {
      console.error('Error updating array field: removing ', error);
      return {
        status: false,
        message: "Item Bookmarked Removal Failed",
      };
    }
  }

};

export default { getBookmarks, addBookmark, removeBookmark };