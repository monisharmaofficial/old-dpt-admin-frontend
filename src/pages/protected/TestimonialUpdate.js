import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TestimonialUpdate from '../../features/testimonial/components/UpdateTestimonial'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Testimonial"}))
      }, [])


    return(
        <TestimonialUpdate />
    )
}

export default InternalPage