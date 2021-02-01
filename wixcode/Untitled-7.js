// For full API documentation, including code examples, visit https://wix.to/94BuAAs

import wixData from 'wix-data';
import { debounce } from 'lodash';

const collectionName = 'Taxonomy';
const debounceTime = 500;

let yearOptions = [];
let yearOptionsJSON = [
	{
		"label": "ALL YEARS",
		"value": ''
	},
	{
	"label": "2015",
	"value": "2015"
	},
	{
	"label": "2016",
	"value": "2016"
	},
	{
	"label": "2017",
	"value": "2017"
	},
	{
	"label": "2018",
	"value": "2018"
	},
	{
	"label": "2019",
	"value": "2019"
	},
	{
	"label": "2020",
	"value": "2020"
	}
]
var yearOptionsArray = ["2015","2016","2017","2018","2019","2020"]
let positionOptionsJSON = [
	{
		"label": "ALL POSITIONS",
		"value": ''
	},
	{
		"label": "Policymakers",
		"value": "Policymakers"
	},
	{
		"label": "Civil Servants",
		"value": "Civil Servants"
	}
]
//let positionOptions = [];
let positionOptionsArray = ["Policymakers","Civil Servants"]
let topicOptionsArray = ["Budget", "Climate Change", "Communications", "COVID-19", "Demographics", "Elections and Campaigns", "Electoral Ambition", "Environmental Policy", "Federal Spending", "Fracking", "GMOs", "Governance and Democracy", "Gun Reform", "Immigrants", "Innovation", "Legacy", "Marijuana", "Media", "Medicaid", "Military and Law Enforcement", "National Politics", "Needle Exchanges", "Pressing Issue", "Professional Experience", "Redistricting", "Refugee Resettlement", "Rent Control", "Role of Experts", "Taxes", "Unemployment"]
let  topicOptionsJSON = [
	{
		"label": "ALL TOPICS",
		"value": ''
	},
	{
	"label": "Budget",
	"value": "Budget"
	},
	{
	"label": "Climate Change",
	"value": "Climate Change"
	},
	{
	"label": "Communications",
	"value": "Communications"
	},
	{
	"label": "COVID-19",
	"value": "COVID-19"
	},
	{
	"label": "Demographics",
	"value": "Demographics"
	},
	{
	"label": "Elections and Campaigns",
	"value": "Elections and Campaigns"
	},
	{
	"label": "Electoral Ambition",
	"value": "Electoral Ambition"
	},
	{
	"label": "Environmental Policy",
	"value": "Environmental Policy"
	},
	{
	"label": "Federal Spending",
	"value": "Federal Spending"
	},
	{
	"label": "Fracking",
	"value": "Fracking"
	},
	{
	"label": "GMOs",
	"value": "GMOs"
	},
	{
	"label": "Governance and Democracy",
	"value": "Governance and Democracy"
	},
	{
	"label": "Gun Reform",
	"value": "Gun Reform"
	},
	{
	"label": "Immigrants",
	"value": "Immigrants"
	},
	{
	"label": "Innovation",
	"value": "Innovation"
	},
	{
	"label": "Legacy",
	"value": "Legacy"
	},
	{
	"label": "Marijuana",
	"value": "Marijuana"
	},
	{
	"label": "Media",
	"value": "Media"
	},
	{
	"label": "Medicaid",
	"value": "Medicaid"
	},
	{
	"label": "Military and Law Enforcement",
	"value": "Military and Law Enforcement"
	},
	{
	"label": "National Politics",
	"value": "National Politics"
	},
	{
	"label": "Needle Exchanges",
	"value": "Needle Exchanges"
	},
	{
	"label": "Pressing Issue",
	"value": "Pressing Issue"
	},
	{
	"label": "Professional Experience",
	"value": "Professional Experience"
	},
	{
	"label": "Redistricting",
	"value": "Redistricting"
	},
	{
	"label": "Refugee Resettlement",
	"value": "Refugee Resettlement"
	},
	{
	"label": "Rent Control",
	"value": "Rent Control"
	},
	{
	"label": "Role of Experts",
	"value": "Role of Experts"
	},
	{
	"label": "Taxes",
	"value": "Taxes"
	},
	{
	"label": "Unemployment",
	"value": "Unemployment"
	}
]

$w.onReady(function () {
	//TODO: write your page related code here...
	/*
    console.log("topicSelected =" + $w('#topicDropdown').value +
                "\npositionSelected =" + $w('#respondentType').value +
                "\nyearSelected =" +  $w('#yearDropdown').value)
*/
resetbutton_click()
	//tagSetterTopic ();

	//makeSelectAll($w('#topicDropdown'));
	//makeSelectAll($w('#respondentType'));
	//makeSelectAll($w('#yearDropdown'));

});

//::TAGGER::
const tagger = res => {
	console.log("tagger run" + String(res))
	return { value: String(res), label: String(res)}};
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
	var allObj = {"label": label, "value": ''};
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

	//if(position==="civilServant"){position= "Civil Servant"}
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

/*

function tagSetterPosition(){
    console.log("tagSetter")
    //clearArray($w('#respondentType').options)
        //console.log("cleared respondent array")
        //console.log(clearArray($w('#respondentType').options))
	positionOptionsArray.forEach((f)=>

	tagSetterCivil(f)

	)
    console.log("f")
	//makeSelectAll($w('#respondentType'))
    //tagSetterElected()//checks for elected in officialsAskedNew then adds the tag
    //tagSetterCivil()//checks for civil servant in officialsAskedNew then adds the tag
}



async function tagSetterCivil (){
	const topic = $w('#topicDropdown').value;
	const year = $w('#yearDropdown').value;
	//const position = $w('#respondentType').value;

	const res = await wixData.query('Taxonomy')
	.eq('topic', topic)
	.contains('date',$w('#yearDropdown').value)
	.contains("questionText", $w("#input1").value)
	//.hasSome('year', yearwords
	.distinct('officialsAskedNew')//this says the values
	.then((results) => {
		console.log(results.length)
		if(results.length>0){
			return results.items.map(tagger);
		}

		//old Splice Idea
		else{
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

        }
	}).catch((err)=> console.log(err));

	$w('#respondentType').options= res;
}
*/


async function tagSetterPosition () {
	console.log("async function tagSetterPosition ()")
	console.log("$w('#respondentType').value "+$w('#respondentType').value)
	console.log("$w('#topicDropdown').value "+$w('#topicDropdown').value)
	console.log("$w('#yearDropdown').value "+$w('#yearDropdown').value)
	
	const res = await wixData.query('Taxonomy')
	.contains('topic', $w('#topicDropdown').value)
	.contains('date', $w('#yearDropdown').value)
	.contains("questionText", $w("#input1").value)
	.ascending('officialsAskedNew')
	.distinct('officialsAskedNew')//this says we only want the values from officialsAskedNew (should give either policymaker or civil servant)
	.then((results) => {
		//possible error is here
		let options = [{"value":'',"label":"ALL POSITIONS"}];
		options.push(... results.items.map(tagger))
		$w('#respondentType').options = options;
		console.log(results.query)//adds new options to year
		}

)
	.catch((err)=> console.log(err));

	//$w('#respondentType').options = res;
	//makeSelectAll($w('#respondentType'))


}


async function tagSetterYear () {
	console.log("async function tagSetterYear ()")
	console.log("$w('#respondentType').value "+$w('#respondentType').value)
	console.log("$w('#topicDropdown').value "+$w('#topicDropdown').value)
	console.log("$w('#yearDropdown').value "+$w('#yearDropdown').value)
	
	const topic = $w('#topicDropdown').value;
	const position = $w('#respondentType').value;

	const years = [];
	//sets Query
	const res = await wixData.query('Taxonomy')
	.contains('topic', topic)
	.contains('officialsAskedNew', position)
	.contains("questionText", $w("#input1").value)
	.ascending('year')
	.distinct('year')//this says we only want the values from year
	.then((results) => {
		//possible error is here
		if(results.length>0){
			return results.items.map(tagger)//adds new options to year
		}

	})
	.catch((err)=> console.log(err));

	$w('#yearDropdown').options = res;
	makeSelectAll($w('#yearDropdown'))


}

/*if($w('#topicDropdown').selectedIndex === 0){
	resetButtonCall()
}*/

async function tagSetterTopic () {
	console.log("async function tagSetterTopic ()")
	console.log("$w('#respondentType').value "+$w('#respondentType').value)
	console.log("$w('#topicDropdown').value "+$w('#topicDropdown').value)
	console.log("$w('#yearDropdown').value "+$w('#yearDropdown').value)
	
	const year = $w('#yearDropdown').value;//could be a problem with StringType
	const position = $w('#respondentType').value;

	const topics = [];
	//sets Query
	const res = await wixData.query('Taxonomy')
	.contains('date', year)
	.contains('officialsAskedNew', position)
	.contains("questionText", $w("#input1").value)
	.ascending('topic')
	.distinct('topic')//this says we only want the values from year
	.then((results) => {
		//possible error is here
		if(results.length>0){
      console.log(results.query)
			return results.items.map(tagger)
			
			//adds new options to year
		}

	})
	//.catch((err)=> console.log(err));

	$w('#topicDropdown').options = res;
	makeSelectAll($w('#topicDropdown'))

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
console.log("$w('#respondentType').value "+$w('#respondentType').value)
	console.log("$w('#topicDropdown').value "+$w('#topicDropdown').value)
	console.log("$w('#yearDropdown').value "+$w('#yearDropdown').value)
	$w("#dataset1").setFilter( wixData.filter()
							  .contains("date", $w("#yearDropdown").value)
							  .contains("topic", $w("#topicDropdown").value)
							  .contains("officialsAskedNew", $w("#respondentType").value)
							  .contains("questionText", $w("#input1").value)
							 );

	tagSetterPosition()//error
	tagSetterYear()//error
	/*sortTopic($w('#respondentType'));
	sortTopic($w('#topicDropdown'));
	sortTopic($w('#yearDropdown'));*/

}

export function respondentType_change(event) {
	//tagSetterYear()//error
	console.log("respondentType_change(event)")
	console.log("$w('#respondentType').value "+$w('#respondentType').value)
	console.log("$w('#topicDropdown').value "+$w('#topicDropdown').value)
	console.log("$w('#yearDropdown').value "+$w('#yearDropdown').value)
	$w("#dataset1").setFilter( wixData.filter()
							  .contains("date", $w("#yearDropdown").value)
							  .contains("topic", $w("#topicDropdown").value)
							  .eq("officialsAskedNew", $w("#respondentType").value)
							  .contains("questionText", $w("#input1").value)
							 );
	tagSetterYear()
	tagSetterTopic ()
	//tagSetterYear()
	/*sortTopic($w('#respondentType'));
	sortTopic($w('#topicDropdown'));
	sortTopic($w('#yearDropdown'));*/

}

export function yearDropdown_change(event) {
	console.log("yearDropdown_change(event)")
	console.log("$w('#respondentType').value "+$w('#respondentType').value)
	console.log("$w('#topicDropdown').value "+$w('#topicDropdown').value)
	console.log("$w('#yearDropdown').value "+$w('#yearDropdown').value)
	$w("#dataset1").setFilter( wixData.filter()
							  .contains("date", $w("#yearDropdown").value)
							  .contains("topic", $w("#topicDropdown").value)
							  .contains("officialsAskedNew", $w("#respondentType").value)
							  .contains("questionText", $w("#input1").value)
							 );
	tagSetterPosition();
	tagSetterTopic ();
	/*sortTopic($w('#respondentType'));
	sortTopic($w('#topicDropdown'));
	sortTopic($w('#yearDropdown'));*/
}




//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------

export function resetbutton_click(event) {

	//debounce(resetButtonCall, debounceTime);
  $w("#dataset1").setFilter( wixData.filter() )
	$w("#yearDropdown").selectedIndex = undefined
	$w("#topicDropdown").selectedIndex = undefined
	$w("#respondentType").selectedIndex = undefined
	$w("#input1").value = ""
	$w('#yearDropdown').options = yearOptionsJSON;
	$w('#respondentType').options = positionOptionsJSON;
	$w('#topicDropdown').options = topicOptionsJSON;
}
function resetButtonCall () {
	$w("#dataset1").setFilter( wixData.filter() );
}


let debounceTimer;
export function input1_change(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 

	if(debounceTimer){
		clearTimeout(debounceTimer);
		debounceTimer = undefined;
	}
	debounceTimer = setTimeout(()=>{
		$w("#dataset1").setFilter( wixData.filter()
								  .contains("questionText", $w("#input1").value)
								  .contains("date", $w("#yearDropdown").value)
								  .contains("topic", $w("#topicDropdown").value)
								  .contains("officialsAskedNew", $w("#respondentType").value)
								 )
	},500)

}





function sortTopic(dropdown){
	let temp = dropdown.options
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
	dropdown.options = temp
}