import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, Alert, Button, Platform
} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'ORDER\'S ARRIVAL',
        body: 'Your order has arrived! Enjoy your meal',
        // data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
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
        token = (await Notifications.getExpoPushTokenAsync()).data;
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

export default Notification = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
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
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          {/* <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text> */}
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
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