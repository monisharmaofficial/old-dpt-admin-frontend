import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewEmirates, getEmiratesContent } from "../emiratesSlice";
import { getDestinationContent } from "../../Destinations/destinationSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";

const INITIAL_EMIRATES_OBJ = {
  name: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
  short_description: "", // New field added
  destination_id: "", // Added to capture the selected country
};

function AddEmiratesModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emiratesData, setEmiratesData] = useState(INITIAL_EMIRATES_OBJ);
  const navigate = useNavigate();
  const { leads } = useSelector((state) => state.destination);

  const closeModal = () => {
    navigate("/app/emirates");
  };

  useEffect(() => {
    dispatch(getEmiratesContent());
    dispatch(getDestinationContent());
  }, [dispatch]);

  useEffect(() => {
    if (leads) {
      console.log("Leads Destination Content:", leads);
    }
  }, [leads]);

  const uploadImageToPublicFolder = () => {
    const {
      name,
      meta_title,
      meta_description,
      meta_keyword,
      short_description,
      destination_id,
    } = emiratesData;

    // Validation Checks
    if (!destination_id) {
      setErrorMessage("Please select a country");
      return;
    }
    if (!name) {
      setErrorMessage("Please enter an emirates name");
      return;
    }
    if (!meta_title) {
      setErrorMessage("Please enter a meta title");
      return;
    }
    if (!meta_description) {
      setErrorMessage("Please enter a meta description");
      return;
    }
    if (!meta_keyword) {
      setErrorMessage("Please enter a meta keyword");
      return;
    }

    setLoading(true);
    dispatch(
      addNewEmirates({
        name: name,
        image: localStorage.getItem("filename"),
        meta_description: meta_description,
        meta_keyword: meta_keyword,
        meta_title: meta_title,
        short_description: short_description,
        destination_id: destination_id,
      })
    )
      .then(() => {
        dispatch(
          showNotification({ message: "New Emirates Added!", status: 1 })
        );
        setLoading(false);
        navigate("/app/emirates");
      })
      .catch((error) => {
        console.error("Error adding emirates:", error);
        setErrorMessage("Error adding emirates. Please try again.");
        setLoading(false);
      });
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setEmiratesData({ ...emiratesData, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Emirates" topMargin="mt-2">
        {/* Country Selection Dropdown */}
        <SelectBox
          options={
            leads && leads.length > 0
              ? leads.map((lead) => ({
                  name: lead.destination_name || "Unknown Country",
                  value: lead.id,
                }))
              : []
          }
          labelTitle="Select Country"
          placeholder="Select Country"
          updateType="destination_id"
          containerStyle="mt-4"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        {/* Emirates Name Input */}
        <InputText
          type="text"
          defaultValue={emiratesData.name}
          placeholder="Emirates Name"
          updateType="name"
          containerStyle="mt-4"
          labelTitle="Emirates Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        {/* Image Upload */}
        <label className="label font-semibold">
          <span className="label-text text-base-content">Image</span>
        </label>
        <UploadSingleFiles />

        {/* Meta Title Input */}
        <InputText
          type="text"
          defaultValue={emiratesData.meta_title}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />

        {/* Meta Keyword Input */}
        <TextAreaInput
          type="text"
          defaultValue={emiratesData.meta_keyword}
          placeholder="Meta Keyword"
          updateType="meta_keyword"
          containerStyle="mt-4"
          labelTitle="Meta Keyword"
          updateFormValue={updateFormValue}
        />

        {/* Meta Description Input */}
        <TextAreaInput
          type="text"
          defaultValue={emiratesData.meta_description}
          placeholder="Meta Description"
          updateType="meta_description"
          containerStyle="mt-4"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue}
        />

        {/* New Short Description Input */}
        <TextAreaInput
          type="text"
          defaultValue={emiratesData.short_description}
          placeholder="Short Description"
          updateType="short_description"
          containerStyle="mt-4"
          labelTitle="Short Description"
          updateFormValue={updateFormValue}
        />

        {/* Error Message */}
        <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>

        {/* Action Buttons */}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={uploadImageToPublicFolder}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default AddEmiratesModalBody;
