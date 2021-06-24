const DB_PG = require('../db/db');
const netxDayGoal = require('../helpers/get-next-day-goal')

let daysGoal = (req, res) => {
    console.log(55555555555555);
    
    let groupQuery;
    let teacherQuery;
    DB_PG('groups_students').select('group', 'id_teacher').where('id_student', idStudent)
        .then(rows => {
            if (rows.length > 0) {
                //return res.status(200).json({ eyes: rows[0].eyes, nose: rows[0].nose, mouth: rows[0].mouth });
                groupQuery = rows[0].group;
                teacherQuery = rows[0].id_teacher;
                console.log("ids", groupQuery, teacherQuery);
                
                DB_PG('groups').select('days_goal').where({id_teacher: teacherQuery, group: groupQuery})
                    .then(rows => {
                        if (rows.length > 0) {
                            let goal = netxDayGoal.nextDayGoal(rows[0].days_goal);
                            return res.status(200).json(goal);
                        } 
                        console.log("wwwwwwwwwwww");
                        
                        return res.status(500).json({ status: 'Something is wrong' });
                    })
                    .catch(function (err) {
                        console.log("uuuuuuuuuuuuu");
                        return res.status(500).json({ status: err.stack });
                    })
            } else {
                console.log(11111111111);
                console.log("gggggggggggggggggg");
                return res.status(500).json({ status: 'Something is wrong' });
            }
        }).catch(function () {
            console.log("oooooooooooooo");
            return res.status(500).json({ status: 'Something is wrong' });
        });
    
    
}


module.exports = {
    daysGoal
}