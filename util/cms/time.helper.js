'use strict'

Number.prototype.padLeft = function (base, chr) {
    let len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

const TimeHelper = {
  today:()=>{
    return new Date()
  },
  formatYmd:(d,separator="")=>{
    console.log(d)
    return [
      d.getFullYear(),
      (d.getMonth() + 1).padLeft(),
      d.getDate().padLeft()
    ].join(separator)
  },
}

const _this = TimeHelper
export default TimeHelper