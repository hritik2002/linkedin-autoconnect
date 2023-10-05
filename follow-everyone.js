function followEveryone() {
    let totalFollows = 0;

async function connectToSearchResults() {
  const container = document.querySelector('.reusable-search__entity-result-list');
  if (!container) return;

  const resultItems = container.children;
  const itemKeys = Object.keys(resultItems);
  let i = 0, len = itemKeys.length;
  let timer = 1000;
    
  while(true){
        if (i >= len) {
      console.log("Clearing setInterval...");
      const next = document.querySelector('[aria-label="Next"]')
     
      if(next) {
          next.click();
      }
      else {
        return "NO_NEXT_BTN"
      }
        
      return "NEXT";
    }
    const itemKey = itemKeys[i++];
    if (!isNaN(itemKey)) {
      const connectBtn = resultItems[itemKey].querySelector('button');
        if(!connectBtn) continue;
      if (connectBtn && connectBtn.innerText === 'Follow') {
          const profileText = resultItems[itemKey].querySelector(".linked-area.flex-1.cursor-pointer");

          timer += Math.random() * 1000;
          
          setTimeout((currentTimer) => {
              if(profileText) {
                  console.log("Following: ", profileText.innerText, currentTimer);
              }
              
              totalFollows++;
              connectBtn.click();
          }, timer, timer);
        
      }
    }
      
  }
}


let myFunction = async function() {
    counter += Math.random() * 1000;
    window.scrollTo(0, 2000);
    let response;
    
    setTimeout(async () => {
         response = await connectToSearchResults();
        console.log("Total Follows: ", totalFollows);

    if(response === 'NO_NEXT_BTN') {
        console.log("LAST_PAGE");
        return;
    }
        
    }, 100);


    if(counter >= 10000) {
        counter = 2000;
    }

    setTimeout(myFunction, 5000);
}


let counter = 2000;

window.scrollTo(0, 2000);
setTimeout(myFunction, counter);
}

followEveryone()
