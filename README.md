# Harubi Front
Harubi Front is a front-end web applications framework based on [React](https://reactjs.org) and [Foundation](https://foundation.zurb.com). It is loosely coupled with harubi back-end. [Harubi](https://github.com/chelahmy/harubi) is all about back-ends. Harubi Front is an attempt for a harubi front-end. And it does not really rely on harubi for back-end. Decoupling front-end and back-end prevents unneeded code fusion, and loosens unnecessary intertwined concerns of development. In fact, it could be multiple front-ends for a back-end, such as for web, mobile and IoT.

The following image is a screenshot of a typical Harubi Front application:

![A Harubi Front application](docs/harubi-front-home.png)

**Framework modules**: React is used for structuring. And Foundation is used for micro-structuring and theming. Analogously, React is used to construct a building, and Foundation is used to finish it. Both of them make a powerful front-end framework. Coupling with harubi [model-action](https://github.com/chelahmy/harubi/tree/master/templates/models) pattern all of them make a great development framework.

**React and Foundation**: Forms for signing up, signing in and other actions are based on Foundation Form and Abide. The top bar and its menus are also based on Foundation. The responsive styling is also based on Foundation. Anything visible is being styled with Foundation. However, underneath all of them is a structure based on crafted React components. Harubi Front development always starts with React structuring.

Harubi Front is an extension of [Foundation-React Template](https://github.com/chelahmy/foundation-react-template). Please refer to the Foundation-React Template documentation for details on dependencies and tool-chain. This extension added the [PHP development server](https://www.php.net/manual/en/features.commandline.webserver.php) to [Browsersync](https://browsersync.io/).

## Installation
Clone this repository into a folder
```
$ git clone https://github.com/chelahmy/harubi-front.git my-project
$ cd my-project
```
and run the following command to download all dependencies including Foundation and React.
```
$ npm i
```

### Database setup
Create a `harubi_front` database in MySQL, and create the `user` table using the `src/backend/user.install.sql` script. Please refer to [harubi](https://github.com/chelahmy/harubi) for more details.

## How-to
Start the project.
```
$ npm start
```
The tool-chain will build the project into the `dist` folder and run it in a browser. Any changes made in the `src` folder will trigger the tool-chain to rebuild the project and push the changes to the browser in real time. Remove the `dist` folder to rebuild the project.

Begin with the `src/index.html`, `src/js/app.js`, `src/scss/app.scss` and `src/backend/serve.php` files. The resulting `dist` is standalone and can be deployed to a PHP and MySQL web server.

For building the project without watching the source files and triggering the browser
```
$ npm run build
```
