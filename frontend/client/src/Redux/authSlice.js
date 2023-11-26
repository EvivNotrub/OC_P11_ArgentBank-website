
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postCredentials } from "../api/api";
import { setLocalWithExpiry } from "../helpers/localStorage";

const initialState = {
    loading: 'idle',
    isAuthorized: false,
    hasToken: false,
    validToken: false,
    rememberMe: false,
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
        hasTokenAction: (state, action) => {
            state.hasToken = action.payload;
        },
        validTokenAction: (state, action) => {
            state.validToken = action.payload;
        },
        isAuthorizedAction: (state, action) => {
            state.isAuthorized = action.payload;
        },
        rememberMeAction: (state, action) => {
            state.rememberMe = action.payload;
        },
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
              state.loading = 'idle'
              const rawToken = action.payload.body.token;
            //   TODO: manage user as well
            // TODO: hasToken change to Token?
                if (state.rememberMe) {
                    setLocalWithExpiry("token", rawToken, 60000)
                } else {
                    window.sessionStorage.setItem("token", JSON.stringify(rawToken))
                }
              if (rawToken) {
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
              state.hasToken = false
              state.isAuthorized = false
            }
        })
    },
});

export const { hasTokenAction, isAuthorizedAction, rememberMeAction, validTokenAction } = authSlice.actions;
export default authSlice.reducer;
