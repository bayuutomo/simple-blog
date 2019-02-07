import { configuration } from '../config/Config';

const URL_MASTER    = configuration.API_URL_MASTER;

export const api = {
    url: {
        users : {
            list   : URL_MASTER+"/users"
        },
        posts : {
            list   : URL_MASTER+"/posts"
        },
        comments : {
            list   : URL_MASTER+"/comments"
        },
        albums : {
            list   : URL_MASTER+"/albums"
        },
        photos : {
            list   : URL_MASTER+"/photos"
        }
    }
}

