
const DB_PG = require('../db/pg');
const DB_REDIS_0 = require('../db/redis-0');
const DB_REDIS_1 = require('../db/redis-1');
const HTTPClient = require('../helpers/HTTPClient');
const PING = 1;


function updateYields(area, topic) {
  let schema;
  let topicRight;
  let topicWrong;
  switch (area) {
    
    case "sciences":
      
      if (topic == "cell"){
        topicRight = "right_sciences_cell";
        topicWrong = "wrong_sciences_cell";
      }
      if (topic == "anatomy"){
        topicRight = "right_sciences_anatomy";
        topicWrong = "wrong_sciences_anatomy";
      }
      if (topic == "mammals"){
        topicRight = "right_sciences_mammals";
        topicWrong = "wrong_sciences_mammals";
      }
      schema = {right: 'right_sciences', wrong: 'wrong_sciences',
                    rightCorrect: 'right_correct_sciences', rightLessCorrect: 'right_less_correct_sciences',
                    rightCorrectLessCorrect: 'right_correct_less_correct_sciences', topicRight: topicRight, 
                    topicWrong: topicWrong}
      return schema;

    case "spanish":
     
      if (topic == "analisys"){
        topicRight = "right_spanish_analisys";
        topicWrong = "wrong_spanish_analisys";
      }
      if (topic == "comprehension"){
        topicRight = "right_spanish_comprehension";
        topicWrong = "wrong_spanish_comprehension";
      }
      if (topic == "redaction"){
        topicRight = "right_spanish_redaction";
        topicWrong = "wrong_spanish_redaction";
      }
      schema = {right: 'right_spanish', wrong: 'wrong_spanish',
                    rightCorrect: 'right_correct_spanish', rightLessCorrect: 'right_less_correct_spanish',
                    rightCorrectLessCorrect: 'right_correct_less_correct_spanish', topicRight: topicRight, 
                    topicWrong: topicWrong}
      return schema;
    
      break;
    
    case "english":
   
      if (topic == "verbs"){
        topicRight = "right_english_verbs";
        topicWrong = "wrong_english_verbs";
      }
      if (topic == "articles"){
        topicRight = "right_english_articles";
        topicWrong = "wrong_english_articles";
      }
      if (topic == "sustantives"){
        topicRight = "right_english_sustantives";
        topicWrong = "wrong_english_sustantives";
      }
      schema = {right: 'right_english', wrong: 'wrong_english',
                    rightCorrect: 'right_correct_english', rightLessCorrect: 'right_less_correct_english',
                    rightCorrectLessCorrect: 'right_correct_less_correct_english', topicRight: topicRight, 
                    topicWrong: topicWrong}
      return schema;
    
      break;
    
    case "mathematics":
    
      if (topic == "primes"){
        topicRight = "right_mathematics_primes";
        topicWrong = "wrong_mathematics_primes";
      }
      if (topic == "fractions"){
        topicRight = "right_mathematics_fractions";
        topicWrong = "wrong_mathematics_fractions";
      }
      if (topic == "triangles"){
        topicRight = "right_mathematics_triangles";
        topicWrong = "wrong_mathematics_triangles";
      }
      schema = {right: 'right_mathematics', wrong: 'wrong_mathematics',
                    rightCorrect: 'right_correct_mathematics', rightLessCorrect: 'right_less_correct_mathematics',
                    rightCorrectLessCorrect: 'right_correct_less_correct_mathematics', topicRight: topicRight, 
                    topicWrong: topicWrong}
      return schema;
      
  
    default:
      break;
  }
  
}



let protocol = async (socket) => {

  console.log('a user connected:', socket.handshake.headers['authorization']);
  console.log('a user connected:', socket.handshake.headers['id_game']);
  
  //SI EL USUARIO SE CONECTA...
  
    //SE VERIFICA SI EL USUARIO TIENE UNA PARTIDA EN CURSO
    DB_REDIS_1.get(socket.handshake.headers['authorization'], function (err, object) {
      //si tiene una partida en curso...
      if (object) {
        console.log(4444, JSON.parse(object).id_game);
        //si el usuario es el dueño de la partida
        if (JSON.parse(object).id_game == socket.handshake.headers['id_game']){
          console.log(333333333333);
          //se actualida el id_game de la partida
          let result = JSON.parse(object);
          result.id_game = socket.id;
          DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify(result), () => {
            //se actualizan los datos del user 
          DB_REDIS_0.set(socket.handshake.headers['authorization'], JSON.stringify({ id_socket: socket.id, view: "gameplay" }), () => {
            //SE DETIENE LA EXPIRACION
          DB_REDIS_1.persist(socket.handshake.headers['authorization'], (err, res) => {
            console.log("PERSIST 1", res);
            return
          })
        })

          })
          
      }
      console.log(565656);
      //se cierra la conexion
      socket.emit('partida_cursando')
      return socket.disconnect()
      
    }
  
    //si el usuario no tiene partidas creadas se actualiza la info de los sockets del usuario .
    return DB_REDIS_0.set(socket.handshake.headers['authorization'], JSON.stringify({ id_socket: socket.id, view: "gameplay" }))

      
    })
 
    //SE ACTUALIZA O SE CREA EL ID DEL SOCKET DEL USUARIO



  //SI EL USUARIO SE DESCONECTA..OKOKOK
  socket.on('disconnect', () => {
    console.log('a user DISconnected:', socket.handshake.headers['authorization']);
    DB_REDIS_1.get(socket.handshake.headers['authorization'], function (err, object) {
      //SI HAY PARTIDA DEL USUARIO EN CURSO...
      if (object) {
        console.log(1111111);
       
        //si la partida pertenece a la sesion actual del usuario...
        if (JSON.parse(object).id_game == socket.id){
          console.log(47474747);
          //SE DAN 10 SEGUNDOS PARA QUE EL USUARIO SE RECONECTE Y CONTINUE JUGANDO
          return DB_REDIS_1.expire(socket.handshake.headers['authorization'], 10, () => {
            //se eliminan datos del user del juego
            DB_REDIS_0.del(socket.handshake.headers['authorization']);

          });
        }
        console.log(99977777);
        //si tiene partida en curso pero no es el propietario
        return
        
      }
      console.log(7777777777);
      //si el usuario que se acaba de desconectar no tenia partida en curso..
      //se eliminan sus datos del socket del juego
      return DB_REDIS_0.del(socket.handshake.headers['authorization']);

    })
  });


  //CREACION DE LA PARTIDA. OKOKOK
  socket.on('create', async (msg) => {
 
    
    //SI HAY PARTIDA EN CURSO...
    DB_REDIS_1.get(socket.handshake.headers['authorization'], async function (err, object) {
      //si ya hay una partida en curso de ese usuario, baneado
      if (object) {
        
        //SE ENVIA UN MENSAJE DE ERROR QUE AVISE QUE YA TIENE UNA PARTIDA EN CURSO
        return socket.emit('partida_cursando')
      } 

      console.log("CREANDO PARTIDA");
 
      //SOLICITUD DE PREGUNTAS A MS QUESTIONS
      let requestQuestions = await HTTPClient.get('http://localhost:10110/api/questions')
      let questions = requestQuestions.data;

      DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify({ id_game: socket.id, 
                                                                                  questions: questions, 
                                                                                  index_courrent_question: -1,
                                                                                  help_neuron: 1,
                                                                                  help_example: 1,
                                                                                  help_score: 1,
                                                                                  points_game_courrent: 0
                                                                                  }));
      DB_REDIS_1.expire(socket.handshake.headers['authorization'], 10);
      //PREPARACION DE PREGUNTAS PARA ENVIAR AL USUARIO
    
      //SE ENVIA EL EVENTO CREATE AL CLIENTE
      return socket.emit('create', {});
  
    })



    

  });
  

  //START ******

  socket.on('get_question', async (msg) => {
    DB_REDIS_1.get(socket.handshake.headers['authorization'], function (err, object) {

      let result = JSON.parse(object);
      let indexCourrentQuestion = result["index_courrent_question"] 
      let nextIndexQuestion = indexCourrentQuestion + 1; 
      if (nextIndexQuestion <= 17){
          
          let questionToClient = {};
          let infoNextQuestion = result["questions"]["questions"][nextIndexQuestion]
          console.log("infoNextQuestion ", infoNextQuestion["question"]);
          console.log("nextIndexQuestion ", nextIndexQuestion);
          console.log("indexCourrentQuestion ", indexCourrentQuestion);

          questionToClient["question"] = infoNextQuestion["question"]
          questionToClient["option1"] = infoNextQuestion["option1"]
          questionToClient["option2"] = infoNextQuestion["option2"]
          questionToClient["option3"] = infoNextQuestion["option3"]
          questionToClient["option4"] = infoNextQuestion["option4"]
          questionToClient["image"] = infoNextQuestion["image"]

          result["index_courrent_question"] = nextIndexQuestion;
          DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify(result));

          DB_REDIS_1.expire(socket.handshake.headers['authorization'], 60 + PING);


          return socket.emit('get_question', questionToClient);
      }

      return socket.emit('exeption', { exeption: "The game is over" });


    
    });


  });


  socket.on('get_example', async (msg) => {
    DB_REDIS_1.get(socket.handshake.headers['authorization'], function (err, object) {


      if (object === null) {
        return socket.emit('exeption', { exeption: "the game does not exist" });
      }

      let result = JSON.parse(object);
      let indexCourrentQuestion = result["index_courrent_question"] 
      let exampleHelpToClient = {}
      let imageExample = result["questions"]["questions"][indexCourrentQuestion]["image_example"]
      let textExample = result["questions"]["questions"][indexCourrentQuestion]["example"]
      exampleHelpToClient["image_example"] = imageExample
      exampleHelpToClient["example"] = textExample
      result["help_example"] = 0;
      DB_REDIS_1.ttl(socket.handshake.headers['authorization'], function (err, ttl) {
        console.log(ttl, "+++++++++++++----------------++++++++++");
        DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify(result),  function () {
          DB_REDIS_1.expire(socket.handshake.headers['authorization'], ttl + PING);

        });
      });
      
      

      return socket.emit('get_example', exampleHelpToClient);idStudent

    });


  });


  socket.on('validator_response', async (msg) => {

    DB_REDIS_1.get(socket.handshake.headers['authorization'], function (err, object) {

      if (object === null) {
        return socket.emit('exeption', { exeption: "the game does not exist" });
      }
      
      let result = JSON.parse(object);
      let indexCourrentQuestion = result["index_courrent_question"] 

      let pointsGame = result["points_game_courrent"]
      let correct = result["questions"]["questions"][indexCourrentQuestion]["correct"]
      let lessCorrect = result["questions"]["questions"][indexCourrentQuestion]["less_correct"]
      let points = 0

      let area = result["questions"]["questions"][indexCourrentQuestion]["area"]
      let topic = result["questions"]["questions"][indexCourrentQuestion]["topic"]
      let schemaUpdateYields = updateYields(area, topic);

      let right;
      let rightLessCorrect;
      let topicRight;
      let roundsWon;
      let roundsLosses;
      let experience;
      let pointsBuy;
      let pointsToGoal;
      let responsies;

    

      if (msg.baseCorrect == correct && msg.baseLessCorrect != lessCorrect){
        points = points + 10
        pointsGame = pointsGame + 10
      }

      if (msg.baseLessCorrect == lessCorrect && msg.baseCorrect != correct){
        points = points + 5
        pointsGame = pointsGame + 5
      }

      if (msg.baseLessCorrect == lessCorrect && msg.baseCorrect == correct){
        points = points + 15
        pointsGame = pointsGame + 15
      }



      if (points == 5){
        console.log("entro a 5, pointsGame: ", pointsGame);

        DB_PG('yields').select(schemaUpdateYields.right, schemaUpdateYields.rightLessCorrect,
                              schemaUpdateYields.topicRight, "rounds_won").where('id_student', 1)
          .then((rows) => {
              right = rows[0][schemaUpdateYields.right];
              rightLessCorrect = rows[0][schemaUpdateYields.rightLessCorrect];
              topicRight = rows[0][schemaUpdateYields.topicRight];
              roundsWon = rows[0]["rounds_won"];

      }).
      
      then(() => {

        if (pointsGame >= 90){
          console.log("entro a 5 con ultima respuesta");

         return DB_PG('yields').update(
            {
              [schemaUpdateYields.right] : right + 1, 
              [schemaUpdateYields.rightLessCorrect]: rightLessCorrect + 1, 
              [schemaUpdateYields.topicRight]: topicRight + 1,
              rounds_won: roundsWon + 1
            }).where('id_student', 1) 
          

        } else {
          console.log("entro a 5 sin ultima respuesta");

          return DB_PG('yields').update(
            {
              [schemaUpdateYields.right] : right + 1, 
              [schemaUpdateYields.rightLessCorrect]: rightLessCorrect + 1, 
              [schemaUpdateYields.topicRight]: topicRight + 1
            }).where('id_student', 1) 
          
        }
          
      })
        
        //#########scores########
        .then(() => {
          console.log("entro a 5 con scores");

          return DB_PG('scores').select('experience', 'points_buy').where('id_student', 1)
            .then((rows) => {
                          experience = rows[0]['experience'];
                          pointsBuy = rows[0]['points_buy'];
                          })
                      

        }). then(() => {

          if (pointsGame >= 90){
            console.log("entro a 5 con scores y ultima respuesta");

            return DB_PG('scores').update(
              {
                experience : experience + 5 +  40, 
                points_buy: pointsBuy + (pointsGame - 90)
              }).where('id_student', 1) 
          }
          else {
            console.log("entro a 5 con scores sin ultima respuesta");

            return DB_PG('scores').update(
              {
                experience : experience + 5
              }).where('id_student', 1) 
          }
      //#########scores########

        //#########weekly########

        }). then(() => {

         return DB_PG('weekly').select('points_goal', 'responsies').where('id_student', 1)
            .then((rows) => {
                          pointsToGoal = rows[0]['points_goal'];
                          responsies = rows[0]['responsies'];
                          })

               })

        .then(() => { 
          console.log("entro a 5 con weekly");

          return DB_PG('weekly').update(
            {
              points_goal : pointsToGoal + 5,
              responsies : responsies + 1
            }).where('id_student', 1) 


        }).then(() => {
          console.log("entro a 5 actualizar datos de juego");

          if (pointsGame >= 90){ 

            return DB_REDIS_1.del(socket.handshake.headers['authorization']);

          } else {
            result["points_game_courrent"] = pointsGame;
            return DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify(result),  function () {
                DB_REDIS_1.expire(socket.handshake.headers['authorization'], 10);
      
              });

          }


        })

        
        //#########weekly########

        .then(() => {
          console.log("entro a preparar objeto a enviar");

          let object = {}
          object["pointsQuestion"] = 5;
          object["finalized"] = false;
          object["responseOk"] = true;
          object["pointsGame"] = pointsGame

          if (pointsGame + 5 >= 90){
              object["pointsBuy"] = pointsGame - 90;
              object["finalized"] = true;
              
          }
          console.log("se envia el objeto");

          return socket.emit('validator_response', 
            object
             );

        })
            

    };


    //##############10##############################

    if (points == 10){
      console.log("entro a 10, pointsGame: ", pointsGame);

      DB_PG('yields').select(schemaUpdateYields.right, schemaUpdateYields.rightCorrect,
                            schemaUpdateYields.topicRight, "rounds_won").where('id_student', 1)
        .then((rows) => {
            right = rows[0][schemaUpdateYields.right];
            rightCorrect= rows[0][schemaUpdateYields.rightCorrect];
            topicRight = rows[0][schemaUpdateYields.topicRight];
            roundsWon = rows[0]["rounds_won"];

    }).
    
    then(() => {

      if (pointsGame >= 90){
        console.log("entro a 10 con ultima respuesta");

       return DB_PG('yields').update(
          {
            [schemaUpdateYields.right] : right + 1, 
            [schemaUpdateYields.rightCorrect]: rightCorrect + 1, 
            [schemaUpdateYields.topicRight]: topicRight + 1,
            rounds_won: roundsWon + 1
          }).where('id_student', 1) 
        

      } else {
        console.log("entro a 10 sin ultima respuesta");

        return DB_PG('yields').update(
          {
            [schemaUpdateYields.right] : right + 1, 
            [schemaUpdateYields.rightCorrect]: rightCorrect + 1, 
            [schemaUpdateYields.topicRight]: topicRight + 1
          }).where('id_student', 1) 
        
      }
        
    })
      
      //#########scores########
      .then(() => {
        console.log("entro a 10 con scores");

        return DB_PG('scores').select('experience', 'points_buy').where('id_student', 1)
          .then((rows) => {
                        experience = rows[0]['experience'];
                        pointsBuy = rows[0]['points_buy'];
                        })
                    

      }). then(() => {

        if (pointsGame >= 90){
          console.log("entro a 10 con scores y ultima respuesta");

          return DB_PG('scores').update(
            {
              experience : experience + 10 +  40, 
              points_buy: pointsBuy + (pointsGame - 90)
            }).where('id_student', 1) 
        }
        else {
          console.log("entro a 10 con scores sin ultima respuesta");

          return DB_PG('scores').update(
            {
              experience : experience + 10
            }).where('id_student', 1) 
        }
    //#########scores########

      //#########weekly########

      }). then(() => {

       return DB_PG('weekly').select('points_goal', 'responsies').where('id_student', 1)
          .then((rows) => {
                        pointsToGoal = rows[0]['points_goal'];
                        responsies = rows[0]['responsies'];
                        })

             })

      .then(() => { 
        console.log("entro a 10 con weekly");

        return DB_PG('weekly').update(
          {
            points_goal : pointsToGoal + 10,
            responsies : responsies + 1
          }).where('id_student', 1) 


      }).then(() => {
        console.log("entro a 10 actualizar datos de juego");


        if (pointsGame >= 90){ 

          return DB_REDIS_1.del(socket.handshake.headers['authorization']);

        } else {
          result["points_game_courrent"] = pointsGame;
          return DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify(result),  function () {
              DB_REDIS_1.expire(socket.handshake.headers['authorization'], 10);
    
            });

        }

      

      })

      
      //#########weekly########

      .then(() => {
        console.log("entro a preparar objeto a enviar");

        let object = {}
        object["pointsQuestion"] = 10;
        object["finalized"] = false;
        object["responseOk"] = true;
        object["pointsGame"] = pointsGame

        if (pointsGame >= 90){
            object["pointsBuy"] = pointsGame - 90;
            object["finalized"] = true;
        }
        console.log("se envia el objeto");

        return socket.emit('validator_response', 
          object
           );

      })
          

  };

 

  //##########15###############################

  
  if (points == 15){
    console.log("entro a 15, pointsGame: ", pointsGame);

    DB_PG('yields').select(schemaUpdateYields.right, schemaUpdateYields.rightCorrectLessCorrect,
                          schemaUpdateYields.topicRight, "rounds_won").where('id_student', 1)
      .then((rows) => {
          right = rows[0][schemaUpdateYields.right];
          rightCorrectLessCorrect= rows[0][schemaUpdateYields.rightCorrectLessCorrect];
          topicRight = rows[0][schemaUpdateYields.topicRight];
          roundsWon = rows[0]["rounds_won"];

  }).
  
  then(() => {

    if (pointsGame >= 90){
      console.log("entro a 15 con ultima respuesta");

     return DB_PG('yields').update(
        {
          [schemaUpdateYields.right] : right + 1, 
          [schemaUpdateYields.rightCorrectLessCorrect]: rightCorrectLessCorrect + 1, 
          [schemaUpdateYields.topicRight]: topicRight + 1,
          rounds_won: roundsWon + 1
        }).where('id_student', 1) 
      

    } else {
      console.log("entro a 15 sin ultima respuesta");

      return DB_PG('yields').update(
        {
          [schemaUpdateYields.right] : right + 1, 
          [schemaUpdateYields.rightCorrectLessCorrect]: rightCorrectLessCorrect + 1, 
          [schemaUpdateYields.topicRight]: topicRight + 1
        }).where('id_student', 1) 
      
    }
      
  })
    
    //#########scores########
    .then(() => {
      console.log("entro a 15 con scores");

      return DB_PG('scores').select('experience', 'points_buy').where('id_student', 1)
        .then((rows) => {
                      experience = rows[0]['experience'];
                      pointsBuy = rows[0]['points_buy'];
                      })
                  

    }). then(() => {

      if (pointsGame >= 90){
        console.log("entro a 15 con scores y ultima respuesta");

        return DB_PG('scores').update(
          {
            experience : experience + 15 +  40, 
            points_buy: pointsBuy + (pointsGame - 90)
          }).where('id_student', 1) 
      }
      else {
        console.log("entro a 15 con scores sin ultima respuesta");

        return DB_PG('scores').update(
          {
            experience : experience + 15
          }).where('id_student', 1) 
      }
  //#########scores########

    //#########weekly########

    }). then(() => {

     return DB_PG('weekly').select('points_goal', 'responsies').where('id_student', 1)
        .then((rows) => {
                      pointsToGoal = rows[0]['points_goal'];
                      responsies = rows[0]['responsies'];
                      })

           })

    .then(() => { 
      console.log("entro a 15 con weekly");

      return DB_PG('weekly').update(
        {
          points_goal : pointsToGoal + 15,
          responsies : responsies + 1
        }).where('id_student', 1) 


    }).then(() => {
      console.log("entro a 15 actualizar datos de juego");

      if (pointsGame >= 90){ 

        return DB_REDIS_1.del(socket.handshake.headers['authorization']);

      } else {
        result["points_game_courrent"] = pointsGame;
        return DB_REDIS_1.set(socket.handshake.headers['authorization'], JSON.stringify(result),  function () {
            DB_REDIS_1.expire(socket.handshake.headers['authorization'], 10);
  
          });

      }

   

    })

    
    //#########weekly########

    .then(() => {
      console.log("entro a preparar objeto a enviar");

      let object = {}
      object["pointsQuestion"] = 15;
      object["finalized"] = false;
      object["responseOk"] = true;
      object["pointsGame"] = pointsGame;

      if (pointsGame >= 90){
          object["pointsBuy"] = pointsGame - 90;
          object["finalized"] = true;
      }
      console.log("se envia el objeto");

      return socket.emit('validator_response', 
        object
         );

    })
        

};


//######################0##############################0################

if (points == 0){
  console.log("entro a 0, pointsGame: ", pointsGame);

  DB_PG('yields').select(schemaUpdateYields.wrong, schemaUpdateYields.topicWrong,
                          'rounds_losses').where('id_student', 1)
    .then((rows) => {
        wrong = rows[0][schemaUpdateYields.wrong];
        topicWrong = rows[0][schemaUpdateYields.topicWrong];
        roundsLosses = rows[0]["rounds_losses"];

}).

then(() => {


  console.log("entro a 0 ara actualizar yields");

   return DB_PG('yields').update(
      {
        [schemaUpdateYields.wrong] : wrong + 1, 
        [schemaUpdateYields.topicWrong]: topicWrong + 1,
        rounds_losses: roundsLosses + 1
      }).where('id_student', 1) 
    
})
  
. 

then(() => {

   return DB_PG('weekly').select('responsies').where('id_student', 1)
      .then((rows) => {
                    responsies = rows[0]['responsies'];
                    })

         })

  .then(() => { 
    console.log("entro a 0 con weekly");

    return DB_PG('weekly').update(
      {
        responsies : responsies + 1
      }).where('id_student', 1) 


  }).then(() => {
    console.log("entro a 0 eliminar datos de juego");

    return DB_REDIS_1.del(socket.handshake.headers['authorization']);


  })

  
  //#########weekly########

  .then(() => {
    console.log("entro a preparar objeto a enviar");

    let object = {}
    //object["pointsQuestion"] = 0;
    object["finalized"] = true;
    object["responseOk"] = false;
    object["pointsGame"] = pointsGame;
    console.log("se envia el objeto");

    return socket.emit('validator_response', 
      object
       );

  })
      

};



  

  });

  
})


  socket.on('salir', (msg) => {
    console.log('message salir: ' + msg);
    //envia mensaje al usuario que acaba de enviar el protocolo salir
    socket.emit('message', msg);

  });
  //envia mensajes a todos menos a quien lo envio
  //socket.broadcast.emit('message', "wwwww54564");
}

/*
 DB_REDIS.select(6, (err, res) => {
   DB_REDIS.hmset("www", {
     questions: questionsg,
     index_courrent_question: 0
   });
 })  */


/*
DB_REDIS.get(110, function(err, object) {
  console.log("xxxxxxxxxx", JSON.parse(object).questions.questions[8]["w"]);
});
*/
module.exports = protocol;

