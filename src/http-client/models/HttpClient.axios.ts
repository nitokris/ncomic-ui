import {HttpClientInterface} from "src/http-client/models/HttpClient.interface";
import {HttpRequestParamsInterface} from "src/http-client/models/HttpRequestParams.interface";
import {HttpRequestType} from "src/http-client/models/Constants";
import {api} from "boot/axios";
import {UrlUtils} from "src/http-client/models/UrlUtils";
import {AxiosRequestConfig} from "axios";

export class HttpClientAxios implements HttpClientInterface {
  constructor() {
  }

  async request<R, P = void>(parameters: HttpRequestParamsInterface<P>): Promise<R> {
    const {requestType, endpoint, requiresToken, payload, headers, mockDelay} = parameters

    const fullUrl = UrlUtils.getFullUrlWithParams(endpoint, payload as any)
    console.info(`url:${fullUrl},param:${payload}`)
    const options: AxiosRequestConfig = {
      headers: {},
      maxRedirects: 0,
    }

    if (headers) {
      options.headers = {
        ...headers
      }
    }
    // 处理query参数，保证query参数的形式能够添加到axios链接中
    if (endpoint.indexOf('{') === -1 && HttpRequestType.get === requestType) {
      console.log(JSON.stringify(payload))
      options.params = payload
    }
    let result!: R
    try {
      switch (requestType) {
        case HttpRequestType.get:
          const resp = await api.get(fullUrl, options)
          result = resp?.data as R
          break
        case HttpRequestType.post: {
          const response = await api.post(fullUrl, payload, options)
          result = response?.data as R
          break
        }

        // executes a put request:
        case HttpRequestType.put: {
          const response = await api.put(fullUrl, payload, options)
          result = response?.data as R
          break
        }

        // executes a delete request:
        case HttpRequestType.delete: {
          const response = await api.delete(fullUrl, options)
          result = response?.data as R
          break
        }
      }
    } catch (e) {
      console.error('HttpClientAxios: exception', e)
      throw Error('HttpClientAxios: exception')
    }
    return result
  }
}
