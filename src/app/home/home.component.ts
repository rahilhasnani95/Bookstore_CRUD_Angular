import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   employeeDetails: Books[];
   errorMsg: any;
   editEmployeeDetails: Books;
   searchword: string = "";
   ctx: any;
   flag: Boolean = false;

  //  dataSource: MatTableDataSource<Books>;  
  //  displayedColumns: string[] = ['Id', 'Name', 'Price','Category','Author'];  

 
  constructor(public homeService : HomeService, public router: Router) {  }

  // ngOnInit() {  
  //   this.homeService.getListOfBooks().subscribe(data =>{  
  //     this.dataSource = new MatTableDataSource(data);  
       
  //   }); 
  // } 
  // applyFilter(filterValue: string) {  
  //   this.dataSource.filter = filterValue.trim().toLowerCase();  
  
  //   if (this.dataSource.paginator) {  
  //     this.dataSource.paginator.firstPage();  
  //   }  
  // } 

//list all books 
  ngOnInit() {
     this.homeService.getListOfBooks().subscribe(
       data => this.employeeDetails = data,
       error => this.errorMsg = error
     );    
  }

  sort(sortExpr: string, sortDir: string)
  {
    if(this.flag == false) sortDir = "ASC";
    if(this.flag == true) sortDir = "DESC";

    this.homeService.sort(sortExpr, sortDir).subscribe(
      data => this.employeeDetails = data
    );
    if(this.flag == false) this.flag = true
    else this.flag = false;
  }

  highlight(text: string) {
    console.log("text "+text); //there
    var inputText = document.getElementById("inputText");
    console.log("inputtext "+inputText); //[object]

     var innerHTML = inputText.innerHTML;
     console.log("innerHTML "+innerHTML); //Hi There

     var index = innerHTML.indexOf(text);
   if(index > 0)
   {
      innerHTML = innerHTML.substring(0,index) + "<span style='background-color: yellow;'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
     
   }
   inputText.innerHTML = innerHTML;
  }

  

  search(searchword: string)
  {
    //console.log(searchword + "inside component");
    this.homeService.search(searchword).subscribe(
      data => this.employeeDetails = data 
    );
  }

  delete(employeeDetails: Books, router: Router): void {
     if (confirm("Are you sure you want to delete: " + employeeDetails.bookName + "?")) {
       this.employeeDetails = this.employeeDetails.filter(n => n !== employeeDetails);
       this.homeService.deleteBook(employeeDetails.id).subscribe();
      
       alert("Book  " + employeeDetails.bookName + " Deleted!");
       router.navigateByUrl('/Home');
     }
   }


   add(addForm: NgForm, router: Router) {
    this.editEmployeeDetails = undefined;

    if (addForm.value.price < 0) {
      alert("Price can't be Negative");
      return;
    }

    this.homeService.addBook(addForm.value).subscribe();
    this.employeeDetails.push(addForm.value);
      
    alert("New Book: " + addForm.value.bookName + " Added!");
    addForm.resetForm();
    router.navigateByUrl('/Home');

  }
  
  edit(employeeDetails: Books) {
    this.editEmployeeDetails = employeeDetails;
  }

  update() {
    if (this.editEmployeeDetails) {

      if (this.editEmployeeDetails.bookName == "") {
        alert("Book Name is required!");
        return;
      }

      if (this.editEmployeeDetails.price < 0) {
        alert("Book Price cannot be negative!");
        return;
      }
      if (this.editEmployeeDetails.price.toString() == "") {
        alert("Book Price cannot be negative!");
        return;
      }

      if (this.editEmployeeDetails.category == "") {
        alert("Book Category is required!");
        return;
      }

      if (this.editEmployeeDetails.author == "") {
        alert("Book Author is required!");
        return;
      }

      this.homeService.updateBook(this.editEmployeeDetails.id, this.editEmployeeDetails).subscribe
        (editEmployeeDetails => {
          const nr = editEmployeeDetails ? this.employeeDetails.findIndex(n => n.id === editEmployeeDetails.id) : -1;
          if (nr != -1) {
            this.employeeDetails[nr] = editEmployeeDetails;
            alert("Book: " + this.employeeDetails[nr].bookName + " Edited!");
          }
        });
      this.editEmployeeDetails = undefined;
    }
  }

  logout(router: Router)
  {
    this.router.navigate(['/']);
  }



}
