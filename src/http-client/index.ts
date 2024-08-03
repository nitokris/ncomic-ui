import {HttpClientAxios} from "src/http-client/models/HttpClient.axios";
import {HttpClientInterface} from "src/http-client/models/HttpClient.interface";

export const useHttpClient = () => {
  return new HttpClientAxios() as HttpClientInterface;
}
