import moment from "moment"
import { useEffect,useState } from "react"
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getPageContent } from "./pageSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { showNotification } from '../common/headerSlice';
import ToogleInput from '../../components/Input/ToogleInput';
import SearchBar from "../../components/Input/SearchBar";
import { RECENT_PAGE } from "../../utils/dummyData"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Page", bodyType: MODAL_BODY_TYPES.PAGE_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <Link to="/app/page-add"className="btnblue">Add New</Link>
        </div>
    )
}

function Leads() {

    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const [searchTerm,setSearchTerm] = useState("")

    const [searchText, setSearchText] = useState(""); 
    const [filteredLeads, setFilteredLeads] = useState([]);
  
    const removeAppliedFilter = () => {
      setSearchText("");
      setFilteredLeads([]);
    };
  
    const applySearch = (value) => {
        const lowerCaseValue = value.toLowerCase();
        const filteredResults = leads.filter(l => l.category_name.toLowerCase().includes(lowerCaseValue));
        setFilteredLeads(filteredResults);
      }
  
    useEffect(() => {
      if (searchText === "") {
        removeAppliedFilter();
      } else {
        applySearch(searchText);
      }
    }, [searchText]);
    useEffect(() => {
        dispatch(getPageContent())
    }, [])



    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this page?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index }
        }))
    }
    const updateFormValue = ({ updateType, value }) => {

        console.log(`Update ${updateType} to ${value}`);
    };
    const leadsToRender = searchText ? filteredLeads : leads;
    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Update Page", bodyType: MODAL_BODY_TYPES.PAGE_UPDATE_NEW }))
    }

    return (
        <>

            <TitleCard title="Current Page" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

            <div className="flex justify-between items-center mb-4">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
                </div>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="listtable">
                    <table>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Image</th>
                                <th>Page Name</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leadsToRender.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{l.id}</td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask w-12 h-12 radius">
                                                            <img src={l.image} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="font-bold">{l.category_name}</div>
                                                </div>

                                            </td>

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
                                                <Link to="/app/page-update" className="btn btn-square btn-ghost" >
                                                    <span style={{ color: 'green', padding: '4px', borderRadius: '50%' }}>
                                                        <PencilSquareIcon className="w-5" />
                                                    </span>
                                                </Link>
                                                <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}>
                                                    <span style={{ color: 'red', padding: '4px', borderRadius: '50%' }}>
                                                        <TrashIcon className="w-5" />
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}



export default Leads