import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

const NotFound = () => {
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => { setTimeout(() => setLoading(false), 1000) }, []);
    if (!loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
                <Image style={{ width: 300, height: 300 }} source={require("../assets/images/sad.png")} />
                <View style={{ marginVertical: 20 }} />
                <Text style={styles.title}>Could not find the requested address</Text>
            </View>
        )
    }
}