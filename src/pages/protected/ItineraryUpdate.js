import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ItineraryUpdate from '../../features/Itinerary/components/UpdateItineraryModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Itinerary"}))
      }, [])


    return(
        <ItineraryUpdate/>
    )
}

export default InternalPage