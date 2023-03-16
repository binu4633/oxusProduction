import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartMenu: false,
  loginMenu: false,
  logoutMenu: false,
  guestAddressDisplay: false,
  memberAddressDisplay:false,
  editAddress: false,
  shippingPath:'',
  editFromAddressList:false,
  editAddress:'',
  searchKeyword:'',
  menu:false,
  sizeChart:false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCartMenu: (state) => {
      state.cartMenu = !state.cartMenu;
    },
    toggleLoginMenu: (state) => {
      state.loginMenu = !state.loginMenu;
    },
    toggleLogoutMenu: (state) => {
      state.logoutMenu = !state.logoutMenu;
    },
    toggleGuestAddressDisplay: (state) => {
      state.guestAddressDisplay = !state.guestAddressDisplay;
    },
    toggleMemberAddressDisplay: (state) => {
      state.memberAddressDisplay = !state.memberAddressDisplay;
    },
    editAddressOn: (state) => {
      state.editAddress = true;
    },
    editAddressOff: (state) => {
      state.editAddress = false;
    },
    addShippigPath:(state,action)=>{
        const pathName = action.payload;
        state.shippingPath = pathName;
    },
    toggleEditFromAddressDisplay:(state)=>{
      state.editFromAddressList = !state.editFromAddressList
    },
    editFromAddressListOn:(state)=>{
      state.editFromAddressList=true
    },
    editFromAddressListOff:(state)=>{
      state.editFromAddressList=false
    },
    editListAddress:(state,action)=>{
     const  address = action.payload;
      state.editAddress = address
    },
    addSearchKeyword:(state,action)=>{
      const query = action.payload;
      state.searchKeyword = query;
    },
    toggleMenu:(state)=>{
      state.menu = !state.menu
    },
    sizeChartDisplay:(state)=>{
      state.sizeChart = !state.sizeChart;
    }
  },
});

export const {
  toggleCartMenu,
  toggleLoginMenu,
  toggleLogoutMenu,
  toggleGuestAddressDisplay,
  toggleMemberAddressDisplay,
  editAddressOn,
  editAddressOff,
  addShippigPath,
  editFromAddressListOn,
  editFromAddressListOff,
  editListAddress,
  toggleEditFromAddressDisplay,
  addSearchKeyword,
  toggleMenu,
  sizeChartDisplay
} = uiSlice.actions;

export default uiSlice.reducer;
