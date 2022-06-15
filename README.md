# Quick Survey

## Quick Survey is no longer actively maintained. If you want to help keep it running, reach out!

> A tool for quickly building and releasing surveys. Open source & quick to host it yourself.

[Demo](https://apps.sandstorm.io/app/wupmzqk4872vgsye9t9x5dmrdw17mad97dk21jvcm2ph4jataze0)

![quick-survey](http://i.imgur.com/AYn4Jd4.png)
![quick-survey-results](http://i.imgur.com/4elbHfe.png)

# Goals

* [x] Single install app using Sandstorm.

# To deploy

## To install on Sandstorm:

* Visit [Quick Survey in the Sandstorm App Market](https://apps.sandstorm.io/app/wupmzqk4872vgsye9t9x5dmrdw17mad97dk21jvcm2ph4jataze0) and click "Install".
* Share the link, ask people things!

# Contributing

What's needed:

* This tool was built for user experience researchers. So I need user experience testers!
* Ideas for the tool to do.
* Angular / Meteor expertise to go over the code
* Security holes found?

## To run locally with Meteor:

1. Install Meteor `curl https://install.meteor.com/ | sh` if it's not already installed
2. Clone repo to a local directory `git clone git@github.com:simonv3/quick-survey` and change directory `cd quick-survey`.
3. You might need to run `meteor npm install` to get all the npm packages working.
4. Run the app to see if it all works `SANDSTORM=1 meteor`.
Sandstorm=1 tells the app to pretend it's running inside of Meteor.

If you want to add an administrator, you'll need to use the API made available by [meteor-accounts-sandstorm](https://github.com/sandstorm-io/meteor-accounts-sandstorm). Then add a user like so:

```
SandstormAccounts.setTestUserInfo({
  id: 1,
  name: "Alice",
  permissions: ['owner']
});
```

# Attribution

* Entypo icon font used for icons. It's beautiful. http://www.entypo.com/
