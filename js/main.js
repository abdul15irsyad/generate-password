let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

let formOptions = document.querySelector('.form-options')
let btnGenerate = document.querySelector('.btn-generate')
let inputGeneratedPassword = document.querySelector('.generated-password')
let btnCopy = document.querySelector('.btn-copy')
let alertMessage = document.querySelector('.alert-message')
let checkCheckbox = () => {
    if (formOptions.length.value == '' || (formOptions.uppercase.checked == false && formOptions.lowercase.checked == false && formOptions.numbers.checked == false && formOptions.symbols.checked == false)) {
        btnGenerate.disabled = true
    } else {
        btnGenerate.disabled = false
    }
}
checkCheckbox()
let inputs = formOptions.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('change', () => {
        checkCheckbox()
    })
})

btnGenerate.addEventListener('click', () => {
    let options = {
        length: formOptions.length.value,
        uppercase: formOptions.uppercase.checked,
        lowercase: formOptions.lowercase.checked,
        numbers: formOptions.numbers.checked,
        symbols: formOptions.symbols.checked,
    }
    let password = generatePassword(options) || ''
    inputGeneratedPassword.value = password
    alertMessage.style.display = 'none'
})

btnCopy.addEventListener('click', () => {
    if (inputGeneratedPassword.value != '') {
        inputGeneratedPassword.select();
        inputGeneratedPassword.setSelectionRange(0, 99999);
        document.execCommand("copy");
        inputGeneratedPassword.blur();
        alertMessage.style.display = 'block'
    }
})

let getRandomLowerCharacter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
let getRandomUpperCharacter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
let getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48)
let getRandomSymbol = () => {
    let symbols = `!@#$%^&*()_?`
    return symbols[Math.floor(Math.random() * symbols.length)]
}
let generatePassword = ({ length = 20, uppercase = true, lowercase = true, numbers = true, symbols = true }) => {
    let functions = []
    if (uppercase) functions.push('uppercase')
    if (lowercase) functions.push('lowercase')
    if (numbers) functions.push('numbers')
    if (symbols) functions.push('symbols')
    if (functions.length == 0) return null
    if (length <= 0) return null
    let password = ''
    for (let i = 0; i < length; i++) {
        let randomFunctions = functions[Math.floor(Math.random() * functions.length)]
        password += randomFunctions == 'lowercase' ? getRandomLowerCharacter() : randomFunctions == 'uppercase' ? getRandomUpperCharacter() : randomFunctions == 'numbers' ? getRandomNumber() : getRandomSymbol()
    }
    return password
}
