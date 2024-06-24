import axios from "axios";
import { Authenticator } from "./Authenticator";
import * as FileSystem from "expo-file-system";

export class ApiClient {
  // Classe que realiza o consumo da API. Qualquer função que chame a API
  // deve ser implementada como método assíncrono desta classe.
  constructor() {
    // ALTERAR CONFORME O SEU IP
    this._apiBaseUrl = `http://${process.env.EXPO_PUBLIC_IP_HOST}:8000/`;
    this._authenticator = new Authenticator();
  }

  async _callApiWithToken(url, method, data, params, token, multipart) {
    // Função que realiza a chamada da API em si,
    // adicionando o token de acess à header do request.
    if (multipart) {
      headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
    } else {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      var response = await axios({
        url: url,
        method: method,
        data: data,
        params: params,
        headers: headers,
      });

      return response.data;
    } catch (err) {
		console.log("deu erro: " + err)
      throw err;
    }
  }

  async _callApi({ path, method, data, params, multipart }) {
    // Função genérica que faz um chamado à API
    const url = `${this._apiBaseUrl}${path}`;
    let token = this._authenticator.fetchAccessToken();

	// Define multipart como false por padrão
	multipart = multipart ? multipart : false

    try {
      var response = await this._callApiWithToken(
        url,
        method,
        data,
        params,
        token,
        multipart
      );
    } catch (err) {
      // Caso o erro retornado seja um erro de autorização (de código 401),
      // nós atualizamos o token de acesso pela função refresh() e realizamos
      // a chamada novamente.
      if (err.response.status == 401) {
        try {
          await this._authenticator.refreshAccessToken();

          token = this._authenticator.fetchAccessToken();
          response = await this._callApiWithToken(
            url,
            method,
            data,
            params,
            token,
            multipart
          );
        } catch (err) {
          // Caso a atualização do token de acesso falhe, o usuário é deslogado.
          this._authenticator.cleanUserState();
          throw err;
        }
      } else {
        throw err;
      }
    }

    return response;
  }

  async _getNomeArquivo(arquivo) {
    arquivoInfo = await FileSystem.getInfoAsync(arquivo);
    arquivoInfo = arquivoInfo.uri.split("/");
    return arquivoInfo.at(-1);
  }

  async getParametrosRequisicao({ imagem, formulario }) {
    if (imagem) {
      const imageData = new FormData();
      nomeArquivo = await this._getNomeArquivo(imagem);
      imageData.append("foto", {
        uri: imagem,
        type: "image/jpeg",
        name: nomeArquivo,
      });
      return { imagem: imageData, formulario: formulario, multipart: true };
    }
    return { formulario: formulario };
  };

  async getUserDetail() {
    // Função que chama endpoint de teste
    return await this._callApi({
      path: "api/v1/usuario/usuario/eu",
      method: "GET",
    });
  }

  async loginUser(formData) {
    // Função que chama endpoint para autenticar o usuário no sistema
    return await this._authenticator.authenticateUser(formData);
  }

  async createUser(formData) {
    return await this._authenticator.createAndAuthenticateUser(formData);
  }

  async createMercado(formData) {
    return await this._callApi({
      path: "api/v1/mercado/mercado/cadastrar",
      method: "POST",
      data: formData,
	});
  }

  async createCostumer(formData) {
    return await this._authenticator.createCostumer(formData);
  }

  async getConsumidorData() {
    return await this._callApi({
      path: "api/v1/usuario/consumidor/consultar",
      method: "GET",
	});
  }

  async updateConsumidorData(userData, params, multipart) {
    return await this._callApi({
      path: "api/v1/usuario/consumidor/atualizar",
      method: "PUT",
      data: userData,
      params: params,
      multipart: multipart
	});
  }

  async createPost(parametros) {
    return await this._callApi({
      path: "api/v1/usuario/postagem_promocao/postar",
      method: "POST",
      data: parametros.imagem,
      params: parametros.formulario,
      multipart: true,
    });
  }

  async getTodosPosts() {
    return await this._callApi({
      path: "api/v1/usuario/postagem_promocao/consultar",
      method: "GET",
	});
  }

  async getPostData(postId) { 
	return await this._callApi({
		path:`api/v1/usuario/postagem_promocao/consultar/${postId}`,
		method: "GET",
	})
  } 
}
