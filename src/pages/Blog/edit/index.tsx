import { Card, Container, Typography } from '@mui/material'
import BlogForm from '../../../components/form'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { singleBlog } from '../../../http'

const BlogCreate = () => {

  // ** Hooks and vars
  const params = useParams()
  const [blogData, setBlogData] = useState<any>(null)

  const fetchTableData = useCallback(
    async () => {
      const response = await singleBlog({ slug: params.slug ?? "" })
      const { data } = response.data
      setBlogData(data)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.slug]
  )

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])

  return (
    <Container sx={{ my: 4 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant='h4' component="h2" sx={{ color: "#2f2b3dc7", fontWeight: "500" }}>Edit Blog</Typography>
        <BlogForm blogData={blogData} />
      </Card>
    </Container>
  )
}

export default BlogCreate