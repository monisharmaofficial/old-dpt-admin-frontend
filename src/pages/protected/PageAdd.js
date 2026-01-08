import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import PageAdd from '../../features/page/components/AddPage'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Page"}))
      }, [])


    return(
        <PageAdd />
    )
}

export default InternalPage