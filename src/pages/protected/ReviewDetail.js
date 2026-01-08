import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ReviewDetail from '../../features/Review/components/ReviewDetailsPage'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Review"}))
      }, [])


    return(
        <ReviewDetail />
    )
}

export default InternalPage