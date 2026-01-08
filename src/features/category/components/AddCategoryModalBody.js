import React, { useState, useEffect } from "react";
import slugify from 'react-slugify';
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewCategory, getCategoryContent } from "../categorySlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";


import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { useNavigate } from "react-router-dom";

const INITIAL_CATEGORY_OBJ = {
  name: "",
  parent_id: "",
  short_description: "",
  slug:"",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keywords:""
};

function AddCategoryModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryData, setCategoryData] = useState(INITIAL_CATEGORY_OBJ);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const closeModal =()=>{
    navigate('/app/category')
  }


  useEffect(() => {
    dispatch(getCategoryContent());
  }, [dispatch]);

  useEffect(() => {
    const updatedSlug = slugify(categoryData.name);
    setCategoryData((prevData) => ({ ...prevData, slug: updatedSlug }));
  }, [categoryData.name]);

  const { leads } = useSelector((state) => state.category);

  const uploadImageToPublicFolder = () => {
    const { name, parent_id, slug,meta_title, short_description, meta_description,meta_keywords } = categoryData;
    
    if (!name) {
      setErrorMessage("Please enter a category name");
      return;
    }
    if (!short_description) {
      setErrorMessage("Please enter a short description");
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

  
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const description = JSON.stringify(rawContentState);
  
    // Check if the description is empty
    if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
      setErrorMessage("Please enter a description");
      return;
    }
  
    setLoading(true);
  
    dispatch(
      addNewCategory({
        name: name,
        parent_id: parent_id,
        image: localStorage.getItem("filename"),
        meta_title: meta_title,
    
        short_description: short_description,
        description: description,
        meta_description: meta_description,
        meta_keywords: meta_keywords,
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New Category Added!", status: 1 }));
        setLoading(false);
        // Use the navigate function to navigate to the desired URL
        navigate("/app/category");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding category:", error);
        setErrorMessage("Error adding category. Please try again.");
        setLoading(false);
      });
  };
  


  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCategoryData({ ...categoryData, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Category" topMargin="mt-2" >
        <label className="label">
          <span className={"label-text text-base-content"}>Parent Category</span>
        </label>
        <select
          className="select select-bordered w-full"
          onChange={(e) =>
            setCategoryData({ ...categoryData, parent_id: e.target.value })
          }
          value={categoryData.parent_id}
        >
          <option value="">Select Parent Category</option>
          {leads.map((l, k) => {
            if (l && l.parent_id === 0) {
              return (
                <option key={k} value={l.id}>
                  {l.name}
                </option>
              );
            }
            return null;
          })}

        </select>

        <InputText
        type="text"
        defaultValue={categoryData.name}
        placeholder="Category Name"
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Category Name"
        updateFormValue={updateFormValue}
        isRequired={true}
      />
  

        <TextAreaInput type="text" defaultValue={categoryData.short_description}
          placeholder="Short Description"
          containerStyle="mt-4"
          updateType="short_description"
          labelTitle="Short Description"
          updateFormValue={updateFormValue} />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Description</span>
        </label>

        <Editor
          editorState={editorState}
          onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
          editorStyle={{ border: "1px solid #e5e7eb" }}

        />



        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>Banner</span>
        </label>
        <UploadSingleFiles />
        
        <InputText
          type="text"
          defaultValue={categoryData.meta_title}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput type="text" defaultValue={categoryData.meta_keywords}
          placeholder="Meta Keyword"
          updateType="meta_keywords"
          containerStyle="mt-4"
          labelTitle="MetaKeyword"
          updateFormValue={updateFormValue} />

        <TextAreaInput type="text" defaultValue={categoryData.meta_description}
          placeholder="Meta Description"
          updateType="meta_description"
          containerStyle="mt-4"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue} />



        {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
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

export default AddCategoryModalBody;
