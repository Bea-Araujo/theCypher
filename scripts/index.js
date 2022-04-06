var codeType = document.querySelectorAll('input[name="type-of-code"]');

var enterCodeTypeBtn = document.querySelector('#enter-code-type-btn');
var decryptionMethod;

var displayConfigs = {
    base64: function () {
        var ccPace = document.querySelector('#cc-pace');
        document.body.style.backgroundImage = "url('./images/bg-blue.png')"

        changeDisplay('header', 'red', 'blue');
        changeDisplay('main', 'red', 'blue');

        if (ccPace.classList.contains('hidden')) return
        ccPace.classList.add('hidden');

    },
    cc: function () {
        var ccPace = document.querySelector('#cc-pace')
        document.body.style.backgroundImage = "url('./images/bg-red.png')"

        changeDisplay('header', 'blue', 'red');
        changeDisplay('main', 'blue', 'red');

        if (!ccPace.classList.contains('hidden')) return
        ccPace.classList.remove('hidden');

    }
}

var selectionBox = document.querySelector("#type-of-code-selector");

selectionBox.addEventListener('change', function () {
    decryptionMethod = this.value;
    if (decryptionMethod == 'base64') {
        displayConfigs.base64();
    } else {
        displayConfigs.cc();
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
    if (mesage == '') {
        alert('aaa')
        this.checked = false;
    } else {
        if (decryptionMethod == 'cc') {
            var code = [];
            var pace = parseInt(document.querySelector('#pace').value);
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

    if (code == '') {
        alert('aaa')
        this.checked = false;
    } else {
        if (decryptionMethod == 'cc') {
            code = code.split('');
            var pace = -parseInt(document.querySelector('#pace').value);
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
            // for (var i = 0; i < code.length; i++) {
            //     if ((/[1-9]/).test(code[i])) {
            //         var letter = parseInt(code[i]) + pace;
            //         var item = parseInt(code[i]);
            //         if (item >= 97 && item <= 122) {
            //             delimitateInterval(letter, item, mesage, i, pace, 97, 122);
            //         } else if (item >= 65 && item <= 90) {
            //             delimitateInterval(letter, item, mesage, i, pace, 65, 90);
            //         }
            //         mesage[i] = String.fromCharCode(mesage[i]);
            //     } else {
            //         mesage.push(code[i])
            //     }
            //}
            mesage = mesage.join('');
        } else if (decryptionMethod == 'base64') {
            console.log('base64')
            var mesage = atob(code);
            console.log(mesage);
        }
        createResultOutput(mesage);
    }
})

function changeDisplay(tag, originalColor, newColor) {
    var tag = document.querySelector(`${tag}`);
    if (tag.classList.contains(originalColor)) { tag.classList.remove(originalColor) };
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