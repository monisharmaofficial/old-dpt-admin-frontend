import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Attraction from '../../features/attraction'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Attraction"}))
      }, [])


    return(
        <Attraction />
    )
}

export default InternalPage