import { appSettings } from './settings/';


import { Server } from './modules/server';
import { Logger } from './modules/logger';
import { DAL } from './modules/dal';

import * as restV1 from './REST/api/v1/index.rest';

let apiServer = new Server(appSettings.port, restV1);
apiServer.start();
DAL.init();

///////////

let log = new DAL.LogModel();
log.message = 'tst';
log.date = new Date();
log.save();


