Coloris({ //for gradient
    el: '.coloris',
});
let rgbaText = document.getElementById('rgba');
let gradientColor = document.querySelector('.clr-field');
let hexaText = document.getElementById('hexa');
let circleButton = document.querySelector('.clr-field button');
let pickButton = document.querySelector('.select');
let dialogInputText = document.querySelector('input.clr-color');
//to convert from hexa to rgba
function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
    }
    throw new Error('Bad Hex');
}
//on load 
rgbaText.innerText = gradientColor.style.color;
//to update rgba text according to input color
document.addEventListener('input', (event) => { // this for gradiant
    let parent = event.target.parentNode;
    if (parent.classList.contains('clr-field')) {
        rgbaText.innerText = parent.style.color;
        circleButton.style.color = parent.style.color;
    }
})
hexaText.addEventListener('input', changeInputs);
function changeInputs() { // to update according to input value
    rgbaText.innerText = hexaText.value;
    circleButton.style.color = hexaText.value;
}


//for eyedropper
if (window.EyeDropper == undefined) { //check if browser support it or not
    pickButton.style = "display: none;";
} else {
    let eyeDropper = new EyeDropper();
    pickButton.addEventListener("click", (e) => {
        // Enter eyedropper mode
        eyeDropper.open().then((colorSelectionResult) => {
            hexaText.value = colorSelectionResult.sRGBHex;
            circleButton.style.color = colorSelectionResult.sRGBHex;
            rgbaText.innerHTML = hexToRgbA(colorSelectionResult.sRGBHex);
        }).catch((error) => {
            hexaText.value = '#ffff';
        });
    });
}