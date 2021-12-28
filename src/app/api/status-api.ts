import { BaseUrl } from "../util/base-url"

export class StatusApi {
    
    public static  addStat : string = BaseUrl.BASE_URL + "/status/add"

  public static  editStat : string = BaseUrl.BASE_URL + "/status/edit"

  public static  getStat : string = BaseUrl.BASE_URL + "/status/status"

  public static  deleteStat : string = BaseUrl.BASE_URL + "/status/delete"
  
}
