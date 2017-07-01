import { appSettings } from './settings/';


import { Server } from './modules/server';
import { Logger } from './modules/logger';
import { DAL } from './modules/dal';

import * as restV1 from './REST/api/v1/index.rest';

DAL.init();
let apiServer = new Server(appSettings.port, restV1);
apiServer.start();

///////////

// let log = new DAL.LogModel();
// log.message = 'tst1';
// log.date = new Date();
// log.save();


