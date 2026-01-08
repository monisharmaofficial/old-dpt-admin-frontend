import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal, closeModal } from "../common/modalSlice";
import { setTourData } from "./tourSlice";
import { getTourContent } from "./tourSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToogleInput from "../../components/ToogleInput/TourToogle";
import SearchBar from "../../components/Input/SearchBar";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import config from '../../config'

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewTourModal = () => {
    dispatch(
      openModal({
        title: "Add New Tour",
        bodyType: MODAL_BODY_TYPES.TOUR_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <Link to="/app/tours-add" className="btnblue">
        Add New
      </Link>
    </div>
  );
};

function Tour() {
  const dispatch = useDispatch();
  const [defaultName, setDefaultName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [upId, setUpId] = useState("");
  const { leads } = useSelector((state) => state.tour);



  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResults = leads.filter((l) =>
      l.tour_name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  };
  const deleteCurrentTour = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_TOUR,
        extraObject: {
          message: `Are you sure you want to delete this Tour?`,
          id, // Pass the Tour ID for deletion
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
    dispatch(getTourContent());
  }, [dispatch]);
  

  const openAddDetailsModal = (lead) => {
    const decodeExclusive = lead.tour_details; // Assuming 'decodeExclusive' contains your JSON data

    // Convert JSON data to ContentState
    const rawContent = JSON.parse(decodeExclusive);
    const contentState = convertFromRaw(rawContent);

    // Create an EditorState using the ContentState
    const editorState = EditorState.createWithContent(contentState);

    dispatch(
      openModal({
        title: lead.tour_name,
        leadData: lead,
        details: (
          <div>
            <Editor editorState={editorState} readOnly={true} />
          </div>
        ),
      })
    );
  };



  return (
    <>

      <TitleCard title="Current Tours" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

        <div className="flex justify-between items-center mb-4">
          <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
        </div>

        {/* Leads List in table format loaded from slice after api call */}
        <div className="listtable">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Tour Name</th>
                <th>Price(AED)</th>
                <th>Price(USD)</th>
                <th>Duration</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                [...leadsToRender].reverse().map((l, k) => {
                  if (l) {
                    return (
                      <tr key={k}>
                        <td>
                          {k + 1}
                        </td>
                        <td>
                          <div>
                            <div className="font-bold">{l.tour_name}</div>
                          </div>
                        </td>
                  

                        
                        <td>
                          <div>
                            <div className="">{l.tour_price_aed}</div>
                          </div>
                        </td>

                        <td>
                          <div>
                            <div className="">{l.tour_price_usd}</div>
                          </div>
                        </td>

                        <td>
                          <div>
                            <div className="">{l.tour_duration}</div>
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
                          <ToogleInput
                            className="toggle-item"
                            labelStyle="some-style"
                            type="checkbox"
                            containerStyle="container-style"
                            defaultValue={l.status}
                            updateFormValue={updateFormValue}
                            tourId={l.id}
                          />
                        </td>

                        <td>
                          <Link to={`/app/tours-update/?id=?${l.id}`} className="btn btn-square btn-ghost" >
                            <span style={{ color: 'green', padding: '4px', borderRadius: '50%' }}>
                              <PencilSquareIcon className="w-5" />
                            </span>
                          </Link>
                          <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentTour(l.id)}>
                            <span style={{ color: 'red', padding: '4px', borderRadius: '50%' }}>
                              <TrashIcon className="w-5" />
                            </span>
                          </button>
                        </td>
                      </tr>
                    )
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
  )
}



export default Tour