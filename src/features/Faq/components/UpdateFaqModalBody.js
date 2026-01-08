import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useLocation } from "react-router-dom";
import { updateFaqName } from "../faqSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { useSelector } from "react-redux";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const INITIAL_FAQ_OBJ = {
    name: "",
    description:""
};

function UpdateFaqModalBody() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const { faqName, description } = useSelector((state) => state.faq);
    useEffect(() => {
        setCatg(faqName);
        setParentId(description);
       
    }, [faqName, description]);
    const dispatch = useDispatch();
    const [catg, setCatg] = useState(faqName);
    const [parentId, setParentId] = useState(description);
    const url = window.location.href;
    const spliturl = url.split("=");
    const id = spliturl[1];
    const name = spliturl[2];
    const decodeName = decodeURIComponent(name)
    const ourDescription = spliturl[3];
    const decodeDescription = decodeURIComponent(ourDescription)
    


    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [faqData, setFaqData] = useState(INITIAL_FAQ_OBJ);
    const { leads } = useSelector((state) => state.faq);
    const location = useLocation();



    const navigate = useNavigate(); // Initialize useNavigate

    const closeModal =()=>{
        navigate('/app/faq')
      }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setFaqData({ ...faqData, [updateType]: value });
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const saveFileToLocal = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = event.target.result;
            localStorage.setItem("savedFile", fileData);
        };
        reader.readAsDataURL(file);
    };

    const updateFaqNameInAPI = () => {
        const Name = faqData.name || decodeName;
        const description = faqData.description || decodeDescription;
        // if (!faqData.faq_name || faqData.faq_name.trim() === "") {
        //     return setErrorMessage("Country Name is required!");
        // }
        // if (!faqData.faq_description|| faqData.faq_description.trim() === "") {
        //     return setErrorMessage("Description is required!");
        // } else {
            // Dispatch the action
            dispatch(updateFaqName({
                id: id, newName: Name, newDescription: description,
            }))
                .then(() => {
                    dispatch(
                        showNotification({
                            message: "faq Updated Successfully!",
                            status: 1,
                        })
                    );
                    // Navigate to the desired route after successful update
                    navigate("/app/faq");
                })
                .catch((error) => {
                    setErrorMessage("Failed to update faq ");
                    console.error("Error updating faq", error);
                });
        
    };

    return (
        <>
            <TitleCard title="Update Faq" topMargin="mt-2">
                <InputText
                    type="text"
                    defaultValue={decodeName}
                    placeholder="Question"
                    updateType="name"
                    containerStyle="mt-4"
                    labelTitle="Question"
                    updateFormValue={updateFormValue}
                    isRequired={true}
                />

                <InputText
                    type="text"
                    defaultValue={decodeDescription}
                    placeholder="Answer"
                    updateType="description"
                    containerStyle="mt-4"
                    labelTitle="Answer"
                    updateFormValue={updateFormValue}
                    isRequired={true}
                />

                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={() => closeModal()}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary px-6"
                        onClick={updateFaqNameInAPI}
                    >
                        Save
                    </button>
                </div>
            </TitleCard>
        </>
    );
}

export default UpdateFaqModalBody;
