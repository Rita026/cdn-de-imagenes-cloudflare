const {getInstance} = require("./DependencyLocator");
const CloudFlare = require("../../services/cloudflare");

const serviceLocator = getInstance();

function init(){
    serviceLocator.bindLazySingleton('cloudflare', () => CloudFlare.getInstance());
}

module.exports = {init};