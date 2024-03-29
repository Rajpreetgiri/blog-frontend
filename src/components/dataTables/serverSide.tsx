// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Modal from '@mui/material/Modal';

// ** Custom Components
import ServerSideToolbar from '../utils/dataTableTools/ServerSideToolbar'

// ** Utils Import
import { Link } from 'react-router-dom'
import IconifyIcon from '../icon/IconifyIcon'
import { allBlogs, createBlog, deleteBlog } from '../../http'
import { Button } from '@mui/material'
import moment from 'moment'
import { toast } from 'react-toastify'

type SortType = 'asc' | 'desc' | undefined | null

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};


const BlogList = () => {

    // ** States
    const [selectedBlog, setSelectedBlog] = useState<any>(null)
    const [selectedCopyBlog, setSelectedCopyBlog] = useState<any>(null)
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('title')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })


    function loadServerRows(currentPage: number, data: any[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const fetchTableData = useCallback(
        async (sort: SortType, q: string, column: string, page: number, limit: number) => {
            const result = await allBlogs({
                q,
                sort,
                column,
                page: page + 1,
                limit
            })
            setTotal(result.data.total)
            const finalData = result.data.data.map((item: any, index: number) => {
                return { ...item, id: index }
            })
            setRows(loadServerRows(0, finalData))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [paginationModel]
    )

    useEffect(() => {
        fetchTableData(sort, searchValue, sortColumn, paginationModel.page, paginationModel.pageSize)
    }, [fetchTableData, searchValue, sort, sortColumn, paginationModel])

    // Handle Sorting
    const handleSortModel = (newModel: GridSortModel) => {
        if (newModel.length) {
            setSort(newModel[0].sort)
            setSortColumn(newModel[0].field)
            fetchTableData(newModel[0].sort, searchValue, newModel[0].field, paginationModel.page, paginationModel.pageSize)
        } else {
            setSort('asc')
            setSortColumn('title')
        }
    }

    // Handle Searching
    const handleSearch = (value: string) => {
        setSearchValue(value)
        fetchTableData(sort, value, sortColumn, paginationModel.page, paginationModel.pageSize)
    }

    // Handle Delete Selected Row
    const handleDelete = async () => {
        try {
            const response = await deleteBlog({ id: selectedBlog?._id })
            const { success, message } = response.data

            toast.success(message)
            if (success) {
                setSelectedBlog(null)
                fetchTableData(sort, searchValue, sortColumn, paginationModel.page, paginationModel.pageSize)
            }

        } catch (err: any) {
            console.log(err)
            toast.error(err.message)
        }
    }

    // const handleCopy
    const handleCopy = async () => {
        try {
            const newData = {
                title: selectedCopyBlog?.title,
                content: selectedCopyBlog?.content,
                category: selectedCopyBlog?.category,
                featured: selectedCopyBlog?.featured,
                status: selectedCopyBlog?.status,
                publishOn: selectedCopyBlog?.publishOn,
            }
            const resp = await createBlog(newData)
            const { success, message } = resp.data
            toast.success(message)
            if (success) {
                setSelectedCopyBlog(null)
                fetchTableData(sort, searchValue, sortColumn, paginationModel.page, paginationModel.pageSize)
            }

        } catch (err: any) {
            console.log("err", err)
            toast.error(err.message)
        }
    };

    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'title',
            headerName: 'Title',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'primary', fontWeight: 600 }}>
                                {row.title}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'category',
            headerName: 'Category',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'primary', fontWeight: 600, textTransform: 'uppercase' }}>
                                {row.category}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: 'featured',
            headerName: 'Featured',
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'primary', fontWeight: 600, textTransform: 'uppercase' }}>
                                {row.featured ? "Yes" : "No"}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 180,
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Button
                                sx={{
                                    bgcolor: row?.status === "active" ? "#176cc0" : "#d32f2f",
                                    color: "#fff",
                                    fontSize: "13px",
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        bgcolor: row?.status === "active" ? "#176cc0" : "#d32f2f"
                                    }
                                }}>
                                {row?.status}
                            </Button>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 180,
            field: 'createdAt',
            headerName: 'Create At',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'primary', fontWeight: 600, textTransform: 'uppercase' }}>
                                {moment(row.createdAt).format("DD-MM-YYYY")}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: 'Action',
            headerName: 'Action',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'primary', textAlign: "center", fontWeight: 600 }}>
                                <Link to={`/blog-edit/${row._id}`} >
                                    <IconifyIcon style={{ color: "#000" }} icon='tabler:edit' />
                                </Link>
                                <IconifyIcon onClick={() => setSelectedBlog(row)} style={{ color: "#000", marginLeft: "8px", cursor: "pointer" }} icon='tabler:trash' />
                                <IconifyIcon onClick={() => setSelectedCopyBlog(row)} style={{ color: "#000", marginLeft: "8px", cursor: "pointer" }} icon='tabler:copy' />
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    return (
        <>
            <Card>
                <CardHeader title='All Blogs' />
                <DataGrid
                    autoHeight
                    disableColumnMenu
                    pagination
                    rows={rows}
                    rowCount={total}
                    columns={columns}
                    sortingMode='server'
                    paginationMode='server'
                    pageSizeOptions={[10, 25, 50]}
                    paginationModel={paginationModel}
                    onSortModelChange={handleSortModel}
                    slots={{ toolbar: ServerSideToolbar }}
                    onPaginationModelChange={setPaginationModel}
                    slotProps={{
                        baseButton: {
                            size: 'medium',
                            variant: 'outlined'
                        },
                        toolbar: {
                            value: searchValue,
                            clearSearch: () => handleSearch(''),
                            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                        }
                    }}
                />
            </Card>
            <Modal
                open={!!selectedBlog || !!selectedCopyBlog}
                onClose={() => setSelectedBlog(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {
                            !!selectedCopyBlog ? `Want to copy this ${selectedCopyBlog?.title} blog?` : `Are you sure, to delete ${selectedBlog?.title}?`
                        }

                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-end', marginTop: '20px' }}>
                        {
                            !!selectedCopyBlog ? <Button onClick={handleCopy} sx={{ marginRight: "4px" }} variant='contained' color='primary'>Copy</Button> : <Button onClick={handleDelete} sx={{ marginRight: "4px" }} variant='contained' color='error'>Delete</Button>
                        }

                        <Button onClick={() => {
                            setSelectedCopyBlog(null)
                            setSelectedBlog(null)
                        }} variant='contained' color='primary'>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default BlogList
