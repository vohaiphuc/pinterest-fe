import { createSlice } from '@reduxjs/toolkit'
import { userLocalServ } from '../api/localService';

const initialState = {
    userInfo: userLocalServ.get()?.user
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserInfo: (state, action) => { state.userInfo = action.payload }
    }
});

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer