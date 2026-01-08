import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Hotels from '../../features/Faq'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Faq"}))
      }, [])


    return(
        <Hotels/>
    )
}

export default InternalPage