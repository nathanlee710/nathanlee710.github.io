// For full API documentation, including code examples, visit https://wix.to/94BuAAs

import wixData from 'wix-data';
import { debounce } from 'lodash';

const collectionName = 'Taxonomy';
const debounceTime = 500;

let yearOptions = [];
let startYearOptions = $w('#yearDropdown').options
let startPositionOptions = $w('#respondentType').options
let startTopicOptions = $w('#topicDropdown').options
let positionOptions = [];
let legacyPositionOptions = ["Policymaker","civilServant"]
var legacyYearOptions = ["2015","2016","2017","2018","2019","2020"]
let legacyTopicOptions = startTopicOptions;

$w.onReady(function () {
    //TODO: write your page related code here...
    console.log("topicSelected =" + $w('#topicDropdown').value +
                "\npositionSelected =" + $w('#respondentType').value +
                "\nyearSelected =" +  $w('#yearDropdown').value)

    tagSetterTopic () 

    makeSelectAll($w('#topicDropdown'));
    makeSelectAll($w('#respondentType'));
	//$w('#respondentType').selectedIndex[0];
	makeSelectAll($w('#yearDropdown'));
	//$w('#yearDropdown').selectedIndex[0];

});

//::TAGGER::
const tagger = res => { return { value: String(res), label: String(res)}};
//::TAGGER ABOVE::

//::CLEAR ARRAY::

function clearArray(element){
        console.log("clearArray ("+element.entries()+")")
		element.selectedIndex = undefined
    let temp = element;
    temp = [];

    //console.log("CLEARARRAY:" + element)
    element = temp;
    return element
}
//::CLEAR ARRAY ABOVE::



//::SELECT ALL::
function makeSelectAll (dropdown) { 
    

        ////console.log("DROPDOWN: "+ String(dropdown))
        let addSelectAll = dropdown.options;

        var  modifierVar = ""
        if (dropdown.id === "topicDropdown"){
            modifierVar = "TOPICS"
        }else if (dropdown.id === "respondentType") {
            modifierVar = "POSITIONS"
        }else if (dropdown.id === "yearDropdown") {
            modifierVar = "YEARS"
        }
        var label = "ALL " + String(modifierVar);
        var allObj = {"label": label, "value": undefined};
        //console.log(containsObject(allObj, addSelectAll))
        if(containsObject(allObj, addSelectAll)===false){
            addSelectAll.unshift(allObj);
        }
        //if(opts.length>1){opts.unshift({"label": label, "value": ''});}          
        dropdown.options = addSelectAll; //sets the dropdown options to the opts
        //console.log(containsObject(allObj, addSelectAll))

}
//::SELECT ALL ABOVE::

function makePositions (position) {
   
        if(position==="civilServant"){position= "Civil Servant"}
        let value = position;
        var newPosition = {"label": String(position), "value": String(value)};
         console.log("Option for " + position + " made.")
        return newPosition;
}
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------


function tagSetterPosition(){
    console.log("tagSetter")
    //clearArray($w('#respondentType').options)
        //console.log("cleared respondent array")
        //console.log(clearArray($w('#respondentType').options))
	legacyPositionOptions.forEach((f)=>
    
	tagSetterCivil(f)
    
	)
    console.log("f")
	//makeSelectAll($w('#respondentType'))
    //tagSetterElected()//checks for elected in officialsAsked then adds the tag
    //tagSetterCivil()//checks for civil servant in officialsAsked then adds the tag
}



async function tagSetterCivil (position) {
    const topic = $w('#topicDropdown').value;
    const year = $w('#yearDropdown').value;
    //const position = $w('#respondentType').value;
     console.log("topic")
     console.log(topic)
    console.log("year")//to check 
     console.log(year)//to check 
	
    const res = await wixData.query('Taxonomy')
    .eq('topic', topic)
    //.eq(position,true)
	.ascending('topic')
    .hasAll('year',$w('#yearDropdown').value)
    //.hasSome('year', yearwords)
    .contains('officialsAskedNew',position)
    .distinct('officialsAskedNew')//this says the values
    .then((results) => {
		console.log(results.length)
        if(results.length>0){
			return makePositions(position);
        }
        
        /*else{
            let i = 0;
            let temp = $w('#respondentType').options;
            for(i; i<temp.length-1;i++){
                if (temp[i].value === position){
                    console.log("temp[i] value:" + temp[i].value)
                    temp.splice(i, 1)
                    $w('#respondentType').options = temp;
                    
                }
            }
            return undefined;

        }*/
    }).catch((err)=> console.log(err));

	$w('#respondentType').options.push(res);
}


/*function changeArray (parameter) {
	let tempArray = parameter;
	tempArray = [];
	parameter = tempArray;
}*/

async function tagSetterYear () {
        const topic = $w('#topicDropdown').value;
        const position = $w('#respondentType').value;

		const years = [];
		//sets Query
        const res = await wixData.query('Taxonomy')
      	.eq('topic', topic)
      	.contains('officialsAskedNew', position)
        .distinct('year')//this says we only want the values from year
        .then((results) => {
//possible error is here
			
			return results.items.map(tagger)//adds new options to year


        })
        .catch((err)=> console.log(err));

        $w('#yearDropdown').options = res;
		makeSelectAll($w('#yearDropdown'))


    }

async function tagSetterTopic () {
        const year = $w('#yearDropdown').value;
        const position = $w('#respondentType').value;

		const topics = [];
		//sets Query
        const res = await wixData.query('Taxonomy')
      	.contains('date', year)
      	.contains('officialsAskedNew', position)
        .distinct('topic')//this says we only want the values from year
        .then((results) => {
//possible error is here
			
			return results.items.map(tagger)//adds new options to year


        })
        .catch((err)=> console.log(err));

        $w('#topicDropdown').options = res;
		makeSelectAll($w('#topicDropdown'))

sortTopic();
    }

//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------


export function topicDropdown_change(event) {
    
    //tagSetterPosition()
    /*let temp = $w("#respondentType").value;

	let holder = positionOptions;
	positionOptions= [];*/
	
    $w("#dataset1").setFilter( wixData.filter()
            .contains("date", $w("#yearDropdown").value)
            .contains("topic", $w("#topicDropdown").value)
            .contains("officialsAskedNew", $w("#respondentType").value)
            );

	tagSetterCivil()//error
	tagSetterYear()//error
	sortTopic();
            
}

export function respondentType_change(event) {
    //tagSetterYear()//error
	tagSetterYear()
	console.log($w('#respondentType').value)
    $w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAskedNew", $w("#respondentType").value)
        );
    tagSetterTopic ()
	tagSetterYear()
sortTopic();

}

function sortTopic(){
    let temp = $w('#topicDropdown').options
    temp.sort(function(a, b) {
  var labelA = a.label.toUpperCase(); // ignore upper and lowercase
  var labelB = b.label.toUpperCase(); // ignore upper and lowercase
  if (labelA < labelB) {
    return -1;
  }
  if (labelA > labelB) {
    return 1;
  }

  // names must be equal
  return 0;
})
$w('#topicDropdown').options = temp
}
export function yearDropdown_change(event) {
    tagSetterTopic ()
$w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAskedNew", $w("#respondentType").value)
        );
        sortTopic();
}




//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------

export function resetbutton_click(event) {

$w('#yearDropdown').options = startYearOptions;
$w('#respondentType').options = startPositionOptions
$w('#topicDropdown').options = startTopicOptions
makeSelectAll($w('#topicDropdown'));
    makeSelectAll($w('#respondentType'));
    makeSelectAll($w('#yearDropdown'));
$w("#dataset1").setFilter( wixData.filter() );
$w("#yearDropdown").selectedIndex = undefined
$w("#topicDropdown").selectedIndex = undefined
$w("#respondentType").selectedIndex = undefined
$w("#input1").value = ""
}



export function input1_keyPress(event, $w) {
    if (event.key === "Enter"){
        $w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAskedNew", $w("#respondentType").value)
        //.contains("questionText", $w("#input1").value)
        );
    }
}

