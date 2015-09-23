# School Calendar ![Build Status](http://devtools1.risevision.com:8080/job/Storage-Client-BranchPush/badge/icon)

## Introduction

The School Calendar Template was created to showcase a series of calendar dates, descriptions and supporting images that would be typical of an educational environment. A preview of the template can be seen here: http://commondatastorage.googleapis.com/risemedialibrary-395c64e5-2930-460b-881e-009aabb157df/content-templates/school-calendar/school-calendar.html

##Steps to run the events template:##

1. Fork or download the entire content-templates repository.
![alt tag](images/readme-step1.jpg)

2. Modify the files within the school-calendar folder directory to fit your needs (see below on how to modify specific elements).
![alt tag](images/readme-step2.jpg)

3. Host the entire “school-calendar” folder directory in rise vision storage or your web hosting service.
![alt tag](images/readme-step3.jpg)

4. Copy the link to the school-calendar.html file where you have it hosted and insert the url into a schedule. (you can also add this link to the url gadget within a presentation)
![alt tag](images/readme-step4.jpg)


##Directions to modify the School Calendar Template:##

####Changing the background pattern
Open school-calendar.html, locate the following code and modify the src url of the img tag to the path of your new background:

```<!--background animation-->
<div id="background">
    <img src="../school-calendar/images/pattern.svg">
</div>```

The zooming and panning are created using css keyframes and transforms and can be changed in school-calendar.css style sheet by modifying the #background img ID.
 
####Changing the calendar text
Open school-calendar.html, the calendar events are orgainzed within 2 div tags both named ```<div class="left-content">```. To add 3 more calendar events copy and paste this div and its entire contents a third time and modify the dates and desciptions within to meet your needs.

The style of each calendar event is controlled within school-calendar.css. There are 3 different media queries within the css used to control the font sizes. One for 1360x768, 1920x1080 and 3840x2160 which are the common display resolutions we see in digital sigange.

The rotation is built with jquery inside content.rotation.js within the js folder. You can modify the speed in which it rotates between events by changing the following parameters: 
```.fadeIn(1000)
    .delay(5000)
    .fadeOut(1000, loop);```

####Changing the images
Open school-calendar.html, locate the following code and modify the src url of the img tags to the path of your new images. You can copy and paste the div with the class name of "skew" to add more images:

```<div class="right-container">
    <div class="skew">
        <img src="images/image-schoolbus.jpg">
    </div>
    <div class="skew">
        <img src="images/image-gymnasium.jpg">
    </div></div>```

The rotation is built with jquery inside content.rotation.js within the js folder. You can modify the speed in which it rotates between events by changing the following parameters: 
```.fadeIn(300)
    .delay(10000)
    .fadeOut(300, loop);``` 

## Built With
actual tools used
- HTML
- CSS
- Jquery

School Calendar Template works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. Please Identify the specific template that has the issue and follow the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it.

### Suggested Contributions
- Alternative ways to animate background
- Alternative ways to animate text transitions
- Dynamically update calendar from custom data source
- i18n Language Support

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

 If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.
 
**Additional Content Templates can be found here: https://github.com/Rise-Vision/content-templates**

**Facilitator**

[Mathew Meiers](https://github.com/mmeiers "Mathew Meiers")
