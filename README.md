# Summary
For merchants want to integrate with PayFabric hosted payment page and hosted wallet page, there's a way to inject custom css code into hosted page to fit the overall style for the 3rd party applications. To implement custom theme, you will get the PayFabric account ready and do some priliminary configuration. Please go through [Quick Start](https://github.com/PayFabric/API-Samples/wiki/Quick-Start) for starting with PayFabric.

To implement a custom theme, below are steps involved into the process:
* [Define Themes](#definetheme)
* [Apply a Theme To a Device](#applytheme)

# Define Themes

Navigate through Settings > Dev Central > Themes to open below page. By clicking "Create New" button, you can add a new theme name into your account. A theme includes two parts: "custom css style" and "custom javascript". Your writing will be applied to hosted payment page and hosted wallet page. So that you can apply your own look and feel. 

![themes](https://s3-us-west-1.amazonaws.com/github-screenshot-repository/v2/themes.png)

Also you can choose to show/hide the related fields on hosted payment page by check/uncheck the parameters of the theme.
![ThemeParams](https://s3-us-west-1.amazonaws.com/github-screenshot-repository/v2/ThemeParams.png)

# Apply a Theme To a Device

Navigate through Settings > Dev Central > Devices to open below page. This is device list in your account. By clicking the icon button in column "Default Theme", an extended region will be expanded. All available themes will be listed in this region, you can assign one of them be the default theme of a device. 

![devicetheme](https://s3-us-west-1.amazonaws.com/github-screenshot-repository/v2/themes1.png)

