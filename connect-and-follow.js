let TRAVERSE_PROFILE_MS = 400;

const addNote = (message) => {
        const addANoteButton = document.querySelector("[aria-label='Add a note']");
        console.log(addANoteButton);
    }
    const sendWithoutNote = (message) => {
        const sendWithoutNoteButton = document.querySelector("[aria-label='Send now']");
        sendWithoutNoteButton.click();
        traverseProfilesSettings.connectionLimit -= 1;
    }
    const sleep = async (timeMs = 200) => {
    	return new Promise((resolve) => {
      	setTimeout(() => {
        	resolve("resolved")
        }, timeMs)
      })
    }

    const sendConnectionReq = async (profile, timeoutMs=500) => {
        try {
            const connectButton = profile.querySelector('button');
            const isConnectButton = connectButton.innerText === 'Connect';
            const message = "Hello"
    
            if(isConnectButton) {
                connectButton.click()
                sendWithoutNote(message);
                await sleep(500);
            }
        } catch (error) {
            console.log(`FAILED_IN_CONNECT_FN: ${error.message}`);
        }
        
    }
    const sendFollowReq = (profile) => {
        try {
            const followButton = profile.querySelector('button');
            const isFollowButton = followButton.innerText === 'Follow';
            
            console.log("FOLLOW REQ", profile.innerText);
    
            if(isFollowButton) {
                followButton.click();
            }
        }catch(error) {
            console.log("FAILED_IN_FOLLOW_FN", error.message);
        }
        
    }

const loadNextProfiles = () => {
    const nextButton = document.querySelector('[aria-label="Next"]');

    if(!nextButton || nextButton.disabled) {
        return false;
    }

    nextButton.click();

    return true;
}


const traverseProfiles = async (traverseProfilesSettings) => {
    const {isFollowOnly} = traverseProfilesSettings;
    let profilesContainer = document.querySelectorAll('.reusable-search__entity-result-list');
    if(profilesContainer.length > 2) {
        profilesContainer = profilesContainer[1];
    }else {
        profilesContainer = profilesContainer[0];
    }

    if(!profilesContainer) {
        return;
    }

    return new Promise((resolve) => {
        try{
            const profiles = profilesContainer.children;
            profilesArray = Object.values(profiles);
            const profilesCount = profilesArray.length;
            let currentProfileIndex = 0;
        
            const profileIntervalTimeMs = setInterval(async () => {
                if(currentProfileIndex >= profilesCount) {
                    clearInterval(profileIntervalTimeMs);
                    return resolve("resolve")
                    
                }
            
                const profile = profilesArray[currentProfileIndex];
                currentProfileIndex += 1;

            
                const connectButton = profile.querySelector('button');
                if(!connectButton) return resolve();
                const isConnectButton = connectButton.innerText === 'Connect';
                const isFollowButton = connectButton.innerText === 'Follow';
                
                if(!isFollowOnly && isConnectButton) {
                    sendConnectionReq(profile);
                }else if(isFollowButton) {
                    sendFollowReq(profile);
                }
        
                TRAVERSE_PROFILE_MS = TRAVERSE_PROFILE_MS + Math.floor(Math.random() * 500) + 1;
        
                if(TRAVERSE_PROFILE_MS >= 2000) {
                    TRAVERSE_PROFILE_MS = 400;
                }
            }, TRAVERSE_PROFILE_MS);
        }catch(error) {
            console.log(error.message)
        }
    });
}

const main = async (traverseProfilesSettings) => {
    while(true) {
        try {
            await traverseProfiles(traverseProfilesSettings);
        
            if(traverseProfilesSettings.connectionLimit <= 0 || !loadNextProfiles()) {
                console.log(`killing main`);
                return;
            }else {
                main();
            }
        } catch (error) {
            console.log(`FAIL_MAIN: ${error.message}`);
            return;
        }
    }
}

const traverseProfilesSettings = {
    isFollowOnly: false,
    connectOnNote: false,
    noteMessage: `Hello, I am Hritik Sharma. Looking forward to connect with you and explore opportunities around your network. Thanks.`,
    connectionLimit: 20
}

main(traverseProfilesSettings);
