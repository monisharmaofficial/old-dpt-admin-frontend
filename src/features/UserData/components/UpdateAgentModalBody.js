import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { updateAgentsName } from "../userSlice";
import TitleCard from "../../../components/Cards/TitleCard"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const INITIAL_AGENTS_OBJ = {
    first_name : "",
    country : "",
    state : "",
    city : "",
    zip : "",
    address : "",
    phoneno : "",
    email : "",
    password:"",

}
function UpdateCategoryModalBody({ closeModal }) {
    const { agentsId, agentsName, agentsZip, agentsCountry, agentsState,agentsCity,agentsAddress,agentsPhoneno,agentsEmail,agentsPassword} = useSelector((state) => state.agents);
    useEffect(() => {
        setagen(agentsName);
        setEditId(agentsId);
        setZip(agentsZip);
        setCountry(agentsCountry);
        setState(agentsState);
        setCity(agentsCity);
        setAddress(agentsAddress);
        setPhoneno(agentsPhoneno);
        setEmail(agentsEmail);

      }, [agentsName, agentsId , agentsZip, agentsCountry, agentsState,agentsCity,agentsAddress,agentsPhoneno,agentsEmail]);
      const [agen, setagen] = useState(agentsName);
      const [editId, setEditId] = useState(agentsId);
      const [zip, setZip] = useState(agentsZip);
      const [country, setCountry] = useState(agentsCountry);
      const [state, setState] = useState(agentsState);
      const [city, setCity] = useState(agentsCity);
      const [address, setAddress] = useState(agentsAddress);
      const [phoneno, setPhoneno] = useState(agentsPhoneno);
      const [email, setEmail] = useState(agentsEmail);
      const navigate = useNavigate()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [agentsData, setAgentsData] = useState(INITIAL_AGENTS_OBJ);

    const url = window.location.href;
    const spliturl = url.split("=");
    const id = spliturl[1];
    const first_name=spliturl[2];
    const decodeName=decodeURIComponent(first_name);
    const ouremail=spliturl[3];
    const decodeOurEmail=decodeURIComponent(ouremail);
    const ourPhoneno=spliturl[4];
  const decodePhoneno=decodeURIComponent(ourPhoneno)
    const ourCountry=spliturl[5];
    const decodeourCountry=decodeURIComponent(ourCountry)
  
    const ourState=spliturl[6];
    const decodeState=decodeURIComponent(ourState);
    const ourCity=spliturl[7];
    const decodeCity=decodeURIComponent(ourCity);
    const ourZip=spliturl[8];
  const decodeZip=decodeURIComponent(ourZip)
    const ourAddress=spliturl[9];
    const decodeourAddress=decodeURIComponent(ourAddress)


    const updateAgentsNameInAPI = () => {
        if (
          !agentsData.first_name ||
          agentsData.first_name.trim() === ""
        ) {
          return setErrorMessage("Agent Name is required!");
        } 
        if (
          !agentsData.email ||
          agentsData.email.trim() === ""
        ) {
          return setErrorMessage("Agent Email is required!");
        }
        if (
          !agentsData.phoneno ||
          agentsData.phoneno.trim() === ""
        ) {
          return setErrorMessage("Agent Phone no is required!");
        }
        if (
          !agentsData.country ||
          agentsData.country.trim() === ""
        ) {
          return setErrorMessage("Country Name is required!");
        }
        if (
          !agentsData.state ||
          agentsData.state.trim() === ""
        ) {
          return setErrorMessage("State Name is required!");
        }
        if (
          !agentsData.city ||
          agentsData.city.trim() === ""
        ) {
          return setErrorMessage("City Name is required!");
        }
        if (
          !agentsData.zip ||
          agentsData.zip.trim() === ""
        ) {
          return setErrorMessage("Zip is required!");
        }
        if (
          !agentsData.address ||
          agentsData.address.trim() === ""
        ) {
          return setErrorMessage("Agent Address is required!");
        }else {
          dispatch(
            updateAgentsName({ id: id, newName: agentsData.first_name,newEmail:agentsData.email,newState:agentsData.state,newCity:agentsData.city,newCountry:agentsData.country,newAddress:agentsData.address,newZip:agentsData.zip,newPhoneno:agentsData.phoneno,newPassword:agentsData.password})
          )
            .then(() => {
              dispatch(
                showNotification({
                  message: "Agent Updated Successfully!",
                  status: 1,
                })
              );
              navigate("/app/agents");
             
            })
            .catch((error) => {
              setErrorMessage("Failed to update Agent name.");
              console.error("Error updating Agent name:", error);
            });
        }
      };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setAgentsData({ ...agentsData, [updateType]: value })
    }
    
    
 

    return (
        <>
        <TitleCard title="Update Agents" topMargin="mt-2" >
        <InputText type="text" defaultValue={decodeName} placeholder="Agent Name" updateType="first_name" containerStyle="mt-4" labelTitle="Agent Name" isRequired={true} updateFormValue={updateFormValue}/>

        <InputText type="email" defaultValue={decodeOurEmail} placeholder="Agent Email" updateType="email" containerStyle="mt-4" labelTitle="Email Id" isRequired={true} updateFormValue={updateFormValue}/>

        <InputText type="email" defaultValue={decodePhoneno} placeholder="Agent Phone" updateType="phoneno" containerStyle="mt-4" labelTitle="Phone Number" isRequired={true} updateFormValue={updateFormValue}/>

        <InputText type="text" defaultValue={decodeourCountry} placeholder="Country" updateType="country" containerStyle="mt-4" labelTitle="Country" updateFormValue={updateFormValue}/>

        <InputText type="text" defaultValue={decodeState} placeholder="State" updateType="state" containerStyle="mt-4" labelTitle="State" updateFormValue={updateFormValue}/>

        <InputText type="text" defaultValue={decodeCity} placeholder="City" updateType="city" containerStyle="mt-4" labelTitle="City" updateFormValue={updateFormValue}/>

        <InputText type="text" defaultValue={decodeZip} placeholder="Zip" updateType="zip" containerStyle="mt-4" labelTitle="Zip" updateFormValue={updateFormValue}/>

        <InputText type="text" defaultValue={decodeourAddress} placeholder="Address" updateType="address" containerStyle="mt-4" labelTitle="Address" updateFormValue={updateFormValue}/>

        <InputText type="text" defaultValue={agentsPassword} placeholder="Password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
            <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
            <button  className="btn btn-primary px-6" onClick={() => updateAgentsNameInAPI()}>Save</button>
        </div>
        </TitleCard>
        </>
    )
}

export default UpdateCategoryModalBody