import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import HotelsAdd from '../../features/hotel/components/AddHotelModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Hotels"}))
      }, [])


    return(
        <HotelsAdd/>
    )
}

export default InternalPage