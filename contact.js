
function validateForm() {
  
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;
 
  
  if (name == "" || email == "" || phone == "" || message == "") {
    alert("Please fill all the fields");
    return false;
  }
 
  if (phone.length < 10) {
    alert("Please enter a valid phone number");
    return false;
  }
}