import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import PageUpdate from '../../features/page/components/UpdatePage'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Page"}))
      }, [])


    return(
        <PageUpdate />
    )
}

export default InternalPage