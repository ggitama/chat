const ModelHelper = {
  setter:(modalForm,key,newValue,field='value')=>{
    if(typeof modalForm[key]=="undefined"){
      return
    }
    
    modalForm[key][field] = newValue
  }
}

// alias so it's shorter 
// and more readble in circular access
const _this = ModelHelper
export default ModelHelper