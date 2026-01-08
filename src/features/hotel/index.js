import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal, closeModal } from "../common/modalSlice";
import { setHotelData } from "./hotelSlice";
import { getLocationContent } from "../location/locationSlice";
import { getHotelContent } from "./hotelSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ToggleInput from "../../components/ToogleInput/HotelToogle";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewHotelModal = () => {
    dispatch(
      openModal({
        title: "Add New Hotel",
        bodyType: MODAL_BODY_TYPES.HOTEL_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <Link to="/app/hotel-add" className="btnblue">
        Add New
      </Link>
    </div>
  );
};

function Hotel() {
  const dispatch = useDispatch();
  const [defaultName, setDefaultName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [upId, setUpId] = useState("");
  const { leads } = useSelector((state) => state.hotel);
  const locationLeads = useSelector((state) => state.location.leads);

  const removeAppliedFilter = () => {
    setSearchText("");
    setFilteredLeads([]);
  };

  const applySearch = (value) => {
    const lowerCaseValue = value.trim().toLowerCase();
    const filteredResults = leads.filter((l) =>
      l.hotel_name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredLeads(filteredResults);
  };
  const deleteCurrentHotel = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_HOTEL,
        extraObject: {
          message: `Are you sure you want to delete this hotel?`,
          id, // Pass the hotel ID for deletion
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
    dispatch(getHotelContent(), getLocationContent());
  }, [leads.id]);

  const openUpdateNewHotelModal = (id, catgname, l) => {
    setUpId(id);
    setDefaultName(catgname);
    dispatch(setHotelData({ id, name: catgname }));
    dispatch(
      openModal({
        title: "Update hotel",
        bodyType: MODAL_BODY_TYPES.HOTEL_UPDATE_NEW,
        hotelId: id, // Pass the 'id' received as an argument
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Hotels"
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
                <th>Hotel Name</th>
                <th>Location Name</th>
                <th>Adults Price</th>
                <th>Child Price</th>
                <th>Driver Price</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...leadsToRender].reverse().map((l, k) => {
                if (l && l.location_info) { // Check if 'l' and 'location_info' are defined
                  const locationNames = l.location_info.map((info) => info.name).join("  ,  ");
                  return (
                    <tr key={l.id}>
                      <td>{k + 1}</td>
                      <td>
                        <div>
                          <div className="font-bold">{l.hotel_name}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{locationNames}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{l.adults_price_usd}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{l.children_price_usd}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{l.infants_price_usd}</div>
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
                          hotelId={l.id}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/app/hotel-update/?id=${l.id}=${l.hotel_name}=${locationNames}=${l.adults_price_usd}=${l.adults_price_aed}=${l.children_price_usd}=${l.children_price_aed}=${l.infants_price_usd}=${l.infants_price_aed}=${l.driver_price_usd}=${l.driver_price_aed}`}
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
                          onClick={() => deleteCurrentHotel(l.id)}
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
                  // Handle the case where 'l' or 'location_info' is undefined (if needed)
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

export default Hotel;
