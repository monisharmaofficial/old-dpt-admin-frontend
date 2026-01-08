import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import TitleCard from "../../../components/Cards/TitleCard";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { showNotification } from "../../common/headerSlice";
import {
  updateDestinationName,
  getDestinationCountry,
  getStatesForCountry,
} from "../destinationnewSlice";

const INITIAL_DESTINATION_OBJ = {
  destination_name: "",
  image: "",
  destination_description: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
  country_name: "",
  state: "",
};

function UpdateDestinationModalBody() {
  const [destinationData, setDestinationData] = useState(
    INITIAL_DESTINATION_OBJ
  );
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const destinationId = queryParams.get("id");
  const destinationName = queryParams.get("name");
  const countryId = queryParams.get("country");
  const stateId = queryParams.get("state");
  const status = queryParams.get("status");

  useEffect(() => {
    // Fetch countries on load
    dispatch(getDestinationCountry())
      .then((response) => setCountries(response.payload))
      .catch((error) => console.error("Error fetching countries:", error));

    // If country is available, fetch the states
    if (countryId) {
      dispatch(getStatesForCountry(countryId))
        .then((response) => setStates(response.payload))
        .catch((error) => console.error("Error fetching states:", error));
    }

    // Populate form with data from query params
    setDestinationData({
      ...destinationData,
      destination_name: destinationName || "",
      country_name: countryId || "",
      state: stateId || "",
      status: status || "",
    });
  }, [dispatch, location.search]); // Re-run the effect when URL changes

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setDestinationData({ ...destinationData, [updateType]: value });
  };

  const handleCountryChange = (value) => {
    setDestinationData({ ...destinationData, country_name: value, state: "" });
    dispatch(getStatesForCountry(value))
      .then((response) => {
        setStates(response.payload);
        // If there is an existing state name, you could try to match it and set it
        if (stateId) {
          const stateObj = response.payload.find(
            (state) => state.name === stateId
          );
          if (stateObj) {
            setDestinationData((prevState) => ({
              ...prevState,
              state: stateObj.name,
            }));
          }
        }
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  const updateDestinationNameInAPI = () => {
    if (!destinationData.country_name) {
      return setErrorMessage("Country is required!");
    }
    if (!destinationData.state) {
      return setErrorMessage("State is required!");
    }

    // Perform the PATCH request to update the destination
    dispatch(
      updateDestinationName({
        id: destinationId, // Include the ID for the update
        ...destinationData,
        image: localStorage.getItem("filename"), // Add image if necessary
      })
    )
      .then(() => {
        dispatch(
          showNotification({
            message: "Destination Updated Successfully!",
            status: 1,
          })
        );
        navigate("/app/destinations");
      })
      .catch((error) => {
        setErrorMessage("Failed to update destination.");
        console.error("Error updating destination:", error);
      });
  };

  const closeModal = () => navigate("/app/destinations");

  return (
    <>
      <TitleCard title="Update Destination" topMargin="mt-2">
        <div className="mt-4">
          <label className="label">Country</label>
          <select
            className="select select-bordered w-full"
            value={destinationData.country_name}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="label">State</label>
          <select
            className="select select-bordered w-full"
            value={destinationData.state}
            onChange={(e) =>
              updateFormValue({ updateType: "state", value: e.target.value })
            }
            disabled={!states.length}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <InputText
          type="text"
          placeholder="Destination"
          updateType="destination_name"
          containerStyle="mt-4"
          labelTitle="Destination"
          updateFormValue={updateFormValue}
          isRequired={true}
          value={destinationData.destination_name}
        />

        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>
            Cover Pic
          </span>
        </label>

        <UploadSingleFiles updateImageFilename={updateFormValue} />

        <InputText
          type="text"
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
          value={destinationData.meta_title}
        />

        <TextAreaInput
          type="text"
          placeholder="Meta Description"
          updateType="meta_description"
          containerStyle="mt-4"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue}
          value={destinationData.meta_description}
        />

        <TextAreaInput
          type="text"
          placeholder="Meta Keyword"
          updateType="meta_keyword"
          containerStyle="mt-4"
          labelTitle="Meta Keyword"
          updateFormValue={updateFormValue}
          value={destinationData.meta_keyword}
        />

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={updateDestinationNameInAPI}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateDestinationModalBody;
