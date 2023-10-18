import { SubHeaderData } from "../../../utils/types";

 class SubHeaderStateManager {
    getHeaderState: () => SubHeaderData;
    constructor(subHeader: SubHeaderData){
        this.getHeaderState = () => subHeader;
    }
 }

 export default SubHeaderStateManager;