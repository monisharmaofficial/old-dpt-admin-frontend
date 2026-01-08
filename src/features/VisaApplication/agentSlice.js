
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
        {id:"1",open_passport_data:"https://www.dubaiprivatetour.com/assets/files/8ad802f10d3cd213b8e1d43791e3a102.jpg",open_flight_data:"https://www.dubaiprivatetour.com/assets/files/e7828fe7798dfb5a3bd44320aaa477ae.pdf",open_hotel_data:"https://www.dubaiprivatetour.com/assets/files/5964eeea3216a448fff211e0117069fe.jpg",phone:"+93 65456546464",name_detail:"Standard", email_detail:"masangkayglessie@gmail.com",country_detail:"Philippines", people:"1",discover : "Google Search", location : "Paris", amount : 100},
        {id:"2",open_passport_data:"https://www.dubaiprivatetour.com/assets/files/f99e351b0140cfd1c0f17692d505e78b.pdf",open_flight_data:"https://www.dubaiprivatetour.com/assets/files/e7828fe7798dfb5a3bd44320aaa477ae.pdf",open_hotel_data:"https://www.dubaiprivatetour.com/assets/files/940f4a6ca115b54ec289918078d6e68c.jpg",phone:"+63 09277853745",name_detail:"Standard", email_detail:"masangkayglessie@gmail.com",country_detail:"Philippines",details:"Peter Winter link ",people:"1",discover : "Google Search",emirates : "DUBAI", location : "London", amount : 190},
        {id:"3",open_passport_data:"https://www.dubaiprivatetour.com/assets/files/0256bf23bda36a84da4c239660e1af5a.pdf",open_flight_data:"https://www.dubaiprivatetour.com/assets/files/258d1ed798bfbc8b231f34e1d0ec02db.pdf",open_hotel_data:"https://www.dubaiprivatetour.com/assets/files/0bebed33cf9264cc1689f9621bde7d05.pdf",phone:"+1 5103056755",name_detail:"Standard", email_detail:"masangkayglessie@gmail.com",country_detail:"Philippines",details:"excelle flores link",people:"2",discover : "Google Search",emirates: "DUBAI", location : "Canada", amount : 112},

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