import moment from "moment"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { setReviewsData } from "./reviewSlice";
import { deleteOurReviews, getReviewsContent } from "./reviewSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { showNotification } from '../common/headerSlice';
import ToggleInput from '../../components/ToogleInput/ReviewToogle';
import { RECENT_REVIEW } from "../../utils/dummyData";
import SearchBar from "../../components/Input/SearchBar"
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import { viewReviews } from './reviewSlice'

const TopSideButtons = () => {
    const dispatch = useDispatch()

    const openAddNewReviewModal = () => {
        dispatch(openModal({ title: "Add New Review", bodyType: MODAL_BODY_TYPES.REVIEW_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">

        </div>
    )
}

function Reviews() {

    const { leads } = useSelector(state => state.reviews)
    const dispatch = useDispatch();
    const [defaultName, setDefaultName] = useState("");
    const [upId, setUpId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredLeads, setFilteredLeads] = useState([]);


    const removeAppliedFilter = () => {
        setSearchText("");
        setFilteredLeads([]);
    };

    const applySearch = (value) => {
        const lowerCaseValue = value.trim().toLowerCase();
        const filteredResults = leads.filter(l => l.email.toLowerCase().includes(lowerCaseValue));
        setFilteredLeads(filteredResults);
    }

    const deleteCurrentReview = (id) => {
        dispatch(
            openModal({
                title: "Confirmation Review",
                bodyType: MODAL_BODY_TYPES.CONFIRMATION_REVIEW,
                extraObject: {
                    message: `Are you sure you want to delete this Review?`,
                    id, // Pass the review ID for deletion
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


    useEffect(() => {
        dispatch(getReviewsContent())
        dispatch(deleteOurReviews())
    }, [])

    const leadsToRender = searchText ? filteredLeads : leads;

    const updateFormValue = ({ updateType, value }) => {
    };



    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">Active</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">De-Active</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Active</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const openUpdateReviewNewModal = (id, catgname, l) => {
        setUpId(id);
        setDefaultName(catgname);
        dispatch(setReviewsData({ id, name: catgname }));
        dispatch(
            openModal({
                title: "Update Category",
                bodyType: MODAL_BODY_TYPES.REVIEW_UPDATE_NEW,
                categoryId: id, // Pass the 'id' received as an argument
            })
        );
    };
    return (
        <>

            <TitleCard title="Current Review" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                <div className="flex justify-between items-center mb-4">
                    <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
                </div>

                {/* Agents List in table format loaded from slice after api call */}
                <div className="listtable">
                    <table>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Date</th>
                                <th>User Details</th>
                                <th>Rating</th>

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
                                            <td>{moment(l.updated_at).format("DD-MM-YYYY")}</td>
                                            <td><b>Name:</b> {l.name}<br /><b>Email:</b> {l.email}<br /><b>Country:</b> {l.country}</td>

                                            <td>{l.rating}</td>
                                            <td>
                                                <ToggleInput
                                                    className="toggle-item"
                                                    labelStyle="some-style"
                                                    type="checkbox"
                                                    containerStyle="container-style"
                                                    defaultValue={l.status}
                                                    updateFormValue={updateFormValue}
                                                    reviewsId={l.id}
                                                />
                                            </td>

                                            <td>
                                                <Link to={`/app/review-detail/?id=${l.id}`} className="btn btn-square btn-ghost" >
                                                    <span style={{ color: 'green', padding: '4px', borderRadius: '50%' }}>
                                                        <EyeIcon className="w-5" />
                                                    </span>
                                                </Link>
                                                <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentReview(l.id)}>
                                                    <span style={{ color: 'red', padding: '4px', borderRadius: '50%' }}>
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
    )
}



export default Reviews