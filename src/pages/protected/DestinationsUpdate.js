import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import DestinationsUpdate from '../../features/Destinations/components/UpdateDestinationModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Destinations"}))
      }, [])


    return(
        <DestinationsUpdate/>
    )
}

export default InternalPage