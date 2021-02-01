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

    makeSelectAll($w('#topicDropdown'));
    makeSelectAll($w('#respondentType'));
    makeSelectAll($w('#yearDropdown'));
    //$w('#respondentType').selectedIndex[0];
    
    //$w('#yearDropdown').selectedIndex[0];

});

//::TAGGER::
const tagger = res => { return { value: String(res), label: String(res)}};
//::TAGGER ABOVE::


//::SELECT ALL::
function makeSelectAll (dropdown) {
    //console.log("makeSelectAll ("+dropdown.id+")")

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
    console.log("Option for " + position + " made.")
        if(position==="civilServant"){position= "Civil Servant"}
        let value = position;
        var newPosition = {"label": String(position), "value": String(value)};
        return newPosition;
}
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        //console.log(list[i])
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

    legacyPositionOptions.forEach((position)=>
    tagSetterPositionFunction(position)
    )
   
}

 function tagSetterYear(){

    legacyYearOptions.forEach((year)=>
    tagSetterYearFunction(year)
    )
   
}

 function tagSetterTopic(){

    legacyTopicOptions.forEach((topic)=>
    tagSetterTopicFunction(topic.value)
    )
   
}

 function tagSetterTopicFunction (topic) {
    //const topic = $w('#topicDropdown').value;
    const year = $w('#yearDropdown').value;
    const position = $w('#respondentType').value;
    ////console.log(keywords)//to check 
    
    const res =  wixData.query(collectionName)
    .contains('topic', topic)
    .contains('date',year)
    //.hasSome('year', yearwords)
    .contains('officialsAsked', position)
    //.contains('officialsAsked', "Civil Servants")
    .distinct('topic')//this says the values
    .then((results) => {
        console.log(results.items)
        if(results.length>0){
            return makePositions(topic);
        }
    })
    //.catch((err)=> console.log(err));

    $w('#topicDropdown').options.push(res);
}

 function tagSetterPositionFunction (position) {
    const topic = $w('#topicDropdown').value; //take in the current topic
    const year = $w('#yearDropdown').value; // take in the selectedYear
   
    
    const res =  wixData.query(collectionName)
    .eq('topic', topic)
    .eq('year',year)
    //.hasSome('year', yearwords)
    .eq(position,true)
    //.contains('officialsAsked', "Civil Servants")
    .distinct(position)//this says the values
    .then((results) => {
        console.log("tagSetterPositionFunction("+position+") = " + results.items.length + "entries")
        
            return makePositions(position);
    
    })
    //.catch((err)=> console.log(err));

    $w('#respondentType').options.push(res);
}


function changeArray (parameter) {
    let tempArray = parameter;
    tempArray = [];
    parameter = tempArray;
}

 function tagSetterYearFunction (year) {
        const topic = $w('#topicDropdown').value;
        const position = $w('#respondentType').value;

        //sets Query
        const res =  wixData.query('Taxonomy')
        .contains('topic', topic)
        .contains('officialsAsked',position)
        .contains('date', year)
        .distinct('year')//this says we only want the values from year
        .then((results) => {    
            //console.log(results.items)
                    if(results.length>0){
                        results.items.map(tagger)
                        console.log("tagSetterYearFunction("+year+") = " + results.items.length + "entries")
                        return makePositions(year)//adds new options to year
                    }else{
                        return
                    }
        })
        //.catch((err)=> console.log(err));

        $w('#yearDropdown').options.push(res);

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

    let holder = positionOptions;*/
    //let positionOpts= [];
    
    $w("#dataset1").setFilter( wixData.filter()
            .contains("date", $w("#yearDropdown").value)
            .contains("topic", $w("#topicDropdown").value)
            .contains("officialsAsked", $w("#respondentType").value)
            );
    tagSetterPosition()//error
    tagSetterYear()//error
    //makeSelectAll($w('#respondentType'))
            
}

export function respondentType_change(event) {
    //tagSetterYear()//error
    //console.log($w('#respondentType').value)
    $w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAsked", $w("#respondentType").value)
        );
        tagSetterTopic()
        tagSetterYear()//error
}

export function yearDropdown_change(event) {
$w("#dataset1").setFilter( wixData.filter()
        .contains("date", $w("#yearDropdown").value)
        .contains("topic", $w("#topicDropdown").value)
        .contains("officialsAsked", $w("#respondentType").value)
        );
        tagSetterTopic()
        tagSetterPosition();
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
        .contains("officialsAsked", $w("#respondentType").value)
        //.contains("questionText", $w("#input1").value)
        );
    }
}


