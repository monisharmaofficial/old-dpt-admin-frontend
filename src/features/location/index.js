import React, { useEffect, useState } from "react";
import moment from "moment";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal, closeModal } from "../common/modalSlice";
import { setLocationData } from "./locationSlice";
import {getLocationContent} from "./locationSlice";

import { MODAL_BODY_TYPES} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToggleInput from "../../components/ToogleInput/LocationToogle";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLocationModal = () => {
    dispatch(
      openModal({
        title: "Add New location",
        bodyType: MODAL_BODY_TYPES.LOCATION_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <Link to="/app/hotel-location-add" className="btnblue">
        Add New
      </Link>
    </div>
  );
};

function Location() {
  const dispatch = useDispatch();
  const [defaultName, setDefaultName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [upId, setUpId] = useState("");
  const {  locations } = useSelector((state) => state.location);

  

  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResults =  locations.filter((l) =>
      l.location_name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  };
  const deleteCurrentLocation = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_LOCATION,
        extraObject: {
          message: `Are you sure you want to delete this location?`,
          id, // Pass the location ID for deletion
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
  }, [searchText,  locations]);

  const leadsToRender = searchText ? filteredLeads :  locations;

  const updateFormValue = ({ updateType, value }) => {
    console.log(`Update ${updateType} to ${value}`);
  };

  useEffect(() => {
    dispatch(getLocationContent());
  }, [ locations.id]);


  const openUpdateNewLocationModal = (id, catgname, l) => {
    setUpId(id);
    setDefaultName(catgname);
    dispatch(setLocationData({ id, name: catgname }));
    dispatch(
      openModal({
        title: "Update Location",
        bodyType: MODAL_BODY_TYPES.LOCATION_UPDATE_NEW,
        locationId: id, // Pass the 'id' received as an argument
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Location"
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
                <th>Location Name</th>
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
                          <div className="font-bold">{l.location_name}</div>
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
                      locationId={l.id}
                    />

                      </td>
                      <td>
                      <Link
                      to={`/app/hotel-location-update/?id=${l.id}=${l.location_name}`}
                   
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
                          onClick={() => deleteCurrentLocation(l.id)}
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

export default Location;