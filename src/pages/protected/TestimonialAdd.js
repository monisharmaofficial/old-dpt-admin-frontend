import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TestimonialAdd from '../../features/testimonial/components/AddTestimonial'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Testimonial"}))
      }, [])


    return(
        <TestimonialAdd />
    )
}

export default InternalPage