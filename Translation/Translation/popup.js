//making the popup code in json
/*
Translate API request is repeated here because content scripts have limitation (on some web sites are blocked)
but with this js we can live translate on top of any web site
*/
   const API_KEY = "07e53893demshde8580168e08cc5p11875cjsn1b4f90c95876";

   xhr_Translate = new XMLHttpRequest();
   xhr_Defainition = new XMLHttpRequest();
      
   xhr_Translate.withCredentials = true;
   xhr_Defainition.withCredentials = true;

   const source_language = document.getElementById("source"), 
            target_language = document.getElementById("target"), 
            check_Box = document.getElementById("checkKey"),
            shortcut_keyText = document.getElementById("shortcutKey");
            


            