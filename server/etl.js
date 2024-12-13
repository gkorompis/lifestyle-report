const nested_properties = ['do_action', 'do_not_action', 'RECOMMENDATION_HIGH_RISK', 'MEANING_OF_HIGH', 'POSSIBLE_OUTCOME', 'possible_outcome', 'RECOMMENDATIONS', 'RECOMMENDATION', 'DRUG_RESPONSE', ];
const nested_properties_pgx = ['RECOMMENDATION', 'RECOMMENDATIONS', 'PHENOTYPE', 'DRUG_RESPONSE', 'WHAT_DOES_YOUR_RESULT_MEAN', 'CLINICAL_EFFECT'];

const transformLifestyleCollection = (collection_name, collection_object) =>{
        let temp_collection = [];
        //iterate for each document
        for (let doc_index in collection_object){
            let temp_document = {};
            let each_docs = collection_object[doc_index];
            let risk_category;
            collection_name == "Health" ? risk_category = each_docs["risk_category"] : each_docs["RISK_CATEGORY"];
            let temp_document_props = Object.keys(each_docs);
            //iterate for each document properties
            for (let props_index in temp_document_props) {
                let props = temp_document_props[props_index];
                if (nested_properties.includes(props)){
                    temp_document[props] = {
                        High: risk_category == "High" ? each_docs[props] : "not_found" + props,
                        Typical: risk_category == "Typical" ? each_docs[props] : "not_found" + props,
                        Low: risk_category == "Low" ? each_docs[props] : "not_found"+ props,
                        Other: risk_category == !("High" || "Typical" || "Low") ? "-" : `${risk_category} is not found`
                    };
                } else {
                    temp_document[props] = each_docs[props];
                }
            }
            temp_collection.push(temp_document);
        }
        return temp_collection;
};

const transformLifestyleCollectionIna = (collection_name, collection_object) =>{
        let temp_collection = [];
        let shadow_collection = {};
        //iterate for each document

        //pre-defining objects;
        for (let doc_index in collection_object){
            let each_docs = collection_object[doc_index];
            let {phenotype, PHENOTYPE} = each_docs;
            let phenotype_name ="";
            collection_name == "Health" ? phenotype_name=phenotype : phenotype_name = PHENOTYPE;
            shadow_collection[phenotype_name] = {}
            let temp_document_props = Object.keys(each_docs);
            for (let props_index in temp_document_props) {
                let props = temp_document_props[props_index];
                shadow_collection[phenotype_name][props] = {};
            }
        }
        //iterate for each document
        for (let doc_index in collection_object){
            let temp_document = {};
            
            let each_docs = collection_object[doc_index];
            let {phenotype, PHENOTYPE} = each_docs;
            let phenotype_name ="";
            collection_name == "Health" ? phenotype_name=phenotype : phenotype_name = PHENOTYPE;
            
            let risk_category;
            collection_name == "Health" ? risk_category = each_docs["risk_category"] :  risk_category=each_docs["RISK_CATEGORY"];
//              if(collection_name=="Nutrition"){
//                 if(doc_index<3){
// console.log(each_docs['RISK_CATEGORY']);
// console.log(risk_category)
//                 }
                
//             };

            let temp_document_props = Object.keys(each_docs);
            //iterate for each document properties
            for (let props_index in temp_document_props) {
                let props = temp_document_props[props_index];
                // shadow_collection[phenotype][props] = {};
                if (nested_properties.includes(props)){
                    if(collection_name=="Health"){
                        let prop_insert = {};
                        prop_insert[risk_category] = each_docs[props];
                        shadow_collection[phenotype_name][props] = {...shadow_collection[phenotype_name][props], ...prop_insert};
                        temp_document[props] = shadow_collection[phenotype_name][props];
                    } else {
                        let prop_insert = {};
                        if(phenotype_name=="Power"){
                            console.log("power------", risk_category);
                        }
                        // let {RISK_CATEGORY} = temp_document_props;
                        prop_insert[risk_category] = each_docs[props];
                        shadow_collection[phenotype_name][props] = {...shadow_collection[phenotype_name][props], ...prop_insert};
                         temp_document[props] = shadow_collection[phenotype_name][props];
                         if(phenotype_name=="Power"){
                            console.log("power------",  );
                        }
                    }

                    
                    // temp_document[props] = {
                    //     High: risk_category == "High" ? each_docs[props] : "not_found" + Object.keys(each_docs)[2],
                    //     Typical: risk_category == "Typical" ? each_docs[props] : "not_found" + Object.keys(each_docs)[2],
                    //     Low: risk_category == "Low" ? each_docs[props] : "not_found"+ Object.keys(each_docs)[2]==props,
                    //     Other: risk_category == !("High" || "Typical" || "Low") ? "-" : `${risk_category} is not found`
                    // };
                } else {
                    temp_document[props] = each_docs[props];
                  
                    shadow_collection[phenotype_name][props] = each_docs[props];
                }
            }
            temp_collection.push(temp_document);
        }
        const collection_values = Object.values(shadow_collection);
        return collection_values;
};

const transformPgxCollectionIna = (collection_name, collection_object) => {
        let temp_collection = [];
        let shadow_collection = {};
        //iterate for each document

        // console.log('flag1')
        //pre-defining objects;
        for (let doc_index in collection_object){
            let each_docs = collection_object[doc_index];
            let {PHENOTYPE, DRUG_NAME, CATOGERY, GENE, DRUG_RESPONSE} = each_docs;
            let phenotype_name = `${CATOGERY}_${DRUG_NAME}_${GENE}`;
            shadow_collection[phenotype_name] = {}
            let temp_document_props = Object.keys(each_docs);
            for (let props_index in temp_document_props) {
                let props = temp_document_props[props_index];
                shadow_collection[phenotype_name][props] = {};
            }
        }
        // console.log('flag2')
        //iterate for each document
        for (let doc_index in collection_object){
           
            let temp_document = {};
            
            let each_docs = collection_object[doc_index];
            let {PHENOTYPE, DRUG_NAME, CATOGERY, GENE, DRUG_RESPONSE} = each_docs;
            let phenotype_name = `${CATOGERY}_${DRUG_NAME}_${GENE}`;
       
            // collection_name == "Health" ? phenotype_name=phenotype : phenotype_name = PHENOTYPE; 
            
            let risk_category;
            collection_name == "Health" ? risk_category = each_docs["risk_category"] :  risk_category=each_docs["PHENOTYPE"];
            
            let temp_document_props = Object.keys(each_docs);
            //iterate for each document properties
            for (let props_index in temp_document_props) { 
                let props = temp_document_props[props_index];
                // shadow_collection[phenotype][props] = {};
                if (nested_properties_pgx.includes(props)){
                    if(collection_name=="Health"){
                        let prop_insert = {};
                        prop_insert[risk_category] = each_docs[props];
                        shadow_collection[phenotype_name][props] = {...shadow_collection[phenotype_name][props], ...prop_insert};
                        temp_document[props] = shadow_collection[phenotype_name][props];
                    } else {
                        let prop_insert = {};
                       
                        // let {RISK_CATEGORY} = temp_document_props;
                        prop_insert[risk_category] = each_docs[props];
                        shadow_collection[phenotype_name][props] = {...shadow_collection[phenotype_name][props], ...prop_insert} || "";
                        temp_document[props] = shadow_collection[phenotype_name][props];
                        // console.log('phenotype_name-------', phenotype_name)
                        // prop_insert[risk_category] = phenotype_name;
                        // shadow_collection[phenotype_name]["phenotype_name"] = {...shadow_collection[phenotype_name]["phenotype_name"], ...prop_insert} || "";
                        temp_document["phenotype_name"] = phenotype_name;
                        shadow_collection[phenotype_name]["phenotype_name"] = phenotype_name;
                        // console.log('phenotype_name-------', phenotype_name, temp_document)
                        // console.log('shadow-------', phenotype_name, shadow_collection)
                    }
                } else {
                    temp_document[props] = each_docs[props];  
                    shadow_collection[phenotype_name][props] = each_docs[props];
                }
            }
            // console.log("push")
            temp_collection.push(temp_document);
        } 
        const collection_values = Object.values(shadow_collection);
        return collection_values;
};

module.exports = {
    transformLifestyleCollection,
    transformLifestyleCollectionIna,
    transformPgxCollectionIna,
}