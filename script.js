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
