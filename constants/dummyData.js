import icons from './icons'
import images from "./images";

const myProfile = {
    name: " John Doe",
    profile_image: images.profile,
    address: " empty address",
}

const offers = [
    {
        id: 1,
        name: "Coupon 1",
        image: images.coupon,
    }
]

const categories = [
    {
        id: 1,
        name: "Fast Food",
        icon: icons.burger

    },
    {
        id: 2,
        name: "Fruit Item",
        icon: icons.cherry
    },
    {
        id: 3,
        name: "Rice Item",
        icon: icons.rice
    }
]

const hamburger = {
    id: 1,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png")
}

const menu = [
    {
        id: 1,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 2,
        name: "Hamburger",
        list: [
            hamburger
        ]
    },
    {
        id: 3,
        name: "Pizza",
        list: [

        ]
    },
    {
        id: 4,
        name: "Noddles",
        list: [

        ]
    },
    {
        id: 5,
        name: "Indian",
        list: [
            vegBiryani,
        ]
    },
    {
        id: 6,
        name: "Dessert",
        list: [

        ]
    },
    {
        id: 7,
        name: "Discount",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },


]

const fromLocs = [
    {
        latitude: 1.5347282806345879,
        longitude: 110.35632207358996,
    },
    {
        latitude: 41.5146804,
        longitude: -81.6055284,
    },
    {
        latitude: 1.5238753474714375,
        longitude: 110.34261833833622,
    },
    {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
    },
    {
        latitude: 1.558050496260768,
        longitude: 110.34743759630511,
    },
    {
        latitude: 1.5573478487252896,
        longitude: 110.35568783282145,
    }
]


export default {
    vegBiryani,
    myProfile,
    categories,
    menu,
    offers,
    fromLocs
}