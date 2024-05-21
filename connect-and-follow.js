let TRAVERSE_PROFILE_MS = 400;
let totalFollows = 0, newConnections = 0;

const addNote = (message) => {
        const addANoteButton = document.querySelector("[aria-label='Add a note']");
        console.log(addANoteButton);
    }
    const sendWithoutNote = (message) => {
        const sendWithoutNoteButton = document.querySelector("[aria-label='Send without a note']");
        sendWithoutNoteButton?.click?.();
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
        console.log(`sending connection req to: `)
        console.log(profile.innerText)
        try {
            const connectButton = profile.querySelector('button');
            const isConnectButton = connectButton.innerText === 'Connect';
            const message = "Hello"
    
            if(isConnectButton && connectButton?.click) {
                connectButton?.click?.()
                sendWithoutNote(message);
                connectButton?.click
                
                await sleep(500);
            }
        } catch (error) {
            
        }
        
    }
    const sendFollowReq = (profile) => {
        try {
            const followButton = profile.querySelector('button');
            const isFollowButton = followButton.innerText === 'Follow';

            if(!followButton?.click) {
                return;
            }
            if(followButton?.click) {
                console.log("FOLLOW REQ\n", profile.innerText);
                console.log(`Total Follows: ${++totalFollows}`);
                followButton.click?.();
            }
        }catch(error) {
            
        }
        
    }

const loadNextProfiles = () => {
    const nextButton = document.querySelector('[aria-label="Next"]');

    if(!nextButton || nextButton.disabled) {
        return false;
    }

    nextButton?.click?.();

    return true;
}


const traverseProfiles = async (traverseProfilesSettings) => {
    const {isFollowOnly} = traverseProfilesSettings || {};
    let profilesContainer = document.querySelectorAll('.reusable-search__entity-result-list');
    window.scrollTo(0, 2000);
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
        
                TRAVERSE_PROFILE_MS = TRAVERSE_PROFILE_MS + Math.floor(Math.random() * 1000) + 200;
        
                if(TRAVERSE_PROFILE_MS >= 2000) {
                    TRAVERSE_PROFILE_MS = Math.floor(Math.random() * 400) + 200;;
                }
            }, TRAVERSE_PROFILE_MS);
        }catch(error) {
            
        }
    });
}

const main = async (traverseProfilesSettings) => {
    while(true) {
        try {
            await traverseProfiles(traverseProfilesSettings);
        
            if(traverseProfilesSettings.connectionLimit <= 0 || !loadNextProfiles()) {
      console.log(`killing main`);
                loadNextProfiles();
                return;
            }else {
                main(traverseProfilesSettings);
            }
        } catch (error) {
            return;
        }
    }
}

const traverseProfilesSettings = {
    isFollowOnly: true,
    connectOnNote: false,
    noteMessage: `Hello, I am Hritik Sharma. Looking forward to connect with you and explore opportunities around your network. Thanks.`,
    connectionLimit: 200
}

setInterval(() => {
    main(traverseProfilesSettings);
}, 6000);
