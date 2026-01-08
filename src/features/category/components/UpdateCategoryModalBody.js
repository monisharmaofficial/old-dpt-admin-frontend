import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from 'react-slugify';
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { updateCategoryName, getCategoryContent } from "../categorySlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useNavigate } from "react-router-dom";

const INITIAL_CATEGORY_OBJ = {
  name: "",
  slug:"",
  parent_id: "",
  image:"",
  short_description: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: ""
};

function UpdateCategoryModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryData, setCategoryData] = useState(INITIAL_CATEGORY_OBJ);

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText("");
    return EditorState.createWithContent(contentState);
  });

  const navigate = useNavigate();
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

  const updateEditorContent = (newContent) => {
    const newContentState = ContentState.createFromText(newContent);
    const newEditorState = EditorState.createWithContent(newContentState);
    setEditorState(newEditorState);
  };


  const { leads } = useSelector((state) => state.category);
  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const name = spliturl[2];
  const decodeName = decodeURIComponent(name);
  const short_description = spliturl[3];
  const decodeShort_description = decodeURIComponent(short_description);
  const meta_title = spliturl[4];
  const decodeMeta_Title = decodeURIComponent(meta_title);
  const meta_description = spliturl[5];
  const decodeMeta_description = decodeURIComponent(meta_description);
  const ourDescription = spliturl[6];
  const decodeDescription = decodeURIComponent(ourDescription);
  const ourMetaKeyword = spliturl[7];
  const decodeMetaKeyword = decodeURIComponent(ourMetaKeyword);
  const ourImage = spliturl[8];
  const decodeImage= decodeURIComponent(ourImage);
  const ourParentId = spliturl[9];
  const decodeParentId= decodeURIComponent(ourParentId);
  console.log(decodeParentId)

  // Parse the JSON description and convert it to EditorState



  // Set the initial editorState from the description
  useEffect(() => {
    const rawContent = JSON.parse(decodeDescription);
    const contentState = convertFromRaw(rawContent);
    const editorStateFromDescription = EditorState.createWithContent(contentState);
    setEditorState(editorStateFromDescription);
  }, [setEditorState]);

  const updateCategoryInAPI = () => {
    const categoryNameValue = categoryData.name || decodeName || "";
    const categoryMetaTitle = categoryData.meta_title || decodeMeta_Title;
    const catyegoryShortDescription = categoryData.short_description || decodeShort_description;
    const categoryMetaDescription = categoryData.meta_description || decodeMeta_description;
    const categoryMetaKeyword = categoryData.meta_keywords || decodeMetaKeyword;
    const categoryParentId = categoryData.parent_id || decodeParentId;
    const categorySlug = categoryData.slug 
    const categoryImage = categoryData.image || decodeImage;

  
    const { parent_id,slug,newParentId } = categoryData;
  
    if (!categoryNameValue.trim()) {
      setErrorMessage("Please enter a category name");
      return;
    }
  
    // Get the editor's content as JSON
    const contentState = editorState.getCurrentContent();
    const description = JSON.stringify(convertToRaw(contentState));
  
    if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
      setErrorMessage("Please enter a description");
      return;
    }
  
    setLoading(true);
  
    dispatch(
      updateCategoryName({
        id: id,
        newName: categoryNameValue,
        parent_id: parent_id,
        newImage: localStorage.getItem("filename"),
        slug:slug,
        newSlug:categorySlug,
        newShortDescription: catyegoryShortDescription,
        newDescription: description,
        newMetaTitle: categoryMetaTitle,
        newMetaKeyword: categoryMetaKeyword,
        newMetaDescription: categoryMetaDescription,
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "Category Updated Successfully!", status: 1 }));
        setLoading(false);
  
        // Update the defaultEditorContent with the current editor content
        navigate("/app/category");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        setErrorMessage("Error updating category. Please try again.");
        setLoading(false);
      });
  };


  const updateFormValue = ({ updateType, value,newFilename }) => {
    setErrorMessage("");
    setCategoryData({ ...categoryData, [updateType]: value ,image: newFilename});
  };

  return (
    <>
      <TitleCard title="Update Category" topMargin="mt-2">
        <label className="label">
          <span className={"label-text text-base-content"}>Parent Category</span>
        </label>
        <select
        className="select select-bordered w-full"
        onChange={(e) =>
          updateFormValue({ updateType: "parent_id", value: e.target.value })
        }
        value={categoryData.parent_id || "" || decodeParentId}
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
          defaultValue={decodeName || ""}
          placeholder="Category Name"
          updateType="name"
          containerStyle="mt-4"
          labelTitle="Category Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <TextAreaInput
          type="text"
          defaultValue={decodeShort_description}
          placeholder="Short Description"
          updateType="short_description"
          containerStyle="mt-4"
          labelTitle="Short Description"
          updateFormValue={updateFormValue}
        />

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Description</span>
        </label>

        <Editor
          editorState={editorState}
          onEditorStateChange={(newEditorState) => {
            setEditorState(newEditorState);
          }}
          editorStyle={{ border: "1px solid #e5e7eb" }}
        />

        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>Banner</span>
        </label>
        <UploadSingleFiles updateImageFilename={updateFormValue} />
        <img src={`http://127.0.0.1:8800/data/uploads/${decodeImage}`} alt=""  height="100px" width="100px"/>

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
        updateType="meta_keywords"
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

        {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={updateCategoryInAPI}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateCategoryModalBody;
