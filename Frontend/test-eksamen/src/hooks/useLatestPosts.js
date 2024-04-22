import { useState } from "react"

export const useLatestPosts = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [blogs, setBlogs] = useState(null)

    const latestPosts = async () => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/blogs')
        const json = await response.json()

        if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
        }
        if (response.ok) {
            setBlogs(json)
            // update loading state
            setIsLoading(false)
        }
  }

  return { latestPosts, blogs, isLoading, error }
}