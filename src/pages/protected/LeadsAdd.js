import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LeadsAdd from '../../features/leads/components/AddLeadModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Leads"}))
      }, [])


    return(
        <LeadsAdd/>
    )
}

export default InternalPage