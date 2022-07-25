import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilingService {

  constructor(private _http: HttpClient) { }

  getTableCriteria(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);\
    let data1: any = {};
    let level: any = data.level;
    return this._http.post('http://illin4616:8888/tdmProfiling/getTableCriteria?projCode=TMO&level=' + level, data1, {
      'headers': headers
    });
  }

  getValidValues(data: any) {
    let criteria: any = data.criteria;
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    return this._http.post('http://illin4616:8888/tdmProfiling/getValidValues?projCode=TMO&criteria=' + criteria + '&tag=TMO_SRC', data1, {
      'headers': headers
    });
  }

  getCriteriaCount(data: any) {
    let criteria: any = data.criteria;
    let value: any = data.value;
    let operator: any = data.operator;
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    return this._http.post("http://illin4616:8888/tdmProfiling/getCriteriaCount?projCode=TMO&value=" + value + "&runid=6609&criteria_name=" + criteria + "&operator=" + operator + "&tag=TMO_SRC", data1, {
      'headers': headers
    });
  }

  getTotalCustomerCount(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    return this._http.post("http://illin4616:8888/tdmProfiling/getTotalCustomerCount?proj_code=TMO&tag=TMO_SRC&run_id=6609", data1, {
      'headers': headers
    });
  }

  getFavorites(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    return this._http.post("http://illin4616:8888/tdmProfiling/getFavorites?projCode=TMO&favType=JSON", data1, {
      'headers': headers
    });
  }

  checkForFavoriteName(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    let favName: any = data.favName;
    return this._http.post("http://illin4616:8888/tdmProfiling/checkForFavoriteName?projCode=TMO&fav_name=" + favName, data1, {
      'headers': headers
    });
  }

  addToFavorites(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    console.log(JSON.parse(data.favJSON.data))
    let favJSON: any = JSON.parse(data.favJSON.data);
    let favSql: any = null;//data.favSql;
    return this._http.get("http://illin4616:8888/tdmProfiling/addToFavorites?projCode=TMO&fav_type=JSON&fav_json=" + favJSON + "&fav_sql=" + favSql, {
      'headers': headers
    });
  }

  delete_favorite(data: any) { 
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg4MDk1OTcsImlhdCI6MTY1ODcyMzE5Nywic3ViIjoiYWt1bHIifQ.LZZOMvNou0-Q_T7HfI-goL-dNUt6LNbON-abYAUQ1v4');
    //console.log(headers);
    let data1: any = {};
    let favName: any = data.favName;
    return this._http.post("http://illin4616:8888/tdmProfiling/delete_favorite?projCode=TMO&fav_name=" + favName, data1, {
      'headers': headers
    });
  }

}
