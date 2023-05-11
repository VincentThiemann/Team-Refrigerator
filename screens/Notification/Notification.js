import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet, TouchableOpacity } from 'react-native';
// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FONTS, SIZES, COLORS } from '../../constants/index.js';
import Display from '../../utils/Display.js'
import Separator from '../../components/Separator.js';

//temporary disabled due to misconfiguration on firebase
// const user = auth()?.currentUser?.uid;
const user = "IQ0szOEWjNWSBnCHAL5uT3OcHBC3"


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'ORDER\'S ARRIVAL',
      body: "Your order has arrived! Enjoy your meal!",
    },
    trigger: null,
  });
}

export default function Notification() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(true);
  const [deliveryManLocation, setDeliveryManLocation] = useState(null);


  // const { foregroundPermission } = awaitLocation.requestForegroundPermissionsAsync(); 
  // if (foregroundPermission === "granted") {

  // (function () {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   console.log(status);
  //   if (status !== 'granted') {
  //     console.log("denied")
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }

  Location.getCurrentPositionAsync({
  })
    .then(location => {
      setCurrentLocation(location)
    })
    .catch(e => console.log(e))

  // })();



  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Location')
      .doc(user)
      .onSnapshot(documentSnapshot => {
        let data = documentSnapshot.data();
        arrive({
          latitude: data.latitude,
          longitude: data.longitude
        });
        console.log(data.longitude)
      });
    return () => subscriber();
  }, [user]);



  const arrive = (deliveryManLocation) => {
    console.log("Test");
    if (currentLocation) {

      const distance = Math.sqrt(
        Math.pow(currentLocation.coords.latitude - deliveryManLocation.latitude, 2) + Math.pow(currentLocation.coords.longitude - deliveryManLocation.longitude, 2)
      )
      console.log("Distance " + distance);
      console.log("Current long" + currentLocation.coords.longitude)
      console.log("Current lat" + currentLocation.coords.latitude)
      console.log("1st" + Math.pow(currentLocation.coords.latitude - deliveryManLocation.latitude, 2))
      console.log("2nd" + Math.pow(currentLocation.coords.longitude - deliveryManLocation.longitude, 2))
      const tolerance = 0.0005;
      if (distance < tolerance) {
        sendPushNotification();
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Separator height={Display.setHeight(30)} />
        <TouchableOpacity style={styles.category}>
          <Text style={styles.text}>{notification && notification.request.content.title}</Text>
          <Text style={styles.text}>{notification && notification.request.content.body}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.DEFAULT_GREY,
    borderRadius: 10,
    borderWidth: 2,
    height: Display.setHeight(20),
    width: Display.setWidth(90),
  },
  text: {
    textAlign: 'center',
    color: COLORS.black,
    ...FONTS.body3,
  },
  category: {
    height: Display.setHeight(15),
    width: Display.setWidth(95),
    paddingLeft: SIZES.radius,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderColor: COLORS.DEFAULT_GREEN,
    justifyContent: 'center',
    borderWidth: 2,
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 10
  }
})