import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
    isChanged: boolean
}

const initialState: InitialStateType = {
    isChanged: false
}

const formEditProfile = createSlice({
    name: 'formEditProfile',
    initialState,
    reducers: {
        setFormEditUserChange: (state: InitialStateType, action: PayloadAction<boolean>) => { state.isChanged = action.payload }
    }
});

export const { setFormEditUserChange } = formEditProfile.actions

export default formEditProfile.reducer