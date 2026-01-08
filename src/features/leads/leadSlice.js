
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLeadContent = createAsyncThunk('/leads/content', async () => {
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
        {id:"1",image : "https://www.dubaiprivatetour.com/assets/images/emirates/fill.jpg",assigned:"Viren",name : "Alex",phone_no:"987876755" , email : "alex@dashwind.com", location : "Paris", amount : 100, },
        {id:"2",image : "https://www.dubaiprivatetour.com/assets/images/emirates/fill.jpg",assigned:"Max",name : "Ereena",phone_no:"9878767634", email : "ereena@dashwind.com", location : "London", amount : 190},
        {id:"3",image : "https://www.dubaiprivatetour.com/assets/images/emirates/fill.jpg",assigned:"Mouse",name : "John", phone_no:"7655743655" ,email : "jhon@dashwind.com", location : "Canada", amount : 112},
    ],
    "support": {
        "url": "#",
        "text": "#"
    }
}
   return data ;

})

export const leadSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        leads : []
    },
    reducers: {


        addNewTour: (state, action) => {
            let {newLeadObj} = action.payload
            state.leads = [...state.leads, newLeadObj]
        },

        deleteLead: (state, action) => {
            let {index} = action.payload
            state.leads.splice(index, 1)
        }
    },

    extraReducers: {
		[getLeadContent.pending]: state => {
			state.isLoading = true
		},
		[getLeadContent.fulfilled]: (state, action) => {
			state.leads = action.payload.data
			state.isLoading = false
		},
		[getLeadContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewLead, deleteLead } = leadSlice.actions

export default leadSlice.reducer