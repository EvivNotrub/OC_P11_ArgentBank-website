
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postCredentials } from "../api/api";

const initialState = {
    loading: 'idle',
    auth: [],
    isAuthorized: false,
    hasToken: false,
    error: "",
};

export const fetchAuth = createAsyncThunk(
    "user/fetchAuth",
    async (bodyData, thunkAPI) => {
        const response = await postCredentials(bodyData);
        if (response.status === 404) {
            return thunkAPI.rejectWithValue(response);
        }
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data);
        }
        const contentType = response.headers.get("content-type")
        if(!contentType || !contentType.includes("application/json")){
            throw new TypeError("Did not received Json!")
        }
        return data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        tokenAdded: (state, action) => {
            state.auth.push(action.payload);
        },
        hasTokenAction: (state, action) => {
            state.hasToken = action.payload;
        },
        isAuthorizedAction: (state, action) => {
            state.isAuthorized = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAuth.pending, (state, action) => {
            if (state.loading === 'idle') {
              state.loading = 'pending'
              state.currentRequestId = action.meta.requestId
            }
          })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if (
              state.loading === 'pending' &&
              state.currentRequestId === requestId
            ) {
                // here i would like to add the token and user to the state where the user is the key and the token is the value
              state.loading = 'idle'
              const token = JSON.stringify(action.payload.body.token);
              window.localStorage.setItem("token", token)
              if (token) {
                state.hasToken = true
              }
              state.isAuthorized = true
              state.currentRequestId = undefined
              state.error = ''

            }
        })
        .addCase(fetchAuth.rejected, (state, action) => {
            const { requestId } = action.meta
            if (
              state.loading === 'pending' &&
              state.currentRequestId === requestId
            ) {
              state.loading = 'idle'
              state.error = action.error
              state.currentRequestId = undefined
              state.auth = []
              state.hasToken = false
              state.isAuthorized = false
            }
        })
    },
});

export const { tokenAdded, hasTokenAction, isAuthorizedAction } = authSlice.actions;
export default authSlice.reducer;
