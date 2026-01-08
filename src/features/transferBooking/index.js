import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteAgent, getAgentsContent } from "./agentSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import { showNotification } from '../common/headerSlice';
import ToogleInput from "../../components/Input/ToogleInput";
import SearchBar from '../../components/Input/SearchBar';
import { RECENT_AGENT } from "../../utils/dummyData";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewAgentModal = () => {
    dispatch(openModal({ title: "Add New Agents", bodyType: MODAL_BODY_TYPES.AGENT_ADD_NEW }));
  };

  return (
    <div className="inline-block float-right">
    
    </div>
  );
};

const Agents = () => {
  const { leads } = useSelector(state => state.lead);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);

  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredResults = leads.filter(l => l.email.toLowerCase().includes(lowerCaseValue));
    setFilteredLeads(filteredResults);
  }

  useEffect(() => {
    dispatch(getAgentsContent());
  }, []);

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const deleteCurrentLead = (index) => {
    dispatch(openModal({
      title: "Confirmation",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this Agent?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
    }));
  };

  const openAddNewAgentModal = () => {
    dispatch(openModal({ title: "Update Booking", bodyType: MODAL_BODY_TYPES.AGENT_UPDATE_NEW }));
  };

  const leadsToRender = searchText ? filteredLeads : leads;
  const updateFormValue = ({ updateType, value }) => {
    console.log(`Update ${updateType} to ${value}`);
  };

  return (
    <>
      <TitleCard title="List all transfer service bookings" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        <div className="flex justify-between items-center mb-4">
       
        </div>

        {/* Agents List in table format loaded from slice after api call */}
        <div className="listtable">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Emirates</th>
                <th>Booking From</th>
                
                <th>Booking Date</th>
                <th>Tour Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { leadsToRender.map((l, k)=> {
                return (
                  <tr key={k}>
                    <td>{l.id}</td>
                    <td>{l.emirates}</td>
                    <td>{l.booking_from}</td>
                  
                    
                    <td>{moment(new Date()).add(-5 * (k + 9), 'days').format("DD MMM YY")}</td>
                    <td>{moment(new Date()).add(-5 * (k + 2), 'days').format("DD MMM YY")}</td>

                    <td>
                      <ToogleInput
                        labelStyle="some-style"
                        type="checkbox"
                        containerStyle="container-style"
                        defaultValue={l.someValue}
                        updateFormValue={updateFormValue}
                      />
                    </td>

                    <td>
                      <button className="btn btn-square btn-ghost" onClick={() => openAddNewAgentModal()}>
                        <span style={{ color: 'green', padding: '4px', borderRadius: '50%' }}>
                          <PencilSquareIcon className="w-5" />
                        </span>
                      </button>
                      <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead()}>
                        <span style={{ color: 'red', padding: '4px', borderRadius: '50%' }}>
                          <TrashIcon className="w-5" />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Agents;