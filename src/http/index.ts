import axios from 'axios';

let headers: any = {
    'Content-type': 'application/json',
    Accept: 'application/json',
};

if (typeof window !== 'undefined') {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
        headers = {
            ...headers,
            authorization: accessToken
        }
    }
}


const api = axios.create({
    baseURL: `https://blog-backend-9v12.onrender.com/api`,
    withCredentials: true,
    headers
});

// List of all the endpoints
export const login = (data?: any) => api.post('/login', { ...data });

// Blogs
export const allBlogs = (params?: any) => api.get('/blogs', { params });
export const createBlog = (data: any) => api.post('/blog-create', data);
export const updateBlog = (data: any) => api.put(`/blog-edit/${data._id}`, data);
export const singleBlog = ({ id }: { id: string }) => api.get(`/blog/${id}`);
export const deleteBlog = ({ id }: { id: string }) => api.delete(`/blog-delete/${id}`);

// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log(error.message, "error")
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `http://localhost:4000/api/admin/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err: any) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;