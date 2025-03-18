const axios = require('axios');

class Client{
    constructor(){
        this.client= axios.create({
            baseURL: 'https://api.cloudflare.com/client/v4',
            headers:{
                'Authorization': 'Bearer L6FveeXZvDMssMwtn4nvdquz2kmvBPtl0yPGkIlu'
            }
        })
    }
}
module.exports = Client;