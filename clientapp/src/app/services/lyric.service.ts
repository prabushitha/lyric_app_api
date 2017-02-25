import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class LyricService {
	private serviceurl:string ;
	constructor(private _http: Http){
		this.serviceurl = 'http://localhost:3000/api/lyric'
	}
	getLyrics(){
		return this._http.get(this.serviceurl).map(res => res.json());
	}
	getLyricsByPage(limit,page){
		return this._http.get(this.serviceurl+'/'+limit+'/'+page).map(res => res.json());
	}
	getLyricsByKeyword(keyword,limit,page){
		return this._http.get(this.serviceurl+'/keyword/'+keyword+'/'+limit+'/'+page).map(res => res.json());
	}
	getLyric(_id){
		return this._http.get(this.serviceurl+'/'+_id).map(res => res.json());
	}

	postLyric(dataJson){
		var params = JSON.stringify(dataJson);
		var headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.serviceurl,params,{
			headers:headers
		}).map(res => res.json());
	}
	editLyric(_id,dataJson){
		var params = JSON.stringify(dataJson);
		alert(params);
		var headers = new Headers({'Content-Type':'application/json'});
		return this._http.put(this.serviceurl+'/'+_id,params,{
			headers:headers
		}).map(res => res.json());
	}
	deleteLyric(id){
		return this._http.delete(this.serviceurl+'/'+id).map(res => res.json());
	}

}
