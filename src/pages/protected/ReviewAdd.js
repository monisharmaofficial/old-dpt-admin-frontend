import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ReviewAdd from '../../features/Review/components/AddReviewModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Review"}))
      }, [])


    return(
        <ReviewAdd />
    )
}

export default InternalPage