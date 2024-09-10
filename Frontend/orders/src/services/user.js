import api from "../configs/api"
const getProfile = () => api.get("user/whoami", {withCredentials:true})
const getPost = () => api.get("post/my", {withCredentials:true})
const getAllPost = () => api.get("", {withCredentials:true})

export {getProfile, getPost, getAllPost}