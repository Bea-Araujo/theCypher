var codeType = document.querySelectorAll('input[name="type-of-code"]');

var enterCodeTypeBtn = document.querySelector('#enter-code-type-btn');
var decryptionMethod = '';

var displayConfigs = {
    base64: function () {
        var ccPace = document.querySelector('#cc-pace');
        document.querySelector('#bot-picture').src = "./images/blue-bot.png"
        document.querySelector('#code-input-field').style.cursor = 'text';
        document.querySelector('#code-input-field').removeAttribute('readonly');
        document.body.style.backgroundImage = "url('./images/bg-blue.png')"

        changeDisplay('header', ['purple', 'red'], 'blue');
        changeDisplay('main', ['purple', 'red'], 'blue');

        if (ccPace.classList.contains('hidden')) return
        ccPace.classList.add('hidden');

    },
    cc: function () {
        var ccPace = document.querySelector('#cc-pace');
        document.querySelector('#bot-picture').src = "./images/red-bot.png"
        document.querySelector('#code-input-field').style.cursor = 'text';
        document.querySelector('#code-input-field').removeAttribute('readonly');
        document.body.style.backgroundImage = "url('./images/bg-red.png')";

        changeDisplay('header', ['purple', 'blue'], 'red');
        changeDisplay('main', ['purple', 'blue'], 'red');

        if (!ccPace.classList.contains('hidden')) return
        ccPace.classList.remove('hidden');
    },

    select: function () {
        var ccPace = document.querySelector('#cc-pace')
        document.querySelector('#bot-picture').src = "./images/purple-bot.png"
        document.querySelector('#code-input-field').style.cursor = 'not-allowed'
        document.querySelector('#code-input-field').setAttribute('readonly', null)
        document.body.style.backgroundImage = "url('./images/bg-purple.png')"

        changeDisplay('header', ['red', 'blue'], 'purple');
        changeDisplay('main', ['red', 'blue'], 'purple');

        if (ccPace.classList.contains('hidden')) return
        ccPace.classList.add('hidden');
    }
}

var selectionBox = document.querySelector("#type-of-code-selector");

selectionBox.addEventListener('change', function () {
    decryptionMethod = this.value;
    document.querySelector('#encryption-btn').checked = false;
    document.querySelector('#decryption-btn').checked = false;
    if (decryptionMethod == 'base64') {
        displayConfigs.base64();
    } else if (decryptionMethod == 'cc') {
        displayConfigs.cc();
    } else {
        displayConfigs.select();
    }
})

var codeInputField = document.querySelector("#code-input-field");

codeInputField.addEventListener('keypress', function (event) {
    if (event.code == 'Enter') {
        event.preventDefault();
    }
})

var encryptionBtn = document.querySelector('#encryption-btn');
var decryptionBtn = document.querySelector('#decryption-btn');


encryptionBtn.addEventListener('click', function () {
    var mesage = codeInputField.value;
    if (decryptionMethod == 'select' || decryptionMethod == '') {
        alert('Selecione um método válido de encripção')
        this.checked = false;
    } else if (mesage == '') {
        alert('Texto não encontrado')
        this.checked = false;
    } else {
        if (decryptionMethod == 'cc') {
            var code = [];
            var pace = parseInt(document.querySelector('#pace').value) % 26;
            for (var i = 0; i < mesage.length; i++) {
                if ((/[a-z]/).test(mesage[i])) {
                    var letterCodePaced = mesage[i].charCodeAt() + pace;
                    var item = mesage[i].charCodeAt();
                    delimitateInterval(letterCodePaced, item, code, i, pace, 97, 122);
                } else if ((/[A-Z]/).test(mesage[i])) {
                    var letterCodePaced = mesage[i].charCodeAt() + pace;
                    var item = mesage[i].charCodeAt();
                    delimitateInterval(letterCodePaced, item, code, i, pace, 65, 90);
                } else if ((/\W|_/).test(mesage[i])) {
                    code.push(mesage[i])
                }
            }
            code = code.join('');

        } else if (decryptionMethod == 'base64') {
            console.log('base64')
            var code = btoa(mesage);
            console.log(code)
        }
        createResultOutput(code);
    }
})

decryptionBtn.addEventListener('click', function () {
    var code = codeInputField.value;

    if (decryptionMethod == 'select' || decryptionMethod == '') {
        alert('Selecione um método válido de encripção')
        this.checked = false;
    } else if (code == '') {
        alert('Texto não encontrado')
        this.checked = false;
    } else {
        if (decryptionMethod == 'cc') {
            code = code.split('');
            var pace = -parseInt(document.querySelector('#pace').value) % 26;
            var mesage = [];
            for (var i = 0; i < code.length; i++) {
                if ((/[a-z]/).test(code[i])) {
                    var letter = code[i].charCodeAt() + pace;
                    var item = code[i].charCodeAt();
                    delimitateInterval(letter, item, mesage, i, pace, 97, 122);
                } else if ((/[A-Z]/).test(code[i])) {
                    var letter = code[i].charCodeAt() + pace;
                    var item = code[i].charCodeAt();
                    delimitateInterval(letter, item, mesage, i, pace, 65, 90);
                } else if ((/\W|_/).test(code[i])) {
                    mesage.push(code[i])
                }
            }
            mesage = mesage.join('');
        } else if (decryptionMethod == 'base64') {
            console.log('base64')
            try {
                var mesage = window.atob(code);
            } catch (err) {
                alert('Foi encontrado um erro no seu texto, tente codificar em vez de decodificar')
                mesage = 'Seus resultados aparecerão aqui';
            }

            console.log(mesage);
        }
        createResultOutput(mesage);
    }
})

function changeDisplay(tag, originalColor, newColor) {
    var tag = document.querySelector(`${tag}`);
    for (var i = 0; i < originalColor.length; i++) {
        if (tag.classList.contains(originalColor[i])) { tag.classList.remove(originalColor[i]) };
    }
    tag.classList.add(newColor)
}

function delimitateInterval(letterCodePaced, item, code, i, pace, minValue1, maxValue2) {
    if (letterCodePaced > maxValue2) {
        var distanceToEnd = maxValue2 - item;
        var newPace = pace - distanceToEnd;
        code.push(String.fromCharCode(minValue1 - 1 + newPace));
    } else if (letterCodePaced < minValue1) {
        var distanceToStart = item - minValue1;
        var newPace = pace + distanceToStart;
        code.push(String.fromCharCode(maxValue2 + 1 + newPace));
    } else {
        code.push(item)
        code[i] += pace
        code[i] = String.fromCharCode(code[i]);
    }
}

function createResultOutput(output) {
    var result = document.querySelector('#result');
    var p = document.createElement('p');
    p.innerText = output;
    result.innerHTML = '';
    result.append(p);
}