import axios from "axios";
import { Authenticator } from "./Authenticator";

export class ApiClient {
	// Classe que realiza o consumo da API. Qualquer função que chame a API 
	// deve ser implementada como método assíncrono desta classe.
    constructor() {
		// ALTERAR CONFORME O SEU IP
        this._apiBaseUrl = `http://${process.env.EXPO_PUBLIC_IP_HOST}:8000/`;
		this._authenticator = new Authenticator();
    }

    async getUserDetail () {
		// Função que chama endpoint de teste
        return await this._callApi("api/v1/usuario/usuario/eu", "GET", null);
    }

	async loginUser (formData) {
		// Função que chama endpoint para autenticar o usuário no sistema
		return await this._authenticator.authenticateUser(formData);
	}

	async createUser (formData) {
		return await this._authenticator.createAndAuthenticateUser(formData);
	}

	async createMercado (formData) {
		return await this._callApi("api/v1/mercado/mercado/cadastrar", "POST", formData);
	}

	async createCostumer (formData) {
		return await this._authenticator.createCostumer(formData);
	}

    async _callApi(path, method, data) {
		// Função genérica que faz um chamado à API
        const url = `${this._apiBaseUrl}${path}`;
        let token = this._authenticator.fetchAccessToken();
        
		try {
			var response = await this._callApiWithToken(url, method, data, token);
		} catch (err) {
			// Caso o erro retornado seja um erro de autorização (de código 401),
			// nós atualizamos o token de acesso pela função refresh() e realizamos
			// a chamada novamente.
			if (err.response.status == 401) {
				try {
					await this._authenticator.refreshAccessToken();

					token = this._authenticator.fetchAccessToken();
					response = await this._callApiWithToken(url, method, data, token);
				} catch (err) {
					// Caso a atualização do token de acesso falhe, o usuário é deslogado.
					this._authenticator.cleanUserState();
					throw err
				}
			} else {
				throw err
			}
		}

		return response
	}

    async _callApiWithToken(url, method, data, token) {
		// Função que realiza a chamada da API em si,
		// adicionando o token de acess à header do request.
		try {
			var response = await axios({
				url,
				method,
				data,
				headers: {
					"Authorization": `Bearer ${token}`
				},
			})

			return response.data;
		} catch (err) {
			throw err
		}
    }
}
