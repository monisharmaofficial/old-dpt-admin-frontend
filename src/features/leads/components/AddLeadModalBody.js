import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import TitleCard from "../../../components/Cards/TitleCard"

const INITIAL_LEAD_OBJ = {
    first_name: "",
    last_name: "",
    email: ""
}

function AddLeadModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        if (leadObj.first_name.trim() === "") return setErrorMessage("First Name is required!")
        else if (leadObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newLeadObj = {
                "id": 7,
                "email": leadObj.email,
                "first_name": leadObj.first_name,
                "last_name": leadObj.last_name,
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            }
            dispatch(addNewLead({ newLeadObj }))
            dispatch(showNotification({ message: "New Lead Added!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLeadObj({ ...leadObj, [updateType]: value })
    }

    return (
        <>
        <TitleCard title="Add Leads" topMargin="mt-2" >
            <InputText type="email" defaultValue={leadObj.email}  placeholder="Email Id"  updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

            <InputText type="email" defaultValue={leadObj.assigned} placeholder="Assigned To"  updateType="assigned" containerStyle="mt-4" labelTitle="Assigned To" updateFormValue={updateFormValue} />

            <label className="label font-semibold">
                <span className={"label-text text-base-content"}>Image</span>
            </label>
            <input type="file" />


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
            </TitleCard  >
        </>
    )
}

export default AddLeadModalBody