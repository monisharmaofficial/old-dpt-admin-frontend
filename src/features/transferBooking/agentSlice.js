
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAgentsContent = createAsyncThunk('/leads/content', async () => {
	/*
    const response = await axios.get('/api/users?page=2', {})
	return response.data;
    */

   const data = {
    "page": 2,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data":  [
        {id:"1",guest_name: "ineid ksend",booking_from:"Peter Winter link" , emirates : "DUBAI", location : "Paris", amount : 100},
        {id:"2",guest_name : "Kathleen Battson",booking_from:"Peter Winter link ",emirates : "DUBAI", location : "London", amount : 190},
        {id:"3",guest_name: "Luxetribe - Loukisha", booking_from:"excelle flores link",emirates: "DUBAI", location : "Canada", amount : 112},
        

    
    ],
    "support": {
        "url": "#",
        "text": "#"
    }
}
   return data ;

})

export const agentSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        leads : []
    },
    reducers: {


        addNewAgent: (state, action) => {
            let {newLeadObj} = action.payload
            state.leads = [...state.leads, newLeadObj]
        },

        deleteAgent: (state, action) => {
            let {index} = action.payload
            state.leads.splice(index, 1)
        }
    },

    extraReducers: {
		[getAgentsContent.pending]: state => {
			state.isLoading = true
		},
		[getAgentsContent.fulfilled]: (state, action) => {
			state.leads = action.payload.data
			state.isLoading = false
		},
		[getAgentsContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewAgent, deleteAgent } = agentSlice.actions

export default agentSlice.reducer