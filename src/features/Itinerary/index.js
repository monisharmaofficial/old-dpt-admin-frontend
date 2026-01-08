import React, { useEffect, useState } from "react";
import moment from "moment";
import config from '../../config'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal, closeModal } from "../common/modalSlice";
import { settineraryData } from "./itinerarySlice";
import { getItineraryContent } from "./itinerarySlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToggleInput from "../../components/ToogleInput/ItineraryToogle";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewItineraryModal = () => {
    dispatch(
      openModal({
        title: "Add New itinerary",
        bodyType: MODAL_BODY_TYPES,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <Link to="/app/itinerary-add" className="btnblue">
        Add New
      </Link>
    </div>
  );
};

function Itinerary() {
  const dispatch = useDispatch();
  const [defaultName, setDefaultName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [upId, setUpId] = useState("");
  const { leads } = useSelector((state) => state.itinerary);


  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResults = leads.filter((l) =>
      l.itinerary_name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  };
  const deleteCurrentItinerary = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_ITINERARY,
        extraObject: {
          message: `Are you sure you want to delete this itinerary?`,
          id, // Pass the itinerary ID for deletion
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
    console.log(`Update ${updateType} to ${value}`);
  };

  useEffect(() => {
    dispatch(getItineraryContent());
  }, [leads.id]);

  const openUpdateNewItineraryModal = (id, catgname, l) => {
    setUpId(id);
    setDefaultName(catgname);
    dispatch(({ id, name: catgname }));
    dispatch(
      openModal({
        title: "Update itinerary",
        bodyType: MODAL_BODY_TYPES,
        itineraryId: id, // Pass the 'id' received as an argument
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Itinerary"
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
                <th>Itinerary Name</th>
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
                          <div className="font-bold">{l.itinerary_name}</div>
                        </div>
                      </td>
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

                      <td>{moment(l.updated_at).format("DD-MM-YYYY")}</td>
                      <td>
                        <ToggleInput
                          className="toggle-item"
                          labelStyle="some-style"
                          type="checkbox"
                          containerStyle="container-style"
                          defaultValue={l.status}
                          updateFormValue={updateFormValue}
                          itineraryId={l.id}
                        />

                      </td>
                      <td>
                        <Link
                          to={`/app/itinerary-update/?id=${l.id}=${l.itinerary_name}=${l.itinerary_description}=${l.image}`}

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
                          onClick={() => deleteCurrentItinerary(l.id)}
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

export default Itinerary;