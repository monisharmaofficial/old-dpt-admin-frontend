import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LeadsUpdate from '../../features/leads/components/UpdateLeadModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Leads"}))
      }, [])


    return(
        <LeadsUpdate/>
    )
}

export default InternalPage