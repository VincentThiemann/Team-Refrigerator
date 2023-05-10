import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'ORDER\'S ARRIVAL',
      body: "Your order has arrived! Enjoy your meal!",
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: 'b7be7756-a967-4836-9e5b-9231a361d974',
    })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  // const [hasArrived, setHasArrived] = useState(true);

  useEffect(() => {
    (async () => {
      const { permission } = Location.requestForegroundPermissionsAsync();
      if (permission == "granted") {
        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location);
      };
    })()
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

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
    if (currentLocation) {
      const deliveryManLocation = {
        latitude: currentLocation.latitude + 0.01,
        longitude: currentLocation.longitude + 0.01,
      }

      const distance = Math.sqrt(
        Math.pow(currentLocation.latitude - deliveryManLocation.latitude, 2) + Math.pow(currentLocation.coords.longitude - deliveryManLocation.longitude, 2)
      )
      const tolerance = 0.1;

      if (distance < tolerance) {
        sendPushNotification(expoPushToken);
      }
    }
  }, [currentLocation]);

  // useEffect(() => {
  //   if (hasArrived) {
  //     sendPushNotification(expoPushToken);
  //     setHasArrived(false);
  //   }
  // }, [hasArrived]);

  // const arrive = async () => {
  //   if (hasArrived) {
  //     await sendPushNotification(expoPushToken);
  //   }
  // }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      {/* <Button
        title="Press to Send Notification"
        onPress={() => { arrive() }}
      /> */}
    </View>
  );
}


// const NotificationInitialCode = () => {
//     const requestPermission = async () => {
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//             authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//             console.log('Authorization status:', authStatus);
//         }
//     }

//     useEffect(() => {
//         if (requestPermission()) {
//             messaging().getToken().then(token => {
//                 console.log(token);
//             });
//         }
//         else {
//             console.log("Could not have token status");
//         }

//         messaging()
//             .getInitialNotification()
//             .then(async (remoteMessage) => {
//                 if (remoteMessage) {
//                     console.log(
//                         'Notification caused app to open from quit state:',
//                         remoteMessage.notification,
//                     );
//                 }
//             });

//         // Assume a message-notification contains a "type" property in the data payload of the screen to open

//         messaging().onNotificationOpenedApp(async (remoteMessage) => {
//             console.log(
//                 'Notification caused app to open from background state:',
//                 remoteMessage.notification,
//             );
//         });

//         // Register background handler
//         messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//             console.log('Message handled in the background!', remoteMessage);
//         });

//         const unsubscribe = messaging().onMessage(async remoteMessage => {
//             Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//         });

//         return unsubscribe;

//     }, [])

    // return (
    //     <View
    //         style={{
    //             flex: 1,
    //             alignItems: 'center',
    //             justifyContent: 'center'
    //         }}
    //     >
    //         <Text>Notification</Text>
    //     </View>
    // )
// }