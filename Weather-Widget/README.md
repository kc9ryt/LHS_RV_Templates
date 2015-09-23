# Weather Widget

## Introduction
The Weather Widget uses the [TinBu Weather API](http://www.tinbu.com/tinbu_web/weather.php) to retrieve weather for a given location. It checks for a new weather forecast every thirty minutes.

### How It Works

#### Locations
There are three options available for determining the location to use for showing weather:

- *Geolocation* – [HTML5 geolocation](http://diveintohtml5.info/geolocation.html) is used to determine the latitude and longitude of the Display. This information is then passed to the Weather API.
- *Display Address* – The address of the display can be obtained by making an RPC call to the Viewer. More information on this can be found [here](http://www.risevision.com/blog/developer-tips-tricks-getting-information-about-a-display/#.Ui85pWRgafs). The value that is passed to the callback function is then sent to the API.
- *Custom Address* – The user can manually enter a custom location for which they would like to show weather. In this case, the location is passed along unchanged to the API.

It is possible that by the time the Widget is ready to show weather, a location has still not been determined. This could occur, for example, if the Widget has been configured to use the *Display Address*, but the Presentation is being previewed. In this scenario, the Widget will fall back to use the geolocation method.

#### Images
The Weather Widget uses custom images for the weather icons. The names of these images map to the names of the images returned by the API in the `icon_name` field. If `icon_name` returns a value of `cw_no_report_icon`, then no image is shown for that particular day.

##### Custom Images
It is possible to use your own custom images. To start, you’ll need to download the code for the existing Widget from [here](https://github.com/Rise-Vision/weather-widget). Be sure to download the files in all of the subfolders as well.

The images for the Weather Widget are stored in the *images* folder. Each icon is named after a particular weather condition (e.g. *cloudy.png* or *rain.png*). There are also nighttime versions of each weather condition (e.g. *night_cloudy.png* or *night_sprinkles.png*). You will need to replace each of these images with your own, taking care to preserve the original filenames.

Next, open up the *weather.js* file in a code editor and do a search for `hostURL`. You are looking for the following line:

`this.hostURL = "https://s3.amazonaws.com/Widget-Weather/";`

Replace this URL with the location to which you plan to upload your custom Weather Widget. The Widget will look for images in an *images* sub-folder at this location. If you are using images with a file extension other than *png*, you will also need to change the following line to use the appropriate file extension (e.g. *gif*):

```
RiseVision.Weather.Controller.prototype.loadImage = function(icon, $element) {
  var self = this, img = new Image(), url = this.hostURL + "images/" + icon + ".png";
  ...
}
```

In the layout file you wish to use (i.e. *current.html*, *three-day.html* or *current-and-three-day.html*), replace the following URL with one to the custom version of *weather.js* you just created (you may want to create a minified version and link to that instead):

`<script src="js/weather.min.js"></script>`

Once done, upload all of the Widget code and images to a hosting server. Next, follow [these instructions](http://www.risevision.com/help/users/what-are-gadgets/content/widgets/) to add a new Widget to the Rise Vision Platform. Be sure to enter the URL to *settings.html* in the *Custom UI URL* field and any one of the 3 pre-defined layouts, or your own custom layout, in the *URL* field. Now you can add the Weather Widget to a Presentation and it will use your custom weather icons.

#### Predefined Layouts
The Weather Widget has 3 different layouts available – *Current Weather*, *3 Day Forecast* or *Current Weather and 3 Day Forecast*. Each of these is defined in its own HTML file, and will display a different layout depending on whether the Placeholder has a landscape or portrait orientation. This is accomplished by the use of CSS media queries.

#### Custom Layouts
A custom layout is defined inside an HTML file. This means that all you need to do to create your own layout is build an HTML page, and tag the elements with CSS classes that will map them to the appropriate data, as described below:

Class         | Description
------------- | -------------
*container*     | Parent element that contains all other elements. This element will be hidden if the weather data could not be loaded.
*info*          | Container for the location, humidity and wind. This element will be hidden if the *Show Humidity and Wind* checkbox is unchecked and *Address Description* is *None*.
*city*          | City or location. This is the element to which the *Address Font* properties are applied.
*humidity-wind* | Container for the humidity and wind. This is the element to which the *Humidity and Wind Font* properties are applied. It is hidden if the *Show Humidity and Wind* checkbox is unchecked.
*humidity*      | Humidity
*wind*  | Wind speed and direction
*current-icon*  | `<img>` element for the current weather’s icon
*current-temp*  | Current temperature. This is the element to which the *Current Temperature Font* properties are applied.
*day-of-week*   | Day of the week. This is the element to which the *Forecast Day Font* properties are applied.
*icon*          | `<img>` element for the weather forecast’s icon
*temp*          | Forecast temperature. This is the element to which the *Forecast Temperature Font* properties are applied.
*error*         | Error messages

The Widget will fire the `dataPopulated` event once all of the images have been loaded and the UI has been populated with weather data. This can be a useful event to listen for if you find that you need to further refine the UI using Javascript.

Weather Widget works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Development

### Dependencies
* [Git](http://git-scm.com/) - Git is a free and open source distributed version control system that is used to manage our source code on Github.

### Local Development Environment Setup and Installation
To make changes to the Widget, you'll first need to install [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

The Widget can now be installed by executing the following command in Terminal:
```
git clone https://github.com/Rise-Vision/widget-weather.git
```

### Deployment
Once you are satisifed with your changes, deploy them to your server. In the Rise Vision Platform, you can then add your custom Widget via the *Gadgets* tab. Give your Widget a name, select a *Type* of *Widget*, paste the link to the `current.html` file in the *URL* field, and the link to the `settings.html` file in the *Custom UI URL* field:

![Add a Widget](https://cloud.githubusercontent.com/assets/1190420/5113377/2f2d9240-6ffd-11e4-98ad-a484c1fa7183.png)

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues, please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas, please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it.

### Languages
If you would like to translate the user interface for this product to another language, please complete the following:
- Download the English translation file from this repository.
- Download and install POEdit. This is software that you can use to write translations into another language.
- Open the translation file in the [POEdit](http://www.poedit.net/) program and set the language for which you are writing a translation.
- In the Source text window, you will see the English word or phrase to be translated. You can provide a translation for it in the Translation window.
- When the translation is complete, save it with a .po extension and email the file to support@risevision.com. Please be sure to indicate the Widget or app the translation file is for, as well as the language that it has been translated into, and we will integrate it after the translation has been verified.

## Resources
If you have any questions or problems, please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision, please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision, please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Donna Peplinskie](https://github.com/donnapep "Donna Peplinskie")