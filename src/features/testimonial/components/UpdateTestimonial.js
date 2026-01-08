import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText';
import Select from "react-select";
import { updateTestimonialName } from "../testimonialSlice";
import { showNotification } from "../../common/headerSlice"
import { getTestimonialContent } from "../testimonialSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TitleCard from "../../../components/Cards/TitleCard"
import { split } from "postcss/lib/list";

const INITIAL_TESTIMONIAL_OBJ = {
  name: "",
  country: "",
  description: "",
  rating: "",
}

function UpdateTestimonialModalBody() {


  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [testimonialData, settestimonialData] = useState(INITIAL_TESTIMONIAL_OBJ)
  const navigate = useNavigate()
  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText("");
    return EditorState.createWithContent(contentState);
  });



  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const ourName = spliturl[2];
  const decodeOurName = decodeURIComponent(ourName)
  const ourDescription = spliturl[3];
  const decodeOurDescription = decodeURIComponent(ourDescription)
  const country = spliturl[4];
  const decodeCountry = decodeURIComponent(country)
  const ourRating = spliturl[5];
  const decodeRating = decodeURIComponent(ourRating)
  console.log(country)

  const updateEditorContent = (newContent) => {
    const newContentState = ContentState.createFromText(newContent);
    const newEditorState = EditorState.createWithContent(newContentState);
    setEditorState(newEditorState);
  };


  const { testimonialId, testimonialName, testimonialDescription, testimonialRating } = useSelector((state) => state.testimonial);
  useEffect(() => {
    const rawContent = JSON.parse(decodeOurDescription);
    const contentState = convertFromRaw(rawContent);
    const editorStateFromDescription = EditorState.createWithContent(contentState);
    setEditorState(editorStateFromDescription);
  }, [setEditorState]);
  const dispatch = useDispatch()
  const [testimonial, setTestimonial] = useState(testimonialName);
  const [editId, setEditId] = useState(testimonialId);
  const [description, setDescription] = useState(testimonialDescription);


  useEffect(() => {
    dispatch(getTestimonialContent());
  }, [dispatch]);

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

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("")
    settestimonialData({ ...testimonialData, [updateType]: value })
  }
  const updateTestimonialInAPI = () => {
    const testimonialName = testimonialData.name || decodeOurName;
    const testimonialCountry = testimonialData.country || decodeCountry;
    // if (!name) {
    //   setErrorMessage("Please enter a category name");
    //   return;
    // }

    // Get the editor's content as JSON
    const contentState = editorState.getCurrentContent();
    const description = JSON.stringify(convertToRaw(contentState));

    if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
      setErrorMessage("Please enter a description");
      return;
    }

    setLoading(true);
    const ratingIds = selectedRating.value;

    dispatch(
      updateTestimonialName({
        id: id,
        newName: testimonialName,
        newDescription: description,
        newCountry: testimonialCountry,
        newRating: ratingIds
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "Testimonial Updated Successfully!", status: 1 }));
        setLoading(false);

        // Update the defaultEditorContent with the current editor content
        navigate("/app/testimonial");
      })
      .catch((error) => {
        console.error("Error updating testimonial:", error);
        setErrorMessage("Error updating testimonial. Please try again.");
        setLoading(false);
      });
  };
  const handleUpdateClick = () => {
    // Call the function to update the editor content
    updateEditorContent("New content for the editor");
  };
  const closeModal =()=>{
    navigate('/app/testimonial')
  }
  return (
    <>
      <TitleCard title="Update Testimonial" topMargin="mt-2">
        <InputText type="text" defaultValue={decodeOurName} placeholder="Name" updateType="name" isRequired={true} containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

        <InputText type="text"
          defaultValue={decodeCountry}
          placeholder="Country" containerStyle="mt-4"
          updateType="country"
          labelTitle="Country" updateFormValue={updateFormValue}
          isRequired={true}
        />
        <div className="w-full mt-4">
          <label className="label w-full">
            <span className={"label-text text-base-content "}>
              Rating <span style={{ color: "red" }}>*</span>
            </span>
          </label>
          <Select
            options={rating}
            value={selectedRating}
            onChange={handleRatingChange}
            styles={{
              // Style for the container of the dropdown
              control: (provided) => ({
                ...provided,
                minHeight: "48px", // Adjust the height as needed
              }),
            }}
          />
        </div>


        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Description</span>
        </label>

        <Editor
          editorState={editorState}
          onEditorStateChange={(newEditorState) => {
            setEditorState(newEditorState);
          }}
          editorStyle={{ border: "1px solid #e5e7eb" }}
        />

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
          <button className="btn btn-primary px-6" onClick={() => updateTestimonialInAPI()}>Save</button>
        </div>
      </TitleCard>
    </>
  )
}

export default UpdateTestimonialModalBody;