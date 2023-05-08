
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const username = auth()?.currentUser.uid;

const getCartItems = async () => {
  try {
    if (username != null) {
      const cartRef = firestore().collection('Cart').doc(username);
      const cartItemsSnapshot = await cartRef.get();
      const data = cartItemsSnapshot.data();

      const cartItems = Object.keys(data).map(key => {
        return { "foodId": parseInt(key), "count": data[key] };
      });

      let itemsTotal = 0;
      let discount = 0;


      for (const cartItem of cartItems) {
        const foodDoc = firestore().collection("Foods");
        const querySnap = await foodDoc.doc(cartItem.foodId.toString()).get();
        const data = querySnap.data();

        itemsTotal += data.price * cartItem.count;
      }

      return {
        status: true,
        message: "Cart items fetched Successfully",
        data: {
          cartItems,
          metaData: {
            itemsTotal,
            discount,
            grandTotal: itemsTotal - discount,
          },
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return {
      status: false,
      message: "Cart items fetched Failed",
    };
  }
};


const addToCart = async (foodId) => {
  try {
    if (username != null) {
      const cartRef = firestore().collection('Cart').doc(username);
      await cartRef.get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            if (data.hasOwnProperty(foodId)) {
              cartRef.update({
                [foodId]: data[foodId] + 1
              })
            } else {
              cartRef.update({
                [foodId]: 1
              })
            }
          } else {
            console.log('Document does not exist.');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });


      const cartResponse = await getCartItems();
      return {
        status: true,
        message: "Item Added to Cart Successfully",
        data: cartResponse?.data,
      };
    }
  }
  catch (error) {
    return {
      status: false,
      message: "Item Addition Failed",
    };
  }
};

const removeFromCart = async (foodId) => {
  try {

    if (username != null) {
      const cartRef = firestore().collection('Cart').doc(username);
      await cartRef.get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            if (data.hasOwnProperty(foodId)) {
              if (data[foodId] > 1)
                cartRef.update({
                  [foodId]: data[foodId] - 1
                })
              else {
                cartRef.update({
                  [foodId]: firestore.FieldValue.delete()
                })
              }
            }
          } else {
            console.log('Document does not exist.');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });


      const cartResponse = await getCartItems();
      return {
        status: true,
        message: "Item Added to Cart Successfully",
        data: cartResponse?.data,
      };
    }
  }
  catch (error) {
    return {
      status: false,
      message: "Item Addition Failed",
    };
  }
};



export default { getCartItems, addToCart, removeFromCart };
