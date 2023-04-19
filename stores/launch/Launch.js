import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-native';
import { setFirstLaunch } from './LaunchReducer';
import { useNavigation } from '@react-navigation/native';

export default Launch = () => {
    const dispatch = useDispatch();
    const isFirstLaunch = useSelector(state => state.isFirstLaunch);
    const navigation = useNavigation();

    useEffect(() => {
        if(isFirstLaunch) {
            dispatch(setFirstLaunch());
        }
    }, [isFirstLaunch, dispatch]);

    nextScreen = isFirstLaunch ? "Onboarding" : "";
    navigation.navigate(nextScreen);
}