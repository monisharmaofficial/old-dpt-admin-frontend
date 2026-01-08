import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CategoryUpdate from '../../features/category/components/UpdateCategoryModalBody'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Category"}))
      }, [])


    return(
        <CategoryUpdate/>
    )
}

export default InternalPage