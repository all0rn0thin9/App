
const instance = axios.create({
    baseURL: 'http://localhost:8089/',
    headers: {
      'Content-Type': 'application/json'
    }
})

$(document).ready(function() {
    const registerButton = $('.submit_btn')
    registerButton.attr('disabled','disabled');
    registerButton.css('pointer-events', 'none')


    const nameInput = $('#name')
    const emailInput = $('#email')
    const passwordInput = $('#password')
    const confirmPasswordInput = $('#confirmPassword')

    let form = {}

    let passwordsToEqual = false

    nameInput.on('input', function(e) {
        changeInputHandler(e)
    })

    emailInput.on('input', function(e) {
        changeInputHandler(e)
    })

    passwordInput.on('input', function(e) {
        changeInputHandler(e)
        comparePasswordsHandler(e.target.value, confirmPasswordInput.val())
    })

    confirmPasswordInput.on('input', function(e) {
        changeInputHandler(e)
        comparePasswordsHandler(e.target.value, passwordInput.val())
    })

    registerButton.click(function() {
        if (Object.keys(form).length === 4) {
            register(form)
        } else {
            alert('Заполните все поля!')
        }
    })

    const comparePasswordsHandler =  (password, confirmPassword) => {
        passwordsToEqual =  password === confirmPassword
        if (passwordsToEqual) {
            registerButton.removeAttr('disabled')
            registerButton.css('pointer-events', 'auto')
        } else {
            registerButton.attr('disabled','disabled')
            registerButton.css('pointer-events', 'none')
        }
    }

    const changeInputHandler = (e) => {
        form = { ...form, [e.target.name]: e.target.value }
    }
})
  
function register(form) {
    return instance.post(`api/v1/register`, {...form})
      .then(res => {return res.data})
}