import React, { useEffect, useState } from "react";
import moment from "moment";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal, closeModal } from "../common/modalSlice";
import { setCategoryData } from "./categorySlice";
import {getCategoryContent} from "./categorySlice";
import { MODAL_BODY_TYPES} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToggleInput from "../../components/ToogleInput/CategoryToogle";
import SearchBar from "../../components/Input/SearchBar";
import config from '../../config'

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Add New Category",
        bodyType: MODAL_BODY_TYPES.CATEGORY_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <Link to="/app/category-add" className="btnblue">
        Add New
      </Link>
    </div>
  );
};

function Category() {
  const dispatch = useDispatch();
  const [defaultName, setDefaultName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [upId, setUpId] = useState("");
  const { leads } = useSelector((state) => state.category);

  

  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResults = leads.filter((l) =>
      l.name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  };
  const deleteCurrentCategory = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Category?`,
          id, // Pass the category ID for deletion
        },
      })
    );
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText, leads]);

  const leadsToRender = searchText ? filteredLeads : leads;

  const updateFormValue = ({ updateType, value }) => {
  };

  useEffect(() => {
    dispatch(getCategoryContent());
  }, [leads.id]);



  return (
    <>
      <TitleCard
        title="Current Category"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="flex justify-between items-center mb-4">
          <SearchBar
            searchText={searchText}
            styleClass="mr-4"
            setSearchText={setSearchText}
          />
        </div>
        <div className="listtable">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Banner</th>
                <th>Category Name</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...leadsToRender].reverse().map((l, k) => {
                // Check if 'l' is defined before accessing its properties
                if (l) {
                  return (
                    <tr key={l.id}>
                      <td>{k + 1}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask w-12 h-12 radius">
                              {/* Check if 'image' is defined before rendering */}
                              <img src={`${config.baseUrl}/data/uploads/${l.image}`} width={`100px`} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </td>
                      <td>{moment(l.updated_at).format("DD-MM-YYYY")}</td>
                      <td>
                        <ToggleInput
                          className="toggle-item"
                          labelStyle="some-style"
                          type="checkbox"
                          containerStyle="container-style"
                          defaultValue={l.status}
                          updateFormValue={updateFormValue}
                          categoryId={l.id} 
                        />

                      </td>
                      <td>
                      <Link
                      to={`/app/category-update/?id=${l.id}=${l.name}=${l.short_description}=${l.meta_title}=${l.meta_description}=${l.description}=${l.meta_keywords}=${l.image}=${l.parent_id}`}
                   
                      className="btn btn-square btn-ghost"
                    >
                      <span
                        style={{
                          color: "green",
                          padding: "4px",
                          borderRadius: "50%",
                        }}
                      >
                        <PencilSquareIcon className="w-5" />
                      </span>
                    </Link>
                    
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentCategory(l.id)}
                        >
                          <span
                            style={{
                              color: "red",
                              padding: "4px",
                              borderRadius: "50%",
                            }}
                          >
                            <TrashIcon className="w-5" />
                          </span>
                        </button>

                      </td>
                    </tr>
                  );
                } else {
                  // Handle the case where 'l' is undefined (if needed)
                  return null; // or some other fallback UI
                }
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Category;