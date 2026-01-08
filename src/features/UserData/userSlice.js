
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

export const getAgentsContent = createAsyncThunk(
    "agents/content",
    async () => {
      try {
        const ACCESS_TOKEN = localStorage.getItem("token");
  
        const response = await axios.get(`${API_URL}/list-agents`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        return response.data.data;
      } catch (error) {
        throw error;
      }
    }
  );
  export const deleteOurAgents = createAsyncThunk(
    "agents/delete",
    async (id = 1) => {
      try {
        await axios.delete(`${API_URL}/delete-agents/${id}`);
  
        return id;
      } catch (error) {
        throw error;
      }
    }
  );


  export const updateAgentsName = createAsyncThunk(
    "agents/update",
    async ({ id, newName ,newEmail,newState,newCity,newCountry,newAddress,newZip,newPhoneno,newPassword}) => {
      try {
        console.log(id, newName ,newEmail,newState,newCity,newCountry,newAddress,newZip,newPhoneno,newPassword)
        const ACCESS_TOKEN = localStorage.getItem("token");
        const response = await axios.put(
          `${API_URL}/update-agents/${id}`,
          { first_name: newName, email: newEmail, state: newState , city: newCity , country: newCountry ,address: newAddress ,zip: newZip,phoneno: newPhoneno,password: newPassword },
       
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
  
        return response.data.data;
      } catch (error) {
        throw error;
      }
    }
  );
  export const addNewAgents = createAsyncThunk(
    "agents/addNew",
    async (newAgentsData) => {
      try {
        const ACCESS_TOKEN = localStorage.getItem("token");

        const response = await axios.post(
          `${API_URL}/add-agents`,
          newAgentsData,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
  
        return response.data.data; 
      } catch (error) {
        throw error;
      }
    }
  );
	
 const initialState={
    isLoading: false,
    leads: [],
    agentsId: null, 
    agentsName: "",
    agentsStatus:"",
    agentsLastName:"",
    agentsZip:"",
    agentsCountry:"",
    agentsState:"",
    agentsCity:"",
    agentsAddress:"",
    agentsPhoneno:"",
    agentsEmail:"",
    agentsPassword:"",
    error: null,
}
export const agentsSlice = createSlice({
    name: 'agents',
    initialState:initialState,
    reducers:  {
        // Define your reducers here if needed
        setAgentsData: (state, action) => {
          state.agentsId = action.payload.id;
          state.agentsName = action.payload.first_name;
          state.agentsStatus = action.payload.status;
          state.agentsZip = action.payload.zip;
          state.agentsCountry = action.payload.country;
          state.agentsState = action.payload.state;
          state.agentsCity = action.payload.city;
          state.agentsAddress= action.payload.address;
          state.agentsPhoneno = action.payload.phoneno;
          state.agentsEmail = action.payload.email;
          state.agentsPassword= action.payload.password;
        },
      },

      extraReducers: (builder) => {
        builder
          .addCase(getAgentsContent.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getAgentsContent.fulfilled, (state, action) => {
            state.leads = action.payload;
            state.isLoading = false;
            state.error = null;
          })
          .addCase(getAgentsContent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(deleteOurAgents.fulfilled, (state, action) => {
            const deletedAgentsId = action.payload;
            state.leads = state.leads.filter(
              (agents) => agents.id !== deletedAgentsId
            );
            state.isLoading = false;
            state.error = null;
          })
          .addCase(deleteOurAgents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(updateAgentsName.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(updateAgentsName.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
          })
          .addCase(updateAgentsName.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            console.error("Error updating agent name:", action.error);
          })
          .addCase(addNewAgents.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(addNewAgents.fulfilled, (state, action) => {
            state.leads.push(action.payload);
            state.isLoading = false;
            state.error = null;
          })
          .addCase(addNewAgents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
              ? action.error.message
              : "Failed to add a new agent";
          });
      },
    });
    
export const { deleteLead, setAgentsData } = agentsSlice.actions;
export default agentsSlice.reducer;