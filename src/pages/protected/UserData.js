import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import UserData from '../../features/UserData'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "User"}))
      }, [])


    return(
        <UserData/>
    )
}

export default InternalPage