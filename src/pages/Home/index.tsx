import { Container } from '@mui/material'
import BlogList from '../../components/dataTables/serverSide'

const Home = () => {
  return (
    <>
      <Container sx={{my: 4}}>
        <BlogList />
      </Container>
    </>
  )
}

export default Home