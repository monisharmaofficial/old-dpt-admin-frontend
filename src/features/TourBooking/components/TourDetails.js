import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from "../../common/headerSlice";
import { getTourBookingContent } from "../tourBookingSlice";
import addNewTour from "../tourBookingSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import CKEditor from "../../../components/Input/CkEditor";
import CkEditorMail from '../../../components/Input/CkEditorMail';
import UserIcon from '@heroicons/react/24/outline/UserIcon.js';
import { useSelector } from "react-redux";
import PrintingOption from '../../../components/Input/PrintingOption';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const INITIAL_LEAD_OBJ_TOUR = {
    tour_name: "",
    image: "",
    email: ""
};

const hotelDetails = {
    Name: 'Grand Hyatt',
    Address: 'Riyadh Street, Sheikh Rashid Road Dubai',
    Phone: '+971 4 317 1234'
};

function AddTourModalBody({ closeModal, lead }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ_TOUR);
    const { leads } = useSelector(state => state.tourBooking);
    console.log(leads)
  

    const saveNewLead = () => {
        if (leadObj.tour_name.trim() === "") return setErrorMessage("Tour Name is required!");
        else if (leadObj.image.trim() === "") return setErrorMessage("Image is required!");
        else {
            let newLeadObj = {
                "id": 7,
                "email": leadObj.email,
                "tour_name": leadObj.tour_name,
                "image": leadObj.image,
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            };
            dispatch(addNewTour({ newLeadObj }));
            dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
            closeModal();
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLeadObj({ ...leadObj, [updateType]: value });
    };
    const url = window.location.href;
    const spliturl = url.split("=");
    const id = parseInt(spliturl[1]); // Convert the string id to a number

    console.log(id)

    useEffect(() => {
        dispatch(getTourBookingContent());
    }, []);

    const data= leads.filter((item)=>item.id===id)
    console.log(data)
  
    return (
        <>
            {data.map((lead, index) => (
                <TitleCard key={index} title={`View booking details of ${lead.guest_name} ${lead.status}`} topMargin="mt-2" >

                    <div key={index} className="flex">
                        <div className="dataLhs">
                            <div className="datacard" title="Personal Details" topmargin="mt-2">
                                <div className="iconwithname">
                                    <span className="usericon">
                                        <UserIcon />
                                    </span>
                                    <span className="personldetail">Personal Details</span>
                                </div>
                                <div className="datain">
                                    <span>Name :</span> <span>{lead.guest_name}</span>
                                </div>
                                <div className="datain">
                                    <span>Email :</span> <span>{lead.email}</span>
                                </div>
                                <div className="datain">
                                    <span>Nationality :</span> <span>{lead.nationality}</span>
                                </div>
                                <div className="datain">
                                    <span>Phone :</span>{" "}
                                    <span>{lead.phone}</span>
                                </div>
                                <div className="datain">
                                    <span>Requests :</span>{" "}
                                    <span>
                                        {lead.request}
                                    </span>
                                </div>
                            </div>

                            <div className="datacard" title="Tour/Booking Details" topmargin="mt-2">
                                <div className="iconwithname">
                                    <span className="usericon">
                                        <UserIcon />
                                    </span>
                                    <span className="personldetail"> Tour/Booking Details</span>
                                </div>
                                <div className="datain">
                                    <span>Tour Date :</span> <span>{lead.tour_date}</span>
                                </div>
                                <div className="datain">
                                    <span>Preferred Pickup Time :</span> <span>{lead.pickup_time}</span>
                                </div>
                                <div className="datain">
                                    <span>Pickup Location :</span> <span>{lead.pickup_location}</span>
                                </div>
                                <div className="datain">
                                    <div className="datainIn">
                                        <span>Hotel Details:</span>
                                        <span>
                                            <small>Name:</small> <span className="name">{lead.hotel_name},</span>
                                            <small>Address:</small>{" "}
                                            <span className="name">{lead.hotel_location},</span>
                                            <small>Phone:</small> <span className="name">{lead.hotel_phone}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="datain">
                                    <span>Drop Location :</span>
                                    <span>Hotel/Apartment</span>
                                </div>
                                <div className="datain">
                                    <div className="datainIn">
                                        <span>Hotel Details:</span>
                                        <span>
                                            <small>Name:</small> <span> {hotelDetails.Name},</span>
                                            <small> Address:</small> <span> {hotelDetails.Address},</span>
                                            <small> Phone: </small> <span>{hotelDetails.Phone}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="datain">
                                    <span>Pref.currency:</span> <span>{lead.pref_currency}</span>
                                </div>
                                <div className="datain">
                                    <span>Payment Mode:</span> <span>{lead.payment_mode}</span>
                                </div>
                                <div className="datain">
                                    <span>Number of Person:</span>{" "}
                                    <span>
                                        <small>Adults: </small>{lead.adult_person}, <small>Children: </small>{lead.children_person},{" "}
                                        <small>Infant:</small> {lead.infant_person}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="datarhs">
                            <TextAreaInput type="text" defaultValue={leadObj.intro} placeholder="Mail Subject" containerStyle="mt-4" labelTitle="Mail Subject" updateFormValue={updateFormValue} />

                            <label className="label font-semibold">
                                <span className={"label-text text-base-content"}>Email content to the user</span>
                            </label>
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                editorStyle={{ border: "1px solid #e5e7eb", height: '280px' }}
                                mention={{
                                    separator: ' ',
                                    trigger: '@',
                                    suggestions: [
                                        { text: 'APPLE', value: 'apple', url: 'apple' },
                                        { text: 'BANANA', value: 'banana', url: 'banana' },
                                        { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                                        { text: 'DURIAN', value: 'durian', url: 'durian' },
                                        { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                                        { text: 'FIG', value: 'fig', url: 'fig' },
                                        { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                                        { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                                    ],
                                }}
                            />

                            <div className="flex space-x-14">
                                <InputText type="text" defaultValue={leadObj.tour_price_AED} placeholder="Price in AED (This is for tracking purpose)" updateType="tour_price_AED" containerStyle="mt-4" labelTitle="Price in AED (This is for tracking purpose)" updateFormValue={updateFormValue} />
                            </div>

                            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

                            <div className="modal-action">
                                <PrintingOption />
                                <Link to="/app/tours" className="btn btn-ghost">Cancel Booking</Link>
                                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Confirm Booking</button>
                            </div>
                        </div>
                    </div>
                </TitleCard>
            ))}
        </>
    );
}

export default AddTourModalBody;