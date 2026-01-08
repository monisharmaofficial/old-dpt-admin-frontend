import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Hotels from '../../features/hotel'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Hotels"}))
      }, [])


    return(
        <Hotels/>
    )
}

export default InternalPage