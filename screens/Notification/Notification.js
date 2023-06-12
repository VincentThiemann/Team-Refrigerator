import { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import * as Device from 'expo-device';
import firestore from '@react-native-firebase/firestore';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import Separator from '../../components/Separator.js';
import { COLORS, FONTS, SIZES } from '../../constants/index.js';
import Display from '../../utils/Display.js';

//temporary disabled due to misconfiguration on firebase
// const user = auth()?.currentUser?.uid;
const user = 'IQ0szOEWjNWSBnCHAL5uT3OcHBC3';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(notification, notifications) {
  console.log('Send notification');
  Notifications.scheduleNotificationAsync({
    content: {
      title: "ORDER'S ARRIVAL",
      body: 'Your order has arrived! Enjoy your meal!',
    },
    trigger: null,
  });

  const newNotification = {
    title: notification.request.content.title,
    body: notification.request.content.body,
  };
  notifications.push(newNotification);
}

const removeNotifications = (notifications) => {
  notifications.length = 0;
}

// // Use AsyncStorage to store notification
// const storeNotification = async (notifications, index, notification) => {
//   try {
//     await AsyncStorage.setItem(index + "", JSON.stringify(notification));
//     notifications.push(notification);
//   } catch (error) {
//     console.log("Error in storing notification");
//   }
// }

// // Use AsyncStorage to get list of all notifications
// const getNotifications = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     const notifications = await AsyncStorage.multiGet(keys);
//     if(notifications !== null) {
//       return notifications;
//     }
//   } catch (error) {
//     console.log("Error in getting notification");
//   }
// }

export default function Notification() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(true);
  const [deliveryManLocation, setDeliveryManLocation] = useState(null);

  // const [index, setIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);

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

  Location.getCurrentPositionAsync({})
    .then(location => {
      setCurrentLocation(location);
    })
    .catch(e => console.log(e));

  // })();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('Location')
        .doc(user)
        .onSnapshot(documentSnapshot => {
          let data = documentSnapshot.data();
          arrive({
            latitude: data.latitude,
            longitude: data.longitude,
          });
          console.log(data.longitude);
        });

      return () => subscriber();
    }
  }, [user]);

  const arrive = deliveryManLocation => {     
    console.log('Test');
    if (currentLocation) {
      const distance = Math.sqrt(
        Math.pow(
          currentLocation.coords.latitude - deliveryManLocation.latitude,
          2,
        ) +
          Math.pow(
            currentLocation.coords.longitude - deliveryManLocation.longitude,
            2,
          ),
      );
      console.log('Distance ' + distance);
      console.log('Current long' + currentLocation.coords.longitude);
      console.log('Current lat' + currentLocation.coords.latitude);
      console.log(
        '1st' +
          Math.pow(
            currentLocation.coords.latitude - deliveryManLocation.latitude,
            2,
          ),
      );
      console.log(
        '2nd' +
          Math.pow(
            currentLocation.coords.longitude - deliveryManLocation.longitude,
            2,
          ),
      );
      const tolerance = 0.5;
      if (distance < tolerance) {
        sendPushNotification(notification, notifications);
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
      <Separator height={Display.setHeight(25)} />
      <ScrollView>
        {notifications.map(item => (
          <TouchableOpacity style={styles.notificationBox}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.body}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.clearingBox} onPress={() => removeNotifications(notifications)}>
          <Text style={styles.text}>Clear All Notifications</Text>
      </TouchableOpacity>
      <Separator height={Display.setHeight(10)} />
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
  notificationBox: {
    height: Display.setHeight(15),
    width: Display.setWidth(95),
    paddingLeft: SIZES.radius,
    borderRadius: 15,
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.DEFAULT_GREEN,
    justifyContent: 'center',
    borderWidth: 2,
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 10,
  },
  clearingBox: {
    height: Display.setHeight(8),
    width: Display.setWidth(95),
    paddingLeft: SIZES.radius,
    borderRadius: 35,
    backgroundColor: COLORS.DEFAULT_GREEN,
    borderColor: COLORS.DEFAULT_GREEN,
    justifyContent: 'center',
    borderWidth: 2,
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 10,
  }
});
