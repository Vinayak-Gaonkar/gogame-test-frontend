//app.component.ts
import { Component, ViewChild, OnInit } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HttpService } from './service/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



export class GameData {
  public gameName: string;
  public _id: string;
  public userName: string;
  public date: Date;
  public score: number;
  constructor(data: any = {}) {
    this.gameName = data.gameName;
    this._id = data._id;
    this.userName = data.userName;
    this.score = data.score;
    this.date = data.date;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['Id', 'Name', 'User', "Date", "score", "Action"];
  dataSource=new MatTableDataSource();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, public httpService: HttpService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.sort);
    
    this.dataSource.sort = this.sort;
    this.getAllGames()
  }

  getAllGames() {
    this.httpService.get("/game").subscribe(res => {
      if (res.message = "success") {
        let payload = []
        res.payload.forEach(element => {
          const check = new GameData(element)
          payload.push(check)
          this.dataSource.data = payload
        });
      }

    }, (err: any) => {
      this.openSnackBar("something went wrong !!")
      console.log(err)
    })
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {

    let newGame = new GameData(row_obj);
    console.log(newGame);
    this.httpService.post("/game", newGame).subscribe(res => {
      if (res.message = "success") {
        this.openSnackBar("Game created !!");
        this.getAllGames()
      }
    })

  }
  updateRowData(data){
    let id=data._id
    this.httpService.put(`/game/${id}`,data).subscribe(res=>{
      console.log(res);
      this.getAllGames();
      this.openSnackBar("Game updated successfully !!");
    },err=>{
      this.openSnackBar("Unable to update");
    })
    
  }
  deleteRowData(element){
    
    this.httpService.delete(`/game/${element._id}`).subscribe(res=>{
      console.log("delete",res);
      this.getAllGames()
      this.openSnackBar("Game Deleted !!");
    },err=>{
      this.openSnackBar("Unable to delete this game");
    })
  }


  openSnackBar(message) {
    this._snackBar.open(message, "ok", {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-color']
    });
  }

}
