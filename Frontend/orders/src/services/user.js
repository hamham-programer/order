import api from "../configs/api"
const getProfile = () => api.get("user/whoami", {withCredentials:true})


api
export {getProfile}