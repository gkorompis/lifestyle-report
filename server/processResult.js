const axios = require('axios');
const {fetchOneResultTable, fetchOneDictioTable} = require('./readFromDynamodb.js');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const transcribeResultDictioToIndus = (panel_result, panel_name, dictio)=>{
    const transformed_panel_result = []
    for (let i in panel_result){
        let document = panel_result[i];
        let temp_doc = [];
        let dictio_doc = ""
        let do_not_action = "";
        let do_action = "";
        let RECOMMENDATION_HIGH_RISK = "";
        let MEANING_OF_HIGH = "";
        let POSSIBLE_OUTCOME = "";
        let possible_outcome = "";
        const {risk_category, RISK_CATEGORY, phenotype, PHENOTYPE, TRAIT, Trait, your_risk} = document;
        
        if(panel_name == 'Health'){
            
            dictio_doc = dictio["Health"].filter(x => x["phenotype"] == phenotype)[0];
            do_not_action = dictio_doc["do_not_action"][risk_category] || "risk category is not applicable";
            do_action = dictio_doc["do_action"][risk_category] || "risk category is not applicable";
            possible_outcome = dictio_doc["possible_outcome"][risk_category] || "risk category is not applicable";
            temp_doc = {...dictio_doc, do_action, do_not_action, risk_category, possible_outcome, your_risk};
            // console.log(phenotype == "Prostate Cancer")
            // if(phenotype == "Prostate Cancer"){
            //     do_not_action = dictio_doc["do_not_action"][risk_category];
            // do_action = dictio_doc["do_action"][risk_category] + "-- risk cat" + risk_category;
            // console.log(document)
            // console.log(dictio_doc, "dictio_doc","----------", temp_doc, "temp-doc" )
            // }
        }else if(panel_name=='Nutrition'){
            // console.log(phenotype)
            
            dictio_doc = dictio[panel_name].filter(x => x["PHENOTYPE"] == PHENOTYPE)[0];
            
            // console.log('testest')
            // console.log(panel_name, Object.keys(dictio[panel_name][0]), PHENOTYPE);
            // console.log(PHENOTYPE, Object.keys(dictio_doc),panel_name);
            // if(PHENOTYPE == 'Sensitivities and Intolerances'){
            //     console.log(document, "<----Sensitivities and Intolerances")
            // }
            let nutri_risk = RISK_CATEGORY || "others"
            RECOMMENDATION_HIGH_RISK = dictio_doc["RECOMMENDATION_HIGH_RISK"][nutri_risk.toLowerCase()] || "risk category is not applicable";
            MEANING_OF_HIGH = dictio_doc["MEANING_OF_HIGH"][nutri_risk.toLowerCase()] || "risk category is not applicable";
            POSSIBLE_OUTCOME = dictio_doc["POSSIBLE_OUTCOME"][nutri_risk.toLowerCase()] || "risk category is not applicable";
            temp_doc = {...dictio_doc, RECOMMENDATION_HIGH_RISK, RISK_CATEGORY, MEANING_OF_HIGH, POSSIBLE_OUTCOME};
            // if(PHENOTYPE=="Response to Green Tea"){console.log("-----Response to Green Tea:", RISK_CATEGORY, dictio_doc, temp_doc)};
        } else {
            dictio_doc = dictio[panel_name].filter(x => x["PHENOTYPE"] == TRAIT)[0];
            let risk_category_trait = RISK_CATEGORY || "other";
            RECOMMENDATION_HIGH_RISK = dictio_doc["RECOMMENDATION_HIGH_RISK"][risk_category_trait.toLowerCase()] || "-";
            MEANING_OF_HIGH = dictio_doc["MEANING_OF_HIGH"][risk_category_trait.toLowerCase()] || "risk category is not applicable";
            POSSIBLE_OUTCOME = dictio_doc["POSSIBLE_OUTCOME"][risk_category_trait.toLowerCase()] || "risk category is not applicable";
            temp_doc = {...dictio_doc, RECOMMENDATION_HIGH_RISK, RISK_CATEGORY, MEANING_OF_HIGH, POSSIBLE_OUTCOME};
             if(TRAIT=="Power"){console.log("-----POWER Trait:", RISK_CATEGORY, "TRAIT:",TRAIT, temp_doc, "---dictio", dictio_doc)};
            // do_action = dictio_doc['do_action']["High"];
        }
        transformed_panel_result.push(temp_doc);
    };
    return transformed_panel_result;
};
const transcribeResultDictioToIndusPgx = (panel_result, panel_name, dictio)=>{
    const transformed_panel_result = []
    for (let i in panel_result){
        let document = panel_result[i];
        let temp_doc = [];
        let dictio_filter = ""
        let do_not_action = "";
        let do_action = "";
        // let DRUG_RESPONSE_INSERT, RECOMMENDATION_INSERT, RECOMMENDATIONS_INSERT, CLINICAL_EFFECT_INSERT, WHAT_DOES_YOUR_RESULT_MEAN_INSERT;
        let MEANING_OF_HIGH = "";
        let POSSIBLE_OUTCOME = "";
        let possible_outcome = "";
        let {PHENOTYPE, DRUG_RESPONSE, RECOMMENDATION, RECOMMENDATIONS, CLINICAL_EFFECT, WHAT_DOES_YOUR_RESULT_MEAN, CATOGERY, DRUG_NAME, GENE} = document;
        const phenotype_name = `${CATOGERY}_${DRUG_NAME}_${GENE}`;
        if(panel_name == 'PGX_ID'){
            dictio_filter = dictio[panel_name].filter(x => x["phenotype_name"] == phenotype_name)[0];
            // console.log("dictio_filter----", dictio_filter, dictio[panel_name][0])
            if(dictio_filter){
                // console.log('01true')
                // console.log('dictio_filter------', dictio[panel_name][0]["phenotype_name"],dictio[panel_name][0]["phenotype_name"][PHENOTYPE], PHENOTYPE,phenotype_name);
                let risk_category_trait = PHENOTYPE || "other";
                PHENOTYPE= dictio_filter["PHENOTYPE"][risk_category_trait] || "-";
                DRUG_RESPONSE= dictio_filter["DRUG_RESPONSE"][risk_category_trait] || "-";
                RECOMMENDATION= dictio_filter["RECOMMENDATION"][risk_category_trait] || "-";
                RECOMMENDATIONS= dictio_filter["RECOMMENDATIONS"][risk_category_trait] || "-";
                CLINICAL_EFFECT= dictio_filter["CLINICAL_EFFECT"][risk_category_trait] || "-";
                WHAT_DOES_YOUR_RESULT_MEAN= dictio_filter["WHAT_DOES_YOUR_RESULT_MEAN"][risk_category_trait] || "-";
                temp_doc = {...dictio_filter, DRUG_RESPONSE,RECOMMENDATION, RECOMMENDATIONS, CLINICAL_EFFECT, WHAT_DOES_YOUR_RESULT_MEAN, CATOGERY, DRUG_NAME, GENE, PHENOTYPE};
            } else {
                // console.log('01false')
                let translation = "TRUE"
                temp_doc = {...document, translation};
            }
            

        } else {
            console.log(`panel_name ${panel_name} is not recognized`)
            // do_action = dictio_doc['do_action']["High"];
        }
        transformed_panel_result.push(temp_doc);
    };
    return transformed_panel_result;
};
const processResult= async (id, version)=>{
    const CONNECTION_URL_2 = `https://iconnect.indushealthplus.com/IndusBuddyProject/GetGeneticsReportAllDataForGSI?barcode_id=${id}`
    const CONNECTION_URL = `http://iconnect.indushealthplus.com/IndusBuddyProject/GetGeneticsReportAllDataForGSI?barcode_id=${id}`;
    const VERSION_DDB = 'db1'
    const DATABASE_ENDPOINT = `http://localhost:5000/lifestyle-`
    //1. get result from indus api
    console.log("axios fetching...")
    const indus = await axios.get(CONNECTION_URL_2)
    // console.log("fetching...")
    // const indus = await fetch(CONNECTION_URL_2)
    console.log('indus----');
    const result = indus.data.result.data;
    // const dictio = indus.result.data;
    //2. get insert dictio based on result api
    //get diction_en
    const version_db = version || '1002';
    console.log('fetching one dictio table en');
    const dictio_en = await fetchOneDictioTable('lifestyle-dictio', 'db1001', version_db);
    // console.log('diction_en', Object.keys(dictio_en.Item['lifestyle_result_eng']));
    if (version_db == '1001'){
        //3. append result to new result_insert
        const {lifestyle_result_eng, lifestyle_result_ina} = dictio_en.Item;
        const {Health, Nutrition, Habbit, Fitness } = result; 
        // const health_insert = transcribeResultDictioToIndus(Health, 'Health', lifestyle_result_eng);
        const Health_insert = transcribeResultDictioToIndus(Health, 'Health', lifestyle_result_eng);
        const Nutrition_insert = transcribeResultDictioToIndus(Nutrition, 'Nutrition', lifestyle_result_eng);
        const Fitness_insert = transcribeResultDictioToIndus(Fitness, 'Fitness', lifestyle_result_eng);
        const Habbit_insert = transcribeResultDictioToIndus(Habbit, 'Habbit', lifestyle_result_eng);
        console.log(Fitness_insert.filter(x => x["PHENOTYPE"]== "Power"), "insert power")
        const transformed_insert = {
            Health: Health_insert,
            Nutrition: Nutrition_insert,
            Fitness: Fitness_insert,
            Habbit: Habbit_insert
        }
        // const test_insert = health_insert.filter(x => x['do_action'=== '@@@not_found']);
        // console.log(Health_insert[1]);
        // console.log(Nutrition_insert.filter(x => x["PHENOTYPE"]=="Sweet Taste Preference"));
        // console.log('----------------------------------------------------------------')
        return transformed_insert;
    } else if (version_db == '1002'){
        const {lifestyle_result_eng, lifestyle_result_ina} = dictio_en.Item;
        const {Health, Nutrition, Habbit, Fitness } = result; 
        // const health_insert = transcribeResultDictioToIndus(Health, 'Health', lifestyle_result_eng);
        const Health_insert = transcribeResultDictioToIndus(Health, 'Health', lifestyle_result_ina);
        const Nutrition_insert = transcribeResultDictioToIndus(Nutrition, 'Nutrition', lifestyle_result_ina);
        const Fitness_insert = transcribeResultDictioToIndus(Fitness, 'Fitness', lifestyle_result_ina);
        const Habbit_insert = transcribeResultDictioToIndus(Habbit, 'Habbit', lifestyle_result_ina);
        console.log(Fitness_insert.filter(x => x["PHENOTYPE"]== "Power"), "insert power")
        const transformed_insert = {
            Health: Health_insert,
            Nutrition: Nutrition_insert,
            Fitness: Fitness_insert,
            Habbit: Habbit_insert
        }
        return transformed_insert;
        
    } else {
        console.log('dictio_en is undefined');
        return {};
    }
    //3. post 
};

const processResultPgx= async (id, version)=>{
    const CONNECTION_URL = `https://iconnect.indushealthplus.com/IndusBuddyProject/GetMednawiseDataForBarcodeGSI?barcode_id=${id}`;
    const VERSION_DDB = 'db1'
    const DATABASE_ENDPOINT = `http://localhost:5000/lifestyle-`
    //1. get result from indus api
    const indus = await axios.get(CONNECTION_URL);
    // console.log('indus--',Object.keys(indus.data.result.data));
    // console.log(indus)
    const result = indus.data.MEDALLDATA;
    // const dictio = indus.result.data;
    //2. get insert dictio based on result api
    //get diction_en
    const version_db = version || '1002';
    console.log('fetching one dictio table');
    const dictio_en = await fetchOneDictioTable('pgx-dictio', 'db1001', version_db);
    // console.log('diction_en', Object.keys(dictio_en.Item['lifestyle_result_eng']));
    if (version_db == '1001'){
        //3. append result to new result_insert
        transformed_insert = "test"
        return transformed_insert;
    } else if (version_db == '1002'){
        console.log('transcribe via database bahasa indonesia')
        const {lifestyle_result_eng, pgx_result_ina} = dictio_en.Item;
        const PGX_ID = result; 
        // const health_insert = transcribeResultDictioToIndus(Health, 'Health', lifestyle_result_eng);
        const PGX_ID_insert = transcribeResultDictioToIndusPgx(PGX_ID, 'PGX_ID', pgx_result_ina);
        // const Nutrition_insert = transcribeResultDictioToIndus(Nutrition, 'Nutrition', lifestyle_result_ina);
        // const Fitness_insert = transcribeResultDictioToIndus(Fitness, 'Fitness', lifestyle_result_ina);
        // const Habbit_insert = transcribeResultDictioToIndus(Habbit, 'Habbit', lifestyle_result_ina);
        // console.log(Fitness_insert.filter(x => x["PHENOTYPE"]== "Power"), "insert power")
        const transformed_insert = {
            PGX_ID: PGX_ID_insert
        }
        return transformed_insert;
        
    } else {
        console.log('dictio is undefined');
        return {};
    }
    //3. post 
};
// processResult(1006);
module.exports = {
    processResult,
    processResultPgx
}

