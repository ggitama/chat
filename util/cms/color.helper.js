import { blue} from "@ant-design/colors";

const ColorHelper = {
  primaryIndex:{
      blue:5
  },
  _getIndex(index,defaultValue){
    return index==-1 ? defaultValue : index
  },
  blue:(index=-1)=>{
    index = _this._getIndex(index,_this.primaryIndex.blue)
    return blue[index]
  }
}

// alias so it's shorter 
// and more readble in circular access
const _this = ColorHelper
export default ColorHelper