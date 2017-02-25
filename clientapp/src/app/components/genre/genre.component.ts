import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenreService } from '../../services/genre.service';

@Component({
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
  providers: [GenreService]
})
export class GenreComponent {
  title:string;
  genres:any[];
  selectedId:string;
  public addForm = this.fb.group({
    name: ["", Validators.required],
    si_name: ["", Validators.required]
  });
  public editForm = this.fb.group({
    name: ["", Validators.required],
    si_name: ["", Validators.required]
  });
  constructor(private genreService:GenreService, public fb: FormBuilder){
    this.title = 'Music Genres';
    this.doGet();
  }
  doGet(){
    this.genreService.getGenres().subscribe(
      data => this.genres = data,
      error => alert(error),
      () => console.log("Finished getting genres")
    );
  }
  doAdd(event) {
    console.log(event);
    console.log(this.addForm.value);
    this.genreService.postGenre(this.addForm.value).subscribe(
      data => console.log(data),
      error => alert(error),
      () => this.reloadPage()
    );
  }
  doEdit(event) {
    var formdata = this.getEditInputs();
    console.log(event);
    console.log(formdata);

    this.genreService.editGenre(this.selectedId,formdata).subscribe(
      data => console.log(data),
      error => alert(error),
      () => this.reloadPage()
    );
  }
  doDelete(_id){
    var result = confirm("Want to delete?");
    if(result){
      this.genreService.deleteGenre(_id).subscribe(
        data => console.log(data),
        error => alert(error),
        () => this.reloadPage()
      );
    }
  }

  /* UI */
  setSelectId(_id){
    this.selectedId = _id;
    this.genreService.getGenre(_id).subscribe(
      data => this.setEditInputs(data),
      error => alert(error),
      () => console.log("Finished getting genres")
    );
  }
  setEditInputs(data){
    try{
      (<HTMLInputElement>document.getElementById("sel_name")).value = data.name;
      (<HTMLInputElement>document.getElementById("sel_siname")).value = data.si_name;
    }catch(e){
      console.log(e);
    }
  }
  getEditInputs(){
    return {
      name:(<HTMLInputElement>document.getElementById("sel_name")).value,
      si_name:(<HTMLInputElement>document.getElementById("sel_siname")).value
    }
  }
  reloadPage(){
    location.reload();
  }
}
