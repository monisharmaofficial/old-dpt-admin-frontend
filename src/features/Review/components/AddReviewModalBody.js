import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { addNewReviews, getReviewsContent } from "../reviewSlice";
import { showNotification } from "../../common/headerSlice"
import addNewLead from "../reviewSlice"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TitleCard from "../../../components/Cards/TitleCard"
import { useNavigate } from "react-router-dom";

const INITIAL_REVIEW_OBJ = {
    name: "",
    email: "",
    country: "",
    rating: "",
    comments:""
}

function AddLeadModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [reviewsData, setReviewsData] = useState(INITIAL_REVIEW_OBJ);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getReviewsContent());
      }, [dispatch]);
    
      const { leads } = useSelector((state) => state.reviews);

      const uploadImageToPublicFolder = () => {
        const { name,email ,country,rating,comments } = reviewsData;
    
        if (!name) {
          setErrorMessage("Please enter a category name");
          return;
        }
    
        setLoading(true);
        dispatch(
          addNewReviews({
            name: name,
            email: email,
            country:country,
            rating:rating,
            comments:comments
          })
        )
          .then(() => {
            dispatch(showNotification({ message: "New Category Added!", status: 1 }));
            setLoading(false);
    
            // Use the navigate function to navigate to the desired URL
            navigate("/app/review");
          })
          .catch((error) => {
            // Handle any errors here
            console.error("Error adding category:", error);
            setErrorMessage("Error adding category. Please try again.");
            setLoading(false);
          });
      };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setReviewsData({ ...reviewsData, [updateType]: value })
    }

    return (
        <>
            <TitleCard title="Add Review" topMargin="mt-2">
                <InputText type="text" defaultValue={reviewsData.name} placeholder="Name" updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                <InputText type="email" defaultValue={reviewsData.email} placeholder="Email Id" updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                <InputText type="country" defaultValue={reviewsData.country} placeholder="Country" updateType="country" containerStyle="mt-4" labelTitle="Country" updateFormValue={updateFormValue} />

                <InputText type="text" defaultValue={reviewsData.rating} placeholder="Rating" updateType="rating" containerStyle="mt-4" labelTitle="Rating" updateFormValue={updateFormValue} />

                <InputText type="text" defaultValue={reviewsData.comments} placeholder="Comments" updateType="comments" containerStyle="mt-4" labelTitle="Comments" updateFormValue={updateFormValue} />

                <label className="label font-semibold">
                    <span className={"label-text text-base-content"}>Comment</span>
                </label>

                <Editor
                    editorStyle={{ border: "1px solid #e5e7eb", height: '350px' }}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    mention={{
                    }}
                />
                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                    <button className="btn btn-primary px-6" onClick={() => uploadImageToPublicFolder()}>Save</button>
                </div>
            </TitleCard>
        </>
    )
}

export default AddLeadModalBody