
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import VisaApplication from '../../features/VisaApplication/index'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Manage tourist visa"}))
      }, [])


    return(
        <VisaApplication/>
    )
}

export default InternalPage