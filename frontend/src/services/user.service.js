//Import of axios
import axiosService from '../../src/config_axios';

const API_URL = 'http://localhost:8080/api/users/';

//Create the UserService class which will be called through the vue components
class UserService {
    getUserProfile() {
        const user = JSON.parse(localStorage.getItem('user'));

        return axiosService.get(API_URL + user.userId)
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of getUserProfile

    updateUserProfile(updatedContent) {
        const user = JSON.parse(localStorage.getItem('user'));

        console.log(updatedContent);
        return axiosService.put(API_URL + user.userId + "/updateProfile", updatedContent, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(response => {
                console.log(response);
                return response
            })
            .catch()
    } //End of updateUserProfile

    updateUserPassword(updatedPassword) {
        console.log(updatedPassword)

        return axiosService.put(API_URL + "updatePassword", updatedPassword, )
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of updateUserPassword 

    deleteUserProfile(content) {
        const user = JSON.parse(localStorage.getItem('user'));

        return axiosService.delete(API_URL + user.userId + '/deleteProfile', {
                data: {
                    password: content.password
                }
            })
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of deleteUserProfile

    /* ADMIN FUNCTIONS */
    updateUserProfileAdmin(updatedContent) {
        console.log(updatedContent)

        return axiosService.put(API_URL + updatedContent.userId + "/updateProfile", updatedContent, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(response => {
                console.log(response);
                return response
            })
            .catch()
    } //End of updateUserProfileAdmin

    deleteUserProfileAdmin(userId) {
        console.log(userId)

        return axiosService.delete(API_URL + userId + '/deleteProfile')
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of deleteUserProfileAdmin
}

//Exports the class
export default new UserService();