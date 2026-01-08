
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ToursApp from '../../features/tours/components/AddTour'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Tours"}))
      }, [])


    return(
        <ToursApp />
    )
}

export default InternalPage