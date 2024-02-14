import { Card, Container, Typography } from '@mui/material'
import BlogForm from '../../../components/form'

const BlogCreate = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant='h4' component="h2" sx={{color: "#2f2b3dc7", fontWeight: "500", marginBottom: "20px"}}>Create Blog</Typography>
        <BlogForm />
      </Card>
    </Container>
  )
}

export default BlogCreate