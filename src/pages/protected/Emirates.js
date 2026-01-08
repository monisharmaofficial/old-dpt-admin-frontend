import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Emirates from '../../features/Emirates'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Emirates"}))
      }, [])


    return(
        <Emirates/>
    )
}

export default InternalPage