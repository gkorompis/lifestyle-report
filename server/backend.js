// const AWS = require("aws-sdk");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const readExcelLifestyle = require('./readExcel');
// const { read } = require('xlsx');
const {fetchOneDictioTable} = require('./readFromDynamodb.js');
const { transformLifestyleCollectionIna } = require('./etl.js');
const {processResult, processResultPgx} = require('./processResult.js');
const {getOneItem} = require('./ddb/ddbGetItem');

// const {restartLifestyleEng, restartLifestyleIna} = require("./ddbUpdateLifestyleDictionary");

const app = express();
//middlewares
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());


//routes
//get data dasar
app.get('/lifestyle-administration/:id', async (req, res)=>{
    const {id} = req.params;
    const input_params = {
        TableName: 'lifestyle-administration',
        Key: {specimen_id: id}
    }; 
    const payload = await getOneItem(input_params);
    res.json(payload);
});

app.get('/lifestyle-dictio/:id', async (req, res)=>{
    const {id}= req.params;
    const {version} = req.query;
    // console.log(version, 'version--')
    let local_path = 'local_data'
    // const payload = await readExcelLifestyle('Health', `./${local_path}/LifestyleDictionary.xlsx`);
    const payload = await fetchOneDictioTable('lifestyle-dictio', `${id}`, `${version}` );
    // console.log('payload---', payload);
    payload ? console.log('ok'):console.log('payload undefined')
    res.json(payload);
});
app.get('/pgx-dictio/:id', async (req, res)=>{
    const {id}= req.params;
    const {version} = req.query;
    // console.log(version, 'version--')
    // let local_path = 'local_data'
    // const payload = await readExcelLifestyle('Health', `./${local_path}/LifestyleDictionary.xlsx`);
    const payload = await fetchOneDictioTable('pgx-dictio', `${id}`, `${version}` );
    // console.log('payload---', payload);
    payload ? console.log('ok'):console.log('payload undefined')
    res.json(payload);
});
app.get('/lifestyle-result-record/:id', async (req, res)=>{
    const {id}= req.params;
    const {version}= req.query;
    const result_record =await processResult(id, version);
    // console.log(result_record["Health"].filter(x=>x["phenotype"]=="Prostate Cancer")[0]);
    // console.log('%%%%%%%%%%%%%%')
    res.json(result_record);
});
app.get('/pgx-result-record/:id', async (req, res)=>{
    const {id}= req.params;
    const {version}= req.query;
    const result_record =await processResultPgx(id, version);
    // console.log(result_record["Health"].filter(x=>x["phenotype"]=="Prostate Cancer")[0]);
    // console.log('%%%%%%%%%%%%%%')
    res.json(result_record);
});
app.get('/read-local', async (req, res)=>{
    const {id}= req.params;
    const {version} = req.query;
    // console.log(version, 'version--')
    let local_path = 'local_data'
    const payload = await readExcelLifestyle('Nutrition', `./${local_path}/LifestyleDictionary.xlsx`);
    // const payload = await fetchOneDictioTable('lifestyle-dictio', `${id}`, `${version}` );
    // console.log('payload---', payload);
    payload ? console.log('ok'):console.log('payload undefined')
    res.json(payload);
});
app.get('/transform-local', async (req, res)=>{
    const {id}= req.params;
    const {version} = req.query;
    // console.log(version, 'version--')
    let local_path = 'local_data'
    const payload = await readExcelLifestyle('Fitness', `./${local_path}/LifestyleDictionary.xlsx`);
    const transformed = await transformLifestyleCollectionIna("Nutrition", payload);
    // const payload = await fetchOneDictioTable('lifestyle-dictio', `${id}`, `${version}` );
    // console.log('payload---', payload);
    payload ? console.log('ok'):console.log('payload undefined')
    res.json(transformed);
});
app.get('/result-trial', async (req, res)=>{
   const data = {Health:[{
            phenotype: "Stroke",
            description: "Stroke occurs when the blood supply to a part of your brain is suddenly interrupted, thus depriving brain tissue of oxygen and nutrients so that brain tissue become damaged and begin to die within minutes. This causes the part of the body that the injured brain controls to stop working. .",
            your_risk: "1.68",
            gene_tested: "HDAC9; ZFHX3; ALDH2; MTHFR; CDKN2B-AS1",
            priority: "12",
            gene_env: "Health",
            summary: "Health",
            type: "Health",
            category: "Cardiovascular and Cerebral Diseases",
            sub_pri: "8",
            risk_category: "High",
            intrinsic_factors: "1) Age: risk increases with age (55y and above)\n2) Gender: more common in women\n3) Ethnicity: African�Americans are at a higher risk\n4) Family history",
            lifestyle_factors: "1) Unhealthy diet\n2) Lack of physical activity\n3) Alcohol overconsumption (binge drinking)\n4) Tobacco habits/ Smoking\n5) Use of drugs like cocaine and methamphetamines",
            associated_medical_condition: "1) Obesity\n2) Hypertension\n3) Diabetes\n4) High cholesterol level\n5) Cardiomyopathies\n6) Obstructive sleep apnea \n7) High-homocysteine level \n8) Contraceptives, Hormone replacement therapy",
            genetics: "Genetic variant in certain key genes also increases your risk for Stroke along with other risk factors.",
            sign_and_symptoms: "1) Persistent tingling sensation in arms or legs \n2) Numbness/paralysis of one half/part of the body\n3) Difficulty in speaking\n4) Dizziness and vertigo or difficulty in swallowing\n5) Vision problems\n6) Severe headache\n7) Loss of consciousness\n8) Drooping of face",
            recomm_test: "1) Physical examination by a doctor\n2) Blood tests to look for clotting time, presence of clotting factors or any infection, complete blood count, sugar levels, electrolytes level, kidney function, Serum Homocysteine level\n3) MRI\n4) CT scan\n5) Carotid ultrasound\n6) Cerebral angiogram/MR Angio\n7) Echocardiogram\n8) Physician/Neurologist consultation",
            do_action: "1) Follow a balanced diet and exercise regularly to maintain optimal health.\n2) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms.",
            do_not_action: "1) Follow a balanced diet and exercise regularly to maintain optimal health.\n2) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms.\n3) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms."
        },
        {
            phenotype: "CORONARY ARTERY DISEASE (CAD)",
            description: "Stroke occurs when the blood supply to a part of your brain is suddenly interrupted, thus depriving brain tissue of oxygen and nutrients so that brain tissue become damaged and begin to die within minutes. This causes the part of the body that the injured brain controls to stop working. .",
            your_risk: "-0.45",
            gene_tested: "HDAC9; ZFHX3; ALDH2; MTHFR; CDKN2B-AS1",
            priority: "12",
            gene_env: "Health",
            summary: "Health",
            type: "Health",
            category: "Cardiovascular and Cerebral Diseases",
            sub_pri: "8",
            risk_category: "Low",
            intrinsic_factors: "1) Age: risk increases with age (55y and above)\n2) Gender: more common in women\n3) Ethnicity: African�Americans are at a higher risk\n4) Family history",
            lifestyle_factors: "1) Unhealthy diet\n2) Lack of physical activity\n3) Alcohol overconsumption (binge drinking)\n4) Tobacco habits/ Smoking\n5) Use of drugs like cocaine and methamphetamines",
            associated_medical_condition: "1) Obesity\n2) Hypertension\n3) Diabetes\n4) High cholesterol level\n5) Cardiomyopathies\n6) Obstructive sleep apnea \n7) High-homocysteine level \n8) Contraceptives, Hormone replacement therapy",
            genetics: "Genetic variant in certain key genes also increases your risk for Stroke along with other risk factors.",
            sign_and_symptoms: "1) Persistent tingling sensation in arms or legs \n2) Numbness/paralysis of one half/part of the body\n3) Difficulty in speaking\n4) Dizziness and vertigo or difficulty in swallowing\n5) Vision problems\n6) Severe headache\n7) Loss of consciousness\n8) Drooping of face",
            recomm_test: "1) Physical examination by a doctor\n2) Blood tests to look for clotting time, presence of clotting factors or any infection, complete blood count, sugar levels, electrolytes level, kidney function, Serum Homocysteine level\n3) MRI\n4) CT scan\n5) Carotid ultrasound\n6) Cerebral angiogram/MR Angio\n7) Echocardiogram\n8) Physician/Neurologist consultation",
            do_action: "1) Follow a balanced diet and exercise regularly to maintain optimal health.\n2) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms.",
            do_not_action: "1) Follow a balanced diet and exercise regularly to maintain optimal health.\n2) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms.\n3) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms."
        },
        {
            phenotype: "HIGH HDL (GOOD) CHOLESTEROL LEVELS",
            description: "Stroke occurs when the blood supply to a part of your brain is suddenly interrupted or reduced, thus depriving brain tissue of oxygen and nutrients. Without oxygen, brain tissue become damaged and begin to die within minutes. This causes the part of the body that the injured brain controls to stop working. Stroke is also called as a cerebrovascular accident, CVA, or brain attack. Stroke is an emergency condition which requires prompt medical attention. Any delay can lead to death or permanent disability (paralysis).\n\nThe interrupted blood supply may be due to a blood clot in the brain blood vessels in case of ischemic stroke (results in loss of blood flow to a part of brain) or due to the rupture of the blood vessels in case on hemorrhagic stroke (leads to bleeding within brain).",
            your_risk: "-2.88",
            gene_tested: "HDAC9; ZFHX3; ALDH2; MTHFR; CDKN2B-AS1",
            priority: "12",
            gene_env: "Health",
            summary: "Health",
            type: "Health",
            category: "Cardiovascular and Cerebral Diseases",
            sub_pri: "8",
            risk_category: "Low",
            intrinsic_factors: "1) Age: risk increases with age (55y and above)\n2) Gender: more common in women\n3) Ethnicity: African�Americans are at a higher risk\n4) Family history",
            lifestyle_factors: "1) Unhealthy diet\n2) Lack of physical activity\n3) Alcohol overconsumption (binge drinking)\n4) Tobacco habits/ Smoking\n5) Use of drugs like cocaine and methamphetamines",
            associated_medical_condition: "1) Obesity\n2) Hypertension\n3) Diabetes\n4) High cholesterol level\n5) Cardiomyopathies\n6) Obstructive sleep apnea \n7) High-homocysteine level \n8) Contraceptives, Hormone replacement therapy",
            genetics: "Genetic variant in certain key genes also increases your risk for Stroke along with other risk factors.",
            sign_and_symptoms: "1) Persistent tingling sensation in arms or legs \n2) Numbness/paralysis of one half/part of the body\n3) Difficulty in speaking\n4) Dizziness and vertigo or difficulty in swallowing\n5) Vision problems\n6) Severe headache\n7) Loss of consciousness\n8) Drooping of face",
            recomm_test: "1) Physical examination by a doctor\n2) Blood tests to look for clotting time, presence of clotting factors or any infection, complete blood count, sugar levels, electrolytes level, kidney function, Serum Homocysteine level\n3) MRI\n4) CT scan\n5) Carotid ultrasound\n6) Cerebral angiogram/MR Angio\n7) Echocardiogram\n8) Physician/Neurologist consultation",
            do_action: "1) Follow a balanced diet and exercise regularly to maintain optimal health.\n2) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms.",
            do_not_action: "1) Follow a balanced diet and exercise regularly to maintain optimal health.\n2) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms.\n3) Watch for signs and symptoms of Stroke and immediately consult a doctor in case you are experiencing any of the symptoms."
        }
    ]};
   console.log(data, 'thiswork')
    res.json(data)
})

const PORT = 5002;
app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`));