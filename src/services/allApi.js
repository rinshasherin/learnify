import base_url from "./base_url";
import commonApi from "./commonApi";


// auth

export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, "POST", "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, "POST", "", data)
}

// category

export const allCategoriesApi = async () => {
    return await commonApi(`${base_url}/getcategory`, "GET", "", "")
}

export const getSingleCategoryApi = async (title, header) => {
    return await commonApi(`${base_url}/catbyname/${title}`, "GET", header, "")
}

export const searchCategoryApi = async (keyword) => {
    return await commonApi(`${base_url}/searchcategory?search=${keyword}`, "GET", "", "")
}

// course

export const allCoursesApi = async () => {
    return await commonApi(`${base_url}/getcourse`, "GET", "", "")
}

export const getSingleCourseApi = async (title, header) => {
    return await commonApi(`${base_url}/coursebyname/${title}`, "GET", header, "")
}

export const getSingleCourseByIdApi = async (id, header) => {
    return await commonApi(`${base_url}/coursebyid/${id}`, "GET", header, "")
}

export const searchCourseApi = async (keyword) => {
    return await commonApi(`${base_url}/searchcourse?search=${keyword}`, "GET", "", "")
}

export const getSameCourseApi = async (header, category) => {
    return await commonApi(`${base_url}/samecourse?category=${category}`, "GET", header, "")
}

// review

export const addReviewApi = async (data) => {
    return await commonApi(`${base_url}/addreview`, "POST", "", data)
}

export const getReviewsApi = async () => {
    return await commonApi(`${base_url}/getreviews`, "GEt", "", "")
}

// profile

export const updateProfileApi = async (header, data) => {
    return await commonApi(`${base_url}/updateprofile`, "PUT", header, data)
}


// admin

export const getAllUsersApi = async (header) => {
    return await commonApi(`${base_url}/allusers`, "GET", header, "")
}

// admin-course

export const addCourseApi = async (data, header) => {
    return await commonApi(`${base_url}/addcourse`, "POST", header, data)
}

export const getCoursesApi = async (header) => {
    return await commonApi(`${base_url}/getcourses`, "GET", header, "")
}

export const deleteCourseApi = async (id, header) => {
    return await commonApi(`${base_url}/deletecourse/${id}`, "DELETE", header, {})
}

export const updateCourseApi = async (id, header, data) => {
    return await commonApi(`${base_url}/updatecourse/${id}`, "PUT", header, data)
}

// admin-category

export const addCategoryApi = async (data, header) => {
    return await commonApi(`${base_url}/addcategory`, "POST", header, data)
}

export const getCategoriesApi = async (header) => {
    return await commonApi(`${base_url}/getcategories`, "GET", header, "")
}

export const deleteCategoryApi = async (id, header) => {
    return await commonApi(`${base_url}/deletecategory/${id}`, "DELETE", header, {})
}

export const updateCategoryApi = async (id, header, data) => {
    return await commonApi(`${base_url}/updatecategory/${id}`, "PUT", header, data)
}

// admin-review

export const getAllReviewsApi = async (header) => {
    return await commonApi(`${base_url}/getallreviews`, "GET", header, "")
}

export const updateReviewApi = async (id, header, status) => {
    return await commonApi(`${base_url}/updatereview/${id}?status=${status}`, "GET", header, "")
}
