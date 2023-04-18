import MainLayout from "./MainLayout"

// Home
import Home from "./Home/Home"

// Search
import Search from "./Search/Search";

// Cart
import CartTab from "./Cart/CartTab"

// Favourite
import Favourite from "./Favourite/Favourite";

// Notification
import Notification from "./Notification/Notification"

//Authentication
import { Authentication } from "./Authentication/Authentication";

//CreateNewAccount
import { CreateNewAccount } from "./Authentication/CreateNewAccount";

//LogInAccount
import { LogInAccount } from "./Authentication/LogInAccount";

//OTPCodeVerification
import {  OTPCodeVerification }  from "./Authentication/OTPCodeVerification";

//FriensScreen
import { TransactionHistory } from "./EWallet/TransactionHistory";

import Profile from "./Profile/Profile";

export {
    MainLayout,
    OTPCodeVerification,
    TransactionHistory,
    Home,
    Search,
    CartTab,
    Favourite,
    Notification,
    Authentication,
    LogInAccount,
    Profile
}