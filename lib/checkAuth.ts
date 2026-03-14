import axios from "axios"

export const checkAuthClient = async(token: string)=>{
    const data = await (await axios.get("/api/me", {
        headers:{"Authorization":`Bearer_${token}`}
    })).data
    console.log(data)

    const res = data.user?data.user:null
    return res
}