import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        title: "",  // current  title state management
        isOpen : false,   // modal state management for opening closing
        bodyType : "",   // modal content management
        size : "",   // modal content management
        extraObject : {},   
        details: ""
    },
    reducers: {

        openModal: (state, action) => {
            const {title, bodyType, extraObject, size , details} = action.payload
            state.isOpen = true
            state.bodyType = bodyType
            state.title = title
            state.details = details
            state.size = size || 'md'
            state.extraObject = extraObject
        },

        closeModal: (state, action , details) => {
            state.isOpen = false
            state.bodyType = ""
            state.title = ""
            state.extraObject = {}
            state.details = details
        },

    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer