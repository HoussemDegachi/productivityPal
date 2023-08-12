# ProductivityPal
## Video Demo:  <https://drive.google.com/file/d/1iezmNUSv8vkLIlecnj1s7K58cVGdxvu5/view>
## Description: 
A productivity partner who will help you bring back awareness to your life and terminate your addiction to short videos and endless scrolling.
## 1. How to download
After you download the file of the project, head to browser extention settings and make sure that developer options are turned on.
If so a button called "load pack" will appear, click on it then select the file of the project.
## 2. How to use
### a. Short video blocking 
the extensin have an auto video detector, ti checks for videos in the website and look up for its direction if it is shorter then 2m the website will be blocked.
### b. Block websites
you can add any website you want to the block list, write the website url in the for "https://website.com" or "https://www.website.com" then hit add; if you want to remove a website of the block list simply click remove.
### c. Block preview
you can change the block preview in the settings too. you will have three inputs one for the text the second for the image (should be a url of image) and the last is the color of text, note that you can fill one and leave the rest empty.
### d. Block preview reset 
if you mess up with your block preview simply hit reset and you're all good.
## 3. Technologies
### a. HTML
also known as hyper text mark up languge, it was used in this project for creating the popup and for making the block image that appears when a website gets blocked
### b. CSS
also know as cascaded style sheet, it was used for styling the html (the popup and the block image)
### c. JS
also known as JavaScript, it was used in the extention to manupilate the html and css, add to that it is responsible for detecting short videos and websites that the user did input + it is responsible also for taking actions
## 4. API's
### a. Chrome api
chrome api is useful in alots of things but in this project onlu the chrome.storage use used (more on that later)
## 5. Files and project management
## 5.1 popup.html
this file contains all the ui of the extention it first starts out (first section) with a blacklist ul (unorderd list) which contains all blocked website, in the same section there is a form where you can add a new website to disable.
In the second section you will see a preview of the block image there is a form of three inputs the first is for the text second for backgound image and third for text color the form ends with submite button, you can always see how the block image looks like, in the end of the section you can see reset button that is used in case you mess up with the block image.
## 5.2 popup.css
now our user can see the ui but it looks ugly, is popup.css we simply style every item with as dynamic as possible css
## 5.3 popup.js
we have an awesome looking ui but it doesn't work :| 
the file starts with initialzing the variables, by importing the data we need for the chrome.storage api if there is nothing in that api then we add default data,
after that we have an event listener that will block js from working unless the popup.html loaded, itself it contains a function that will map all the websites in the form we mentioned before 
then it has a function which will listen for the form submition off addings a website to the block list, it detects wether the input is a valid url then it remove the https and www. if there then it adds that the the chrome.storage api
later we have another event lister for when the remove button cliked it gest the url whish is stored in the id (". is mapped to _-_" bc ids cant have dots but it will be restored as it was in this step) then it will remove the url from the list if it exists
later on we have the preview of the block image (using placeholder.innerHtml)
we have another event listner for the other forn (custinuzng img block) it takes all three inputs , if the input is empty string then it doesnt include that, after that we add the new data to the chrome.storage and all good
the final event listener is for the reset button, simply when clicked it deletes every data (related to block img)
## 5.4 index.css
it is responsible for styling the block image
## 5.5 index.js
this is the most important file in the whole project, it starts by initializing data (blacklist and block img) 
then it starts checking every 1s if the url or path changes if so it runs a function called app()
app will check if website is in blacklist if so the website will call blockSite() which as the name sais it blocks the website then it returns so we dont waste more time,
 if this website isnot in the blacklist then we look if the page does have a video if it does we check if the video is shorter then 2m (120s) if it is we call blockSite() and we return
if it makes it out again with no return then we check if this website is either tiktok or youtube shorts if it is the we call blockSite() and we return if no then this website is probably safe
## and that is how we save your productivity underneath the hood 
## thanks for using productivityPal
### Made by houssem, github: HoussemDegachi