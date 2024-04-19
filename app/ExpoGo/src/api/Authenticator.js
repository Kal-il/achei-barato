import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import {GoogleManager} from '../app/GoogleSignIn';

export class Authenticator {
	// Classe que implementa lógicas e chamadas de API relacionadas
	// à autenticação.
	constructor() {
		// ALTERAR CONFORME O SEU IP
        this._apiBaseUrl = `http://${process.env.EXPO_PUBLIC_IP_HOST}:8000/`;
    }
	
	fetchAccessToken() {
		return SecureStore.getItem('access-token');
	}

	fetchRefreshToken() {
		return SecureStore.getItem('refresh-token');
	}

	_deleteAccessToken() {
		SecureStore.deleteItemAsync('access-token');
	}

	_deleteRefreshToken() {
		SecureStore.deleteItemAsync('refresh-token');
	}

	_setAccessToken(tokenData) {
		SecureStore.setItem('access-token', tokenData);
	}

	_setRefreshToken(tokenData) {
		SecureStore.setItem('refresh-token', tokenData);
	}

	async authenticateUser(userData) {
		// Função que chama endpoint de Login
        path = `api/v1/usuario/auth/login`;
        url = `${this._apiBaseUrl}${path}`;

		// OBS.: lembrar de utilizar o 'await' antes de chamar funções assíncronas, como
		// as do axios, para garantir o funcionamento correto das chamadas à API.
        await axios
        .post(url, userData)
        .then(async (response) => {
            if (response.data.access_token) {
				this._setAccessToken(response.data.access_token);
				this._setRefreshToken(response.data.refresh_token);
            }
        })
        .catch(function (error) {
            console.error("erro ao logar usuário:", error)
        });
	}

	async googleAuthenticateUser(userData) {
		// Função que chama endpoint de autenticação e registros com Google

		path = `api/v1/usuario/auth/google`;
		url = `${this._apiBaseUrl}${path}`;

		const googleManager = new GoogleManager();

		await axios
		.post(url,{
			token_google: userData.idToken})
		.then(async (response) => {
			if (response.data.access_token) {
				this._setAccessToken(response.data.access_token);
				this._setRefreshToken(response.data.refresh_token);
			}
		})
		.catch(function (error) {
			googleManager.signOut();	
			throw error
		});

		console.log(this.fetchAccessToken())
	}

	async refreshAccessToken() {
		// Função que chama endpoint de atualização de token de acesso
        path = `api/v1/usuario/auth/refresh`;
        url = `${this._apiBaseUrl}${path}`;

        var refreshToken = this.fetchRefreshToken(); 
        if (!refreshToken) {
            return
        }

		// Realiza chamada à API, passando o refresh token no corpo da
		// requisição.
        await axios
        .post(url, {refresh_token: refreshToken})
        .then(async (response) => {
            if (response.data.access_token) {
				// Caso a resposta da API esteja OK, com o campo de access_token retornado corretamente,
 
				// nós adicionamos o refresh e access token ao SecureStorage da aplicação.
				this._setAccessToken(response.data.access_token);
				this._setRefreshToken(response.data.refresh_token);
            }
        })
        .catch(function (error) {
            throw error
        })
	}

	async cleanUserState() {
		// Função que limpa o estado do usuário, deslogando ele do sistema.
		this._deleteRefreshToken();
		this._deleteAccessToken();
	}

	

}