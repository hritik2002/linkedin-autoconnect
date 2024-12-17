// Domain: Profile Interaction
class ProfileInteractor {
  constructor() {
    this.stats = {
      totalFollows: 0,
      newConnections: 0
    };
  }

  async sleep(timeMs = 200) {
    return new Promise(resolve => setTimeout(resolve, timeMs));
  }

  findButton(profile, ariaLabel) {
    return ariaLabel 
      ? profile.querySelector(`button[aria-label="${ariaLabel}"]`)
      : profile.querySelector(`[aria-label*="to connect"]`);
  }

  async waitForDialogClose() {
    // Wait for the connect/follow dialog to close
    let dialogOpen = true;
    let attempts = 0;
    const maxAttempts = 10;

    while (dialogOpen && attempts < maxAttempts) {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) {
        dialogOpen = false;
      } else {
        await this.sleep(500);
        attempts++;
      }
    }
    
    // Additional safety delay
    await this.sleep(500);
  }

  async sendConnectionRequest(profile, settings) {
    try {
      const connectButton = this.findButton(profile);
      if (!connectButton?.innerText?.toLowerCase().includes('connect')) return false;

      connectButton.click();
      await this.sleep(500);

      if (settings.connectOnNote) {
        const noteButton = document.querySelector("[aria-label='Add a note']");
        // Add note implementation here
      } else {
        const sendButton = document.querySelector("[aria-label='Send without a note']");
        if (sendButton) {
          sendButton.click();
          await this.waitForDialogClose();
          settings.connectionLimit--;
          this.stats.newConnections++;
          console.log(`New connections: ${this.stats.newConnections}`);
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to send connection request:', error);
    }
    return false;
  }

  async sendFollowRequest(profile) {
    try {
      const followButton = this.findButton(profile);
      if (!followButton?.innerText?.toLowerCase().includes('follow')) return false;

      followButton.click();
      await this.waitForDialogClose();
      this.stats.totalFollows++;
      console.log(`Total follows: ${this.stats.totalFollows}`);
      return true;
    } catch (error) {
      console.error('Failed to send follow request:', error);
    }
    return false;
  }
}

// Domain: Profile Navigation
class ProfileNavigator {
  constructor() {
    this.SCROLL_WAIT_MS = 500;
  }

  async loadNextPage() {
    const nextButton = document.querySelector('[aria-label="Next"]');
    if (nextButton && !nextButton.disabled) {
      nextButton.click();
      await this.waitForPageLoad();
      return true;
    }
    return false;
  }

  async waitForPageLoad() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const loader = document.querySelector('.artdeco-loader');
    if (loader) {
      await new Promise(resolve => {
        const observer = new MutationObserver((mutations, obs) => {
          if (!document.querySelector('.artdeco-loader')) {
            obs.disconnect();
            resolve();
          }
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    }
  }

  getProfilesContainer() {
    const containers = document.querySelectorAll('.wFIqqhtGtJGNRxwAWtEWheGevOUWeNidlQ');
    return containers.length > 2 ? containers[1] : containers[0];
  }

  async prepareForScanning() {
    window.scrollTo(0, 2000);
    await new Promise(resolve => setTimeout(resolve, this.SCROLL_WAIT_MS));
  }

  getProfiles() {
    const container = this.getProfilesContainer();
    return container ? Array.from(container.children) : [];
  }
}

// Main Application
class LinkedInAutomation {
  constructor() {
    this.interactor = new ProfileInteractor();
    this.navigator = new ProfileNavigator();
    this.isRunning = false;
  }

  async processProfile(profile, settings) {
    const connectButton = profile.querySelector('[aria-label*="to connect"]');
    if (!connectButton) return false;

    const buttonText = connectButton.innerText.toLowerCase();
    
    if (!settings.isFollowOnly && buttonText === 'connect') {
      return await this.interactor.sendConnectionRequest(profile, settings);
    } else if (buttonText === 'follow') {
      return await this.interactor.sendFollowRequest(profile);
    }
    return false;
  }

  async processCurrentPage(settings) {
    await this.navigator.prepareForScanning();
    const profiles = this.navigator.getProfiles();
    
    console.log(`Processing ${profiles.length} profiles on current page`);
    
    let processedCount = 0;
    for (const profile of profiles) {
      if (settings.connectionLimit <= 0) return true;
      
      const processed = await this.processProfile(profile, settings);
      if (processed) processedCount++;
      
      // Wait between profile processing
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`Processed ${processedCount} profiles on this page`);
    return processedCount > 0;
  }

  async start(settings) {
    if (this.isRunning) {
      console.log('Automation already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting automation...');

    try {
      let pageCount = 0;
      let hasMorePages = true;

      while (hasMorePages && pageCount < 3 && settings.connectionLimit > 0) {
        const processedProfiles = await this.processCurrentPage(settings);
        
        if (!processedProfiles || settings.connectionLimit <= 0) {
          console.log('No more profiles to process or connection limit reached');
          break;
        }

        hasMorePages = await this.navigator.loadNextPage();
        pageCount++;
        
        if (!hasMorePages) {
          console.log('No more pages to process');
        }
      }
    } catch (error) {
      console.error('Automation failed:', error);
    } finally {
      this.isRunning = false;
      console.log('Automation completed');
    }
  }
}

// Settings configuration
const settings = {
  isFollowOnly: false,
  connectOnNote: false,
  noteMessage: 'Hello, I am Hritik Sharma. Looking forward to connect with you and explore opportunities around your network. Thanks.',
  connectionLimit: 200
};

// Initialize and run once
const automation = new LinkedInAutomation();
automation.start(settings);
