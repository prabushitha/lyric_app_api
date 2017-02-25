import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class GenreService {
	private serviceurl:string ;
	constructor(private _http: Http){
		this.serviceurl = 'http://localhost:3000/api/genre'
	}
	getGenres(){
		return this._http.get(this.serviceurl).map(res => res.json());
	}
	getGenre(_id){
		return this._http.get(this.serviceurl+'/'+_id).map(res => res.json());
	}
	postGenre(dataJson){
		var params = JSON.stringify(dataJson);
		var headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.serviceurl,params,{
			headers:headers
		}).map(res => res.json());
	}
	editGenre(_id,dataJson){
		var params = JSON.stringify(dataJson);
		alert(params);
		var headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.serviceurl+'/'+_id,params,{
			headers:headers
		}).map(res => res.json());
	}
	deleteGenre(id){
		return this._http.delete(this.serviceurl+'/'+id).map(res => res.json());
	}

}
