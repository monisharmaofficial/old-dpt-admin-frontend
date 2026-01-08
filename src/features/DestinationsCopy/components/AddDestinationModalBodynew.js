import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import {
  addNewDestination,
  getDestinationContent,
  getDestinationCountry,
  getStatesForCountry,
} from "../destinationnewSlice";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { useNavigate } from "react-router-dom";

const INITIAL_DESTINATION_OBJ = {
  country_name: "",
  state: "",
  destination_name: "",
  image: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
};

function AddDestinationModalBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [destinationData, setDestinationData] = useState(
    INITIAL_DESTINATION_OBJ
  );
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    // Fetch countries and destination content on load
    dispatch(getDestinationCountry())
      .then((response) => setCountries(response.payload))
      .catch((error) => console.error("Error fetching countries:", error));
  }, [dispatch]);

  const handleCountryChange = (value) => {
    setDestinationData({ ...destinationData, country_name: value, state: "" });

    // Fetch states for the selected country
    dispatch(getStatesForCountry(value))
      .then((response) => setStates(response.payload))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const uploadDestinationData = () => {
    const {
      country_name,
      state,
      destination_name,
      meta_title,
      meta_description,
      meta_keyword,
    } = destinationData;

    if (
      !country_name ||
      !state ||
      !destination_name ||
      !meta_title ||
      !meta_description ||
      !meta_keyword
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);

    dispatch(
      addNewDestination({
        ...destinationData,
        image: localStorage.getItem("filename"), // Assuming image filename is stored in localStorage
      })
    )
      .then(() => {
        dispatch(
          showNotification({ message: "New destination added!", status: 1 })
        );
        navigate("/app/destinations");
      })
      .catch((error) => {
        console.error("Error adding destination:", error);
        setErrorMessage("Error adding destination. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setDestinationData({ ...destinationData, [updateType]: value });
  };

  return (
    <TitleCard title="Add Destination" topMargin="mt-2">
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
        placeholder="Destination Name"
        updateType="destination_name"
        containerStyle="mt-4"
        labelTitle="Destination Name"
        updateFormValue={updateFormValue}
        isRequired
      />

      <label className="label mt-4">Cover Pic</label>
      <UploadSingleFiles />

      <InputText
        type="text"
        placeholder="Meta Title"
        updateType="meta_title"
        containerStyle="mt-4"
        labelTitle="Meta Title"
        updateFormValue={updateFormValue}
        isRequired
      />

      <TextAreaInput
        type="text"
        placeholder="Meta Description"
        updateType="meta_description"
        containerStyle="mt-4"
        labelTitle="Meta Description"
        updateFormValue={updateFormValue}
        isRequired
      />

      <TextAreaInput
        type="text"
        placeholder="Meta Keyword"
        updateType="meta_keyword"
        containerStyle="mt-4"
        labelTitle="Meta Keyword"
        updateFormValue={updateFormValue}
        isRequired
      />

      {errorMessage && <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>}

      <div className="modal-action">
        <button
          className="btn btn-ghost"
          onClick={() => navigate("/app/destinations")}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={uploadDestinationData}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </TitleCard>
  );
}

export default AddDestinationModalBody;
