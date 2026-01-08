
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TransferBooking from '../../features/transferBooking/index'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Manage Transfer Service Bookings"}))
      }, [])


    return(
        <TransferBooking />
    )
}

export default InternalPage