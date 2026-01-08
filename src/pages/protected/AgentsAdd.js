import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AgentsAdd from '../../features/agents/components/AddAgentModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Agents"}))
      }, [])


    return(
        <AgentsAdd />
    )
}

export default InternalPage