
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText';
import { updateReviewsName, getReviewsContent } from "../reviewSlice";
import { showNotification } from "../../common/headerSlice"
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import addNewLead from "../reviewSlice"
import TitleCard from "../../../components/Cards/TitleCard"
function ReviewDetails({ closeModal }) {
    const dispatch = useDispatch();
    const { leads } = useSelector(state => state.reviews);

    // Use useSelector to access the reviews state
    const { reviewsId, reviewsName, reviewsEmail, reviewsCountry, reviewsRating, reviewsComments } = useSelector((state) => state.reviews);
    const url = window.location.href;
    const spliturl = url.split("=");
    
    useEffect(() => {
        dispatch(getReviewsContent());
    }, []);
    
    const id = parseInt(spliturl[1], 10);
const data = leads.filter((item) => item.id === id);


    return (
        <>

            {data.map((lead, index) => (
                <TitleCard key={index} title={`View booking details`} topMargin="mt-2" >
                    <label className="label font-semibold">
                        <span className={"label-text text-base-content"}>Name</span>
                    </label>
                    {lead.name}

                    <label className="label font-semibold">
                        <span className={"label-text text-base-content"}>Email</span>
                    </label>
                    {lead.email}
                    <label className="label font-semibold">
                        <span className={"label-text text-base-content"}>Country</span>
                    </label>
                    {lead.country}

                    <label className="label font-semibold">
                        <span className={"label-text text-base-content"}>Comment</span>
                    </label>
                    {lead.comments}
                </TitleCard>
            ))}
        </>
    );
}
export default ReviewDetails;
