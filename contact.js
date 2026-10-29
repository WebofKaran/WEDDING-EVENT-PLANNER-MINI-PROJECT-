
function validateForm() {
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
 
  
  if (name == "" || email == "" || phone == "" || message == "") {
    alert("Please fill all the fields");
    return false;
  }
 
  if (phone.length < 10) {
    alert("Please enter a valid phone number");
    return false;
  }
}   