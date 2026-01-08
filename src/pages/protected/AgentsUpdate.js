import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AgentsUpdate from '../../features/agents/components/UpdateAgentModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Agents"}))
      }, [])


    return(
        <AgentsUpdate />
    )
}

export default InternalPage