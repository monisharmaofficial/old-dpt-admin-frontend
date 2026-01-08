import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { setEmiratesData } from "./emiratesSlice";
import { getEmiratesContent } from "./emiratesSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToggleInput from "../../components/ToogleInput/EmiratesToogle";
import SearchBar from "../../components/Input/SearchBar";
import config from "../../config";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  return (
    <div className="inline-block float-right">
      <Link to="/app/emirates-add" className="btnblue">
        Add New
      </Link>
    </div>
  );
};

function Emirates() {
  const { leads } = useSelector((state) => state.emirates);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [upId, setUpId] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]); // State to hold filtered leads

  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]); // Clear the filtered results when removing the filter
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    // Filter the leads based on the search text
    const filteredResults = leads.filter((l) =>
      l.name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  };
  const deleteCurrentEmirates = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_EMIRATES,
        extraObject: {
          message: `Are you sure you want to delete this Emirates?`,
          id,
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

  // Use leads to render, but if searchText is not empty, use filteredLeads
  const leadsToRender = searchText ? filteredLeads : leads;

  const updateFormValue = ({ updateType, value }) => {
    console.log(`Update ${updateType} to ${value}`);
  };

  useEffect(() => {
    dispatch(getEmiratesContent());
  }, []);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Emirates?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  const openUpdateNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Update Emirates",
        bodyType: MODAL_BODY_TYPES.EMIRATES_UPDATE_NEW,
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Emirates"
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
                <th>Emirates</th>
                <th>Country</th>
                <th>Image</th>
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
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{l.destination_name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask w-12 h-12 radius">
                              {/* Check if 'image' is defined before rendering */}
                              <img
                                src={`${config.baseUrl}/data/uploads/${l.image}`}
                                width={`100px`}
                                alt=""
                              />
                            </div>
                          </div>
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
                          emiratesId={l.id}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/app/emirates-update?id=${l.id}=${l.name}=${l.meta_title}=${l.meta_description}=${l.meta_keyword}=${l.image}`}
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
                          onClick={() => deleteCurrentEmirates(l.id)}
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

export default Emirates;
