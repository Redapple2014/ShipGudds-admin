/**
 * @file_purpose  page for services
 * @author Sarmistha Mondal
 * @Date_Created 16/02/2024
 * @Date_Modified 
 */

import API from "./API";
import { toast } from "react-toastify";


const _logout = (e) => {
    localStorage.removeItem("shipGudds_admin_auth_token");
    localStorage.removeItem("userid");
    localStorage.clear();
    window.location.href = "/";
};
const Service = {
    //Post for login with out shipGudds_admin_auth_token
    apiPostCallFopLoginRequest: function (url, body = null) {
        return new Promise((resolve, reject) => {
            API.post(`${url}`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => resolve(res.data))
                .catch((error) => reject(error));
        });
    },
    //Get
    apiGetCallRequest: function (url) {
        return new Promise((resolve, reject) => {
            API.get(`${url}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => resolve(res.data))
                .catch((error) => {
                    // reject(error.response.data.message);
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    if (error.response.data.message === "jwt expired") {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        _logout();
                    }
                });
        });
    },
    //Post
    apiPostCallRequest: function (url, body = null) {
        return new Promise((resolve, reject) => {
            API.post(`${url}`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => resolve(res.data))
                .catch((error) => {
                    // reject(error.response.data.message);
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    if (error.response.data.message === "jwt expired") {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        _logout();
                    }
                });
        });
    },
    //only for users
    apiPostTokenCallRequest: function (url, params = null) {
        return new Promise((resolve, reject) => {
            API.post(`${url}`, params, {
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("shipGudds_admin_auth_token"),
                },
            })
                .then((res) => resolve(res.data))
                .catch((error) => {
                    // reject(error.response.data.message);
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    if (error.response.data.message === "jwt expired") {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        _logout();
                    }
                });
        });
    },
    //Put
    apiPutCallRequest: function (url, params) {
        return new Promise((resolve, reject) => {
            API.put(`${url}`, params, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => resolve(res.data))
                .catch((error) => reject(error.response.data.message));
        });
    },
    //FormData
    apiPostCallFormDataRequest: function (url, body = null) {
        return new Promise((resolve, reject) => {
            API.post(`${url}`, body, {
                headers: {
                    "Content-Type": "application/form-data",
                    token: localStorage.getItem("shipGudds_admin_auth_token"),
                },
            })
                .then((res) => resolve(res.data))
                .catch((error) => {
                    // reject(error.response.data.message);
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    if (error.response.data.message === "jwt expired") {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        _logout();
                    }
                });
        });
    },
};
export default Service;
