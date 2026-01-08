import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { useLocation, useNavigate } from "react-router-dom";
import { updateEmiratesName } from "../emiratesSlice";
import { showNotification } from "../../common/headerSlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import SelectBox from "../../../components/Input/SelectBox";
import TitleCard from "../../../components/Cards/TitleCard";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { getDestinationContent } from "../../Destinations/destinationSlice";

const INITIAL_EMIRATES_OBJ = {
  name: "",
  image: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
  country: "", // Ensure this is included in the initial object
};

function UpdateEmiratesModalBody() {
  const { emiratesId, emiratesName } = useSelector((state) => state.emirates);
  const dispatch = useDispatch();
  const [catg, setCatg] = useState(emiratesName);
  const [editId, setEditId] = useState(emiratesId);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [emiratesData, setEmiratesData] = useState(INITIAL_EMIRATES_OBJ);
  const { leads } = useSelector((state) => state.destination);

  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const name = spliturl[2];
  const decodeName = decodeURIComponent(name);
  const meta_title = spliturl[3];
  const decodeMeta_Title = decodeURIComponent(meta_title);
  const meta_description = spliturl[4];
  const decodeMeta_description = decodeURIComponent(meta_description);
  const ourMetaKeyword = spliturl[5];
  const decodeMetaKeyword = decodeURIComponent(ourMetaKeyword);
  const ourImage = spliturl[6];
  const decodeImage = decodeURIComponent(ourImage);
  const country = spliturl[7];
  const decodeCountry = decodeURIComponent(country);

  const navigate = useNavigate();

  useEffect(() => {
    setEmiratesData({
      name: decodeName,
      meta_title: decodeMeta_Title,
      meta_description: decodeMeta_description,
      meta_keyword: decodeMetaKeyword,
      image: decodeImage,
      country: decodeCountry, // Ensure country is part of the initial data
    });
  }, [
    decodeName,
    decodeMeta_Title,
    decodeMeta_description,
    decodeMetaKeyword,
    decodeImage,
    decodeCountry,
  ]);

  useEffect(() => {
    dispatch(getDestinationContent());
  }, [dispatch]);

  useEffect(() => {
    if (leads) {
      console.log("Leads Destination Content:", leads);
    }
  }, [leads]);

  const closeModal = () => {
    navigate("/app/emirates");
  };

  // Function to handle updating Emirates data in the API
  const updateEmiratesNameInAPI = () => {
    const {
      name = decodeName,
      meta_title = decodeMeta_Title,
      meta_description = decodeMeta_description,
      meta_keyword = decodeMetaKeyword,
      country = decodeCountry,
    } = emiratesData;

    // Dispatch the action with updated values, ensuring country is passed
    dispatch(
      updateEmiratesName({
        id: id,
        newName: name,
        newImage: localStorage.getItem("filename"),
        newMetaTitle: meta_title,
        newMetaKeyword: meta_keyword,
        newMetaDescription: meta_description,
        newCountry: country, // Include the country value here
      })
    )
      .then(() => {
        dispatch(
          showNotification({
            message: "Emirates Updated Successfully!",
            status: 1,
          })
        );
        navigate("/app/emirates");
      })
      .catch((error) => {
        setErrorMessage("Failed to update emirates name.");
        console.error("Error updating emirates name:", error);
      });
  };

  // Function to update form value
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setEmiratesData({ ...emiratesData, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Update Emirates" topMargin="mt-2">
        <SelectBox
          defaultValue={decodeCountry}
          options={
            leads && leads.length > 0
              ? leads.map((lead) => ({
                  name: lead.destination_name || "Unknown Country",
                  value: lead.id,
                }))
              : []
          }
          updateType="country" // Ensure this matches the update type
          placeholder="Select Country"
          containerStyle="mt-4"
          labelTitle="Country"
          updateFormValue={updateFormValue}
        />
        <InputText
          type="text"
          defaultValue={decodeName}
          updateType="name"
          placeholder="Emirates Name"
          containerStyle="mt-4"
          labelTitle="Emirates Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <label className="label">
          <span className={"label-text text-base-content"}>Image</span>
        </label>
        <UploadSingleFiles updateImageFilename={updateFormValue} />
        <img
          src={`http://127.0.0.1:8800/data/uploads/${decodeImage}`}
          alt="Preview"
          height="100px"
          width="100px"
        />

        <InputText
          type="text"
          defaultValue={decodeMeta_Title}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput
          type="text"
          defaultValue={decodeMetaKeyword}
          placeholder="Meta Keyword"
          updateType="meta_keyword"
          containerStyle="mt-4"
          labelTitle="Meta Keyword"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput
          type="text"
          defaultValue={decodeMeta_description}
          placeholder="Meta Description"
          updateType="meta_description"
          containerStyle="mt-4"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue}
        />

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={() => updateEmiratesNameInAPI()}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateEmiratesModalBody;
