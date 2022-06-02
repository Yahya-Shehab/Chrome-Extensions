//popup js



//now we will start the real work to send and recieve requests:)
//Abdullah Wawi

//to check if the extension is working every time we open a new tab
    console.log("Hello Abdullah Wawi, The Extension is working!");
try{

//get source and target select list
// let sourceList;
// let targetList;

//to connect to the dictionary service we need to put the key
    const API_KEY ="07e53893demshde8580168e08cc5p11875cjsn1b4f90c95876";

//now we will define a xml http request to use in our translator to send and recieve requests
    let xhr = new XMLHttpRequest();

  //now we will set the Credentials of the xhr to true so the xhr response can set cookies vlaues for there own domain
    xhr.withCredentials = true;

    

    let abood =[];

    //create a popup bubble when translating sth: 
      const bubble = document.createElement("div").appendChild(document.createElement('div'));
      bubble.setAttribute('class', 'tool_bubble');

      //now appending the bubble to the body 
        document.body.appendChild(bubble);

          //hide the bubble when wheeling any place around the page
          window.addEventListener("wheel", ()=>{
            bubble.style.visibility="hidden";
          });

          //
          window.addEventListener("mouseup", (e)=>{
            let selectedText = window.getSelection().toString();
            let domRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            /*the getBoundingClientRect returns a DOMRect object providing information about the size of an element 
            and it's position relative to the viewport(rectangular area in computer graphics which we are viewing at the moment)
            */
            abood = [e.x , e.y , domRect.width , domRect.height];

            //if the user closed the selection Text then hide bubble 
            if(window.getSelection().isCollapsed == true) {
              bubble.style.visibility = 'hidden';
              return;
            }
            console.log(selectedText);

            /*
            note!!!
            when source language is not used (mean the program should know the language)
            //translationRequest(selection.tostring() , 'sk' , 'from =en')
            */
              translationRequest(selectedText ,'ar');
            
          });

          // chrome.runtime.onMessage.addListener((request  ,sender , sendResponse) =>{
          //   console.log(sender.tab ? "from a content script" + sender.tab.url :"from the extension");
          //   if(request.greeting =="hello"){
          //     sendResponse({farewell : "goodbye"});
          //   }
          // });

          //the translation processing
          const translationRequest = (SelectedText , target = ' en ' , source = '')=>{
            xhr.open("Post", "https://microsoft-translator-text.p.rapidapi.com/translate?to="+ target.toString() +"&api-version=3.0&profanityAction=NoAction&textType=plain"
              );
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("x-rapidapi-host", "microsoft-translator-text.p.rapidapi.com");
              xhr.setRequestHeader("x-rapidapi-key", API_KEY);
              xhr.send(JSON.stringify([{
                "text": SelectedText
            }]));
          };

          //if the response is ready and the processing has finshed
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
              const responseData = JSON.parse(this.responseText)[0];//to get the response data
              let translationData = responseData.translations[0].text;//to get the translation data
              // if(window.getSelection().toString.length > 1){
              //   showbubble(translationData , abood[0] , abood[1]);
              // }
              console.log(translationData);

              // if(window.getSelection().toString.length > 1){
                  showbubble(translationData , abood[0] , abood[1]);
                // }
            }
          });


          //shows the bubble 
          const showbubble = (text , x=0 , y=0)=>{
            bubble.innerText = text;
            bubble.style.visibility = 'visible';
            bubble.style.left = x + 'px';
            bubble.style.top = y + 'px';
            console.log(text);
          };

}catch(e){
console.log("sth wrong has happend" ,e);
}



