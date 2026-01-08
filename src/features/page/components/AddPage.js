import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import addNewTour from "../pageSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextAreaInput from '../../../components/Input/TextAreaInput'

const INITIAL_LEAD_OBJ_TOUR = {
    page_name: "",
    image: "",
    email: ""
}

function AddTourModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ_TOUR)


    const saveNewLead = () => {
        if (leadObj.page_name.trim() === "") return setErrorMessage("Page Name is required!")
        else if (leadObj.image.trim() === "") return setErrorMessage("Image is required!")
        else {
            let newLeadObj = {
                "id": 7,
                "email": leadObj.email,
                "page_name": leadObj.page_name,
                "image": leadObj.image,
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            }
            dispatch(addNewTour({ newLeadObj }))
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
            <TitleCard title="Add Page" topMargin="mt-2" >

                <InputText type="text" defaultValue={leadObj.page_name} placeholder="Page Name" containerStyle="mt-4" labelTitle="Page Name" updateFormValue={updateFormValue} />

                <label className="label font-semibold">
                    <span className={"label-text text-base-content"}>Page Details</span>
                </label>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{ border: "1px solid #e5e7eb", height: '280px' }}
                />
                <label className="label font-semibold">
                    <span className={"label-text text-base-content"}>Image</span>
                </label>
                <input type="file" defaultValue={leadObj.image} />


                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                <div className="modal-action">
                    <Link to="/app/page" className="btn btn-ghost" >Cancel</Link>
                    <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
                </div>
            </TitleCard>
        </>
    )
}

export default AddTourModalBody

