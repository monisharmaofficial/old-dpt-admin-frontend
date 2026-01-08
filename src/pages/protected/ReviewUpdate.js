import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ReviewUpdate from '../../features/Review/components/UpdateReviewModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Review"}))
      }, [])


    return(
        <ReviewUpdate />
    )
}

export default InternalPage