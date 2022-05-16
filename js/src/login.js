const authController = require("../controllers/authController")

const instance = axios.create({
    baseURL: 'http://localhost:8089/',
    headers: {
      'Content-Type': 'application/json'
    }
})

$(document).ready(function() {
    const loginButton = $('.submit_btn')

    const emailInput = $('#email')
    const passwordInput = $('#password')

    let form = {}

    emailInput.on('input', function(e) {
        changeInputHandler(e)
    })

    passwordInput.on('input', function(e) {
        changeInputHandler(e)
    })

    loginButton.click(function() {
        if (Object.keys(form).length === 2) {
            login(form).then( res => {
                localStorage.setItem('token', res.token)
            })
            window.location = 'http://localhost:8089/'
        } else {
            alert('Заполните все поля!')
        }
    })

    const changeInputHandler = (e) => {
        form = { ...form, [e.target.name]: e.target.value }
    }
})
  
function login(form) {
    window.location.href('http://localhost:8089/')
    return instance.post(`api/v1/login`, {...form})
      .then(res => {return res.data})
}