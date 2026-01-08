import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Itinerary from '../../features/Itinerary'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Itinerary"}))
      }, [])


    return(
        <Itinerary/>
    )
}

export default InternalPage