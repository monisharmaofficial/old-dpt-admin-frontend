import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import Select from "react-select";
import { addNewTestimonial, getTestimonialContent } from "../testimonialSlice";
import { showNotification } from "../../common/headerSlice"
import addNewTour from "../testimonialSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextAreaInput from '../../../components/Input/TextAreaInput'
import { useNavigate } from "react-router-dom";

const INITIAL_TESTIMONIAL_OBJ = {
    name: "",
    country: "",
    rating: "",
    description: "",
}

function AddTourModalBody() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [testimonialData, setTestimonialData] = useState(INITIAL_TESTIMONIAL_OBJ)
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const rating = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];
    const [selectedRating, setSelectedRating] = useState([]);
    const handleRatingChange = (selected) => {
        setSelectedRating(selected);
    };
    




    const uploadImageToPublicFolder = () => {
        const { name, country } = testimonialData;
    
        if (!name) {
            setErrorMessage("Please enter a testimonial name");
            return;
        }
    
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const description = JSON.stringify(rawContentState);
    
        if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
            setErrorMessage("Please enter a description");
            return;
        }
    
        const ratingIds = selectedRating.value;
    
        setLoading(true);
    
        dispatch(
            addNewTestimonial({
                name: name,
                description: description,
                country: country,
                rating: ratingIds,
            })
        )
            .then(() => {
                dispatch(showNotification({ message: "New Testimonial Added!", status: 1 }));
                setLoading(false);
                navigate("/app/testimonial");
            })
            .catch((error) => {
                console.error("Error adding testimonial:", error);
                setErrorMessage("Error adding testimonial. Please try again.");
                setLoading(false);
            });
    };
    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setTestimonialData({ ...testimonialData, [updateType]: value })
    }
   
    return (
        <>
            <TitleCard title="Add Testimonial" topMargin="mt-2" >

                <InputText type="text"
                    defaultValue={testimonialData.name}
                    placeholder="Name" containerStyle="mt-4"
                    updateType="name"
                    labelTitle="Name" updateFormValue={updateFormValue}
                    isRequired={true}
                />
                <InputText type="text"
                    defaultValue={testimonialData.country}
                    placeholder="Country" containerStyle="mt-4"
                    updateType="country"
                    labelTitle="Country" updateFormValue={updateFormValue}
                    isRequired={true}
                />

                <div className="w-full mt-4">
                    <label className="label w-full">
                        <span className={"label-text text-base-content "}>
                            Rating
                        </span>
                    </label>
                    <Select
                        isMulti={false}
                        options={rating}
                        value={selectedRating}
                        onChange={handleRatingChange}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: "48px",
                            }),
                        }}
                    />

                </div>

                <label className="label font-semibold">
                    <span className={"label-text text-base-content"}>Description</span>
                </label>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
                    editorStyle={{ border: "1px solid #e5e7eb" }}

                />

                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                <div className="modal-action">
                    <Link to="/app/testimonial" className="btn btn-ghost" >Cancel</Link>
                    <button className="btn btn-primary px-6" onClick={() => uploadImageToPublicFolder()}>Save</button>
                </div>
            </TitleCard>
        </>
    )
}

export default AddTourModalBody

