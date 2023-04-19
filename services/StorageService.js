import AsyncSorage from '@react-native-async-storage/async-storage';

const setFirstTimeUse = () => {
  return AsyncSorage.setItem('isFirstTimeUse', 'true');
};

const getFirstTimeUse = () => {
  return AsyncSorage.getItem('isFirstTimeUse');
};

export default {setFirstTimeUse, getFirstTimeUse};