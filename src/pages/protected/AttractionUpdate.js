import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Attraction from '../../features/attraction/components/UpdateAttractionModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Update Attraction"}))
      }, [])


    return(
        <Attraction />
    )
}

export default InternalPage