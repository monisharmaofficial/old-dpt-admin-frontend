import React, { Component, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import slugify from 'react-slugify';
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import Select from "react-select";
import { components } from "react-select";
import { addNewTour } from "../tourSlice";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import UploadGalleryFiles from "../../../components/UploadFiles/upload-gallery-files";
import TitleCard from "../../../components/Cards/TitleCard";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { editTourContent } from "../tourSlice";
import CkEditorMail from "../../../components/Input/CkEditorMail";
import SelectBox from "../../../components/Input/SelectBox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getEmiratesContent } from "../../Emirates/emiratesSlice";
import { getItineraryContent } from "../../Itinerary/itinerarySlice";
import { getCategoryContent } from "../../category/categorySlice";
import { getDestinationContent } from "../../Destinations/destinationSlice";
import SelectCheckbox from "../../../components/Input/SelectCheckBox";
import { updateTourName } from "../tourSlice";
import { useNavigate } from "react-router-dom";
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const INITIAL_TOUR_OBJ = {
  tour_name: "",
  image: "",
  gallerydata: "",
  category_id: "",
  emirates_id: "",
  itinerary_id: "",
  destination_id: "",
  slug: "",
  popular_tours: "",
  category: "",
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
const INITIAL_DESTINATION_OBJ = {
  destination_name: "",
  destination_description: ""
};

function UpdateTourModalBody({ props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tourData, setTourData] = useState(INITIAL_TOUR_OBJ);
  const [destinationData, setDestinationData] = useState(INITIAL_DESTINATION_OBJ);
  const [categoryData, setCategoryData] = useState(INITIAL_CATEGORY_OBJ);
  const [leads, setLeads] = useState([]);
  const [tourName, setTourName] = useState("N/A");
  const [tourHastag, setTourHastag] = useState("N/A");
  const [file, setFile] = useState("");
  const url = window.location.href;
  const splitUrl = url.split("=?");
  const mainId = splitUrl[1];

  const selectedTour = leads.find((tour) => tour.id.toString() === mainId);
  const category_info = selectedTour?.category_info;

  const {
    tour_name = "N/A",
    hastag = "N/A",
    image = "N/A",
    gallerydata = "N/A",
    decodeEmiratesId = "N/A",
    decodeItineraryId = "N/A",
    decodeOurSticker = "N/A",
    discount = "N/A",
    intro = "N/A",
    tour_details = "N/A",
    question = "N/A",
    useful = "N/A",
    mail_body = "N/A",
    included = "N/A",
    exclusive = "N/A",
    expect = "N/A",
    policy = "N/A",
    know = "N/A",
    asked_questions = "N/A",
    tour_price_aed = "N/A",
    tour_price_usd = "N/A",
    tour_duration = "N/A",
    meta_title = "N/A",
    meta_description = "N/A",
    meta_keywords = "N/A",
    decodeDestinationId = "N/A",
    decodePopularTour = "N/A",
  } = selectedTour ?? {};

  const emiratesNamesArray = decodeEmiratesId.split(',').map(emirates => emirates.trim());
  const itineraryNamesArray = decodeItineraryId.split(',').map(itinerary => itinerary.trim());
  const initialSelectedEmirates = emiratesNamesArray.map(name => {
    return {
      value: name,
      label: name
    };
  });

  const initialSelectedItinerary = itineraryNamesArray.map(name => {
    return {
      value: name,
      label: name
    };
  });

  const [selectedEmirates, setSelectedEmirates] = useState(initialSelectedEmirates);
  const [selectedItinerary, setSelectedItinerary] = useState(initialSelectedItinerary);

  const [selectedStickers, setSelectedStickers] = useState([]);
  const options = [
    { value: 1, label: "2012-2022 Travellers Choice" },
    { value: 2, label: "2023 Travellers Choice" },
    { value: 3, label: "ASTA" },
  ];

  const popularTour = [
    { value: 1, label: "No" },
    { value: 0, label: "Yes" },
  ];
  const defaultPopularTourOption = options.find(option => option.value === decodePopularTour);

  // Set the default selected sticker based on the matched option
  const initialSelectedPopularTour = defaultPopularTourOption ? [defaultPopularTourOption] : [];

  const [selectedPopularTour, setSelectedPopularTour] = useState(initialSelectedPopularTour);



  const closeModal = () => {
    navigate('/app/tours')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = window.location.href;
        const splitUrl = url.split("=?");
        const yourTourId = splitUrl[1];

        const { payload } = await dispatch(editTourContent({ id: yourTourId }));
        setLeads(payload);

        // Check if leads is not empty before accessing its elements
        if (payload.length > 0) {
          const tourNames = payload.map((tour) => tour.tour_name);
          const tourHastag = payload.map((tour) => tour.hastag);
          setTourName(tourNames[0]);  // Update tourName here
          setTourHastag(tourHastag[0]);

          // Check if category_info is available and is an array
          if (Array.isArray(payload[0].category_info) && payload[0].category_info.length > 0) {
            const defaultCategory = {
              value: payload[0].category_info[0].id,
              label: payload[0].category_info[0].name,
            };
            setSelectedCategory(defaultCategory);
          }
          if (Array.isArray(payload[0].destination_info) && payload[0].destination_info.length > 0) {
            const defaultDestination = {
              value: payload[0].destination_info[0].id,
              label: payload[0].destination_info[0].name,
            };
            setSelectedDestination(defaultDestination);
          }
          if (Array.isArray(payload[0].itinerary_info) && payload[0].itinerary_info.length > 0) {
            const defaultItinerary = payload[0].itinerary_info.map(tour => ({
              value: tour.id,
              label: tour.name,
            }));
            setSelectedItinerary(defaultItinerary);
          }
          // Check if emirates_info is available and is an array
          if (Array.isArray(payload[0].emirates_info) && payload[0].emirates_info.length > 0) {
            const defaultEmirates = payload[0].emirates_info.map(tour => ({
              value: tour.id,
              label: tour.name,
            }));
            setSelectedEmirates(defaultEmirates);
          }
          // Check if sticker_info is available and is an array
          // Check if sticker_info is available and is an array
          if (Array.isArray(payload[0].sticker_info) && payload[0].sticker_info.length > 0) {
            const defaultStickers = payload[0].sticker_info.map(sticker => ({
              value: sticker.id,
              label: options.find(option => option.value === Number(sticker.id))?.label || "",
            }));
            
            setSelectedStickers(defaultStickers);
          }
          if (typeof payload[0].popular_tours !== 'undefined') {
            const defaultPopularTour = [{
              value: payload[0].popular_tours,
              label: popularTour.find(option => option.value === Number(payload[0].popular_tours))?.label || "",
            }];
          
            setSelectedPopularTour(defaultPopularTour);
          }

        }
      } catch (error) {
        console.error("Error fetching or editing tour:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [dispatch])

console.log(leads)
  const handleChange = (e) => {
    const data = e.target.files[0];
    setFile(data);
  };



  const [tourDetailsEditorState, setTourDetailsEditorState] = useState(
    createEditorState()
  );
  const [questionEditorState, setQuestionEditorState] = useState(
    createEditorState()
  );
  const [usefulEditorState, setUsefulEditorState] = useState(
    createEditorState()
  );
  const [mailBodyEditorState, setMailBodyEditorState] = useState(
    createEditorState()
  );
  const [includedEditorState, setIncludedEditorState] = useState(
    createEditorState()
  );
  const [exclusiveEditorState, setExclusiveEditorState] = useState(
    createEditorState()
  );
  const [expectEditorState, setExpectEditorState] = useState(
    createEditorState()
  );
  const [policyEditorState, setPolicyEditorState] = useState(
    createEditorState()
  );
  const [knowEditorState, setKnowEditorState] = useState(createEditorState());
  const [askedQuestionsEditorState, setAskedQuestionsEditorState] = useState(
    createEditorState()
  );

  function createEditorState() {
    const contentState = ContentState.createFromText("");
    return EditorState.createWithContent(contentState);
  }

  const updateTourDetailsEditorContent = (newEditorState) => {
    setTourDetailsEditorState(newEditorState);
  };

  const updateQuestionEditorContent = (newEditorState) => {
    setQuestionEditorState(newEditorState);
  };

  const updateUsefulEditorContent = (newEditorState) => {
    setUsefulEditorState(newEditorState);
  };

  const updateMailBodyEditorContent = (newEditorState) => {
    setMailBodyEditorState(newEditorState);
  };

  const updateIncludedEditorContent = (newEditorState) => {
    setIncludedEditorState(newEditorState);
  };

  const updateExclusiveEditorContent = (newEditorState) => {
    setExclusiveEditorState(newEditorState);
  };

  const updateExpectEditorContent = (newEditorState) => {
    setExpectEditorState(newEditorState);
  };

  const updatePolicyEditorContent = (newEditorState) => {
    setPolicyEditorState(newEditorState);
  };

  const updateKnowEditorContent = (newEditorState) => {
    setKnowEditorState(newEditorState);
  };

  const updateAskedQuestionsEditorContent = (newEditorState) => {
    setAskedQuestionsEditorState(newEditorState);
  };

  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  // const { leads } = useSelector((state) => state.category);
  const categoryLeads = useSelector((state) => state.category.leads);
  const destinationLeads = useSelector((state) => state.destination.leads);
  const emiratesLeads = useSelector((state) => state.emirates.leads);
  const itineraryLeads = useSelector((state) => state.itinerary.leads);



  useEffect(() => {
    const updatedSlug = slugify(tourData.tour_name);
    setTourData((prevData) => ({ ...prevData, slug: updatedSlug }));
  }, [tourData.tour_name]);

  // const updateEditorContent = (newEditorState, editorName) => {
  //   if (newEditorState instanceof EditorState) {
  //     setEditorStates((prevState) => ({
  //       ...prevState,
  //       [editorName]: newEditorState,
  //     }));
  //   } else {
  //     console.error("Invalid content:", newEditorState);
  //   }
  // };


  
  
  // if (category_info && Array.isArray(category_info)) {
  //   // Rest of your code that uses category_info.map
  // } else {
  //   // Handle the case where category_info is not an array or selectedTour is undefined
  //   console.error("Error: selectedTour or category_info is not as expected");
  // }
  // Destructuring with default values for the case when selectedTour is undefined


 

// console.log(leads)
// console.log(image)

  // const options = [
  //   { value: 1, label: "2012-2022 Travellers Choice" },
  //   { value: 2, label: "2023 Travellers Choice" },
  //   { value: 3, label: "ASTA" },
  // ];


  const availableEmirates = emiratesLeads.filter(emirates => {
    return !emiratesNamesArray.includes(emirates.name);
  });

  const availableItinerary = itineraryLeads.filter(itinerary => {
    return !itineraryNamesArray.includes(itinerary.itinerary_name);
  });

  // Check if decodeName and other variables are valid strings
  // Extract the decoded content from URL parameters

  // Check if decodeTourDetails is a valid string
  const handleFileChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    setShowPreview(true);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    if (tour_details) {
      try {
        const decodedValue = decodeURIComponent(tour_details);
        const parsedValue = JSON.parse(decodedValue);
        const contentState = convertFromRaw(parsedValue);
        const editorStateFromDescription =
          EditorState.createWithContent(contentState);
        setTourDetailsEditorState(editorStateFromDescription);
      } catch (error) {
        console.error("Error parsing JSON for decodeTourDetails:", error);
      }
    }
  }, [tour_details]);

  useEffect(() => {
    if (question) {
      try {
        const rawContent = JSON.parse(question);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromQuestion =
          EditorState.createWithContent(contentState);
        setQuestionEditorState(editorStateFromQuestion);
      } catch (error) {
        console.error("Error parsing JSON for decodeQuestion:", error);
      }
    }
  }, [question]);

  useEffect(() => {
    if (useful) {
      try {
        const rawContent = JSON.parse(useful);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromUseful =
          EditorState.createWithContent(contentState);
        setUsefulEditorState(editorStateFromUseful);
      } catch (error) {
        console.error("Error parsing JSON for useful:", error);
      }
    }
  }, [useful]);

  useEffect(() => {
    if (mail_body) {
      try {
        const rawContent = JSON.parse(mail_body);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromMailBody =
          EditorState.createWithContent(contentState);
        setMailBodyEditorState(editorStateFromMailBody);
      } catch (error) {
        console.error("Error parsing JSON for mail_body:", error);
      }
    }
  }, [mail_body]);

  useEffect(() => {
    if (included) {
      try {
        const rawContent = JSON.parse(included);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromIncluded =
          EditorState.createWithContent(contentState);
        setIncludedEditorState(editorStateFromIncluded);
      } catch (error) {
        console.error("Error parsing JSON for included:", error);
      }
    }
  }, [included]);

  useEffect(() => {
    if (exclusive) {
      try {
        const rawContent = JSON.parse(exclusive);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromExclusive =
          EditorState.createWithContent(contentState);
        setExclusiveEditorState(editorStateFromExclusive);
      } catch (error) {
        console.error("Error parsing JSON for exclusive:", error);
      }
    }
  }, [exclusive]);

  useEffect(() => {
    if (expect) {
      try {
        const rawContent = JSON.parse(expect);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromExpect =
          EditorState.createWithContent(contentState);
        setExpectEditorState(editorStateFromExpect);
      } catch (error) {
        console.error("Error parsing JSON for expect:", error);
      }
    }
  }, [expect]);

  useEffect(() => {
    if (policy) {
      try {
        const rawContent = JSON.parse(policy);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromPolicy =
          EditorState.createWithContent(contentState);
        setPolicyEditorState(editorStateFromPolicy);
      } catch (error) {
        console.error("Error parsing JSON for policy:", error);
      }
    }
  }, [policy]);

  useEffect(() => {
    if (know) {
      try {
        const rawContent = JSON.parse(know);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromKnow = EditorState.createWithContent(contentState);
        setKnowEditorState(editorStateFromKnow);
      } catch (error) {
        console.error("Error parsing JSON for know:", error);
      }
    }
  }, [know]);

  useEffect(() => {
    if (asked_questions) {
      try {
        const rawContent = JSON.parse(asked_questions);
        const contentState = convertFromRaw(rawContent);
        const editorStateFromAskedQuestion =
          EditorState.createWithContent(contentState);
        setAskedQuestionsEditorState(editorStateFromAskedQuestion);
      } catch (error) {
        console.error("Error parsing JSON for asked_questions:", error);
      }
    }
  }, [asked_questions]);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTourData({ ...tourData, [updateType]: value });
  };


  const [selectedCategory, setSelectedCategory] = useState({
    value: category_info,
    label: category_info,
  });
  const [selectedDestination, setSelectedDestination] = useState({
    value: decodeDestinationId,
    label: decodeDestinationId,
  });

  const mapCategoryNamesToIds = () => {
    const selectedCategoryIds = categoryLeads.find(
      (loc) => loc.name === selectedCategory.label
    );
    return selectedCategoryIds ? [selectedCategoryIds.id] : [];
  };
  const mapDestinationNamesToIds = () => {
    const selectedDestinationIds = destinationLeads.find(
      (loc) => loc.destination_name === selectedDestination.label
    );
    return selectedDestinationIds ? [selectedDestinationIds.id] : [];
  };
  const mapItineraryNamesToIds = () => {
    const selectedItineraryIds = itineraryLeads.find(
      (loc) => loc.itinerary_name === selectedItinerary.label
    );
    return selectedItineraryIds ? [selectedItineraryIds.id] : [];
  };

  const mapEmiratesNamesToIds = () => {
    const selectedEmiratesIds = emiratesLeads.find(
      (loc) => loc.emirates_name === selectedEmirates.label
    );
    return selectedEmiratesIds ? [selectedEmiratesIds.id] : [];
  };

  const categoryIds = mapCategoryNamesToIds();
  const destinationIds = mapDestinationNamesToIds();
  const emiratesIds = mapEmiratesNamesToIds();
  const itineraryIds = mapItineraryNamesToIds();
  const stickerIds = selectedStickers.map((sticker) => sticker.value);
  const popularTourIds = selectedPopularTour.value;

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
  };

  const handleStickerChange = (selected) => {
    setSelectedStickers(selected);
  };
  const handleEmiratesChange = (selected) => {
    setSelectedEmirates(selected);
  };
  const handlePopularTourChange = (selected) => {
    setSelectedPopularTour(selected);
  };
  const handleItineraryChange = (selected) => {
    setSelectedItinerary(selected);
  };
  const handleDestinationChange = (selected) => {
    setSelectedDestination(selected);
  };
  useEffect(() => {
    dispatch(getEmiratesContent());
    dispatch(getDestinationContent());
    dispatch(getCategoryContent());
    dispatch(getItineraryContent());
  }, []);

  const updateCategoryInAPI = () => {
    const tourNameValue = tourData.tour_name || tourData.tour_name_input || tour_name;
    const tourSlug = tourData.slug
    const tourPriceAed = tourData.tour_price_aed || tourData.tour_price_aed || tour_price_aed;
    const tourPriceUsd = tourData.tour_price_usd || tourData.tour_price_usd || tour_price_usd;
    const tourHastag = tourData.hastag || hastag;
    const tourDiscount = tourData.discount || discount;
    const tourDuration = tourData.tour_duration || tour_duration
    const tourMetaTitle = tourData.meta_title || meta_title;
    const tourMetaDescription = tourData.meta_description || meta_description;
    const tourMetaKeywords = tourData.meta_keywords || meta_keywords
    const tourIntro = tourData.intro || intro


    if (!tourNameValue) {
      setErrorMessage("Please enter a tour name");
      return;
    }
    const tourDetailsContentState = tourDetailsEditorState.getCurrentContent();
    const tour_details = JSON.stringify(convertToRaw(tourDetailsContentState));

    const questionContentState = questionEditorState.getCurrentContent();
    const question = JSON.stringify(convertToRaw(questionContentState));

    const usefulContentState = usefulEditorState.getCurrentContent();
    const useful = JSON.stringify(convertToRaw(usefulContentState));

    const mailBodyContentState = mailBodyEditorState.getCurrentContent();
    const mail_body = JSON.stringify(convertToRaw(mailBodyContentState));

    const includedContentState = includedEditorState.getCurrentContent();
    const included = JSON.stringify(convertToRaw(includedContentState));

    const exclusiveContentState = exclusiveEditorState.getCurrentContent();
    const exclusive = JSON.stringify(convertToRaw(exclusiveContentState));

    const expectContentState = expectEditorState.getCurrentContent();
    const expect = JSON.stringify(convertToRaw(expectContentState));

    const policyContentState = policyEditorState.getCurrentContent();
    const policy = JSON.stringify(convertToRaw(policyContentState));

    const knowContentState = knowEditorState.getCurrentContent();
    const know = JSON.stringify(convertToRaw(knowContentState));

    const askedQuestionsContentState =
      askedQuestionsEditorState.getCurrentContent();
    const asked_questions = JSON.stringify(
      convertToRaw(askedQuestionsContentState)
    );

    // Get the editor's content as JSON
    // const contentState = editorState.getCurrentContent();
    // const description = JSON.stringify(convertToRaw(contentState));

    // if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
    //   setErrorMessage("Please enter a description");
    //   return;
    // }

    setLoading(true);

    dispatch(
      updateTourName({
       
        newName: tourNameValue,
        newImage: localStorage.getItem("filename"),
        newGalleryData : localStorage.getItem("filename"),
        newCategoryId: categoryIds,
        newEmiratesId: emiratesIds,
        newStickerId: stickerIds,
        newSlug: tourSlug,
        newItineraryId: itineraryIds,
        newHastag: tourHastag,
        newDiscount: tourDiscount,
        newIntro: tourIntro,
        newTourDestination: destinationIds,
        newPopularTour: popularTourIds,
        newTourDetails: tour_details,
        newQuestion: question,
        newUseful: useful,
        newMailBody: mail_body,
        newIncluded: included,
        newExclusive: exclusive,
        newExpect: expect,
        newPolicy: policy,
        newKnow: know,
        newAskedQuestion: asked_questions,
        newPriceAed: tourPriceAed,
        newPriceUsd: tourPriceUsd,
        newTourDuration: tourDuration,
        newMetaTitle: tourMetaTitle,
        newMetaDescription: tourMetaDescription,
        newMetaKeywords: tourMetaKeywords,
      })
    )
      .then(() => {
        dispatch(
          showNotification({ message: "Toue Updated Successfully!", status: 1 })
        );
        setLoading(false);

        // Update the defaultEditorContent with the current editor content
        navigate("/app/tours");
      })
      .catch((error) => {
        console.error("Error updating tour:", error);
        setErrorMessage("Error updating tour. Please try again.");
        setLoading(false);
      });
  };


  return (
    <>
      <TitleCard title="Update Tours" topMargin="mt-2">
      {tourName !== "N/A" ? (
        <InputText
          type="text"
          defaultValue={tourName}
          placeholder="Tour Name"
          isRequired={true}
          updateType="tour_name"
          containerStyle="mt-4"
          labelTitle="Tour Name"
          updateFormValue={updateFormValue}
        />
        ) : (
          <p></p>
        )}
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
            <label className="label">
              <span className={"label-text text-base-content "}>
                Select Emirates <span style={{ color: "red" }}>*</span>
              </span>
            </label>

            <Select
              isMulti
              options={availableEmirates.map((lead) => ({
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
              options={availableItinerary.map((lead) => ({
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
          {tourName !== "N/A" ? (
          <InputText
            type="text"
            defaultValue={hastag}
            placeholder="Hastag"
            updateType="hastag"
            containerStyle="mt-4"
            labelTitle="Hastag"
            updateFormValue={updateFormValue}
          />
          ):(
            <p></p>
          )}

        </div>
        <div className="flex space-x-14">
        {tourName !== "N/A" ? (
          <InputText
            type="text"
            defaultValue={discount}
            placeholder="Discount %"
            updateType="discount"
            containerStyle="mt-4"
            labelTitle="Discount %"
            updateFormValue={updateFormValue}
          />
        ):(
          <p></p>
        )}

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
        {tourName !== "N/A" ? (
        <TextAreaInput
          type="text"
          defaultValue={intro}
          placeholder="Tour Intro"
          updateType="intro"
          containerStyle="mt-4"
          labelTitle="Intro"
          updateFormValue={updateFormValue}
        />):(<p></p>)}

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Tour Details</span>
        </label>

        <Editor
          editorState={tourDetailsEditorState}
          onEditorStateChange={updateTourDetailsEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Question</span>
        </label>
        <Editor
          editorState={questionEditorState}
          onEditorStateChange={updateQuestionEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            That's Useful To Know
          </span>
        </label>
        <Editor
          editorState={usefulEditorState}
          onEditorStateChange={updateUsefulEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Mail Body</span>
        </label>
        <Editor
          editorState={mailBodyEditorState}
          onEditorStateChange={updateMailBodyEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            What's Included
          </span>
        </label>
        <Editor
          editorState={includedEditorState}
          onEditorStateChange={updateIncludedEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />
        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            What's Exclusive
          </span>
        </label>
        <Editor
          editorState={exclusiveEditorState}
          onEditorStateChange={updateExclusiveEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>What To Expect</span>
        </label>
        <Editor
          editorState={expectEditorState}
          onEditorStateChange={updateExpectEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            Cancellation Policy
          </span>
        </label>
        <Editor
          editorState={policyEditorState}
          onEditorStateChange={updatePolicyEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            That’s Useful To Know
          </span>
        </label>
        <Editor
          editorState={knowEditorState}
          onEditorStateChange={updateKnowEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>
            Frequently Asked Questions
          </span>
        </label>
        <Editor
          editorState={askedQuestionsEditorState}
          onEditorStateChange={updateAskedQuestionsEditorContent}
          editorStyle={{ border: "1px solid #e5e7eb", height: "350px" }}
        />

        <div className="flex space-x-14">
        {tourName !== "N/A" ? (
          <InputText
            type="text"
            defaultValue={tour_price_aed}
            placeholder="Tour Price (AED)"
            isRequired={true}
            updateType="tour_price_aed"
            containerStyle="mt-4"
            labelTitle="Tour Price (AED)"
            updateFormValue={updateFormValue}
          />):(<p></p>)}
          {tourName !== "N/A" ? (
          <InputText
            type="text"
            defaultValue={tour_price_usd}
            placeholder="Tour Price (USD)"
            isRequired={true}
            updateType="tour_price_usd"
            containerStyle="mt-4"
            labelTitle="Tour Price (USD)"
            updateFormValue={updateFormValue}
          />):(<p></p>)}
        </div>
        {tourName !== "N/A" ? (
        <InputText
          type="text"
          defaultValue={tour_duration}
          placeholder="Tour Duration"
          isRequired={true}
          updateType="tour_duration"
          containerStyle="mt-4"
          labelTitle="Tour Duration"
          updateFormValue={updateFormValue}
        />):(<p></p>)}

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Feature Image</span>
        </label>
        <UploadSingleFiles updateImageFilename={updateFormValue} />
        <img src={`http://127.0.0.1:8800/data/uploads/${image}`} alt=""  height="100px" width="100px"/>

        <label className="label font-semibold">
        <span className={"label-text text-base-content"}>Gallery Image</span>
      </label>
      <UploadGalleryFiles updateImageFilename={updateFormValue}/>
      <img src={`http://127.0.0.1:8800/data/uploads/`} alt=""  height="100px" width="100px"/>

        {tourName !== "N/A" ? (
        <InputText
          type="text"
          defaultValue={meta_title}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />):(<p></p>)}
        {tourName !== "N/A" ? (
        <TextAreaInput
          type="text"
          defaultValue={meta_description}
          placeholder="Meta Description"
          containerStyle="mt-4"
          updateType="meta_description"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue}
        />):(<p></p>)}

        {tourName !== "N/A" ? (
        <TextAreaInput
          type="text"
          defaultValue={meta_keywords}
          placeholder="Meta Keyword"
          containerStyle="mt-4"
          updateType="meta_keywords"
          labelTitle="Meta Keyword"
          updateFormValue={updateFormValue}
        />):(<p></p>)}

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <Link to="/app/tours" className="btn btn-ghost">
            Cancel
          </Link>
          <button
            className="btn btn-primary px-6"
            onClick={() => updateCategoryInAPI()}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateTourModalBody;