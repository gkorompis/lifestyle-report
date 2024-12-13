// const transformLifestyleCollection = require('./etl.js');

const readExcelLifestyle=(sheet_name, local_path, eng)=>{
let panel_name = "";
if(eng){
    panel_name = sheet_name.substr(0, (+sheet_name.length-3))
} else {
    panel_name = sheet_name || 'Sheet2';
}

const filepath =local_path || './local_data/LifestyleDictionary.xlsx';
const xlsx = require('xlsx');
const wb = xlsx.readFile(filepath);
const sheet = wb.Sheets[panel_name];
console.log('>>> sheet', sheet);
const ref = sheet['!ref'].split(':');
const list_cellname = Object.keys(sheet);
const list_cellname_df = list_cellname.slice(1, list_cellname.length); 

const alphabetIndex=(alp)=>{
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const index = alphabet.indexOf(alp.toLowerCase());
    return +index + 1;
};

const column_count = alphabetIndex(ref[1][0]);
const dict_column_name = {};
const temp_obj = {};
temp_obj[panel_name] = [];

// iterate for each cells
for(let i in list_cellname_df){
    let x = list_cellname_df[i];
    let cell_payload = sheet[x]['v'];
    let temp_doc = {};
    if(i < column_count){
        dict_column_name[x[0]] = cell_payload;
        //filler
        temp_obj[panel_name][0] = {...temp_obj[panel_name][0]};
        temp_obj[panel_name][1] = {...temp_obj[panel_name][1]};
    } else {
        // assign array_nth to temp object
        let row_index = +x.slice(1, x.length);
        let column_name = dict_column_name[x[0]];
        temp_obj[panel_name][row_index] = {...temp_obj[panel_name][row_index]};
        temp_doc[column_name] = cell_payload;
        temp_obj[panel_name][row_index] = {...temp_obj[panel_name][row_index], ...temp_doc};
    };
}
const panel = temp_obj[panel_name].slice(2, temp_obj[panel_name].length)
// console.log(panel) 
return panel;
// console.log(panel.length, 'of document are inserted');
};

const readExcelPgx=(sheet_name, local_path, eng)=>{
let panel_name = "";
if(eng){
    panel_name = sheet_name.substr(0, (+sheet_name.length-3))
} else {
    panel_name = sheet_name || 'Sheet2';
}

const filepath =local_path || './local_data/LifestyleDictionary.xlsx';
const xlsx = require('xlsx');
const wb = xlsx.readFile(filepath);
const sheet = wb.Sheets[panel_name];
const ref = sheet['!ref'].split(':');
const list_cellname = Object.keys(sheet);
const list_cellname_df = list_cellname.slice(1, list_cellname.length-1); 

const alphabetIndex=(alp)=>{
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const index = alphabet.indexOf(alp.toLowerCase());
    return +index + 1;
};

const column_count = 46; 
const dict_column_name = {};
const temp_obj = {};
temp_obj[panel_name] = [];

// iterate for each cells
for(let i in list_cellname_df){
    let x = list_cellname_df[i];
    let cell_payload = sheet[x]['v'];
    let temp_doc = {};
    if(i < column_count){
        let alphabets = +x[1] ? x[0] : x[0]+x[1];
        dict_column_name[alphabets] = cell_payload;
        // console.log(cell_payload, alphabets)
        //filler
        temp_obj[panel_name][0] = {...temp_obj[panel_name][0]};
        temp_obj[panel_name][1] = {...temp_obj[panel_name][1]};
    } else {
        // assign array_nth to temp object
        let row_index = +x[1] ? +x.slice(1, x.length) : +x.slice(2, x.length); 
       
        let alphabets = +x[1] ? x[0] : x[0]+x[1];
        let column_name = dict_column_name[alphabets];
        // console.log('row_index----', row_index, column_name, x, x[0], i, list_cellname_df[list_cellname_df.length-1]);
        temp_obj[panel_name][row_index] = {...temp_obj[panel_name][row_index]};
        temp_doc[column_name] = cell_payload;
        temp_obj[panel_name][row_index] = {...temp_obj[panel_name][row_index], ...temp_doc};
    };
}
// console.log('temp-obj-------', temp_obj[panel_name][2])
const panel = temp_obj[panel_name].slice(2, temp_obj[panel_name].length)
// console.log(panel) 
return panel;
// console.log(panel.length, 'of document are inserted');
};

// let Health = readExcelLifestyle();
// let transformedHealth = transformLifestyleCollection('Health', Health);
// console.log(transformedHealth[0]);
module.exports = {
    readExcelLifestyle,
    readExcelPgx
};

