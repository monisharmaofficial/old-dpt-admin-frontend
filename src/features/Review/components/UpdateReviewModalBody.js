// import { useState, useEffect  } from "react"
// import { useDispatch,useSelector } from "react-redux"
// import InputText from '../../../components/Input/InputText'
// import ErrorText from '../../../components/Typography/ErrorText';
// // import { updateReviewsName } from "../reviewSlice";
// import { showNotification } from "../../common/headerSlice"
// import { useLocation, useNavigate } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import addNewLead from "../reviewSlice"
// import TitleCard from "../../../components/Cards/TitleCard"

// const INITIAL_REVIEW_OBJ = {
//     name: "",
//     email: "",
//     country: "",
//     rating: "",
//     comments:""
// }

// function UpdateReviewModalBody({ closeModal }) {
//     const { reviewsId, reviewsName,reviewsEmail,reviewsCountry,reviewsRating,reviewsComments} = useSelector((state) => state.reviews);
//     useEffect(() => {
//         setReview(reviewsName);
//         setEditId(reviewsId);
//         setEmail(reviewsEmail);
//         setCountry(reviewsCountry);
//         setRating(reviewsRating);
//         setComments(reviewsComments);
//       }, [reviewsName, reviewsId , reviewsEmail,reviewsCountry,reviewsComments,reviewsRating]);
//     const dispatch = useDispatch()
//     const [review, setReview] = useState(reviewsName);
//     const [editId, setEditId] = useState(reviewsId);
//     const [email, setEmail] = useState(reviewsEmail);
//     const [country, setCountry] = useState(reviewsCountry);
//     const [rating, setRating] = useState(reviewsRating);
//     const [comments, setComments] = useState(reviewsComments);

//     const url = window.location.href;
//     const spliturl = url.split("=");
//     const id = spliturl[1];

//     const [loading, setLoading] = useState(false)
//     const [errorMessage, setErrorMessage] = useState("")
//     const [reviewsData, setreviewsData] = useState(INITIAL_REVIEW_OBJ)
//     const navigate = useNavigate()

    

//     const updateFormValue = ({ updateType, value }) => {
//         setErrorMessage("")
//         setreviewsData({ ...reviewsData, [updateType]: value })
//     }
//     const updateCategoryNameInAPI = () => {
//         if (!reviewsData.name || reviewsData.name.trim() === "") {
//           return setErrorMessage(" Name is required!");
//         } else {
//           // Dispatch the action
//           // dispatch(updateReviewsName({ id: id, newName: reviewsData.name,newEmail:reviewsData.email,newCountry:reviewsData.country,newRating:reviewsData.rating,newComments:reviewsData.comments }))
//             .then(() => {
//               dispatch(
//                 showNotification({
//                   message: "Review Updated Successfully!",
//                   status: 1,
//                 })
//               );
//               // Navigate to the desired route after successful update
//             navigate("/app/review");
//             })
//             .catch((error) => {
//               setErrorMessage("Failed to update category name.");
//               console.error("Error updating category name:", error);
//             });
//         }
//       };

//     return (
//         <>
//             <TitleCard title="Update Review" topMargin="mt-2">
//                 <InputText type="text" defaultValue={reviewsName} placeholder="Name" updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

//                 <InputText type="text" defaultValue={reviewsEmail} placeholder="Email Id" updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

//                 <InputText type="text" defaultValue={reviewsCountry} placeholder="Country" updateType="country" containerStyle="mt-4" labelTitle="Country" updateFormValue={updateFormValue} />

//                 <InputText type="text" defaultValue={reviewsRating} placeholder="Rating" updateType="rating" containerStyle="mt-4" labelTitle="Rating" updateFormValue={updateFormValue} />

//                 <InputText type="text" defaultValue={reviewsComments} placeholder="Comments" updateType="comments" containerStyle="mt-4" labelTitle="Comments" updateFormValue={updateFormValue} />

//                 <label className="label font-semibold">
//                     <span className={"label-text text-base-content"}>Description</span>
//                 </label>

//                 <Editor
//                     editorStyle={{ border: "1px solid #e5e7eb", height: '350px' }}
//                     wrapperClassName="demo-wrapper"
//                     editorClassName="demo-editor"
//                     mention={{
//                     }}
//                 />

//                 <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
//                 <div className="modal-action">
//                     <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
//                     <button className="btn btn-primary px-6" onClick={() => updateCategoryNameInAPI()}>Save</button>
//                 </div>
//             </TitleCard>
//         </>
//     )
// }

// export default UpdateReviewModalBody;