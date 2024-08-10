import {WorksApiClientInterface} from "src/api-client/models/work";
import {SukebeiApiClientInterface} from "src/api-client/models/sukebei";

export interface ApiClientInterface {
  works: WorksApiClientInterface
  sukebi: SukebeiApiClientInterface
}
