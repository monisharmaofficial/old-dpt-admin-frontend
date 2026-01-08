import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import Select from "react-select";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewHotel, getHotelContent } from "../hotelSlice";

import TextAreaInput from "../../../components/Input/TextAreaInput";
import SelectCheckbox from "../../../components/Input/hotelCheckBox";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import { setLocationData } from "../../location/locationSlice";
import { getLocationContent } from "../../location/locationSlice";

const INITIAL_HOTEL_OBJ = {
  hotel_name: "",
  location_id: "",
  adults_price_usd:"",
  adults_price_aed:"",
  children_price_usd:"",
  children_price_aed:"",
  infants_price_usd:"",
  infants_price_aed:"",
  driver_price_usd:"",
  driver_price_aed:""
};

function AddHotelModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hotelData, setHotelData] = useState(INITIAL_HOTEL_OBJ);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHotelContent());
  }, [dispatch]);
  const { locations } = useSelector((state) => state.location);

  const [selectedLocation, setSelectedLocation] = useState([]);

  const mapLocationNamesToIds = () => {
    const selectedLocationIds = selectedLocation.map(
      (location) =>
        locations.find((loc) => loc.location_name === location.label).id
    );
    return selectedLocationIds;
  };

  const uploadImageToPublicFolder = () => {
    const { hotel_name,adults_price_usd ,adults_price_aed,children_price_usd,children_price_aed,
      infants_price_usd,infants_price_aed,driver_price_usd,driver_price_aed} = hotelData;

    if (!hotel_name) {
      setErrorMessage("Please enter a hotel name");
      return;
    }

    setLoading(true);

    const locationIds = mapLocationNamesToIds();

    dispatch(
      addNewHotel({
        hotel_name: hotel_name,
        location_id: locationIds,
        adults_price_usd:adults_price_usd,
        adults_price_aed:adults_price_aed,
        children_price_usd:children_price_usd,
        children_price_aed:children_price_aed,
        infants_price_usd:infants_price_usd,
        infants_price_aed:infants_price_aed,
        driver_price_usd:driver_price_usd,
        driver_price_aed:driver_price_aed // Pass the location IDs as an array
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New hotel Added!", status: 1 }));
        setLoading(false);

        // Use the navigate function to navigate to the desired URL
        navigate("/app/hotel");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding hotel:", error);
        setErrorMessage("Error adding hotel. Please try again.");
        setLoading(false);
      });
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setHotelData({ ...hotelData, [updateType]: value });
  };
  const handleLocationChange = (selected) => {
    setSelectedLocation(selected);
  };
  useEffect(() => {
    dispatch(getLocationContent());
  }, [locations.id]);
  const closeModal = () => {
    navigate('/app/hotel')
  }

  return (
    <>
      <TitleCard title="Add hotel" topMargin="mt-2">
        <div className="w-full mt-4">
          <label className="label w-full">
            <span className={"label-text text-base-content "}>
              Location Name
            </span>
          </label>
          <Select
            isMulti
            options={
              locations
                ? locations.map((location) => ({
                  value: location.id,
                  label: location.location_name,
                }))
                : []
            }
            value={selectedLocation}
            onChange={handleLocationChange}
            styles={{
              // Style for the container of the dropdown
              control: (provided) => ({
                ...provided,
                minHeight: "48px", // Adjust the height as needed
              }),
            }}
          />
        </div>

        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Hotel Name"
          updateType="hotel_name"
          containerStyle="mt-4"
          labelTitle="Hotel Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Adult Price"
          updateType="adults_price_usd"
          containerStyle="mt-4"
          labelTitle="Adult Price(USD)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Adult Price"
          updateType="adults_price_aed"
          containerStyle="mt-4"
          labelTitle="Adult Price(AED)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Child Price"
          updateType="children_price_usd"
          containerStyle="mt-4"
          labelTitle="Child Price(USD)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Child Price"
          updateType="children_price_aed"
          containerStyle="mt-4"
          labelTitle="Child Price(AED)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Infants Price"
          updateType="infants_price_usd"
          containerStyle="mt-4"
          labelTitle="Infants Price(USD)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Infants Price"
          updateType="infants_price_aed"
          containerStyle="mt-4"
          labelTitle="Infants Price(AED)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Driver Price"
          updateType="driver_price_usd"
          containerStyle="mt-4"
          labelTitle="Driver Price(USD)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <InputText
          type="text"
          defaultValue={hotelData.hotel_name}
          placeholder="Driver Price"
          updateType="driver_price_aed"
          containerStyle="mt-4"
          labelTitle="Driver Price(AED)"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        {errorMessage && (
          <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        )}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={() => uploadImageToPublicFolder()}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default AddHotelModalBody;