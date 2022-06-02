//STYLING THE SOURCE LAN
function sourcelan(){
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("sourcelan");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
}


// NOW THE TARGET SELECT MENU
function targetlan(){
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("targetlan");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
}

sourcelan();
targetlan();

/*

// all languages Microsoft Translation API supports
lang_list = [
  'Afrikaans: af',
  'Arabic: ar',
  'Assamese: as',
  'Bangla: bn',
  'Bosnian (Latin): bs',
  'Bulgarian: bg',
  'Cantonese (Traditional): yue',
  'Catalan: ca',
  'Chinese Simplified: zh-Hans',
  'Chinese Traditional: zh-Hant',
  'Croatian: hr',
  'Czech: cs',
  'Dari: prs',
  'Danish: da',
  'Dutch: nl',
  'English: en',
  'Estonian: et',
  'Fijian: fj',
  'Filipino: fil',
  'Finnish: fi',
  'French: fr',
  'French (Canada): fr-ca',
  'German: de',
  'Greek: el',
  'Gujarati: gu',
  'Haitian Creole: ht',
  'Hebrew: he',
  'Hindi: hi',
  'Hmong Daw: mww',
  'Hungarian: hu',
  'Icelandic: is',
  'Indonesian: id',
  'Irish: ga',
  'Italian: it',
  'Japanese: ja',
  'Kannada: kn',
  'Kazakh: kk',
  'Klingon: tlh-Latn',
  'Klingon (plqaD): tlh-Piqd',
  'Korean: ko',
  'Kurdish (Central): ku',
  'Kurdish (Northern): kmr',
  'Latvian: lv',
  'Lithuanian: lt',
  'Malagasy: mg',
  'Malay: ms',
  'Malayalam: ml',
  'Maltese: mt',
  'Maori: mi',
  'Marathi: mr',
  'Norwegian: nb',
  'Odia: or',
  'Pashto: ps',
  'Persian: fa',
  'Polish: pl',
  'Portuguese (Brazil): pt-br',
  'Portuguese (Portugal): pt-pt',
  'Punjabi: pa',
  'Queretaro Otomi: otq',
  'Romanian: ro',
  'Russian: ru',
  'Samoan: sm',
  'Serbian (Cyrillic): sr-Cyrl',
  'Serbian (Latin): sr-Latn',
  'Slovak: sk',
  'Slovenian: sl',
  'Spanish: es',
  'Swahili: sw',
  'Swedish: sv',
  'Tahitian: ty',
  'Tamil: ta',
  'Telugu: te',
  'Thai: th',
  'Tongan: to',
  'Turkish: tr',
  'Ukrainian: uk',
  'Urdu: ur',
  'Vietnamese: vi',
  'Welsh: cy',
  'Yucatec Maya: yua'
];
font_styles = [
  'auto',
  'cursive',
  'emoji',
  'fangsong',
  'fantasy',
  'inherit',
  'initial',
  'math',
  'monospace',
  'none',
  'revert',
  'sans- serif',
  'serif',
  'system- ui',
  'ui-monospace',
  'ui-rounded',
  'ui-sans -serif',
  'ui-serif',
  'unset',
  '-webkit -body',
  '-webkit -pictograph'
];

// chrome.extension.getBackgroundPage().window.extensionState
for (i = 0; i < lang_list.length; i++) {
  // console.log(lang_list[i])
  // document.getElementById("source").innerHTML += `<option value="${lang_list[i].substring(lang_list[i].indexOf(':') + 2) + '">' + lang_list[i]} </option>`;
  // document.getElementById("target").innerHTML += `<option value="${lang_list[i].substring(lang_list[i].indexOf(':') + 2) + '">' + lang_list[i]} </option>`;
  const source1 =document.getElementById('source');
  const target1 = document.getElementById('target');
  let a = document.createElement('option');
  a.value = lang_list[i].substring(lang_list[i].indexOf(':') + 2);
  a.innerText = lang_list[i];
  a.appendChild(source1);
  a.appendChild(target1);
}
*/