import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal, closeModal } from "../common/modalSlice";
import { setAgentsData } from "./userSlice";
import {
  deleteOurAgents,
  deleteAgents,
  getAgentsContent,
} from "./userSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import UpdateAgentsModalBody from "./components/UpdateAgentModalBody";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToggleInput from "../../components/ToogleInput/AgentToogle";
import SearchBar from "../../components/Input/SearchBar";
{/* */}
const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewAgentsModal = () => {
    dispatch(
      openModal({
        title: "Add New Agents",
        bodyType: MODAL_BODY_TYPES.AGENT_ADD_NEW
      })
    );
  };

  return (
    <div className="inline-block float-right">
      {/*<Link to="/app/add-agents" className="btnblue" >
        Add New
  </Link>*/}
    </div>
  );
};

const Agents = () => {
  const dispatch = useDispatch();
  const [defaultName, setDefaultName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [upId, setUpId] = useState("");
  const { leads } = useSelector((state) => state.agents);


  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResults = leads.filter(l =>
      l.email.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  }
  const deleteCurrentAgents = (id) => {
    dispatch(
      openModal({
        title: "Confirmation Agent",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_AGENTS,
        extraObject: {
          message: `Are you sure you want to delete this Agent?`,
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
  }, [searchText]);

  const leadsToRender = searchText ? filteredLeads : leads;


  const updateFormValue = ({ updateType, value }) => {
    console.log(`Update ${updateType} to ${value}`);
  };

  useEffect(() => {
    dispatch(getAgentsContent()); // Dispatch the action to fetch data
    dispatch(deleteOurAgents())
  }, []);

  const openUpdateNewAgentsModal = (id, l) => {
    setUpId(id);

    dispatch(setAgentsData({ id }));
    dispatch(
      openModal({
        title: "Update Agents",
        bodyType: MODAL_BODY_TYPES.AGENT_UPDATE_NEW,
        agentsId: id, // Pass the 'id' received as an argument
      })
    );
  };

  return (
    <>
      <TitleCard title="Current User" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        <div className="flex justify-between items-center mb-4">
          <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
        </div>

        {/* Agents List in table format loaded from slice after api call */}
        <div className="listtable">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Country</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...leadsToRender].reverse().map((l, k) => {
                if (l) {
                  return (
                    <tr key={l.id}>
                      <td>{k + 1}</td>
                      <td>{l.first_name}</td>
                      <td>{l.email}</td>
                      <td>{l.phoneno}</td>
                      <td>{l.country}</td>
                      <td>{l.address}</td>

                      <td>
                        <ToggleInput
                          className="toggle-item"
                          labelStyle="some-style"
                          type="checkbox"
                          containerStyle="container-style"
                          defaultValue={l.status}
                          updateFormValue={updateFormValue}
                          agentsId={l.id}
                        />
                      </td>

                      <td>
                       {/* <Link to={`/app/update-agents/?id=${l.id}=${l.first_name}=${l.email}=${l.phoneno}=${l.country}=${l.state}=${l.city}=${l.zip}=${l.address}`} className="btn btn-square btn-ghost" >
                          <span style={{ color: 'green', padding: '4px', borderRadius: '50%' }}>
                            <PencilSquareIcon className="w-5" />
                          </span>
                        </Link> */}
                        <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentAgents(l.id)}>
                          <span style={{ color: 'red', padding: '4px', borderRadius: '50%' }}>
                            <TrashIcon className="w-5" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Agents;