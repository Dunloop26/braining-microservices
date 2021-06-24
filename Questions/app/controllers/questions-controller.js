const DB_PG = require('../db/db');
const path = require('path');

function shuffle(array) {
    const copy = [...array]
  
    return copy.sort(() => Math.random() - 0.5)
  }


let questions =  (req, res) => {
    console.log(55555555555555);
    
 
    DB_PG('questions').select('id_question', 'area')
        .then(async rows => {
            if (rows.length > 0) {
                //SELECCION DE IDS DE PRESGUNTAS
                let idsSciences = [];
                let sciencesElements = rows.filter(item => item.area == "sciences");
                let auxSciences = shuffle(sciencesElements);
                idsSciences.push(auxSciences[0]["id_question"], auxSciences[1]["id_question"])

                let idsMathematics = [];
                let mathematicsElements = rows.filter(item => item.area == "mathematics");
                let auxMathematcis = shuffle(mathematicsElements);
                idsMathematics.push(auxMathematcis[0]["id_question"], auxMathematcis[1]["id_question"])

                let idsSpanish = [];
                let spanishElements = rows.filter(item => item.area == "spanish");
                let auxSpanish = shuffle(spanishElements);
                idsSpanish.push(auxSpanish[0]["id_question"], auxSpanish[1]["id_question"])

                let idsEnglish = [];
                let englishElements = rows.filter(item => item.area == "english");
                let auxEnglish = shuffle(englishElements);
                idsEnglish.push(auxEnglish[0]["id_question"], auxEnglish[1]["id_question"])

                let auxIds = idsSciences.concat(idsMathematics, idsSpanish, idsEnglish);
                let ids = shuffle(auxIds);
                
                let auxQuestions = []

                for (const iterator of ids) {
                    let result =  await DB_PG('questions').select('question', 'option1', 'option2', 
                                                                    'option3', 'option4', 'correct', 
                                                                    'less_correct', 'area', 'topic',
                                                                    'image', 'example', 'image_example').where('id_question', iterator);
                    auxQuestions.push(result[0]);
                }
              

                //retornar {questions:[{id_question: 18, question: text question, option1: op1, option2: op2, option3: op3, option4: op4, correct: option1, less_correct: option4,area: mathematics, topic: primes, img_question: 18, img_example: e18  }, ....]}
                return res.status(200).json({ questions: auxQuestions });

                

            
            } else {
                console.log(11111111111);
                console.log("gggggggggggggggggg");
                return res.status(500).json({ status: 'Something is wrong' });
            }
        })

        .catch(function () {
            console.log("oooooooooooooo");
            return res.status(500).json({ status: 'Something is wrong' });
        });
    
    
}



  

module.exports = {
    questions
}