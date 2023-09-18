async function connectToSearchResults() {
  const container = document.querySelector('.reusable-search__entity-result-list');
  if (!container) return;

  const resultItems = container.children;
  const itemKeys = Object.keys(resultItems);
  let i = 0, len = itemKeys.length;
  let timer = 1000;
    
  while(true){

      if(timer >= 5000) {timer = 1000}
    window.scrollTo(0, document.body.scrollHeight);
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


let myFunction = async function() {
    console.log("counter: ", counter)
    counter += Math.floor(Math.random()*10 + 1) * 200;
    
    const response = await connectToSearchResults();

    if(response == 'NO_NEXT_BTN') {
        console.log("LAST_PAGE");
        return;
    }

    if(counter >= 10000) {
        counter = 1000;
    }
    
    setTimeout(myFunction, counter);
}


let counter = 100;

setTimeout(myFunction, counter);
