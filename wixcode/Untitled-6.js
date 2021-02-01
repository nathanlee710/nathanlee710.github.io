// For full API documentation, including code examples, visit https://wix.to/94BuAAs

import wixData from 'wix-data';
import { debounce } from 'lodash';

const collectionName = 'Taxonomy';
const debounceTime = 500;

let yearOptions = [];
let startYearOptions = $w('#yearDropdown').options
let startPositionOptions = [
  {
    "label": "ALL POSITIONS",
    "value": ''
  },
  {
    "label": "Policymaker",
    "value": "Policymaker"
  },
  {
    "label": "Civil Servant",
    "value": "Civil Servant"
  }
]
//let positionOptions = [];
//let legacyPositionOptions = ["Policymaker","Civil Servant"]
var legacyYearOptions = ["2015","2016","2017","2018","2019","2020"]
let topicOptionsArray = ["Budget", "Climate Change", "Communications", "COVID-19", "Demographics", "Elections and Campaigns", "Electoral Ambition", "Environmental Policy", "Federal Spending", "Fracking", "GMOs", "Governance and Democracy", "Gun Reform", "Immigrants", "Innovation", "Legacy", "Marijuana", "Media", "Medicaid", "Military and Law Enforcement", "National Politics", "Needle Exchanges", "Pressing Issue", "Professional Experience", "Redistricting", "Refugee Resettlement", "Rent Control", "Role of Experts", "Taxes", "Unemployment"]
let  topicOptionsJSON = [
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
    /*console.log("topicSelected =" + $w('#topicDropdown').value +
                "\npositionSelected =" + $w('#respondentType').value +
                "\nyearSelected =" +  $w('#yearDropdown').value)
*/
    //tagSetterTopic ();



    makeSelectAll($w('#topicDropdown'));
    makeSelectAll($w('#respondentType'));
	makeSelectAll($w('#yearDropdown'));

});

//::TAGGER::
const tagger = res => { return { value: String(res), label: String(res)}};
//::TAGGER ABOVE::



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
	legacyPositionOptions.forEach((f)=>
    
	tagSetterCivil(f)
    
	)
    console.log("f")
	//makeSelectAll($w('#respondentType'))
    //tagSetterElected()//checks for elected in officialsAsked then adds the tag
    //tagSetterCivil()//checks for civil servant in officialsAsked then adds the tag
}*/



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
	//$w('#respondentType').options = [];
	$w('#respondentType').options= res;
}


/*function changeArray (parameter) {
	let tempArray = parameter;
	tempArray = [];
	parameter = tempArray;
}*/
async function tagSetterNew () {
        const topic = $w('#topicDropdown').value;
        const year = $w('#yearDropdown').value;

		const positions = [];
		//sets Query
        const res = await wixData.query('Taxonomy')
      	.eq('topic', topic)
      	.contains('date', year)
          .contains("questionText", $w("#input1").value)
        .distinct('officialsAskedNew')//this says we only want the values from year
        .then((results) => {
//possible error is here
			if(results.length>0){
			return results.items.map(tagger)//adds new options to year
            }

        })
        .catch((err)=> console.log(err));

        $w('#respondentType').options = res;
		makeSelectAll($w('#respondentType'))


    }


async function tagSetterYear () {
        const topic = $w('#topicDropdown').value;
        const position = $w('#respondentType').value;

		const years = [];
		//sets Query
        const res = await wixData.query('Taxonomy')
      	.contains('topic', topic)
      	.contains('officialsAskedNew', position)
          .contains("questionText", $w("#input1").value)
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

    if($w('#topicDropdown').selectedIndex === 0){
        resetButtonCall()
    }

async function tagSetterTopic () {
        const year = $w('#yearDropdown').value;
        const position = $w('#respondentType').value;

		const topics = [];
		//sets Query
        const res = await wixData.query('Taxonomy')
      	.contains('date', year)
        .contains('officialsAskedNew', position)
        .contains("questionText", $w("#input1").value)
      	.distinct('topic')//this says we only want the values from year
        .then((results) => {
//possible error is here
			if(results.length>0){
			return results.items.map(tagger)//adds new options to year
            }

        })
        //.catch((err)=> console.log(err));

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
            .contains("questionText", $w("#input1").value)
            );

	tagSetterNew()//error
	tagSetterYear()//error
	sortTopic();
            
}

export function respondentType_change(event) {
    //tagSetterYear()//error
	
	console.log($w('#respondentType').value)
    $w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAskedNew", $w("#respondentType").value)
        .contains("questionText", $w("#input1").value)
        );
    tagSetterYear()
    tagSetterTopic ()
	//tagSetterYear()
    sortTopic();

}

export function yearDropdown_change(event) {
    
$w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAskedNew", $w("#respondentType").value)
        .contains("questionText", $w("#input1").value)
        );
        tagSetterNew()
        tagSetterTopic ()
    
        sortTopic();
}




//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------

export function resetbutton_click(event) {

debounce(resetButtonCall, debounceTime);
}
function resetButtonCall () {
$w("#dataset1").setFilter( wixData.filter() );
$w("#yearDropdown").selectedIndex = undefined
$w("#topicDropdown").selectedIndex = undefined
$w("#respondentType").selectedIndex = undefined
$w("#input1").value = ""
}
$w('#yearDropdown').options = startYearOptions;
$w('#respondentType').options = startPositionOptions;
$w('#topicDropdown').options = topicOptionsJSON;
makeSelectAll($w('#topicDropdown'));
makeSelectAll($w('#respondentType'));
makeSelectAll($w('#yearDropdown'));



export async function input1_change(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    await debounce(input1ChangeHelper,debounceTime)

}
async function input1ChangeHelper () {
    $w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAskedNew", $w("#respondentType").value)
        .contains("questionText", $w("#input1").value)
        )
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