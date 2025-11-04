const emailInput = document.getElementById('email');
const customControlInput = document.getElementById('custom-control');
const singUpNextBtn = document.getElementById('sing-up');
const phoneNumberInput = document.getElementById('phoneNumber');
// const statusSumbitBtn = document.getElementById('status-submit');
const statusChangeBtn = document.getElementById('change-status-btn');
const emailChangeBtn = document.getElementById('change-email-btn');
// form elements
const singUpForm = document.querySelector('.sing-up-wrapper .sing-up-form');
const checkStatusForm = document.querySelector('.sing-up-wrapper .check-status-form');
const confirmEmailForm = document.querySelector('.sing-up-wrapper .confirm-email-form');

let codeForEmail = "12345";

// singUpNextBtn tikandiginde singUpForm display none , chechStatusForm display block etmeli
// bu, emailInput value si phone number olsa. Eger email olsa singUpForm display none , confirmEmailForm display block
// customControlInput value true olmali.
customControlInput.addEventListener('change', (e) => {
    // if customControlInput is checked, enable singUpNextBtn
    if (e.target.checked && singUpNextBtn.disabled) {
        singUpNextBtn.disabled = false;
    } else {
        singUpNextBtn.disabled = true;
    }
});
function showErrorElement(formClass) {
    const errorElement = document.querySelector(`.sing-up-wrapper .${formClass} .input-error`);
    errorElement.style.display = "block";
    setTimeout(() => {
        errorElement.style.display = "none";
    }, 2000);
}
// click to singUpNextBtn
singUpNextBtn.addEventListener('click', async (e) => {
    // to be phone number
    if (parseInt(emailInput.value)
        && emailInput.value.length == 11
        && ["99360","99361", "99362", "99363", "99364", "99365", "99371"].includes(emailInput.value.slice(0, 5))) {
        singUpForm.style.display = "none";
        confirmEmailForm.style.display = "none";
        checkStatusForm.style.display = "block";
        phoneNumberInput.value = emailInput.value;
        document.getElementById('phone-number').textContent = emailInput.value;
        return;
    }
    // to be email
    let emailRegExp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegExp.test(emailInput.value)) {
        // const response = await fetch('/api/singUp/email', { method: 'post', body: JSON.stringify({ email: emailInput.value, timestamp: Date.now() }) });
        // const data = await response.json();
        // codeForEmail = data.code;

        singUpForm.style.display = "none";
        confirmEmailForm.style.display = "block";
        checkStatusForm.style.display = "none";
        return;
    }

    showErrorElement('sing-up-form');    
});

statusChangeBtn.addEventListener('click', (e) => {
    // e.preventDefault();
    singUpForm.style.display = "flex";
    checkStatusForm.style.display = "none";
    confirmEmailForm.style.display = "none";
    customControlInput.checked = false;
    singUpNextBtn.disabled = true;
});

emailChangeBtn.addEventListener('click', () => {
    singUpForm.style.display = "flex";
    checkStatusForm.style.display = "none";
    confirmEmailForm.style.display = "none";
    customControlInput.checked = false;
    singUpNextBtn.disabled = true;
});
document.getElementById("sing-up-btn").addEventListener('click', async (e) => {
    if (document.getElementById('code').value != codeForEmail) {
        showErrorElement('confirm-email-form');
        return;
    }

    try {
        // await fetch('/api/confirmEmail', { method: 'post', body: JSON.stringify({ confirm: true }) });
        document.getElementById('sing-up-hidden').click();
    } catch (error) {
        console.error('Error during email confirmation:', error);
        showErrorElement('confirm-email-form');
        return;
    }
});



