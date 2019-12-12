document.querySelectorAll('.reg-btn').forEach((btn) => {
    btn.onclick = () =>{
        document.querySelector('.modal-container-email').style.display = 'block';
    }
})

let closeModalEmail = () => {
    let modal = document.querySelector('.modal-container-email');
    modal.style.display = 'none';
}

document.querySelector('.modal-wrap-email').onclick = closeModalEmail;
document.querySelector('.close-modal-email').onclick = closeModalEmail;


document.querySelector('.modal-btn').onclick = () =>{

    let emailSubcribe =  document.querySelector('.modal-input').value;
    
    if(!emailSubcribe){
        document.querySelector('.error-modal').innerHTML = 'Fill email';
    } else {
        if(formVaidateEmail(emailSubcribe)){
            console.log(emailSubcribe);
            closeModalEmail();
        } else {
            document.querySelector('.error-modal').innerHTML = 'Fill email corect';
        }
    }      
}

let formVaidateEmail = (emailValue) => {
    
    let email = emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
    if (email === null){     
        email = false;         
    } 
    if(email){
        return true;
    } else {
        return false;  
    }                
}

