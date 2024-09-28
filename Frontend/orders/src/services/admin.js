import api from "../configs/api";

const addCategory = (data) => api.post("category", data , {withCredentials: true});
const getParentCategories = () => api.get("category", { withCredentials: true });
const deleteCategory = (id) => api.delete(`category/${id}`, { withCredentials: true });

const createSurvey = (data) => api.post("survey/create", data, { withCredentials: true });
const getAllSurveys = () => api.get("survey", { withCredentials: true });
const getSurveyById = (id) => api.get(`survey/${id}`, { withCredentials: true });
const deleteSurvey = (id) => api.delete(`survey/${id}`, { withCredentials: true });

const createQuestion = (data) => api.post("questions/create", data, { withCredentials: true });
const getQuestionsBySurvey = (surveyId) => api.get(`questions/surveys/${surveyId}/questions`, { withCredentials: true });
const getQuestionById = (id) => api.get(`questions/${id}`, { withCredentials: true });
const updateQuestion = (id, data) => api.put(`questions/${id}`, data, { withCredentials: true });
const deleteQuestion = (id) => api.delete(`questions/${id}`, { withCredentials: true });
const getOptionsByQuestionId = (questionId) => 
  
  api.get(`questions/${questionId}/options`, { withCredentials: true });

const submitResponse = (data) => api.post("response/submit", data, { withCredentials: true });
/* const getResponses = (surveyId) => api.get(`response?surveyId=${surveyId}`, { withCredentials: true }); */

const getResponses = async (surveyId) => {
  try {
    const response = await api.get(`response?surveyId=${surveyId}`, { withCredentials: true });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }

};
const getSurveyAnalysis = async (surveyId) => {
  try {
    const response = await api.get(`response/analysis/${surveyId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching survey analysis:", error);
    throw error;
  }
};



export {
  addCategory,
  getParentCategories,
  deleteCategory,
  createSurvey,
  getAllSurveys,
  getSurveyById,
  deleteSurvey,
  createQuestion,
  getQuestionsBySurvey,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  submitResponse,
  getResponses,
  getOptionsByQuestionId,
  getSurveyAnalysis

};
