import {Sukebei, SukebeiResp, Work} from "src/models";
import {
  SukebeiApiClientEndpoints,
  SukebeiApiClientOptions
} from "src/api-client/models/sukebei/SukebeiApiClientOptions.interface";
import {SukebeiApiClientInterface} from "src/api-client/models/sukebei/SukebeiApiClient.interface";
import {HttpRequestParamsInterface} from "src/http-client/models/HttpRequestParams.interface";
import {HttpRequestType} from "src/http-client/models/Constants";
import {useHttpClient} from "src/http-client";


export class SukebeiApiClientModel implements SukebeiApiClientInterface {
  private readonly endpoints!: SukebeiApiClientEndpoints

  constructor(options: SukebeiApiClientOptions) {
    this.endpoints = options.endpoints;
  }

  search(keyword: string, page: number): Promise<SukebeiResp> {
    const param: HttpRequestParamsInterface<any> = {
      endpoint: this.endpoints.search,
      requestType: HttpRequestType.post,
      requiresToken: false,
      payload: {
        keyword: keyword,
        page: page
      }
    }
    return useHttpClient().request<SukebeiResp>(param)
  }
}
