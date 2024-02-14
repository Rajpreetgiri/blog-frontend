import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box, FormHelperText, FormLabel, Grid, Switch } from '@mui/material';
import { createBlog, updateBlog } from '../../http';

type FormValues = {
    title: string;
    featured: boolean;
    status: string;
    category: string;
    content: string;
};

const defaultValues = {
    title: "",
    featured: false,
    status: "",
    category: "",
    content: "",
}

const BlogForm = ({ blogData }: any) => {

    // ** FormData
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues });

    // For existed data set
    useEffect(() => {
        if (blogData) {
            reset(blogData)
        }
    }, [reset, blogData])


    // form data submition
    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        try {
            const resp = blogData ? await updateBlog(formData) : await createBlog(formData)
            const { data } = resp.data
            console.log(data, "data")

        } catch (err) {
            console.log("err", err)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {/* Input field */}
                <Grid item xs={6}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel id="demo-row-textfield-buttons-group-label">Title</FormLabel>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} type="text" id="title" error={!!errors.title} />
                                    {!!errors.title && (
                                        <FormHelperText error>{errors.title.message}</FormHelperText>
                                    )}
                                </>
                            )}
                        />

                    </FormControl>
                </Grid>

                {/* Dropdown */}
                <Grid item xs={6}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel id="demo-row-dropdown-buttons-group-label">Category</FormLabel>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: 'Please select an option' }}
                            render={({ field }) => (
                                <Select {...field} id="category" error={!!errors.category}>
                                    <MenuItem value="">Select an option</MenuItem>
                                    <MenuItem value="fashion">Fashion</MenuItem>
                                    <MenuItem value="news">News</MenuItem>
                                </Select>
                            )}
                        />
                        {!!errors.category && (
                            <FormHelperText error>{errors.category.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                {/* <Grid item xs={6}>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel id="demo-row-dropdown-buttons-group-label">Validations</FormLabel>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Please select an option' }}
                                render={({ field }) => (
                                    <Select {...field} id="category" error={!!errors.category}>
                                        <MenuItem value="">Select an option</MenuItem>
                                        <MenuItem value="fashion">Fashion</MenuItem>
                                        <MenuItem value="news">News</MenuItem>
                                    </Select>
                                )}
                            />
                            {!!errors.category && (
                                <FormHelperText error>{errors.category.message}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid> */}


                {/* Radio button */}
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Featured Blog (want to list in featured section?)</FormLabel>
                        <Controller
                            name="featured"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                )
                            }}
                        />

                        {!!errors.featured && (
                            <FormHelperText error>{errors.featured.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                {/* Checkbox */}
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel id="demo-row-switch-buttons-group-label">Status</FormLabel>
                        <Controller
                            name="status"
                            control={control}
                            rules={{ required: 'Please select an option' }}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                </RadioGroup>
                            )}
                        />
                        {!!errors.status && (
                            <FormHelperText error>{errors.status.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                {/* Textarea */}
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel id="demo-row-textarea-buttons-group-label">Content</FormLabel>
                        <Controller
                            name="content"
                            control={control}
                            rules={{
                                required: 'Content is required',
                                minLength: {
                                    value: 5,
                                    message: 'Content must be at least 5 characters',
                                },
                                maxLength: {
                                    value: 500,
                                    message: 'Content cannot exceed 500 characters',
                                },
                            }}
                            render={({ field }) => <TextareaAutosize
                                {...field}
                                minRows={8}
                                id="content"
                            />}
                        />
                        {!!errors.content && (
                            <FormHelperText error>{errors.content.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

            </Grid>

            <Box sx={{ marginTop: "24px", textAlign: "right" }}>
                <Button
                    sx={{ py: 1, fontSize: "14px" }}
                    type="submit"
                    variant="contained"
                    color="primary"

                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default BlogForm;