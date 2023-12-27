import { createSlice } from '@reduxjs/toolkit'

type PopupType = {
  formName: string
}

const initialState: PopupType = {
  formName: ""
}

const formPopupSlice = createSlice({
  name: 'formPopupSlice',
  initialState,
  reducers: {
    setFormPopup: (state, action) => { state.formName = action.payload }
  }
});

export const { setFormPopup } = formPopupSlice.actions

export default formPopupSlice.reducer