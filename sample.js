const mysql = require('mysql2');
const map = new Map();
const port = 3700;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sundar@03',
    database: 'lib_Schema'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    connection.query('select * from student_data',(err,result)=>{
       for(var i in result){
        if(result[i].Name.indexOf('SUNDAR')!=-1){
            console.log(result[i]);
        }
       }

    })
});
const date = new Date().toISOString().slice(0,10).replace('T',' ');
console.log(date)

