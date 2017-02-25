import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenreService } from '../../services/genre.service';
import { LyricService } from '../../services/lyric.service';

@Component({
  selector: 'lyric',
  templateUrl: './lyric.component.html',
  styleUrls: ['./lyric.component.css'],
  providers: [GenreService,LyricService]
})
export class LyricComponent {
  title:string;
  genres:any[];
  lyrics:any[];
  selectedId:string;
  pagelimit:number=8;
  pagecurrent:number=0;
  totalcount:number=0;
  searchkeyword:string='';
  public addForm = this.fb.group({
    title: ["", Validators.required],
    si_title: ["", Validators.required],
    genre: ["", Validators.required],
    content: [""],
    mp3link: [""],
  });
  public editForm = this.fb.group({
    title: ["", Validators.required],
    si_title: ["", Validators.required],
    genre: ["", Validators.required],
    content: [""],
    mp3link: [""],
  });
  public searchForm = this.fb.group({
    keyword:[""]
  });
  constructor(private genreService:GenreService, private lyricService:LyricService, public fb: FormBuilder){
    this.title = 'Music Lyrics';
    this.searchkeyword='';
    this.doGetGenres();
    this.doPage(this.pagecurrent);
  }
  doPage(navpage){
    this.pagecurrent = navpage;
    if(this.searchkeyword==''){
      this.lyricService.getLyricsByPage(this.pagelimit,navpage).subscribe(
        data => {this.lyrics = data.lyrics;this.totalcount=data.totalcount},
        error => alert(error),
        () => console.log("Finished getting lyrics")
      );
    }else{
      this.lyricService.getLyricsByKeyword(this.searchkeyword,this.pagelimit,navpage).subscribe(
        data => {this.lyrics = data.lyrics;this.totalcount=data.totalcount},
        error => alert(error),
        () => console.log("Finished getting lyrics by keyword")
      );
    }

  }
  doGetGenres(){
    this.genreService.getGenres().subscribe(
      data => this.genres = data,
      error => alert(error),
      () => console.log("Finished getting genres")
    );
  }
  findGenreName(_id){
    var i;
    for(i=0;i<this.genres.length;i++){
      var gen = this.genres[i];
      if(gen._id==_id){
        return gen.name;
      }
    }
    return "";
  }
  doAdd(event) {
    console.log(event);
    console.log(this.addForm.value);

    this.lyricService.postLyric(this.addForm.value).subscribe(
      data => console.log(data),
      error => alert(error),
      () => this.reloadPage()
    );
  }
  doEdit(event) {
    var formdata = this.getEditInputs();
    console.log(event);
    console.log(formdata);

    this.lyricService.editLyric(this.selectedId,formdata).subscribe(
      data => console.log(data),
      error => alert(error),
      () => this.reloadPage()
    );
  }
  doDelete(_id){
    var result = confirm("Want to delete?");
    if(result){
      this.lyricService.deleteLyric(_id).subscribe(
        data => console.log(data),
        error => alert(error),
        () => this.reloadPage()
      );
    }
  }
  doSearch(event){
    console.log(event);
    console.log(this.searchForm.value);
    var keyword = this.searchForm.value.keyword;
    this.searchkeyword = keyword;
    this.doPage(0);
  }
  /* UI */
  setSelectId(_id){
    this.selectedId = _id;
    this.lyricService.getLyric(_id).subscribe(
      data => this.setEditInputs(data),
      error => alert(error),
      () => console.log("Finished getting lyric :"+_id)
    );
  }
  setEditInputs(data){
    //this.selectedlyric = data;
    try{
      (<HTMLInputElement>document.getElementById("sel_title")).value = data.title;
      (<HTMLInputElement>document.getElementById("sel_si_title")).value = data.si_title;
      (<HTMLInputElement>document.getElementById("sel_content")).value = data.content;
      (<HTMLInputElement>document.getElementById("sel_mp3link")).value = data.mp3link;
      (<HTMLInputElement>document.getElementById("sel_genre")).value = data.genre;
    }catch(e){
      console.log(e);
    }
  }
  getEditInputs(){
    return {
      title:(<HTMLInputElement>document.getElementById("sel_title")).value,
      si_title:(<HTMLInputElement>document.getElementById("sel_si_title")).value,
      content:(<HTMLInputElement>document.getElementById("sel_content")).value,
      mp3link:(<HTMLInputElement>document.getElementById("sel_mp3link")).value,
      genre:(<HTMLInputElement>document.getElementById("sel_genre")).value,
    }
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }
  reloadPage(){
    location.reload();
  }
}
