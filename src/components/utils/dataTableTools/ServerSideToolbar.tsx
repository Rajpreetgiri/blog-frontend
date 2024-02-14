// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from '../../inputs/textField'
import IconifyIcon from '../../icon/IconifyIcon'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

// ** Icon Imports

interface Props {
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
}

const ServerSideToolbar = (props: Props) => {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2
      }}
    >
      <Link to={"/blog-create"}>
        <Button variant='contained' sx={{ marginRight: "16px", fontSize: '14px', py: 1, color: "#fff" }} color='primary'>
          Create Blog
        </Button>
      </Link>

      <CustomTextField
        value={props.value}
        placeholder='Search…'
        onChange={props.onChange}
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <IconifyIcon fontSize='1.25rem' icon='tabler:search' />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
              <IconifyIcon fontSize='1.25rem' icon='tabler:x' />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />

    </Box>
  )
}

export default ServerSideToolbar
