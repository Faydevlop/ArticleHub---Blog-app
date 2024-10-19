import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}




// routes

export const registerAuth = createAsyncThunk(
    'auth/user',
    async(userData,{rejectWithValue})=>{
        try {
         

            let response = await axios.post(`https://articlehub.moon-cart.shop/user/signup`,userData,)
            console.log('response is here');
            
            return response.data
        } catch (error) {
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            }else{
                return rejectWithValue({ message: error.message });
            }
            
        }
    }
)


export const loginAuth = createAsyncThunk(
    'auth/user/login',
    async(userData,{rejectWithValue})=>{
        try {
           

            let response = await axios.post(`https://articlehub.moon-cart.shop/user/login`,userData)
            console.log('response is here');
            
            return response.data
        } catch (error) {
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            }else{
                return rejectWithValue({ message: error.message });
            }
            
        }
    }
)


// slice part 
const userAuthSlice = createSlice({
    name:'userAuth',
    initialState:{
        token:null,
        user:null,
        error:null,
        loading:false,
        isAuthenticated:false
    },
    reducers: {
        clearError(state) {
          state.error = null;
        },
        logout(state){
            state.user = null
            state.token = null
            state.isAuthenticated = false
        }
      },
    extraReducers:(builder)=>{
        builder
        .addCase(registerAuth.pending,(state)=>{
            state.loading = true;
        })
        .addCase(registerAuth.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;


            const decodedToken = decodeJWT(action.payload.token);

            const expirationTime = decodedToken.exp * 1000;

            setTimeout(() => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
            }, expirationTime - Date.now());
            
        })
        .addCase(registerAuth.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = action.payload ? action.payload.message : "Registration failed";
        })
        .addCase(loginAuth.pending,(state)=>{
            state.loading = true;
        })
        .addCase(loginAuth.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.error = null;
            state.isAuthenticated = true
            state.token = action.payload.token;

            const decodedToken = decodeJWT(action.payload.token);

            const expirationTime = decodedToken.exp * 1000;

            setTimeout(() => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
            }, expirationTime - Date.now());
        })
        .addCase(loginAuth.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = action.payload ? action.payload.message : "Registration failed";
        })
    }
})

export const { clearError } = userAuthSlice.actions;
export const { logout } = userAuthSlice.actions;
export const authReducer = userAuthSlice.reducer;