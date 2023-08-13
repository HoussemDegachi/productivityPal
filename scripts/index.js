async function main() {
  // global variables
  let imgUrl =
    "https://images.unsplash.com/photo-1621369116334-7913d4cff562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
  let textColor = "#ffffff";
  let text =
    "Self-discipline begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do.";

  let blockImgFunc = await initalizeBlockImg();

  let templateHtml = `
    <figure id="productivitypal-motivation-wrapper">
    <img src="${imgUrl}" alt="${text}" id="productivitypal-motivation-img"></img>
    <p style="color:${textColor}" id="productivitypal-motivation-text">${text}</p>
    </figure>
    `;

  // blacklisted website
  let blacklist = await initalizeBlacklist();
  const shortVideo = ["tiktok.com", "youtube.com/shorts"];

  // App
  function app() {
    // local variables
    const url = location.hostname.replace("www.", "");
    // block blacklisted sites
    console.log(blacklist);
    if (blacklist.includes(url)) {
      blockSite();
      return;
    }

    // Short videos detector
    const isThereVideo = () => {
      if (document.querySelector("video") !== null) {
        return true;
      }
      return false;
    };

    if (isThereVideo) {
      let duration;
      try {
        duration = document.querySelector("video").duration;
        if (duration <= 120) {
          blockSite();
          return;
        }
      } catch {}
    }

    shortVideo.forEach((blackListedUrl) => {
      if (url.includes(blackListedUrl)) {
        blockSite();
        return;
      }
    });

    // block function
    function blockSite() {
      document.body.innerHTML = templateHtml;
    }
  }

  // initialize blacklist
  async function initalizeBlacklist() {
    let dbBlacklist = [];
    const data = await chrome.storage.local.get(["blacklist"]);
    if (data.blacklist !== undefined) {
      dbBlacklist = data.blacklist;
    }
    return dbBlacklist;
  }

  // initalize block image
  async function initalizeBlockImg() {
    const data = await chrome.storage.local.get(["image", "color", "quote"]);

    if (data.image !== undefined) {
      imgUrl = data.image;
    }

    if (data.color !== undefined) {
      textColor = data.color;
    }

    if (data.quote !== undefined) {
      text = data.quote;
    }
  }

  // run app when path changes if system is on
  setInterval(() => {
    const newPath = window.location.pathname;
    if (oldPath !== newPath) {
      oldPath = newPath;
      app();
    }
  }, 1000);
  let oldPath = null;

};

main();
