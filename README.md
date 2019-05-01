# Proxy tunnel test CLI

This CLI will test the various tunnel proxy methods to a given endpoint, via a given proxy server, with options for custom port, authorisation credentials and client certificate authority for https targets.

## Install the app

First start Powershell, and make sure you know the location in which you have cloned this repo. You will need to have [Node.js and npm](https://nodejs.org/en/) installed on your machine.

```bash
# cd into the app directory
cd ~/location/of/repo/proxy-test-cli

# or cd into a full path copied from file explorer
cd "C:\Users\Administrator\path\to\proxy-test-cli"

# install
npm install
```

## Run the app

Again, from Powershell.

```bash
# cd into the app directory
cd ~/location/of/repo/proxy-test-cli

# or cd into a full path copied from file explorer
cd "C:\Users\Administrator\path\to\proxy-test-cli"

# run via
node app.js

# or via
npm start
```

## Example input and output

The app will first present a series of prompts to provide connection options, and then display a table of results as the requests complete. Only the endpoint (address to proxy to) and proxy server hostname are required. Custom port, auth credentials, and the use of any local certificate is optionally enabled.

```bash
# run the app
node app.js

# prompts begin
? Enter endpoint to proxy to: my.website.com
? Enter proxy hostname or IP: my.proxy.server.com

# optional, will use 80 if skipped
? Enter proxy port (optional): 80

# optional, type 'n' to skip
? Proxy requires auth credentials? Yes

# username and password mandatory once requested
? Proxy username: myusername
? Proxy password: [hidden]

# whether to attach any local certificate.pem to the request
? Use local certificate.pem for client authentication? No

# result will show a 200 status code for success, or error message
method          protocol        result
httpOverHttp    http            200
httpOverHttp    https           200
httpsOverHttp   http            unable to verify the first certificate
httpsOverHttp   https           unable to verify the first certificate
```

## Adding a client CA

First, open Windows certificate manager. Press _Windows Key + R_ and type `certmgr.msc` in the run command prompt.

![run certmgr.msc](/docs/assets/run_certmgr.png)

Press _OK_ and in the certificate manager program, locate the certificate authority for your proxy server. In your case the certificate name will be different. Right-click the entry and select _All Tasks -> Export..._

![certmgr](/docs/assets/certmgr.png)

In the Certificate Export Wizard, first click _Next_, then you will be presented with the window below. Leave _No, do not export the private key_ checked.

![wizard1](/docs/assets/wizard1.png)

Click _Next_, then choose _Base-64 encoded X.509 (.CER)_. Click _Next_ again.

![wizard2](/docs/assets/wizard2.png)

In the next screen you'll be asked to specify the file to export, select _Browse_ and navigate to the folder containing the CLI app. Navigate into the root folder of this app's repo, change _Save as type_ to _All files (*.*)_ and name it `certificate.pem`.

![saveAsPem](/docs/assets/saveAsPEM.png)

Press _Save_, then back in the export wizard window, click _Next_ then _Finish_. It will export a file `certificate.pem.cer`.

We need to remove the `.cer` extension, so if you haven't done so already, you need to change Windows appearance settings to show file extensions.

Alternatively, the file can be renamed in an editor like VS Code.

The preference can be found in the _Control Panel -> Appearance and Personalisation -> File Explorer Options -> View_, then uncheck _Hide extensions for known file types_.

![showExtension](/docs/assets/showExtension.png)

Find `certificate.pem.cer` in the File Explorer, right-click it and _Rename_, then remove the `.cer` from the end of the filename. Once done, confirm the action when the following dialog appears.

![confirmExtension](/docs/assets/confirmExtension.png)

Once this is done, when you run the CLI app, it will pick up your certificate and attach it to the request if you select _Use local certificate.pem for client authentication_ in the prompt.
