import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const insertArticle = payload => api.post(`/article`, payload);
export const getArticleById = id => api.get(`/article/${id}`);
export const getAllArticles = () => api.get(`/articles`);
export const updateArticleById = (id, payload) => api.put(`/article/${id}`, payload);
export const deleteArticleById = id => api.delete(`/article/${id}`);


const apis = {
    insertArticle,
    getAllArticles,
    updateArticleById,
    deleteArticleById,
    getArticleById,
};

export default apis;