import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useLocation } from "react-router-dom";
import { updateHotelName } from "../hotelSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import Select from "react-select";
import { useSelector } from "react-redux";
import TextAreaInput from "../../../components/Input/TextAreaInput";

import { useNavigate } from "react-router-dom";
import SelectCheckbox from "../../../components/Input/hotelCheckBox";

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

function UpdateHotelModalBody() {
  const { hotelId, hotelName, hotelLocationId } = useSelector(
    (state) => state.hotel
  );
  useEffect(() => {
    setCatg(hotelName);
    setEditId(hotelId);
    setLocationId(hotelLocationId);
  }, [hotelName, hotelId, hotelLocationId]);
  const dispatch = useDispatch();
  const [catg, setCatg] = useState(hotelName);
  const [editId, setEditId] = useState(hotelId);
  const [locaId, setLocationId] = useState(hotelLocationId);
  const { locations } = useSelector((state) => state.location);

  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const hotel_name = spliturl[2];
  const decodeName = decodeURIComponent(hotel_name);
  const location_name = spliturl[3];
  const decodeLocationName = decodeURIComponent(location_name);
  const adultUsd = spliturl[4];
  const decodeAdultUsd = decodeURIComponent(adultUsd);
  const adultAed= spliturl[5];
  const decodeAdultAed = decodeURIComponent(adultAed);
  const childrenUsd = spliturl[6];
  const decodeChildrenUsd = decodeURIComponent(childrenUsd);
  const childrenAed = spliturl[7];
  const decodeChildrenAed = decodeURIComponent(childrenAed);
  const infantsUsd = spliturl[8];
  const decodeInfantsUsd = decodeURIComponent(infantsUsd);
  const infantsAed = spliturl[9];
  const decodeInfantsAed = decodeURIComponent(infantsAed);
  const driverUsd = spliturl[10];
  const decodeDriverUsd = decodeURIComponent(driverUsd);
  const driverAed = spliturl[11];
  const decodeDriverAed = decodeURIComponent(driverAed);


  // Split the decodeLocationName by commas and remove any leading or trailing spaces
  const locationNamesArray = decodeLocationName.split(',').map(location => location.trim());

  // Initialize selectedLocation with values from locationNamesArray
  const initialSelectedLocation = locationNamesArray.map(name => {
    return {
      value: name,
      label: name
    };
  });

  const [selectedLocation, setSelectedLocation] = useState(initialSelectedLocation);

  // Filter out the selected values from the locations array
  const availableLocations = locations.filter(location => {
    return !locationNamesArray.includes(location.location_name);
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [hotelData, setHotelData] = useState(INITIAL_HOTEL_OBJ);
  const { leads } = useSelector((state) => state.hotel);
  const location = useLocation();

  const mapLocationNamesToIds = () => {
    const selectedLocationIds = selectedLocation.map((location) => {
      const matchingLead = locations.find(
        (lead) => lead.location_name === location.label
      );
      if (matchingLead) {
        return matchingLead.id;
      } else {
        return null;
      }
    });
    return selectedLocationIds;
  };
  const navigate = useNavigate();

  const locationIds = mapLocationNamesToIds();

  const handleLocationChange = (selected) => {
    setSelectedLocation(selected);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setHotelData({ ...hotelData, [updateType]: value });
  };

  const updateHotelNameInAPI = () => {
    const hotelName = hotelData.hotel_name || decodeName;
    const hotelAdultPriceUsd = hotelData.adults_price_usd || decodeAdultUsd;
    const hotelAdultPriceAed = hotelData.adults_price_aed || decodeAdultAed;
    const hotelChildrenPriceUsd = hotelData.children_price_usd || decodeChildrenUsd;
    const hotelChildrenPriceAed = hotelData.children_price_aed || decodeChildrenAed;
    const hotelInfantsPriceUsd = hotelData.infants_price_usd || decodeInfantsUsd;
    const hotelInfantsPriceAed = hotelData.infants_price_aed || decodeInfantsAed;
    const hotelDriverPriceUsd = hotelData.driver_price_usd || decodeDriverUsd;
    const hotelDriverPriceAed = hotelData.driver_price_aed || decodeDriverAed;
    dispatch(
      updateHotelName({
        id: id,
        newName: hotelName,
        newLocationId: locationIds,
        newAdultPriceUsd:hotelAdultPriceUsd,
        newAdultPriceAed:hotelAdultPriceAed,
        newChildrenPriceUsd:hotelChildrenPriceUsd,
        newChildrenPriceAed:hotelChildrenPriceAed,
        newInfantsPriceUsd:hotelInfantsPriceUsd,
        newInfantsPriceAed:hotelInfantsPriceAed,
        newDriverPriceUsd:hotelDriverPriceUsd,
        newDriverPriceAed:hotelDriverPriceAed
      })
    )
      .then(() => {
        dispatch(
          showNotification({
            message: "Hotel Updated Successfully!",
            status: 1,
          })
        );
        navigate("/app/hotel");
      })
      .catch((error) => {
        setErrorMessage("Failed to update hotel name.");
        console.error("Error updating hotel name:", error);
      });
  };
  useEffect(() => {
    dispatch(getLocationContent());
  }, [location.id]);
  const closeModal = () => {
    navigate('/app/hotel')
  }

  return (
    <>
      <TitleCard title="Update Hotel" topMargin="mt-2">
        <label className="label w-full">
          <span className={"label-text text-base-content "}>Location Name</span>
        </label>
        <Select
          isMulti
          options={availableLocations.map(lead => ({
            value: lead.id,
            label: lead.location_name
          }))}
          value={selectedLocation}
          onChange={handleLocationChange}
          styles={{
            control: provided => ({
              ...provided,
              minHeight: "48px"
            })
          }}
        />
        <InputText
          type="text"
          defaultValue={decodeName}
          placeholder="Hotel Name"
          updateType="hotel_name"
          containerStyle="mt-4"
          labelTitle="Hotel Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        <InputText
        type="text"
        defaultValue={decodeAdultUsd}
        placeholder="Adult Price"
        updateType="adults_price_usd"
        containerStyle="mt-4"
        labelTitle="Adult Price(USD)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
      <InputText
        type="text"
        defaultValue={decodeAdultAed}
        placeholder="Adult Price"
        updateType="adults_price_aed"
        containerStyle="mt-4"
        labelTitle="Adult Price(AED)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
      <InputText
        type="text"
        defaultValue={decodeChildrenUsd}
        placeholder="Child Price"
        updateType="children_price_usd"
        containerStyle="mt-4"
        labelTitle="Child Price(USD)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
      <InputText
        type="text"
        defaultValue={decodeChildrenAed}
        placeholder="Child Price"
        updateType="children_price_aed"
        containerStyle="mt-4"
        labelTitle="Child Price(AED)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
      <InputText
        type="text"
        defaultValue={decodeInfantsUsd}
        placeholder="Infants Price"
        updateType="infants_price_usd"
        containerStyle="mt-4"
        labelTitle="Infants Price(USD)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
      <InputText
        type="text"
        defaultValue={decodeInfantsAed}
        placeholder="Infants Price"
        updateType="infants_price_aed"
        containerStyle="mt-4"
        labelTitle="Infants Price(AED)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
      <InputText
        type="text"
        defaultValue={decodeDriverUsd}
        placeholder="Driver Price"
        updateType="driver_price_usd"
        containerStyle="mt-4"
        labelTitle="Driver Price(USD)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />

      <InputText
        type="text"
        defaultValue={decodeDriverAed}
        placeholder="Driver Price"
        updateType="driver_price_aed"
        containerStyle="mt-4"
        labelTitle="Driver Price(AED)"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button className="btn btn-primary px-6" onClick={updateHotelNameInAPI}>
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateHotelModalBody;
