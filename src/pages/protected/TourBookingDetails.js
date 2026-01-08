
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ToursBookingDeatils from '../../features/TourBooking/components/TourDetails'

function TourBookingDetail(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Manage Tour Bookings"}))
      }, [])


    return(
        <ToursBookingDeatils/>
    )
}

export default TourBookingDetail