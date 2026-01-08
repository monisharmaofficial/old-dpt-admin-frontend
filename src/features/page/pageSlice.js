import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPageContent = createAsyncThunk('/leads/content', async () => {
	/*
    const response = await axios.get('/api/users?page=2', {})
	return response.data;
    */

   const data = {
    "page": 2,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
        {id:"1",name : "Alex",image : "https://www.dubaiprivatetour.com/assets/images/emirates/fill.jpg",category_name:"Tourist Visa",phone_no:"987876755" , email : "alex@dashwind.com", location : "Paris", amount : 100},
        {id:"2",name : "Ereena",image : "https://www.dubaiprivatetour.com/assets/images/emirates/fill.jpg",phone_no:"9878767634",category_name:"Safari", email : "ereena@dashwind.com", location : "London", amount : 190},
        {id:"3",name : "John", image : "https://www.dubaiprivatetour.com/assets/images/emirates/fill.jpg",category_name:"Services", phone_no:"7655743655" ,email : "jhon@dashwind.com", location : "Canada", amount : 112},

    ],
    "support": {
        "url": "#",
        "text": "#"
    }
}
   return data ;

})

export const pageSlice = createSlice({
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
		[getPageContent.pending]: state => {
			state.isLoading = true
		},
		[getPageContent.fulfilled]: (state, action) => {
			state.leads = action.payload.data
			state.isLoading = false
		},
		[getPageContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewPage, deleteAgent } = pageSlice.actions

export default pageSlice.reducer