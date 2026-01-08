import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LocationUpdate from '../../features/location/components/UpdateLocationModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Location"}))
      }, [])


    return(
        <LocationUpdate/>
    )
}

export default InternalPage