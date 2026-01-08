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
      {/* Add any additional top side buttons as needed */}
    </div>
  );
};

const Agents = () => {
  const { leads } = useSelector(state => state.lead);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selected, setSelected] = useState("")

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

  const openImageLink = (link) => {
    window.open(link, '_blank');
  };

  const leadsToRender = searchText ? filteredLeads : leads;
  const updateFormValue = ({ updateType, value }) => {
    console.log(`Update ${updateType} to ${value}`);
  };

  return (
    <>
      <TitleCard title="List all visa applications" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        <div className="flex justify-between items-center mb-4">
          {/* Add any additional content or controls here */}
        </div>

        {/* Agents List in table format loaded from slice after API call */}
        <div className="listtable visaapplication">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>ApplnDate</th>
                <th>User Details</th>
                <th>Cell No</th>
                <th>Arvl:/Dep:<br/> Date</th>
                <th>No.of People</th>
                <th>Discover Us</th>
                <th>Documents</th>
              </tr>
            </thead>
            <tbody>
              {leadsToRender.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.id}</td>
                    <td>{moment(new Date()).add(-5 * (k + 9), 'days').format("DD MMM YY")}</td>
                    <td><b>Name:</b> {l.name_detail}<br/><b>Email:</b> {l.email_detail}<br/><b>Country:</b> {l.country_detail}</td>
                    <td>{l.phone}</td>
                    <td>Arrival Date:<br/><b>{moment(new Date()).add(-5 * (k + 9), 'days').format("DD MMM YY")} </b><br/>Departure<br/>Date:<br/> <b>{moment(new Date()).add(-5 * (k + 2), 'days').format("DD MMM YY")}</b></td>
                    <td>{l.people}</td>
                    <td>{l.discover}</td>

                    <td>
                      Hotel Booking:<br/>
                      <button className="bg-slate-300 font-bold p-1" onClick={() => openImageLink(l.open_hotel_data)}>Doc-1</button><br/>
                      Flight Ticket:<br/>
                      <button className="bg-slate-300 font-bold p-1" onClick={()=>openImageLink(l.open_flight_data)}>Doc-2</button><br/>
                      Passport Copy:<br/>
                      <button className="bg-slate-300 font-bold p-1" onClick={()=>openImageLink(l.open_passport_data)}>Doc-3</button><br/>
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