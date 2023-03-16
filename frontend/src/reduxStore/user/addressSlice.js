import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const address = localStorage.getItem("address")
  ? JSON.parse(localStorage.getItem("address"))
  : {};

const initialState = {
  address: address,
  addressList: [],
  status: "idle",
  editStatus: null,
  deleteResult:null,
  memberAddressError: null,
  addressListError: null,
  deleteError:null
};

export const addMemberAddress = createAsyncThunk(
  "order/addMemberAddress",
  async (addressObj) => {
    try {
      const response = await axios.post(`/api/user/addAddress`, addressObj, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  }
);
export const editMemberAddress = createAsyncThunk(
  "order/editMemberAddress",
  async (addressObj) => {
    try {
      const response = await axios.post(`/api/user/editAddress`, addressObj, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  }
);

export const deleteMemberAddress = createAsyncThunk(
  "order/deleteMemberAddress",
  async (addressId) => {
    try {
      const response = await axios.post(`/api/user/deleteAddress`, addressId, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  }
);

export const fetchAddressList = createAsyncThunk(
  "order/fetchAddressList",
  async () => {
    try {
      const response = await axios.get(`/api/user/fetchAddressList`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const address = action.payload;

      state.address = address;
      localStorage.removeItem("address");
      localStorage.setItem("address", JSON.stringify(state.address));
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addMemberAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addMemberAddress.fulfilled, (state, action) => {
        state.status = "succeeded";

        // state.product.push(action.payload)
        state.memberAddressError = action.payload.error;
        state.address = action.payload.address;

        // return  action.payload
      })
      .addCase(addMemberAddress.rejected, (state, action) => {
        state.status = "rejected";
        state.memberAddressError = action.error.message;
      })
      .addCase(editMemberAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editMemberAddress.fulfilled, (state, action) => {
        state.status = "succeeded";

        // state.product.push(action.payload)
        state.memberAddressError = action.payload.error;
        state.address = action.payload.address;
        state.editStatus = action.payload.status;

        // return  action.payload
      })
      .addCase(editMemberAddress.rejected, (state, action) => {
        state.status = "rejected";
        state.memberAddressError = action.error.message;
      })
      .addCase(deleteMemberAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteMemberAddress.fulfilled, (state, action) => {
        state.status = "succeeded";

        // state.product.push(action.payload)
        state.deleteError = action.payload.error;
        state.deleteResult = action.payload.status;

        // return  action.payload
      })
      .addCase(deleteMemberAddress.rejected, (state, action) => {
        state.status = "rejected";
        state.deleteError = action.error.message;
      })
      .addCase(fetchAddressList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddressList.fulfilled, (state, action) => {
        state.status = "succeeded";

        // state.product.push(action.payload)
        state.addressListError = action.payload.error;
        state.addressList = action.payload.addressList;

        // return  action.payload
      })
      .addCase(fetchAddressList.rejected, (state, action) => {
        state.status = "rejected";
        state.memberAddressError = action.error.message;
      });
  },
});

export const { addAddress } = addressSlice.actions;

export const getShippingAddress = (state) => state.address.address;

export const getShippingAddressList = (state) => state.address.addressList;
export const shppingStatus = (state) => state.address.status;
export const editStatus = (state) => state.address.editStatus;

export const memberAddressError = (state) => state.address.memberAddressError;
export const addressListError = (state) => state.address.addressListError;

export const deleteResult = state=> state.address.deleteResult;
export const deleteError = state=> state.address.deleteError

export default addressSlice.reducer;
