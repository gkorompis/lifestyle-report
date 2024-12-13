
const {fetchOneDictioTable} = require('./readFromDynamodb.js');
const updateDocument = require("./updateDocumentDynamodb.js");
const postNewCollection = require('./postToDynamodb.js')
const {transformLifestyleCollection, transformLifestyleCollectionIna, transformPgxCollectionIna} = require('./etl.js');
const {readExcelLifestyle, readExcelPgx} = require("./readExcel.js");

const axios = require('axios');

const getLatestEntry = async () =>{
    const {Item} = await fetchOneDictioTable('lifestyle-dictio', 'db1001', '1002').then((data)=>{
        console.log('data in data', data);
        return data;
    }).catch(err=>console.log(err))
    const {entry_latest_ina, entry_latest_eng} = Item;
    console.log('data in item', Item);
    console.log('data in ent_latest_eng', entry_latest_eng);
    console.log('data in ent_latest_ina', entry_latest_ina);
    return Item;
};
const getDataFromExternal = async (gsi_id)=>{
    const CONNECTION_URL = `http://iconnect.indushealthplus.com/IndusBuddyProject/GetGeneticsReportAllDataForGSI?barcode_id=GSI${gsi_id}`
    const {data} = await axios.get(CONNECTION_URL);
    console.log(Object.keys(data.result.data.Health[0]));
    console.log(Object.keys(data.result.data.Nutrition[0]));
    let {Health, Nutrition, Fitness, Habbit} = data.result.data;
    
    const transformedCollectionHealth = transformLifestyleCollection("Health", Health);
    const transformedCollectionNutrition = transformLifestyleCollection("Nutrition", Nutrition);
    const transformedCollectionFitness = transformLifestyleCollection("Fitness", Fitness);
    const transformedCollectionHabbit = transformLifestyleCollection("Habbit", Habbit);

    const transformedCollections = {
        Health: transformedCollectionHealth,
        Nutrition: transformedCollectionNutrition,
        Fitness: transformedCollectionFitness,
        Habbit: transformedCollectionHabbit,
    }
    return transformedCollections;
};
const getDataLifestyleFromLocal = (local_dir)=>{
    let local_path = local_dir;
    let Health, Nutrition, Fitness, Habbit;
    Health = readExcelLifestyle('Health', `./${local_path}/LifestyleDictionary.xlsx`);
    Nutrition = readExcelLifestyle('Nutrition', `./${local_path}/LifestyleDictionary.xlsx`);
    Fitness = readExcelLifestyle('Fitness', `./${local_path}/LifestyleDictionary.xlsx`);
    Habbit = readExcelLifestyle('Habbit', `./${local_path}/LifestyleDictionary.xlsx`);

    const transformedCollectionHealth = transformLifestyleCollectionIna("Health", Health);
    const transformedCollectionNutrition = transformLifestyleCollectionIna("Nutrition", Nutrition);
    const transformedCollectionFitness = transformLifestyleCollectionIna("Fitness", Fitness);
    const transformedCollectionHabbit = transformLifestyleCollectionIna("Habbit", Habbit);

    // console.log('power..', transformedCollectionFitness[0]);
    // console.log('power-..', transformedCollectionFitness.filter(x=>x["Trait"]) )
    const transformedCollections = {
        Health: transformedCollectionHealth,
        Nutrition: transformedCollectionNutrition,
        Fitness: transformedCollectionFitness,
        Habbit: transformedCollectionHabbit,
    }
    return transformedCollections;
};
const getDataPgxFromLocal = (local_dir)=>{
    console.log('reading from local path/PgxDictionary.xlsx ')
    let local_path = local_dir;
    let PGX_ID;
    console.log('reading excel local');
    PGX_ID = readExcelPgx('PGX_ID', `./${local_path}/PgxDictionary.xlsx`);
    // console.log(PGX_ID);
    
    // Nutrition = readExcelLifestyle('Nutrition', `./${local_path}/PgxDictionary.xlsx`);
    // Fitness = readExcelLifestyle('Fitness', `./${local_path}/PgxDictionary.xlsx`);
    // Habbit = readExcelLifestyle('Habbit', `./${local_path}/PgxDictionary.xlsx`);
    console.log('transforming dictio');
    const transformedCollectionPgxIna = transformPgxCollectionIna("PGX_ID", PGX_ID);
    // const transformedCollectionNutrition = transformLifestyleCollectionIna("Nutrition", Nutrition);
    // const transformedCollectionFitness = transformLifestyleCollectionIna("Fitness", Fitness);
    // const transformedCollectionHabbit = transformLifestyleCollectionIna("Habbit", Habbit);

    // console.log('power..', transformedCollectionFitness[0]);
    // console.log('power-..', transformedCollectionFitness.filter(x=>x["Trait"]) )
    console.log('storing transformed collections');
    const transformedCollections = {
        "PGX_ID": transformedCollectionPgxIna
    }
    return transformedCollections;
};
const getDataPgxFromLocalEn = (local_dir)=>{
    console.log('reading from local path/PgxDictionary.xlsx ')
    let local_path = local_dir;
    let PGX_ENG;
    console.log('reading excel local');
    PGX_ENG = readExcelPgx('PGX_ENG', `./${local_path}/PgxDictionary.xlsx`);
    // console.log(PGX_ID);
    
    // Nutrition = readExcelLifestyle('Nutrition', `./${local_path}/PgxDictionary.xlsx`);
    // Fitness = readExcelLifestyle('Fitness', `./${local_path}/PgxDictionary.xlsx`);
    // Habbit = readExcelLifestyle('Habbit', `./${local_path}/PgxDictionary.xlsx`);
    console.log('transforming dictio');
    const transformedCollectionPgxEng = transformPgxCollectionIna("PGX_ENG", PGX_ENG);
    // const transformedCollectionNutrition = transformLifestyleCollectionIna("Nutrition", Nutrition);
    // const transformedCollectionFiess = transformLifestyleCollectionIna("Fitness", Fitness);
    // const transformedCollectionHabbit = transformLifestyleCollectionIna("Habbit", Habbit);

    // console.log('power..', transformedCollectionFitness[0]);
    // console.log('power-..', transformedCollectionFitness.filter(x=>x["Trait"]) )
    console.log('storing transformed collections');
    const transformedCollections = {
        "PGX_ENG": transformedCollectionPgxEng
    }
    return transformedCollections;
};
const getDataFromLocalEn = (local_dir)=>{
    let local_path = local_dir;
    let Health, Nutrition, Fitness, Habbit;
    Health = readExcelLifestyle('Health_en', `./${local_path}/LifestyleDictionary.xlsx`);
    Nutrition = readExcelLifestyle('Nutrition_en', `./${local_path}/LifestyleDictionary.xlsx`);
    Fitness = readExcelLifestyle('Fitness_en', `./${local_path}/LifestyleDictionary.xlsx`);
    Habbit = readExcelLifestyle('Habbit_en', `./${local_path}/LifestyleDictionary.xlsx`);

    const transformedCollectionHealth = transformLifestyleCollectionIna("Health", Health);
    const transformedCollectionNutrition = transformLifestyleCollectionIna("Nutrition", Nutrition);
    const transformedCollectionFitness = transformLifestyleCollectionIna("Fitness", Fitness);
    const transformedCollectionHabbit = transformLifestyleCollectionIna("Habbit", Habbit);

    // console.log('power..', transformedCollectionFitness[0]);
    // console.log('power-..', transformedCollectionFitness.filter(x=>x["Trait"]) )
    const transformedCollections = {
        Health: transformedCollectionHealth,
        Nutrition: transformedCollectionNutrition,
        Fitness: transformedCollectionFitness,
        Habbit: transformedCollectionHabbit,
    }
    return transformedCollections;
};

const restartLifestyleEng = async ()=>{
    const waited = await getLatestEntry().then(async ({entry_latest, entry_latest_eng})=>{
    console.log('entry_latest is', entry_latest_eng)
    console.log('adding entry_latest by 1 =', +entry_latest_eng + 1);
    let entry_latest_plus_one = +entry_latest + 1;
    let entry_latest_eng_plus_one = +entry_latest_eng + 1;
    console.log('entry latest plus one  =', entry_latest_plus_one);
    console.log('posting new collection')
    const results_eng = await getDataFromExternal(1006);
    // const results_ina = getDataFromLocal('local_data');
    postNewCollection('lifestyle-dictionary', {
        lifestyle_results_eng: results_eng,
        entry_id: `db${entry_latest_plus_one}`,
        entry_latest: entry_latest_plus_one,
        entry_latest_eng: entry_latest_eng_plus_one,
    });
    console.log('updating entry_latest id into:', entry_latest_plus_one)
    updateDocument(
        'lifestyle-dictionary', 
        {'entry_id': 'db1001'}, 
        'set entry_latest = :entry_now, entry_latest_eng = :entry_now_eng',
        {":entry_now": entry_latest_plus_one, ":entry_now_eng": entry_latest_eng_plus_one}
    );
});
};
const restartLifestyleIna = async ()=>{
    const waited = await getLatestEntry().then(async ({entry_latest, entry_latest_ina})=>{
    console.log('entry_latest is', entry_latest_ina)
    console.log('adding entry_latest by 1 =', +entry_latest_ina + 1);
    let entry_latest_plus_one = +entry_latest + 1;
    let entry_latest_ina_plus_one = +entry_latest_ina + 1;
    console.log('entry latest plus one  =', entry_latest_plus_one);
    console.log('posting new collection')
    // const results_ina = await getDataFromExternal(1006);
    const results_ina = getDataLifestyleFromLocal('local_data');
    postNewCollection('lifestyle-dictionary', {
        lifestyle_results_ina: results_ina,
        entry_id: `db${entry_latest_plus_one}`,
        entry_latest: entry_latest_plus_one,
        entry_latest_ina: entry_latest_ina_plus_one,
    });
    console.log('updating entry_latest id into:', entry_latest_plus_one)
    updateDocument(
        'lifestyle-dictionary', 
        {'entry_id': 'db1001'}, 
        'set entry_latest = :entry_now, entry_latest_ina = :entry_now_ina',
        {":entry_now": entry_latest_plus_one, ":entry_now_ina": entry_latest_ina_plus_one}
    );
});
};

const restartPgxIna = async ()=>{
    const waited = await getLatestEntry().then(async ({entry_latest, entry_latest_ina})=>{
    console.log('entry_latest is', entry_latest_ina)
    console.log('adding entry_latest by 1 =', +entry_latest_ina + 1);
    let entry_latest_plus_one = +entry_latest + 1;
    let entry_latest_ina_plus_one = +entry_latest_ina + 1;
    console.log('entry latest plus one  =', entry_latest_plus_one);
    console.log('posting new collection')
    // const results_ina = await getDataFromExternal(1006);
    const results_ina = getDataLifestyleFromLocal('local_data');
    postNewCollection('pgx-dictionary', {
        pgx_results_ina: results_ina,
        entry_id: `db${entry_latest_plus_one}`,
        entry_latest: entry_latest_plus_one,
        entry_latest_ina: entry_latest_ina_plus_one,
    });
    console.log('updating entry_latest id into:', entry_latest_plus_one)
    updateDocument(
        'pgx-dictionary', 
        {'entry_id': 'db1001'}, 
        'set entry_latest = :entry_now, entry_latest_ina = :entry_now_ina',
        {":entry_now": entry_latest_plus_one, ":entry_now_ina": entry_latest_ina_plus_one}
    );
});
};

const updateDictioEng= async (id)=>{
    const dictio_eng = await getDataFromLocalEn('local_data');
    const collection_name = 'lifestyle-dictio';
    const {Item} = await fetchOneDictioTable("lifestyle-dictio", "db1001", "1001");
    const key ={"entry_id": "db1001", "version": "1001"};
    const snapshot_item = Item.entry_latest;
    const update_expression = 'set lifestyle_result_eng = :dictio_eng, entry_latest = :snapshot_id';
    const expression_attr = {":dictio_eng": dictio_eng || [], ":snapshot_id": snapshot_item};
    updateDocument(collection_name, key, update_expression, expression_attr);
}
const updateDictioIna= async ()=>{
    const dictio_ina = await getDataLifestyleFromLocal('local_data') ;
    if(dictio_ina){
        const collection_name = 'lifestyle-dictio';
    const {Item} = await fetchOneDictioTable("lifestyle-dictio", "db1001", "1001");
    const key ={"entry_id": "db1001", "version": "1002"};
    const snapshot_item = Item.entry_latest;
    const update_expression = 'set lifestyle_result_ina = :dictio_ina, entry_latest = :snapshot_id';
    const expression_attr = {":dictio_ina": dictio_ina || [], ":snapshot_id": snapshot_item};
    updateDocument(collection_name, key, update_expression, expression_attr);
    } else {
        console.log('dictio is undefined');
    }
};
const updateDictioPgxIna= async ()=>{
    console.log('updating table pgx-diction, column pgx_result_ina');

    const dictio_ina = await getDataPgxFromLocal('local_data') ;
    if(dictio_ina){
        const collection_name = 'pgx-dictio';
    const {Item} = await fetchOneDictioTable("pgx-dictio", "db1001", "1002");
    const key ={"entry_id": "db1001", "version": "1002"};
    const snapshot_item = Item.entry_latest;
    const update_expression = 'set pgx_result_ina = :dictio_ina, entry_latest = :snapshot_id';
    const expression_attr = {":dictio_ina": dictio_ina || [], ":snapshot_id": snapshot_item};
    updateDocument(collection_name, key, update_expression, expression_attr);
    } else {
        console.log('dictio is undefined');
    }
};
const updateDictioPgxEng= async ()=>{
    console.log('updating table pgx-diction, column pgx_result_eng');

    const dictio_eng = await getDataPgxFromLocalEn('local_data') ;
    if(dictio_eng){
        const collection_name = 'pgx-dictio';
    const {Item} = await fetchOneDictioTable("pgx-dictio", "db1001", "1001");
    const key ={"entry_id": "db1001", "version": "1001"};
    const snapshot_item = Item.entry_latest;
    const update_expression = 'set pgx_result_eng = :dictio_eng, entry_latest = :snapshot_id';
    const expression_attr = {":dictio_eng": dictio_eng || [], ":snapshot_id": snapshot_item};
    updateDocument(collection_name, key, update_expression, expression_attr);
    } else {
        console.log('dictio is undefined');
    }
};
module.exports = {
    restartLifestyleEng,
    restartLifestyleIna,
    restartPgxIna,
    getDataFromExternal,
    getDataLifestyleFromLocal,
    updateDictioEng,
    updateDictioIna,
    updateDictioPgxIna,
    updateDictioPgxEng

}

// updateDictioPgxIna();