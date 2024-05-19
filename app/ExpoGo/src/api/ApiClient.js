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
        return await this._callApi("api/v1/usuario/usuario/eu", "GET", null, false);
    }

	async loginUser (formData) {
		// Função que chama endpoint para autenticar o usuário no sistema
		return await this._authenticator.authenticateUser(formData);
	}

	async createUser (formData) {
		return await this._authenticator.createAndAuthenticateUser(formData);
	}

	async createMercado (formData) {
		return await this._callApi("api/v1/mercado/mercado/cadastrar", "POST", formData, false);
	}

	async createCostumer (formData) {
		return await this._authenticator.createCostumer(formData);
	}

	async getConsumidorData() {
		console.log(this._apiBaseUrl)
		return await this._callApi("api/v1/usuario/consumidor/consultar", "GET", null, false);
	}

	async updateConsumidorData(userData, params, multipart) {
		return await this._callApi("api/v1/usuario/consumidor/atualizar", "PUT", userData, params, multipart);
	}

    async _callApi(path, method, data, params, multipart) {
		// Função genérica que faz um chamado à API
        const url = `${this._apiBaseUrl}${path}`;
        let token = this._authenticator.fetchAccessToken();

        
		try {
			var response = await this._callApiWithToken(url, method, data, params, token, multipart);
		} catch (err) {
			// Caso o erro retornado seja um erro de autorização (de código 401),
			// nós atualizamos o token de acesso pela função refresh() e realizamos
			// a chamada novamente.
			if (err.response.status == 401) {
				try {
					await this._authenticator.refreshAccessToken();

					token = this._authenticator.fetchAccessToken();
					response = await this._callApiWithToken(url, method, data, params, token, multipart);
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

    async _callApiWithToken(url, method, data, params, token, multipart) {
		// Função que realiza a chamada da API em si,
		// adicionando o token de acess à header do request.
		
		if (multipart) {
			headers = {
					"Authorization": `Bearer ${token}`,
					"Content-Type":"multipart/form-data"
				}
		} else {
			headers = {
					"Authorization": `Bearer ${token}`,
				}
		}
		try {
			var response = await axios({
				url: url,
				method: method,
				data: data,
				params: params,
				headers: headers,
			})

			return response.data;
		} catch (err) {
			console.log(JSON.stringify(err))
			throw err
		}
    }
}
