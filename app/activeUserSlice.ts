import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store";

export interface UserState {
    username: string
    first_name?: string
    last_name?: string
    email: string
}

export interface UserProfileState {
    user: UserState
    phone?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zip_code?: string
}

const initialState: UserProfileState = {
    user: {
        username: "",
        email: "",
    }
}

export const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers : {
        setUserData: (state, action: PayloadAction<UserProfileState>) => {
            state = action.payload
        }
    }
})

export const selectUserData = (state: RootState) => state.activeUser;
export const {setUserData} = activeUserSlice.actions;

export default activeUserSlice.reducer;