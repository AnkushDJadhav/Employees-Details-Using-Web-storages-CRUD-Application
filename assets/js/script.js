var cl = console.log;

const createForm = document.getElementById('createStudent');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const studInfoHolder = document.getElementById('studInfoHolder');
const btnAdd = document.getElementById('btnAdd');
const btnUpdate = document.getElementById('btnUpdate');

btnUpdate.style.display ='none';

let employInfoArray = [];

if(localStorage.getItem('studInfo')){
   employInfoArray = getEmployeeData();
   tableTemplet(employInfoArray)
 }

function getEmployeeData(){
   if(localStorage.getItem('studInfo')){
      return JSON.parse(localStorage.getItem('studInfo'));
   }
}


//-----------create data----------------

function formeCreateHandler (eve){
 cl('hello js');
 eve.preventDefault();
let studObj = {
   firstName: fname.value,
   lastName :lname.value,
   email:email.value,
   contact:contact.value,
   id:  uuid()
}
employInfoArray.push(studObj);
cl(employInfoArray)
localStorage.setItem('studInfo',JSON.stringify(employInfoArray));
employInfoArray = getEmployeeData();
this.reset();
tableTemplet(employInfoArray)
}

//----------read data-------------------

function tableTemplet(arr){
    let result = " ";
    arr.forEach((stud,i) => {
       result += `<tr>
                     <td>${(i + 1)}</td>
                     <td>${stud.firstName}</td>
                     <td>${stud.lastName}</td>
                     <td>${stud.email}</td>
                     <td>${stud.contact}</td>
                     <td><button class="btn btn-primary" data-id ="${stud.id}" onclick="onEditHandler(this)">Edit</button></td>
                     <td><button class="btn btn-danger"  data-id ="${stud.id}" onclick="onDeleteHandler(this)">Delete</button></td>
       </tr>
       `
    });
    studInfoHolder.innerHTML = result;
}
          
//----------- Edit data------------------

 function onEditHandler(ele){
    let getId = ele.getAttribute('data-id')
    localStorage.setItem('setId',getId);
    btnUpdate.style.display ='inline-block';
    btnAdd.style.display ='none';
  // cl(getId)
   let getLocalData = getEmployeeData();
   cl(getLocalData);
   let getObj = getLocalData.filter(ele => {
      return ele.id === getId;
   })
   cl(getObj);
   fname.value = getObj[0].firstName
   lname.value = getObj[0].lastName
   email.value = getObj[0].email
   contact.value = getObj[0].contact
 }


//----------- Update data------------------
 function updateDataHandler(){
   let getId = localStorage.getItem('setId')
   cl(getId)
   let getLocalData = getEmployeeData();
   getLocalData.forEach(obj =>{
      if(obj.id === getId){
         obj.firstName = fname.value;
         obj.lastName = lname.value;
         obj.email = email.value;
         obj.contact = contact.value;
      }
   })
   cl(getLocalData);
   localStorage.setItem('studInfo',JSON.stringify(getLocalData));
   createForm.reset();
   btnUpdate.style.display ='none';
   btnAdd.style.display ='inline-block';
   tableTemplet(getLocalData);
 }

 //---------delete data-----

 function onDeleteHandler(ele){
 //cl(ele)
 let getId = ele.dataset.id;
//  let getId = ele.getAttribute('data-id');
cl(getId);
let getempData = getEmployeeData();
getempData = getempData.filter(emp => {
   return  emp.id !== getId;
})
cl(getempData);
localStorage.setItem('studInfo',JSON.stringify(getempData));
tableTemplet(getempData);
window.location.reload();
 }


//uniq ID generator---

function uuid() {
   var dt = new Date().getTime();
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
       var r = (dt + Math.random() * 16) % 16 | 0;
       dt = Math.floor(dt / 16);
       return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
   });
   return uuid;
}





//events

createForm.addEventListener('submit',formeCreateHandler)

btnUpdate.addEventListener('click',updateDataHandler)

