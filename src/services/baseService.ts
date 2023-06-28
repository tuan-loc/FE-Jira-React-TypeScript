import requester from "./api";

export class baseService {
  //put json về phía backend
  put = (url: string, model: any) => {
    return requester({
      url: `${url}`,
      method: "PUT",
      data: model,
      //JWT
    });
  };

  post = (url: string, model: any) => {
    return requester({
      url: `${url}`,
      method: "POST",
      data: model,
    });
  };

  get = (url: string, model: any = "") => {
    return requester({
      url: `${url}`,
      method: "GET",
      data: model,
    });
  };

  delete = (url: string) => {
    return requester({
      url: `${url}`,
      method: "DELETE",
    });
  };
}
