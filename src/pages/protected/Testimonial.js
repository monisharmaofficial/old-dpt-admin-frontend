import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Testimonial from '../../features/testimonial'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Testimonial"}))
      }, [])


    return(
        <Testimonial />
    )
}

export default InternalPage