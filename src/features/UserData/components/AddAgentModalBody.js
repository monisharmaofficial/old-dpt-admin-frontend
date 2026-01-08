import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewAgents } from "../agentsSlice";

const INITIAL_AGENTS_OBJ = {
  first_name: "",
  country: "",
  state: "",
  city: "",
  zip: "",
  address: "",
  phoneno: "",
  email: "",
  password: "",
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [agentsData, setAgentsData] = useState(INITIAL_AGENTS_OBJ);
  const navigate= useNavigate()

  const saveNewLead = () => {
    const {
      first_name,
      country,
      state,
      city,
      zip,
      address,
      phoneno,
      email,
      password,
    } = agentsData;

    if (!first_name) {
      setErrorMessage("Please enter an agent name");
      return;
    }    if (
      !agentsData.email ||
      agentsData.email.trim() === ""
    ) {
      return setErrorMessage("Agent Email is required!");
    }
    if (
      !agentsData.phoneno ||
      agentsData.phoneno.trim() === ""
    ) {
      return setErrorMessage("Agent Phone no is required!");
    }
    if (
      !agentsData.country ||
      agentsData.country.trim() === ""
    ) {
      return setErrorMessage("Country Name is required!");
    }
    if (
      !agentsData.state ||
      agentsData.state.trim() === ""
    ) {
      return setErrorMessage("State Name is required!");
    }
    if (
      !agentsData.city ||
      agentsData.city.trim() === ""
    ) {
      return setErrorMessage("City Name is required!");
    }
    if (
      !agentsData.zip ||
      agentsData.zip.trim() === ""
    ) {
      return setErrorMessage("Zip is required!");
    }
    if (
      !agentsData.address ||
      agentsData.address.trim() === ""
    ) {
      return setErrorMessage("Agent Address is required!");
    }

    setLoading(true);

    dispatch(
      addNewAgents({
        first_name,
        email,
        phoneno,
        country,
        city,
        state,
        zip,
        address,
        password,
      })
    ).then(() => {
      // Reset the input fields to their initial state after saving
      setAgentsData(INITIAL_AGENTS_OBJ);
      setLoading(false);
      navigate("/app/agents")
    });

    dispatch(showNotification({ message: "New Agent Added!", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setAgentsData((prevData) => ({
      ...prevData,
      [updateType]: value,
    }));
  };

  return (
    <>
      <TitleCard title="Add Agents" topMargin="mt-2">
        <InputText
          type="text"
          value={agentsData.first_name}
          placeholder="Agent Name"
          updateType="first_name"
          containerStyle="mt-4"
          labelTitle="Agent Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <InputText
          type="email"
          value={agentsData.email}
          placeholder="Agent Email"
          updateType="email"
          containerStyle="mt-4"
          labelTitle="Email Id"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <InputText
          type="email"
          value={agentsData.phoneno}
          placeholder="Agent Phone"
          updateType="phoneno"
          containerStyle="mt-4"
          labelTitle="Phone Number"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <InputText
          type="text"
          value={agentsData.country}
          placeholder="Country"
          updateType="country"
          containerStyle="mt-4"
          labelTitle="Country"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          value={agentsData.city}
          placeholder="City"
          updateType="city"
          containerStyle="mt-4"
          labelTitle="City"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          value={agentsData.state}
          placeholder="State"
          updateType="state"
          containerStyle="mt-4"
          labelTitle="State"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          value={agentsData.zip}
          placeholder="Zip"
          updateType="zip"
          containerStyle="mt-4"
          labelTitle="Zip"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          value={agentsData.address}
          placeholder="Address"
          updateType="address"
          containerStyle="mt-4"
          labelTitle="Address"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          value={agentsData.password}
          placeholder="Password"
          updateType="password"
          containerStyle="mt-4"
          labelTitle="Password"
          updateFormValue={updateFormValue}
        />

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <Link className="btn btn-ghost" to="/app/agents">
            Cancel
          </Link>
          <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default AddLeadModalBody;
