//global variables
let blacklist;
let imgUrl =
  "https://images.unsplash.com/photo-1621369116334-7913d4cff562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
let textColor = "#ffffff";
let text =
  "Self-discipline begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do.";
let templateHtml;

let blacklistInitFunc = initalizeBlacklist();
let blockImgFunc = initalizeBlockImg().then(() => {
  templateHtml = `
    <figure id="productivitypal-motivation-wrapper">
    <img src="${imgUrl}" alt="${text}" id="productivitypal-motivation-img"></img>
    <p style="color:${textColor}" id="productivitypal-motivation-text">${text}</p>
    </figure>
    `;
});

// user interface:
// run when user opens popup
document.addEventListener("DOMContentLoaded", () => {
  blacklistInitFunc.then(() => {
    renderBlackList();
  });

  //listen for new website input
  document.body
    .querySelector("#add-website")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      let inputUrl = event.target[0].value.toLowerCase();
      if (isUrlValid(inputUrl)) {
        //if url is valid change to website.com format
        inputUrl = inputUrl.replace("https://", "");
        if (inputUrl.includes("www.")) {
          inputUrl = inputUrl.replace("www.", "");
        }

        if (!blacklist.includes(inputUrl)) {
          //add url to blacklist if it isnt already there
          blacklist.push(inputUrl);
          chrome.storage.local.set({ blacklist: blacklist });

          //refresh blacklist in html
          location.reload();
        }
      }
    });

  // listen for delete request
  blacklistInitFunc.then(() => {
    document.body.querySelectorAll(".remove-btn").forEach((removeBtn) => {
      removeBtn.addEventListener("click", (event) => {
        const removeUrl = event.target.id.replaceAll("_-_", ".");
        let arr = [];
        blacklist.forEach((blackListedUrl) => {
          if (blackListedUrl !== removeUrl) {
            arr.push(blackListedUrl);
          }
        });
        blacklist = arr;
        chrome.storage.local.set({ blacklist: blacklist });
        location.reload();
      });
    });
  });

  // block preview
  // add content to block preview
  blockImgFunc.then(() => {
    document.querySelector("#preview").innerHTML = templateHtml;
  });

  // listen to form
  document
    .querySelector("#preview-change")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newQuote = event.target[0].value;
      const newImage = event.target[1].value;
      const newColor = event.target[2].value;

      if (newQuote !== null) {
        chrome.storage.local.set({ quote: newQuote });
      }

      if (newImage !== null && newImage !== "") {
        try {
          URL(newImage);
          chrome.storage.local.set({ image: newImage });
        } catch {
          alert("image input should be a url");
        }
      }

      if (newColor !== null) {
        chrome.storage.local.set({ color: newColor });
      }

      //reload html
      location.reload();
    });

  // reset request
  document.querySelector("#reset").addEventListener("click", () => {
    chrome.storage.local.remove(["quote", "image", "color"]);

    // relod html
    location.reload();
  });

  //show user's blacklisted websites
  function renderBlackList() {
    let list = document.body.querySelector("ul");
    if (blacklist.length == 0) {
      list.style.display = "none";
    } else {
      list.innerHTML = blacklist
        .map(
          (website) =>
            `<li><p>${website}</p><button class="remove-btn" id="${website.replaceAll(
              ".",
              "_-_"
            )}">remove</button></li>`
        )
        .join("");
    }
  }

  // validate url
  function isUrlValid(inputUrl) {
    try {
      new URL(inputUrl);
    } catch {
      return false;
    }
    return true;
  }
});

// initialize blacklist
async function initalizeBlacklist() {
  let dbBlacklist = [];
  const data = await chrome.storage.local.get(["blacklist"]);
  if (data.blacklist !== undefined) {
    dbBlacklist = data.blacklist;
  }
  blacklist = dbBlacklist;
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
