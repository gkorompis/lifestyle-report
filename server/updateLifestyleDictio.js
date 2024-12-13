const { updateDictioIna, updateDictionEng } = require("./ddbUpdateLifestyleDictionary.js")
// const updateDocument = require("./updateDocumentDynamodb.js");
// const fetchOneByKey = require("./readFromDynamodb.js");

// const updateDictionEng= async (id)=>{
//     const dictio_eng = await getDataFromExternal(id) ;
//     const collection_name = 'lifestyle-dictio';
//     const {Item} = await fetchOneByKey("lifestyle-dictio", "db1001", "1001");
//     const key ={"entry_id": "db1001", "version": "1001"};
//     const snapshot_item = Item.entry_latest;
//     const update_expression = 'set lifestyle_result_eng = :dictio_eng, entry_latest = :snapshot_id'
//     const expression_attr = {":dictio_eng": dictio_eng || [], ":snapshot_id": snapshot_item};
//     updateDocument(collection_name, key, update_expression, expression_attr);
    
// };

// const updateDictioIna= async ()=>{
//     const dictio_ina = await getDataFromLocal('local_data') ;
//     if(dictio_ina){
//         const collection_name = 'lifestyle-dictio';
//     const {Item} = await fetchOneByKey("lifestyle-dictio", "db1001", "1001");
//     const key ={"entry_id": "db1001", "version": "1002"};
//     const snapshot_item = Item.entry_latest;
//     const update_expression = 'set lifestyle_result_ina = :dictio_ina, entry_latest = :snapshot_id';
//     const expression_attr = {":dictio_ina": dictio_ina || [], ":snapshot_id": snapshot_item};
//     updateDocument(collection_name, key, update_expression, expression_attr);
//     } else {
//         console.log('dictio is undefined');
//     }
// };

updateDictionEng('1007');
// updateDictioIna();


