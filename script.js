async function connectToSearchResults() {
  const container = document.querySelector('.reusable-search__entity-result-list');
  if (!container) return;

  const resultItems = container.children;
  const itemKeys = Object.keys(resultItems);
  let i = 0, len = itemKeys.length;
  const intervalId = setInterval(async () => {
    if (i >= len) {
      console.log("Clearing setInterval...");
      clearInterval(intervalId);
      return;
    }
    const itemKey = itemKeys[i++];
    if (!isNaN(itemKey)) {
      const connectBtn = resultItems[itemKey].querySelector('button');
      console.log(connectBtn.innerText);
      if (connectBtn.innerText === 'Connect' || connectBtn.innerText === 'Follow') {
        if (connectBtn.innerText === 'Connect') {
          connectBtn.click();
          setTimeout(() => {
            const sendBtn = document.querySelector('.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1');
            console.log(sendBtn);
            if (sendBtn) sendBtn.click();
          }, 1000);
        } else {
          connectBtn.click();
        }
      }
    }
  }, 2000);
}




// follows everyone
 setInterval(() => {
        console.log("NEW PAGE");
        async function connectToSearchResults() {
  const container = document.querySelector('.reusable-search__entity-result-list');
  if (!container) return;

  const resultItems = container.children;
  const itemKeys = Object.keys(resultItems);
  let i = 0, len = itemKeys.length;
  const intervalId = setInterval(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    if (i >= len) {
      console.log("Clearing setInterval...");
      clearInterval(intervalId);
      const next = document.querySelector(".artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view")
     
      if(next) next.click();
      return;
    }
    const itemKey = itemKeys[i++];
    if (!isNaN(itemKey)) {
      const connectBtn = resultItems[itemKey].querySelector('button');
      console.log(connectBtn.innerText);
      if (connectBtn.innerText === 'Follow') {
        
          connectBtn.click();
        
      }
    }
  }, 100);
}
        connectToSearchResults();
    }, 2000)




// follow everyone - with random interval
async function connectToSearchResults() {
  const container = document.querySelector('.reusable-search__entity-result-list');
  if (!container) return;

  const resultItems = container.children;
  const itemKeys = Object.keys(resultItems);
  let i = 0, len = itemKeys.length;
  let timer = 1000;
    
  while(true){
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
      if (connectBtn.innerText === 'Follow') {
          const profileText = resultItems[itemKey].querySelector(".linked-area.flex-1.cursor-pointer");

          timer += Math.random() * 1000;
          console.log(timer);
          setTimeout(() => {
              if(profileText)
                  console.log(profileText.innerText);
              
              if(connectBtn)
              connectBtn.click();
          }, timer);
        
      }
    }
  }
}


let myFunction = function() {
    console.log("counter: ", counter)
    counter += Math.random() * 1000;
    
    const response = connectToSearchResults();

    if(response === 'NO_NEXT_BTN') {
        console.log("LAST_PAGE");
        return;
    }
    
    setTimeout(myFunction, counter);
}


let counter = 100;

setTimeout(myFunction, counter);
