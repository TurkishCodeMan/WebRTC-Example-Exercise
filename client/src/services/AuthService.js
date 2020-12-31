import API from "./API"

class AuthService{
    static async getLogin(){
        try {
            const response=await API().get("/login")
            console.log(response)
        } catch (error) {
            return error;
        }
    }
}

export default AuthService;