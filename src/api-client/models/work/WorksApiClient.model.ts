import {WorksApiClientInterface} from "src/api-client/models/work/WorksApiClient.interface";
import {WorkApiClientEndpoints, WorkApiClientOptions} from "src/api-client/models/work/WorkApiClientOptions.interface";
import {Work} from "src/models";
import {HttpRequestParamsInterface} from "src/http-client/models/HttpRequestParams.interface";
import {useHttpClient} from "src/http-client";
import {HttpRequestType} from "src/http-client/models/Constants";

export class WorksApiClientModel implements WorksApiClientInterface {
  private readonly endpoints!: WorkApiClientEndpoints

  constructor(options: WorkApiClientOptions) {
    this.endpoints = options.endpoints;
  }


  fetchWorks(page: any): Promise<Work[]> {
    const param: HttpRequestParamsInterface<String> = {
      endpoint: this.endpoints.fetchWorks,
      requestType: HttpRequestType.get,
      requiresToken: false,
      payload: page
    }
    return useHttpClient().request<Work[], any>(param)
  }

  fetchWork(id: number): Promise<Work> {
    const param: HttpRequestParamsInterface<any> = {
      endpoint: this.endpoints.fetchWork,
      requestType: HttpRequestType.get,
      requiresToken: false,
      payload: {
        id
      }
    }
    return useHttpClient().request<Work, any>(param)
  }
}
