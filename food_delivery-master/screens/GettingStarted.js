import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    Dimensions,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const {width, height} = Dimensions.get('window');

const slides  = [
    {
        id: '1',
        title: 'Getting started no 1',
        image: images.getting_started_1,
    },
    {
        id: '2',
        title: 'Getting started no 2',
        image: images.getting_started_2,
    },
    {
        id: '3',
        title: 'Getting started no 3',
        image: images.getting_started_3,
    },
];

const GettingStarted = ({navigation}) => {
    
    renderHeader();
    renderFooter();
}

const Slide = () => {
    return (<View style = {{alignItems: 'center'}}>
                <Image source = {item.image} 
                       style = {{height: '75%', width, resizeMode: 'contain'}}/>
                <View>
                    <Text style={styles.title}>{item?.title}</Text>
                </View>
            </View>
    );
};

function renderFooter() {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    return(
        <View style = {{height: height*0.25, 
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
        }}>
            {/* Indicator container */}
            <View style = {{flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 20,
                           }}>
                {/* Render indicator */}
                {slides.map((_, index) => (
                <View
                        key={index}
                        style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                backgroundColor: COLORS.white,
                                width: 25,},
                                ]}
                />
                 ))}
            </View>
        </View>
    )
}

function renderHeader() {
    return (
    <SafeAreaView style = {{ flex: 1, backgroundColor: COLORS.primary , alignItems: 'center', justifyContent: 'center' }}>
        <View style = {{flex: 1}}>
        <StatusBar>

        </StatusBar>
        <FlatList data = {slides} 
                  contentContainerStyle={{height: height*0.7}} 
                  showsHorizontalScrollIndicator = {false}
                  horizontal
                  pagingEnabled
                  renderItem={({item})=> <Slide item={item}/> } 
        />
            <TouchableOpacity>
                <Text> Getting started </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    subtitle: {
      color: COLORS.white,
      fontSize: 13,
      marginTop: 10,
      maxWidth: '70%',
      textAlign: 'center',
      lineHeight: 23,
    },
    title: {
      color: COLORS.white,
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    indicator: {
      height: 2.5,
      width: 10,
      backgroundColor: 'grey',
      marginHorizontal: 3,
      borderRadius: 2,
    },
    btn: {
      flex: 1,
      height: 50,
      borderRadius: 5,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export default GettingStarted