import {generateMockPictureDescriptions} from './mock/generate-pic-descriptions.js';
import {drawMinipics} from './modules/draw-mini-pics.js';
//import {openBigPic} from './modules/open-big-pic.js';


const mockPicObjects = generateMockPictureDescriptions();
//console.log(mockPicObjects[0]);
drawMinipics(mockPicObjects);

//openBigPic(mockPicObjects[0]);
