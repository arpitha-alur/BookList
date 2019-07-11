//Book constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI(){}

  UI.prototype.addBookToList = function(book){
    
     const list = document.getElementById('book-list');

     const row = document.createElement('tr');
     row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href = "#" class = "delete">X<a></td>
     `;

     list.appendChild(row);
  }
  //show alert
  UI.prototype.showAlert = function(message,className){
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const container = document.querySelector('.container');
    //Get the form
    const form = document.querySelector('#book-form');
    //Insert Alert before form 
    container.insertBefore(div,form);

    //Alert timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },3000);
  }

  //Delete books
  UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  //clear fields
  UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

document.getElementById('book-form').addEventListener('submit',function(e){

 //To get form values 
  const title = document.getElementById('title').value, 
  author = document.getElementById('author').value, 
  isbn = document.getElementById('isbn').value

   const book = new Book(title,author,isbn);
   
   const ui = new UI();
   //Validation

   if(title == '' || author == ''|| isbn == ''){
     ui.showAlert('Please fill in all the fields','error');
   }
   else{
   ui.addBookToList(book);

   //show succeesfull addition of book
    ui.showAlert('Book Added Successfully!','success');
   ui.clearFields();
   }
  e.preventDefault();
});

//Event Listener for deletion
document.getElementById('book-list').addEventListener('click',function(e){
const ui = new UI();
ui.deleteBook(e.target);

//Show alert

ui.showAlert('Book deleted','success');
  e.preventDefault();
});

