import { BaseUrl } from "../util/base-url"

export class SubscritionApi {
    public static  addSub : string = BaseUrl.BASE_URL + "/subscription/add"

  public static  editSub : string = BaseUrl.BASE_URL + "subscription/edit"

  public static  getSub : string = BaseUrl.BASE_URL + "/subscription/subscriptions"

  public static  delete : string = BaseUrl.BASE_URL + "/subscription/delete"


  

}
