import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useDeletePost = () => {

    const {user} = useAuthContext()
    const [data, setData] = useState(null)

    const handleClick = async (id) => {
        const response = await fetch('http://localhost:5000/api/blogs/' + id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })

        const json = await response.json()

        if(response.ok) {
            setData(json)
        }

        
    }
    return { handleClick, data}
}

