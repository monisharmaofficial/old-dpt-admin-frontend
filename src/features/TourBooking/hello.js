
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import AddTourModalBody from "./components/TourDetails";
import { deleteAgent, getAgentsContent } from "./agentSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import { showNotification } from '../common/headerSlice';
import ToogleInput from "../../components/Input/ToogleInput";
import SearchBar from '../../components/Input/SearchBar';
import { RECENT_AGENT } from "../../utils/dummyData";
import Datepicker from "../../components/Input/DatePicker";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewAgentModal = () => {
    dispatch(openModal({ title: "Add New Booking", bodyType: MODAL_BODY_TYPES.AGENT_ADD_NEW }));
  };

  return (
    <div className="inline-block float-right">
      {/* Your buttons here */}
    </div>
  );
};

const TourBooking = () => {
  const { leads } = useSelector(state => state.lead);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredDate, setFilteredDate] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchEmail, setSearchEmail] = useState("")
  const [filteredEmail, setFilteredEmail] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);

  const removeAppliedFilterEmail = () => {
    setSearchEmail("");
    setFilteredEmail([]);
  }
  const applySearchEmail = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResultsEmail = leads.filter(l => l.email.toLowerCase().includes(lowerCaseValue))
    setFilteredEmail(filteredResultsEmail);
  }
  useEffect(() => {
    if (searchEmail === "") {
      removeAppliedFilterEmail();
    } else {
      applySearchEmail(searchEmail)
    }
  }, [searchEmail])

  const removeAppliedFilterText = () => {
    setSearchDate("");
    setFilteredDate([]);
  }

  const applySearchDate = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    const filteredResultsDate = leads.filter(l => l.booking_date.toLowerCase().includes(lowerCaseValue));
    setFilteredDate(filteredResultsDate);
  }

  useEffect(() => {
    if (searchDate === "") {
      removeAppliedFilterText();
    } else {
      applySearchDate(searchDate);
    }
  }, [searchDate]);

  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };



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

  // const leadsToRender = searchEmail ? filteredEmail : (searchEmail ? filteredEmail : leads);
  const leadsToRender = searchText ? filteredLeads : (searchText ? filteredLeads : leads) && searchEmail ? filteredEmail : (searchEmail ? filteredEmail : leads) && searchDate ? filteredDate : (searchDate ? filteredDate : leads);

  const updateFormValue = ({ updateType, value }) => {
    console.log(`Update ${updateType} to ${value}`);
  };
  useEffect(() => {
    dispatch(getAgentsContent());
  }, []);

  useEffect(() => {
    applySearch();
  }, [searchText, searchDate]);

  const applySearch = () => {
    const lowerCaseValue = searchText.toLowerCase().trim();
    const filteredResults = leads.filter(l =>  l.guest_name.toLowerCase().includes(lowerCaseValue));

    // Apply additional filtering based on the selected date
    if (searchDate) {
      const formattedDate = searchDate.toISOString().split('T')[0];
      const filteredResultsByDate = filteredResults.filter(l => l.booking_date && l.booking_date.includes(formattedDate));
      setFilteredLeads(filteredResultsByDate);
    } else {
      setFilteredLeads(filteredResults);
    }
  };

  const handleDateChange = (selectedDate) => {
    setSearchDate(selectedDate);
  };

  return (
    <>
      <TitleCard title="List all tour bookings" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        <div className="justify-between items-center mb-4">
          <div className="searchdetail">
            <div className="formfield">
              <label>Name</label>
              <SearchBar searchText={searchText} styleClass="mr-0" setSearchText={setSearchText} />
            </div>
            <div className="formfield">
              <label>Booking Date</label>
              <DatePicker
                placeholderText="Search"
                selected={searchDate}
                onChange={handleDateChange}
              />


            </div>
            <div className="formfield">
              <label>Email</label>
              <SearchBar searchText={searchEmail} styleClass="mr-2" setSearchText={setSearchEmail} />
            </div>
          </div>
          <div>

          </div>
        </div>

        {/* Agents List in table format loaded from slice after api call */}
        <div className="listtable">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Guest Name</th>
                <th>Tour Name</th>
                <th>Emirates</th>
                <th>Booking Date</th>
                <th>Tour Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody >
              {leadsToRender.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.id}</td>
                    <td>{l.guest_name}</td>
                    <td>{l.tour_name}</td>
                    <td>{l.emirates}</td>
                    <td>{l.booking_date}</td>
                    <td>{l.tour_date}</td>

                    <td>
                      {l.status}
                    </td>

                    <td>
                      <div className="reviewconfirm">
                        <div className="reviewbtn">
                          {/* Pass the lead prop to AddTourModalBody */}
                          <Link to={`/app/tours-booking/?id=${l.id}`} className="btn btn-info btn-sm">

                            Review and Confirm
                          </Link>
                        </div>
                        <div className="tabletrashbtn">
                          <div className="trashicon">
                            <button onClick={() => deleteCurrentLead(k)}>
                              <span style={{ color: 'red' }}>
                                <TrashIcon className="w-5" />
                              </span>
                            </button>
                          </div>
                          <div className="sendtoguide">
                            <span>Send to Guide</span>
                          </div>
                        </div>
                      </div>
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

export default TourBooking;
