import axios from "axios";
import { fetchToken, setToken, deleteToken } from "../Auth";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useEffect, useState } from "react";



export class ApiClient {
    constructor() {
        this._apiBaseUrl = `http://192.168.1.176:8000/`;
    }

    async getUserDetail () {
        return this._callApi("api/v1/usuario/usuario/eu", "GET", null);
    }

    async login(formData) {
        path = `api/v1/usuario/usuario/login`;
        url = `${this._apiBaseUrl}${path}`;

        axios
        .post(url, formData)
        .then(function (response) {
            if (response.data.access_token) {
                console.log(response.data.access_token.token)
                setToken(response.data.access_token.token, "access-token");
                setToken(response.data.refresh_token.token, "refresh-token");
            }
        })
        .catch(function (error) {
            console.error("erro ao logar usuário.", error)
        });
    }

    async refresh() {
        path = `api/v1/usuario/usuario/refresh`;
        url = `${this._apiBaseUrl}${path}`;

        var refreshToken = fetchToken('refresh-token') 

        if (!refreshToken) {
            console.error("token inválido");
            return
        }

        axios
        .post(url, {refresh_token: refreshToken})
        .then(function (response) {
            if (response.data.access_token) {
                setToken(response.data.access_token.token, "access-token");
                setToken(response.data.refresh_token.token, "refresh-token");
            }
        })
        .catch(function (error) {
            console.error("erro ao refresh");
        })
    }

    async _callApi(path, method, data) {
        const url = `${this._apiBaseUrl}${path}`;

        let token = fetchToken("access-token");
        
		var response = await this._callApiWithToken(url, method, data, token);
		if (response.status == 401) {
			console.log("refresco");
			self.refresh();
			token = fetchToken("access-token");
			return await this._callApiWithToken(url, method, data, token);
		}
    }

    async _callApiWithToken(url, method, data, token) {
        const [result, setResult] = useState([]);

        var response = await axios({
            url,
            method,
            data,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then(response => response.data).catch(function(error) {
            setResult(error.response)
        })

        console.log("resultado: ", response)
		console.log("result: ", result)

        return result;
    }

}
