import {HttpRequestParamsInterface} from "src/http-client/models/HttpRequestParams.interface";

export interface HttpClientInterface {
  request<R, P = void>(param: HttpRequestParamsInterface<P>): Promise<R>;
}
