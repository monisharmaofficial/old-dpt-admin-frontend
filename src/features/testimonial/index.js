import moment from "moment"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getTestimonialContent } from "./testimonialSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { showNotification } from '../common/headerSlice';
import { setTestimonialData } from "./testimonialSlice";
import ToggleInput from '../../components/ToogleInput/TestimonialToogle';
import SearchBar from "../../components/Input/SearchBar";
import { RECENT_PAGE } from "../../utils/dummyData"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Testimonial", bodyType: MODAL_BODY_TYPES.TESTIMONIAL_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <Link to="/app/testimonial-add" className="btnblue">Add New</Link>
        </div>
    )
}

function Leads() {

    const { leads } = useSelector(state => state.testimonial)
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("")
    const [upId, setUpId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredLeads, setFilteredLeads] = useState([]);

    const removeAppliedFilter = () => {
        setSearchText("");
        setFilteredLeads([]);
    };

    const applySearch = (value) => {
        const lowerCaseValue = value.trim().toLowerCase();
        const filteredResults = leads.filter(l => l.name.toLowerCase().includes(lowerCaseValue));
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
        dispatch(getTestimonialContent())
    }, [])



    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentTestimonial = (id) => {
        dispatch(
            openModal({
                title: "Confirmation",
                bodyType: MODAL_BODY_TYPES.CONFIRMATION_TESTIMONIAL,
                extraObject: {
                    message: `Are you sure you want to delete this testimonial?`,
                    id, // Pass the category ID for deletion
                },
            })
        );
    };
    const updateFormValue = ({ updateType, value }) => {

        console.log(`Update ${updateType} to ${value}`);
    };
    const leadsToRender = searchText ? filteredLeads : leads;
    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Update Testimonial", bodyType: MODAL_BODY_TYPES.TESTIMONIAL_UPDATE_NEW }))
    }

    return (
        <>

            <TitleCard title="Current Testimonial" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                <div className="flex justify-between items-center mb-4">
                    <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
                </div>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="listtable">
                    <table>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Country</th>
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
                                            <tr key={l.id}>
                                                <td>{k + 1}</td>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{l.name}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{l.country}</div>
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
                                                        testimonialId={l.id}
                                                    />
                                                </td>

                                                <td>
                                                    <Link to={`/app/testimonial-update/?id=${l.id}=${l.name}=${l.description}=${l.country}=${l.rating}`} className="btn btn-square btn-ghost" >
                                                        <span style={{ color: 'green', padding: '4px', borderRadius: '50%' }}>
                                                            <PencilSquareIcon className="w-5" />
                                                        </span>
                                                    </Link>
                                                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentTestimonial(l.id)}>
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



export default Leads