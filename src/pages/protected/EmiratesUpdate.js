import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EmiratesUpdate from '../../features/Emirates/components/UpdateEmiratesModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Emirates"}))
      }, [])


    return(
        <EmiratesUpdate/>
    )
}

export default InternalPage