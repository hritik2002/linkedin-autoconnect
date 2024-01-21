async function connectToSearchResults() {
  const container = document.querySelector('.reusable-search__entity-result-list');
  if (!container) return;

  const resultItems = container.children;
  const itemKeys = Object.keys(resultItems);
  let i = 0, len = itemKeys.length;
  let timer = 1000;
    
  while(true){

      if(timer >= 5000) {timer = 1000}
    if (i >= len) {
      console.log("Clearing setInterval...");
      const next = document.querySelector(".artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view")
     
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
        if (connectBtn.innerText === 'Connect' || connectBtn.innerText === 'Follow') {
          if (connectBtn.innerText === 'Connect') {
            const profileText = resultItems[itemKey].querySelector(".linked-area.flex-1.cursor-pointer");

          timer += Math.random() * 1000;
          console.log("timer: ", timer);
          setTimeout(() => {
              if(profileText)
                  console.log("CONNECT: ", profileText?.innerText);
              
              if(connectBtn?.click) {
                  connectBtn.click();
                  
                  setTimeout(() => {
            const sendBtn = document.querySelector('.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1');
            console.log("sendBtn: ", sendBtn);
            if (sendBtn) sendBtn.click();
          }, 500);
              }
                
          }, timer);
    
        } else {
              const profileText = resultItems[itemKey].querySelector(".linked-area.flex-1.cursor-pointer");

          timer += Math.random() * 1000;
          console.log(timer);
          setTimeout(() => {
              if(profileText)
                  console.log("FOLLOW: ", profileText?.innerText);
              
              if(connectBtn?.click)
              connectBtn.click();
          }, timer);
          connectBtn.click();
        }
      }

        
     
    }
  }
}

var counter = 2000;

let myFunction = async function() {
    console.log("counter: ", counter)
    counter += Math.floor(Math.random()*10 + 1) * 2000;
    
    const response = await connectToSearchResults();

    if(response == 'NO_NEXT_BTN') {
        console.log("LAST_PAGE");
        return;
    }

    if(counter >= 20000) {
        counter = 2000;
    }
    
}

setInterval(myFunction, counter);
