const StringHelper = {
  firstLetterUpperCase(string){
    return string.split(" ").map(stringPart=>{
      let firstLetter = stringPart[0].toUpperCase()
      let restLetter = stringPart.slice(1,stringPart.length)
      return `${firstLetter}${restLetter}`
    }).join(" ")
  }
}

export default StringHelper