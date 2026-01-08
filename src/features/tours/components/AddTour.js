import React, { Component, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import slugify from 'react-slugify';
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import Select from "react-select";
import { addNewTour } from "../tourSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { getEmiratesContent } from "../../Emirates/emiratesSlice";
import { getItineraryContent } from "../../Itinerary/itinerarySlice";
import { getCategoryContent } from "../../category/categorySlice";
import { getDestinationContent } from "../../Destinations/destinationSlice";
import { useNavigate } from "react-router-dom";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import UploadGalleryFiles from "../../../components/UploadFiles/upload-gallery-files";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const INITIAL_TOUR_OBJ = {
  tour_name: "",
  category_id: "",
  emirates_id: "",
  popular_tours:"",
  hastag: "",
  discount: "",
  intro: "",
  tour_details: "",
  question: "",
  useful: "",
  mail_body: "",
  included: "",
  exclusive: "",
  expect: "",
  policy: "",
  know: "",
  slug:"",
  asked_questions: "",
  tour_price_aed: "",
  tour_price_usd: "",
  tour_duration: "",
  short_description: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
};

const INITIAL_CATEGORY_OBJ = {
  name: "",
  parent_id: "",
  short_description: "",
  description: "",
  meta_title: "",
  meta_description: "",
};

function AddTourModalBody({ closeModal, props }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tourData, setTourData] = useState(INITIAL_TOUR_OBJ);
  const [categoryData, setCategoryData] = useState(INITIAL_CATEGORY_OBJ);
  const [tourDetailsEditorState, setTourDetailsEditorState] = useState(
    EditorState.createEmpty()
  );
  const [questionEditorState, setQuestionEditorState] = useState(
    EditorState.createEmpty()
  );
  const [usefulEditorState, setUsefulEditorState] = useState(
    EditorState.createEmpty()
  );
  const [mailBodyEditorState, setMailBodyEditorState] = useState(
    EditorState.createEmpty()
  );
  const [includedEditorState, setIncludedEditorState] = useState(
    EditorState.createEmpty()
  );
  const [exclusiveEditorState, setExclusiveEditorState] = useState(
    EditorState.createEmpty()
  );
  const [expectEditorState, setExpectEditorState] = useState(
    EditorState.createEmpty()
  );
  const [policyEditorState, setPolicyEditorState] = useState(
    EditorState.createEmpty()
  );
  const [knowEditorState, setKnowEditorState] = useState(
    EditorState.createEmpty()
  );
  const [askedQuestionsEditorState, setAskedQuestionsEditorState] = useState(
    EditorState.createEmpty()
  );

  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const { leads } = useSelector((state) => state.category);
  const categoryLeads = useSelector((state) => state.category.leads);
  const emiratesLeads = useSelector((state) => state.emirates.leads);
  const itineraryLeads = useSelector((state) => state.itinerary.leads);
  const destinationLeads = useSelector((state) => state.destination.leads);
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const mapStickerNamesToIds = () => { };

  const mapCategoryNamesToIds = () => {
    const selectedCategoryIds = categoryLeads.find(
      (loc) => loc.name === selectedCategory.label
    );
    return selectedCategoryIds ? [selectedCategoryIds.id] : [];
  };
  const mapEmiratesNamesToIds = () => {
    const selectedEmiratesIds = selectedEmirates.map(
      (emirate) => {
        const matchingLead = emiratesLeads.find(
          (lead) => lead.name === emirate.label
        );
        if (matchingLead) {
          return matchingLead.id;
        } else {
          // Handle the case when no matching lead is found (e.g., return a default value or handle the error).
          return null; // You can modify this accordingly
        }
      });
    return selectedEmiratesIds;
  };
  const mapDestinationNamesToIds = () => {
    const selectedDestinationIds = destinationLeads.find(
      (loc) => loc.destination_name === selectedDestination.label
    );
    return selectedDestinationIds ? [selectedDestinationIds.id] : [];
  };
  
  

  const mapItineraryNamesToIds = () => {
    const selectedItineraryIds = selectedItinerary.map((itinerary) => {
      const selectedItineraryName = itinerary.label; // Get the label from the selected itinerary
      const itineraryLead = itineraryLeads.find(
        (loc) => loc.itinerary_name === selectedItineraryName
      );
      return itineraryLead ? itineraryLead.id : null; // Return the ID if found, or null if not found
    });

    return selectedItineraryIds.filter((id) => id !== null); // Filter out null values
  };

  const handleChange = (e) => {
    const data = e.target.files[0];
    setFile(data);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTourData({ ...tourData, [updateType]: value });
  };
  const options = [
    { value: 1, label: "2012-2022 Travellers Choice" },
    { value: 2, label: "2023 Travellers Choice" },
    { value: 3, label: "ASTA" },
  ];
  const popularTour = [
    { value: 0, label: "No" },
    { value: 1, label: "Yes" },
  ];
  
  

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedItinerary, setSelectedItinerary] = useState([]); // State for the selected category
  const [selectedEmirates, setSelectedEmirates] = useState([]); // State for selected emirates
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [selectedPopularTour, setSelectedPopularTour] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");



  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
  };

  const handleStickerChange = (selected) => {
    setSelectedStickers(selected);
  };
  
  const handlePopularTourChange = (selected) => {
    setSelectedPopularTour(selected); // Store the selected option in the state
  };
  
  
  
  
  const handleEmiratesChange = (selected) => {
    setSelectedEmirates(selected);
  };

  const handleItineraryChange = (selected) => {
    setSelectedItinerary(selected);
  };
  const handleDestinationChange = (selected) => {
    setSelectedDestination(selected); // Use an empty array if `selected` is falsy
  };
  
  useEffect(() => {
    dispatch(getEmiratesContent());
    dispatch(getDestinationContent());
    dispatch(getCategoryContent());
    dispatch(getItineraryContent());
  }, []);
  
  useEffect(() => {
    const updatedSlug = slugify(tourData.tour_name);
    setTourData((prevData) => ({ ...prevData, slug: updatedSlug }));
  }, [tourData.tour_name]);
  
  const uploadImageToPublicFolder = () => {
    

    const {
      tour_name,
      hastag,
      discount,
      intro,
      slug,
      tour_duration,
      tour_price_aed,
      tour_price_usd,
      meta_title,
      meta_keywords,
      meta_description,
    } = tourData;

    if (!tour_name) {
      setErrorMessage("Please enter a tour name");
      return;
    }
    if (!discount) {
      setErrorMessage("Please enter a tour discount");
      return;
    }
    if (!intro) {
      setErrorMessage("Please enter a tour intro");
      return;
    }

    // Convert EditorState to JSON
    const tour_details = JSON.stringify(
      convertToRaw(tourDetailsEditorState.getCurrentContent())
    );
    const question = JSON.stringify(
      convertToRaw(questionEditorState.getCurrentContent())
    );
    const useful = JSON.stringify(
      convertToRaw(usefulEditorState.getCurrentContent())
    );
    const mail_body = JSON.stringify(
      convertToRaw(mailBodyEditorState.getCurrentContent())
    );
    const included = JSON.stringify(
      convertToRaw(includedEditorState.getCurrentContent())
    );
    const exclusive = JSON.stringify(
      convertToRaw(exclusiveEditorState.getCurrentContent())
    );
    const expect = JSON.stringify(
      convertToRaw(expectEditorState.getCurrentContent())
    );
    const policy = JSON.stringify(
      convertToRaw(policyEditorState.getCurrentContent())
    );
    const know = JSON.stringify(
      convertToRaw(knowEditorState.getCurrentContent())
    );
    const asked_questions = JSON.stringify(
      convertToRaw(askedQuestionsEditorState.getCurrentContent())
    );

    // Check if the description is empty
    if (
      !tour_details ||
      tour_details ===
      '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    ) {
      setErrorMessage("Please enter tour details");
      return;
    }
    setLoading(true);

    const categoryIds = mapCategoryNamesToIds();
    const emiratesIds = mapEmiratesNamesToIds();
    const itineraryIds = mapItineraryNamesToIds();
    const destinationIds = mapDestinationNamesToIds();
    const stickerIds = selectedStickers.map((sticker) => sticker.value);
    const popularTourIds = selectedPopularTour.value;
  

   

    dispatch(
      addNewTour({
        tour_name: tour_name,
        image: localStorage.getItem("filename"),
        gallerydata:localStorage.getItem("filedata"),
        category_id: categoryIds,
        sticker: stickerIds,
        emirates_id: emiratesIds,
        itinerary_id: itineraryIds,
        destination_id :destinationIds,
        popular_tours: popularTourIds,
        hastag: hastag,
        slug:slug,
        discount: discount,
        intro: intro,
        tour_details: tour_details,
        question: question,
        useful: useful,
        mail_body: mail_body,
        included: included,
        exclusive: exclusive,
        expect: expect,
        policy: policy,
        know: know,
        asked_questions: asked_questions,
        tour_price_aed: tour_price_aed,
        tour_price_usd: tour_price_usd,
        tour_duration: tour_duration,
        meta_title: meta_title,
        meta_description: meta_description,
        meta_keywords: meta_keywords,
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New Tour Added!", status: 1 }));
        console.log(JSON.stringify(localStorage.getItem("filedata")))
        setLoading(false);
        navigate("/app/tours");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        setErrorMessage("Error adding category. Please try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <TitleCard title="Add Tours" topMargin="mt-2">
        <InputText
          type="text"
          defaultValue={tourData.tour_name}
          placeholder="Tour Name"
          updateType="tour_name"
          isRequired={true}
          containerStyle="mt-4"
          labelTitle="Tour Name"
          updateFormValue={updateFormValue}
        />

        <div className="flex space-x-14 ">
          <div className="w-full mt-4">
            <label className="label">
              <span className={"label-text text-base-content "}>
                Select Category <span style={{ color: "red" }}>*</span>
              </span>
            </label>

            <Select
              isMulti={false}
              options={categoryLeads.map((lead) => ({
                value: lead.id,
                label: lead.name,
              }))}
              value={selectedCategory}
              onChange={handleCategoryChange}
              styles={{
                // Style for the container of the dropdown
                control: (provided) => ({
                  ...provided,
                  minHeight: "48px", // Adjust the height as needed
                }),
              }}
            />
          </div>
          <div className="w-full mt-4">
            <label className="label w-full">
              <span className={"label-text text-base-content "}>
                Select Emirates <span style={{ color: "red" }}>*</span>
              </span>
            </label>
            <Select
              isMulti
              options={emiratesLeads.map((lead) => ({
                value: lead.id,
                label: lead.name,
              }))}
              value={selectedEmirates}
              onChange={handleEmiratesChange}
              styles={{
                // Style for the container of the dropdown
                control: (provided) => ({
                  ...provided,
                  minHeight: "48px", // Adjust the height as needed
                }),
              }}
            />
          </div>
        </div>

        <div className="flex space-x-14">
          <div className="w-full mt-4">
            <label className="label w-full">
              <span className={"label-text text-base-content "}>
                Select Sticker's
              </span>
            </label>
            <Select
              isMulti
              options={options}
              value={selectedStickers}
              onChange={handleStickerChange}
              styles={{
                // Style for the container of the dropdown
                control: (provided) => ({
                  ...provided,
                  minHeight: "48px", // Adjust the height as needed
                }),
              }}
            />
          </div>

          <div className="w-full mt-4">
            <label className="label w-full">
              <span className={"label-text text-base-content "}>
                Select Itinerary <span style={{ color: "red" }}>*</span>
              </span>
            </label>
            <Select
              isMulti
              options={itineraryLeads.map((lead) => ({
                value: lead.id,
                label: lead.itinerary_name,
              }))}
              value={selectedItinerary}
              onChange={handleItineraryChange}
              styles={{
                // Style for the container of the dropdown
                control: (provided) => ({
                  ...provided,
                  minHeight: "48px", // Adjust the height as needed
                }),
                // Style for the dropdown options
              }}
            />
          </div>
        </div>
        <div className="flex space-x-14 ">
          <div className="w-full mt-4">
            <label className="label">
              <span className={"label-text text-base-content "}>
                Select Destination <span style={{ color: "red" }}>*</span>
              </span>
            </label>

            <Select
              isMulti={false}
              options={destinationLeads.map((lead) => ({
                value: lead.id,
                label: lead.destination_name,
              }))}
              value={selectedDestination}
              onChange={handleDestinationChange}
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
            defaultValue={tourData.first_name}
            placeholder="Hastag"
            updateType="hastag"
            containerStyle="mt-4"
            labelTitle="Hastag"
            updateFormValue={updateFormValue}
          />

        </div>
        <div className="flex space-x-14">
          <InputText
            type="text"
            defaultValue={tourData.first_name}
            placeholder="Discount %"
            updateType="discount"
            containerStyle="mt-4"
            labelTitle="Discount %"
            updateFormValue={updateFormValue}
          />

          <div className="w-full mt-4">
            <label className="label w-full">
              <span className={"label-text text-base-content "}>
                Popular Tour <span style={{ color: "red" }}>*</span>
              </span>
            </label>
            <Select
              options={popularTour}
              value={selectedPopularTour} 
              onChange={handlePopularTourChange}
              styles={{
                // Style for the container of the dropdown
                control: (provided) => ({
                  ...provided,
                  minHeight: "48px", // Adjust the height as needed
                }),
              }}
            />
          </div>
        </div>

        <TextAreaInput
          type="text"
          defaultValue={tourData.intro}
          placeholder="Tour Intro"
          updateType="intro"
          containerStyle="mt-4"
          labelTitle="Intro"
          updateFormValue={updateFormValue}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Tour Details</span>
        </label>

        <Editor
          editorState={tourDetailsEditorState}
          onEditorStateChange={setTourDetailsEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Question</span>
        </label>
        <Editor
          editorState={questionEditorState}
          onEditorStateChange={setQuestionEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            That's Useful To Know
          </span>
        </label>
        <Editor
          editorState={usefulEditorState}
          onEditorStateChange={setUsefulEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Mail Body</span>
        </label>
        <Editor
          editorState={mailBodyEditorState}
          onEditorStateChange={setMailBodyEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            What's Included
          </span>
        </label>
        <Editor
          editorState={includedEditorState}
          onEditorStateChange={setIncludedEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />
        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            What's Exclusive
          </span>
        </label>
        <Editor
          editorState={exclusiveEditorState}
          onEditorStateChange={setExclusiveEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>What To Expect</span>
        </label>
        <Editor
          editorState={expectEditorState}
          onEditorStateChange={setExpectEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            Cancellation Policy
          </span>
        </label>
        <Editor
          editorState={policyEditorState}
          onEditorStateChange={setPolicyEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            That’s Useful To Know
          </span>
        </label>
        <Editor
          editorState={knowEditorState}
          onEditorStateChange={setKnowEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            Frequently Asked Questions
          </span>
        </label>
        <Editor
          editorState={askedQuestionsEditorState}
          onEditorStateChange={setAskedQuestionsEditorState}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <div className="flex space-x-14">
          <InputText
            type="text"
            placeholder="Tour Price (AED)"
            isRequired={true}
            updateType="tour_price_aed"
            containerStyle="mt-4"
            labelTitle="Tour Price (AED)"
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            placeholder="Tour Price (USD)"
            isRequired={true}
            updateType="tour_price_usd"
            containerStyle="mt-4"
            labelTitle="Tour Price (USD)"
            updateFormValue={updateFormValue}
          />
        </div>

        <InputText
          type="text"
          defaultValue={tourData.tour_duration}
          placeholder="Tour Duration"
          isRequired={true}
          updateType="tour_duration"
          containerStyle="mt-4"
          labelTitle="Tour Duration"
          updateFormValue={updateFormValue}
        />
        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Feature Image</span>
        </label>
        <UploadSingleFiles />
        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Gallery Image</span>
        </label>
        <UploadGalleryFiles />
        <InputText
          type="text"
          defaultValue={tourData.first_name}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput
          type="text"
          defaultValue={categoryData.short_description}
          placeholder="Meta Description"
          containerStyle="mt-4"
          updateType="meta_description"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput
          type="text"
          defaultValue={categoryData.short_description}
          placeholder="Meta Keyword"
          containerStyle="mt-4"
          updateType="meta_keywords"
          labelTitle="Meta Keyword"
          updateFormValue={updateFormValue}
        />

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <Link to="/app/tours" className="btn btn-ghost">
            Cancel
          </Link>
          <button
            className="btn btn-primary px-6"
            onClick={() => uploadImageToPublicFolder()}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default AddTourModalBody;


