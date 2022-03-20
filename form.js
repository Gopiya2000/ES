class LoginForm{
   alphaRegex=/^[a-zA-Z ]+$/;
   numberRegex=/^[6789]{1}[\d]{9}$/;
   mailidUserRegex=/^([a-z]+[\.-\d]*)@$/;
   mailidDomainRegex=/^([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$/;
   passwordRegrex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
  user = {
     name: "",
     phonenumber: "",
     mailid: "",
     password: "",
     alphabetError: "",
     phonenumberError:"",
     mailidError:"",
     passwordError:"",
  }
  getUserInputs(){
     this.user.name = document.getElementById("name").value.trim();
     this.user.phonenumber = document.getElementById("phonenumber").value.trim();
     this.user.mailid = document.getElementById("mailid").value.trim();
     this.user.password = document.getElementById("password").value.trim();
     
     
  }
  displayErrorMessage(index,message){
     const form_group = document.getElementsByClassName("form_group")[index];
     form_group.classList.add("invalid");
     form_group.getElementsByTagName("span")[0].textContent = message;
  }
  removeErrorMessage(index){
      const form_group = document.getElementsByClassName("form_group")[index];
      form_group.classList.remove("invalid");
      form_group.classList.add("valid");
  }
  validateAlphabets(){
      if(this.user.name == ""){
          this.user.alphabetError = "Name required";
          this.displayErrorMessage(0,this.user.alphabetError);
      }
      else if(this.alphaRegex.test(this.user.name) == false){
          this.user.alphabetError = "Should contain only alphabets";
          this.displayErrorMessage(0,this.user.alphabetError);
      }
      else if(this.user.name.length < 3)
      {
          this.user.alphabetError = "Should contain atleast 3 letters";
          this.displayErrorMessage(0,this.user.alphabetError);
      }
      else if(this.user.name.length > 15)
      {
          this.user.alphabetError = "Should not exceed 15 letters";
          this.displayErrorMessage(0,this.user.alphabetError);
      }
      else 
      {
          this.removeErrorMessage(0);
          this.user.alphabetError = "";
      }
  }
  validatePhoneNumber(){
       if(this.user.phonenumber == "")
       {
          this.user.phonenumberError = "Phone number required";
          this.displayErrorMessage(2,this.user.phonenumberError);
       }
       else if(this.numberRegex.test(this.user.phonenumber) == false){
          this.user.phonenumberError = "starts with 6/7/8/9 and contain only 10 digits";
          this.displayErrorMessage(2,this.user.phonenumberError);
       }
       else
           {
               this.removeErrorMessage(2);
               this.user.phonenumberError = "";
          }
  }
  validatemailid(){
      if(this.user.mailid == "")
      {
         this.user.mailidError = "Mailid  required";
         this.displayErrorMessage(3,this.user.mailidError);
      }
      else if(this.mailidUserRegex.test(this.user.mailid.substring(0,(this.user.mailid.indexOf("@"))+1)) == false){
         this.user.mailidError = "Username should starts with lowercase alphabets followed by digits if any";
         this.displayErrorMessage(3,this.user.mailidError);
      }
      else if(this.mailidDomainRegex.test(this.user.mailid.substring((this.user.mailid.indexOf("@"))+1,this.user.mailid.length)) == false){
          this.user.mailidError = "Username followed by domain name in lowercased alphabets with extension";
          this.displayErrorMessage(3,this.user.mailidError);
       }
       else
           {
              this.removeErrorMessage(3);
              this.user.mailidError = "";
          }
  }

  clearValues(){
  
      if(this.user.alphabetError === "" && this.user.phonenumberError === "" && this.user.mailidError === "" && this.user.password === "")
      {
          alert("Successfully registered");
          const group = document.getElementsByClassName("form_group");
          console.log(typeof(group));
          Array.from(group).forEach(element => {
              element.getElementsByTagName("input")[0].value = "";
              element.classList.remove("valid");
          });
      } 
  }
  checkFormValid(){
      const form_group = document.getElementsByClassName("form_group");
      let result = true;
      Array.from(form_group).forEach(element => {
          if(element.classList.contains("invalid"))
          result = false;
      });
      return result;
  }
  
}
const entry = new Registration();

document.getElementsByClassName("form")[0].addEventListener('submit',event => {
  entry.getUserInputs();
  entry.validateAlphabets();
  entry.validatePassword();
  entry.validatePhoneNumber();
  entry.validatemailid();
  entry.clearValues();
  if(entry.checkFormValid() == false)
  event.preventDefault();
  else
  document.getElementsByClassName('form')[0].submit();
  
})
