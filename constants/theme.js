import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    DEFAULT_BLACK: '#0E122B',
    DEFAULT_GREEN: '#0A8791',
    DEFAULT_YELLOW: '#FBA83C',
    DEFAULT_GREY: '#C2C2CB',
    DEFAULT_WHITE: '#FFFFFF',
    DEFAULT_RED: '#F53920',
    SECONDARY_RED: '#FF6F59',
    SECONDARY_WHITE: '#F8F8F8',
    SECONDARY_GREEN: '#24C869',
    SECONDARY_BLACK: '#191d35',
    LIGHT_GREEN: '#CEE8E7',
    LIGHT_GREY: '#F8F7F7',
    LIGHT_GREY2: '#EAEAEA',
    LIGHT_YELLOW: '#FCE6CD',
    LIGHT_RED: '#FFC8BF',
    FABEBOOK_BLUE: '#4A61A8',
    GOOGLE_BLUE: '#53A0F4',
    INACTIVE_GREY: '#A3A3A3',
    DARK_ONE: '#121212',
    DARK_TWO: '#181818',
    DARK_THREE: '#404040',
    DARK_FOUR: '#282828',
    DARK_FIVE: '#B3B3B3',
    primary: "#FF6C44",
    transparentPrimray: 'rgba(227, 120, 75, 0.4)',
    orange: "#FFA133",
    lightOrange: "#FFA133",
    lightOrange2: "#FDDED4",
    lightOrange3: '#FFD9AD',
    green: '#28B463', // primary
    lightGreen: "#E8F7ED",
    red: "#FF1717",
    blue: '#0064C0',
    darkBlue: "#111A2C",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: '#CFD0D7',
    gray4: '#616161',
    lightGray1: "#DDDDDD",
    lightGray2: "#F5F5F8",
    ligthGray3: "#FAFAFA",
    white2: "#FBFBFB",
    white: '#FFFFFF',
    black: "#000000",
    navy: "#1F222A",
    lightGreen2: "#EEF9F1",


    transparent: 'transparent',
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)"

};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 72,
    smallTitle: 45,
    h1: 30,
    h2: 21,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Poppins-Black", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Poppins-Regular", fontSize: SIZES.body5, lineHeight: 22 },
    POPPINS_BLACK: 'Poppins-Black',
    POPPINS_BOLD: 'Poppins-Bold',
    POPPINS_EXTRA_BOLD: 'Poppins-ExtraBold',
    POPPINS_EXTRA_LIGHT: 'Poppins-ExtraLight',
    POPPINS_LIGHT: 'Poppins-Light',
    POPPINS_MEDIUM: 'Poppins-Medium',
    POPPINS_REGULAR: 'Poppins-Regular',
    POPPINS_SEMI_BOLD: 'Poppins-SemiBold',
    POPPINS_THIN: 'Poppins-Thin',
};

export const MARGIN = {
    d1: '10%',
    d2: '20%',
    d3: '30%',
    d4: '40%',
    d5: '50%'
}

const appTheme = { COLORS, SIZES, FONTS, MARGIN };

export default appTheme;
