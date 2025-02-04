const NumberHelper = {
  random(){
    return Math.random()
  },
  randomId(){
    return (this.random() + this.random()).toString()
  },
  // https://stackoverflow.com/questions/3753483/javascript-thousand-separator-string-format
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  formatThousand(numberValue){
    if(numberValue == null) return  0;
    return (numberValue).toLocaleString('de-DE') 
  }
}

export default NumberHelper