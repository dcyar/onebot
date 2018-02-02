## OneChat

Hi, this is a small example of a chatbot for the Facebook messenger platform.

### Requirements
You have to have NodeJs and npm installed.
First of all, you need to clone or download this repository.
```
    > git clone https://github.com/dcyar/onebot.git

```
Install the necessary packages
```
    > npm install
```

After the installation of the necessary packages, you will have to create a **facebook page** and a **facebook application** linked to that page.

After having all this, **create a new folder** in the root of the project called **config** and inside a **default.json** file, here are the necessary configurations for the bot to work.

The structure of the default.json file has to be the following:
```
  {
    "appSecret": "",
    "pageAccessToken": "",
    "validationToken": "",
    "serverURL": "https://*******.ngrok.io"
  }
```
    
**appSecret** and **pageAccessToken** you get the facebook application you created earlier.

> Here is a small [guide](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup).

**validationToken** is a unique key that you must put when setting up the webhook in the facebook application.

For the bot to work we have to have the application on a server with https, for this we will use the [ngrok tool](https://ngrok.com/).

The generated url will have to be placed in the default.json file and in the **webhook configuration** of the facebook application.

Having all this ready, we execute the file index.js with nodejs in the same port in which we execute ngrok, example:
**nodejs server**
```
    > node index.js
```
**index.js file**
```
    app.listen(3000, function() {
		console.log("El servidor se encuentra en el puerto 3000");
	});
```

Note that the port on which the server runs is the **3000**
**ngrok**

```
    > ngrok http 3000
```

> You can change the messages that you send with the bot and those that you recognize the same
> Just modify the conditions in the function **eveluateMessage**


That is all.