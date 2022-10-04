console.log("connected script.js")
if (window.jQuery) { console.log("jquery connected") } 






// // console.log(document.getElementById("catClimber"))

// var catPhoto = "./images/cat_photo.jpg";
// document.getElementById("catClimber").src = catPhoto ;

// document.createElement("img");



var activeCell = "" ;
var activeDigit = 0 ;
var numbersPlaced = [
  {
    "equal":9,
    "times":4
  },
  {
    "equal":8,
    "times":4
  },
  {
    "equal":7,
    "times":4
  },
  {
    "equal":6,
    "times":2
  },
  {
    "equal":5,
    "times":3
  },
  {
    "equal":4,
    "times":4
  },
  {
    "equal":3,
    "times":4
  },
  {
    "equal":2,
    "times":1
  },
  {
    "equal":1,
    "times":5
  }
]

//this function behaves two different ways depending on user input...
//[ "this function invokes placedigit to place the active digit in the cell" ]
//["if there is NO active digit selected by the user it returns"]
function activateCell(e){
  let id = e.target.id ;
  if(activeDigit !== 0){
    for (const key in numbersPlaced) {
      if( numbersPlaced[key].equal === activeDigit ){
        placeDigit(id, activeDigit)
        numbersPlaced[key].times++;
        checkTimes(numbersPlaced[key])
      }

    }
    return
  }

  window.alert("First select a number to input.")
  return
  
}


// remember to check for change of a number if one was erased or replaced
function checkTimes(obj){
  let times = obj.times ;
  let equals = obj.equal ;
  let id = "num" + `${equals}` ;

  if ( times === 9 ){
    $(`#${id}`).toggleClass('numKeys')
    $(`#${id}`).toggleClass('disabledKeys')
    document.getElementById(id).onclick = ""
    resetDigit()
  }
  // return times === 9 ? resetDigit() : null ;
}




// this function removes the active class so that the user number keys
//input are reset 
function removeActive(){
  let old = document.getElementsByClassName("active")[0] || false ;
  if(old){
    let id = old.id ;
    $(`#${id}`).toggleClass('active')
    // old.classList = "numKeys";
  }
}

// this places the active number in the selected cell
function placeDigit(donde, digit){
  let elem = document.getElementById(donde) ;
  checkSection(donde, digit)
  elem.textContent = String(digit)
  console.log(activeDigit)
}

const resetDigit = () => activeDigit = 0 ;



// this is invoked when the user selects x number to input
function activeNumber(e){
  removeActive();
  let num = Number(e.target.textContent) ;
  activeDigit = num ;
  let id = e.target.id ;
  for ( const key in numbersPlaced ) {
    if( numbersPlaced[key].equal === num ){
      if( numbersPlaced[key].times === 9 ){
        console.log("here")
        resetDigit()
        return
      }
    }
  }
  $(`#${id}`).toggleClass("active")[0]

}

function activateEraser(id){
  // document.getElementById(id).style.color = "red"
  // document.getElementById(id).className += " flashing"
}

function checkSection(donde, digit){
  let sectionID = donde.substr(0, 2) ;
  let elem = document.getElementById(sectionID) ;
  let compareArray = [] ;
  for(let i = 0 ; i < 8 ; i++) {
    let num = elem.children[i].textContent ;
    if( num != ""){
      compareArray.push(num)
    }
  }
  // console.log(compareArray, digit)
  let check = compareArray.every((x)=> x != digit)
  // console.log(compareArray.findIndex(x=>x==digit))
  if(check) return 
  removeActive();
  resetDigit();
  activateEraser(donde)
  console.log(check, "theres a repeat in section")


}