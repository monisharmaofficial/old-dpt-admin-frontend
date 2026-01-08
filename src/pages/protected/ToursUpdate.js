
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ToursUpdate from '../../features/tours/components/UpdateTour'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Tours"}))
      }, [])


    return(
        <ToursUpdate />
    )
}

export default InternalPage