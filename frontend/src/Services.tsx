import axios from "axios";
import { ResultFoods } from "./models/IFoods";
import { UserResult } from "./models/IUser";
import { autControl } from "./Util";


const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    auth: {
        username: process.env.REACT_APP_GLOBAL_USERNAME!,
        password: process.env.REACT_APP_GLOBAL_PASSWORD!
    }
})


// All Foods List
export const allFoodsList = () => {
    return axiosConfig.get("foods/list");
}

// user and admin 
export const userAndAdminLogin = (email: string, password: string) => {

    const conf = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        auth: {
            username: email,
            password: password
        }
    })
    const params = {
        email: email
    }
    return conf.post("register/login", {}, { params: params },)

}

// user and admin logout
export const logout = () => {
    return axiosConfig.get("register/userLogOut");
}

export const register = () => {
    const data = {
        name: "Ali Veli5",
        surname: "Bilir",
        cityid: 1,
        mobile: "5436667788",
        email: "aliveli5@mail.com",
        password: "12345",
        enabled: true,
        tokenExpired: true,
        roles: [
            { "rid": 0, "name": "role_user" }
        ]
    }

    return axios.post(process.env.REACT_APP_BASE_URL + "/register/userRegister", data)
}

export const save = (cid: number, name: string, glycemicindex: number, image: string, source: string) => {
    const headers = authControl()
    const data = {
        cid: cid,
        name: name,
        glycemicindex: glycemicindex,
        image: image,
        source: source,
        "enabled": false
    }

    return axios.post(process.env.REACT_APP_BASE_URL + "/foods/save", data, { headers: headers! })
}

export const getFood = (url: string) => {

    return axios.get(process.env.REACT_APP_BASE_URL + "/foods/detail/" + url)
}

function authControl() {
    throw new Error("Function not implemented.");
}

export const foodAdd = (cid: number, name: string, glycemicindex: number, image: string, source: string) => {

    const headers = autControl()
    const obj = {
        "cid": cid,
        "name": name,
        "glycemicindex": glycemicindex,
        "image": image,
        "source": source,
        "enabled": false
    }
    return axios.post(process.env.REACT_APP_BASE_URL + "/foods/save", obj, {
        headers: headers
    })
}

// user foods list
export const userFoodList = () => {
    const headers = autControl()
    return axios.get(process.env.REACT_APP_BASE_URL + "/foods/userFoodList", {
        headers: headers
    })
}

// admin wait foods list
export const adminWaitFoodList = () => {
    const headers = autControl()
    return axios.get(process.env.REACT_APP_BASE_URL + "/foods/adminWaitFoodList", {
        headers: headers
    })
}

// admin wait foods push update
export const adminWaitPushFood = (item: ResultFoods) => {
    const headers = autControl()
    const obj = {
        "gid": item.gid,
        "cid": item.cid,
        "name": item.name,
        "glycemicindex": item.glycemicindex,
        "image": item.image,
        "source": item.source,
        "enabled": item.enabled,
        "url": item.url
    }
    return axios.put(process.env.REACT_APP_BASE_URL + "/foods/update", obj, {
        headers: headers
    })
}

// admin wait foods push update
export const adminFoodDelete = (gid: number) => {
    const headers = autControl()
    const obj = {
        "gid": gid,
    }
    return axios.delete(process.env.REACT_APP_BASE_URL + "/foods/foodDelete", {
        headers: headers,
        params: obj
    })
}
