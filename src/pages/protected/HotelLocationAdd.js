import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LocationAdd from '../../features/location/components/AddLocationModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Location"}))
      }, [])


    return(
        <LocationAdd/>
    )
}

export default InternalPage