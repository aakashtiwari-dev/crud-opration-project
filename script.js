function allData(){
            
    table.innerHTML = ``
   
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList.forEach(function (value, i){
       
        var table = document.getElementById('table');

        table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value.name}</td>
                <td>${value.age}</td>
                <td>${value.email}</td>
                <td>${value.gender}</td>
                <td>${value.courses}</td>
                <td>${value.address}</td>
                <td>${value.phone}</td>
                <td>${value.language}</td>
                <td>
                    <img src="${value.photo}" style="height:120px" "width:120px" />
                </td>
                <td>
                    <button class="btn btn-sm btn-success" onchange="imageUpload(e)" onclick="update(${value.id})">
                        Edit <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                        Delete<i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
    })
}
function save(){
    
    $('.span-error').html('')
    var status = false
    if($('#name').val().length <= 0)
    {
        $('#name-error').html(' Please fill this field ')
        status = true
    }
    if($('#age').val().length <= 0)
    {
        $('#age-error').html(' Please fill this field ')
        status = true
    }
    if($('#email').val().length <= 0)
    {
        $('#email-error').html(' Please fill this field ')
        status = true
    }
    if($('#courses').val().length <= 0)
    {
        $('#courses-error').html(' Please fill this field ')
        status = true
    }
    if($('#address').val().length <= 0)
    {
        $('#address-error').html(' Please fill this field ')
        status = true
    }
    if($('#phone').val().length <= 0)
    {
        $('#phone-error').html(' Please fill this field ')
        status = true
    }
    if($('input[type=radio][name=gender]:checked').length <= 0)
    {
        $('#phone-error').html("Please select atleast one");
       return false;
    }
    else
    {

    }  
    
    if($('input[type=checkbox][name=language]:checked').length <= 0)
    {
       $('#language-error').html("Please select atleast one");
       return false;
    }
    else
    {
        
    }  



    if(status == true)
    {
        return false
    }


    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []
    var id
    contactList.length != 0 ? contactList.findLast((item) => id = item.id) : id = 0

    const firstcheck = document.getElementById('check1').checked ? 'React' : '';
    const secondcheck = document.getElementById('check2').checked ? 'Python' : '';
    const thirdcheck = document.getElementById('check3').checked ? 'C#' : '';
    const fourthcheck = document.getElementById('check4').checked ? 'NodeJs' : '';
    const fifthcheck = document.getElementById('check5').checked ? '.Net' : '';

    const languageArr = [firstcheck,secondcheck,thirdcheck,fourthcheck,fifthcheck]

    if(document.getElementById('id').value){

        contactList.forEach(value => {

            if(document.getElementById('id').value == value.id){
                value.name      = document.getElementById('name').value, 
                value.age       = document.getElementById('age').value, 
                value.email     = document.getElementById('email').value,
                value.gender    = $("input[name=gender]:checked").val(),
                value.address   = document.getElementById('address').value, 
                value.courses   = document.getElementById('courses').value, 
                value.phone     = document.getElementById('phone').value,
                value.language  = languageArr,
                value.photo     = document.getElementById('photo').value
            }
        });
        document.getElementById('id').value = ''    

    }else{


        var item = {
            id        : id + 1, 
            name      : document.getElementById('name').value, 
            age       : document.getElementById('age').value,
            email     : document.getElementById('email').value, 
            gender    : $("input[name=gender]:checked").val(),
            address   : document.getElementById('address').value, 
            courses   : document.getElementById('courses').value, 

            phone     : document.getElementById('phone').value,
            language  : languageArr,
            photo     : document.getElementById('photo').value
        }
        contactList.push(item)
       
    }
    localStorage.setItem('listItem', JSON.stringify(contactList))	
    allData()
    document.getElementById('form').reset()
    $( "input[name='language']").attr('checked',false);

}

allData()
function update(id){
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList.forEach(function (value){
        if(value.id == id){     
           document.getElementById('id').value = value.id
           document.getElementById('name').value = value.name
           document.getElementById('age').value = value.age
           document.getElementById('email').value = value.email
           document.getElementById('m').checked = value.gender == 'male'
           document.getElementById('f').checked=  value.gender == "female"
           document.getElementById('o').checked=  value.gender == 'other'
           document.getElementById('address').value = value.address
           document.getElementById('courses').value = value.courses

           document.getElementById('phone').value = value.phone 


           value.language.forEach(function(value2){
        $( "input[name='language'][value='"+ value2 +"']").attr('checked',true);

       })
    
           document.getElementById("photo").value = value.photo

        }
    })
}
function removeData(id){
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList = contactList.filter(function(value){ 
        return value.id != id; 
    });

    localStorage.setItem('listItem', JSON.stringify(contactList))
    allData()
}

function imageUpload(element){
    var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    $('#photo').val(reader.result)
  }
  reader.readAsDataURL(file);
}



const myData = localStorage.getItem('allData');

// Check if the data exists in local storage
if (allData) {
  // Do something with the data
  console.log(`The value of myData is ${allData}`);
} else {
  console.log('There is no data stored under the key "myKey"');
}