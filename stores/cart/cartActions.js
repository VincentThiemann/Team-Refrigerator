import firestore from '@react-native-firebase/firestore';

const user = firebase.auth().currentUser;

const cartCollection = firestore().collection('Carts').where( username , '==' , user.uid );
import { getFirestore, collection, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";


try {
  const cartsCollection = collection(firestore, "carts");
  const cartDocRef = doc(cartsCollection, `\${username}_\${foodId}`);

  const cartDoc = await getDoc(cartDocRef);
  let updatedCart;

  if (cartDoc.exists()) {
    updatedCart = await updateDoc(cartDocRef, {
      count: cartDoc.data().count + 1,
    });
  } else {
    updatedCart = await setDoc(cartDocRef, {
      foodId,
      username,
      count: 1,
    });
  }

  if (updatedCart) {
    let cartResponse = await getCartItems({ username });
    return {
      status: true,
      message: "Item Added to Cart Successfully",
      data: cartResponse?.data,
    };
  }
} catch (error) {
  console.error("Error updating cart:", error);
}

const types = {
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const addToCart = ({foodId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.addToCart({foodId})
      .then(cartResponse => {
        dispatch({
          type: types.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const removeFromCart = ({foodId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.removeFromCart({foodId})
      .then(cartResponse => {
        dispatch({
          type: types.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const getCartItems = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.getCartItems()
      .then(cartResponse => {
        dispatch({
          type: types.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

export default {types, addToCart, removeFromCart, getCartItems};