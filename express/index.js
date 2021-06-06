const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1 , name:'task1'},
    {id:2 , name:'task2'},
    {id:3 , name:'task3'},
]
app.get('/' , (req,res) => {
    res.send('hello ');
});

app.get('/api' , (req,res) => {
    res.send([courses]);
});

app.post('/api',(req ,res) => {
    const { error } = validatecourse(req.body); 
    //result error
    if ( error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length+1 , 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})
app.get('/api/:id' , (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.put('/api/:id', (req , res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
         res.status(404).send('The course with the given ID was not found');
    }

    //Look up the course if not existing return 404

    //Validate , if invalid return 400 - bad request
    const { error } = validatecourse(req.body); //result error
    if ( error){
        res.status(400).send(error.details[0].message);
        return;
    }
    //update course

    course.name = req.body.name;
    res.send(course);
})
//port
const port = process.env.port || 3001;
app.listen(3001, () => console.log(`Listening to port ${port}....`));

function  validatecourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course , schema);
  
}

app.delete('/api/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index ,1 );
    res.send(course);

});