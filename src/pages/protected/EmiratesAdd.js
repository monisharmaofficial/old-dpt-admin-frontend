import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EmiratesAdd from '../../features/Emirates/components/AddEmiratesModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Emirates"}))
      }, [])


    return(
        <EmiratesAdd/>
    )
}

export default InternalPage