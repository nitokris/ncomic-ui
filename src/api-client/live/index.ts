import {ApiClientInterface, WorksApiClientModel} from "src/api-client/models";
import {SukebeiApiClientModel} from "src/api-client/models/sukebei";

const apiLiveClient: ApiClientInterface = {
  works: new WorksApiClientModel({
    endpoints: {
      fetchWorks: '/work/list',
      fetchWork: '/work/{id}',
      hentai: '/hentai'
    }
  }),
  sukebi: new SukebeiApiClientModel({
    endpoints: {
      search: '/hentai/magnet',
    }
  })
}

export {apiLiveClient};
