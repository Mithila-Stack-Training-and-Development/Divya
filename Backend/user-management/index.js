const express = require('express');
const fs = require('fs');
const mongoose = require("mongoose");
// const users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;


//Connection with mongoose

mongoose
.connect("mongodb://127.0.0.1:27017/user-management")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));

//Schema 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,

  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
},
{
  timestamps: true
});

//Model

const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended : false }));


//Routes

app.get('/users', async(req,res) => {
    /*

    <ul>
    <li>Divya Kumari</li>
    </ul>
    
    */
 // ***** getting users from file ./MOCK_DATA.json
    // const html = `
    // <ul>

    //   ${users.map((user) => `<li>${user.first_name}</li>`).join("")}

    //     </ul>`;

    //     res.send(html);


        //Getting users from database

        const allDbusers = await User.find({});

        const html = `
     <ul>

      ${allDbusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}

        </ul>`;

        res.send(html);


});

app.get("/api/users", async(req, res) => {
  //http headers
  // console.log(req.headers);
  // res.setHeader("X-myName", "Divya Kumari"); ---> Custom Header
  //Good practices --> Always append X to custom headers


   
   // Get users from DB
   const allDbUsers = await User.find({});
   return res.json(allDbUsers);

});

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// *********** MORE EFFICIENT WAY *************//

app.route("/api/users/:id")
.get(async(req,res) => {
    // const id = Number(req.params.id);
    //const user = users.find((user) => user.id === id);


    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error : "user not found" });
    return res.json(user);
 })
 .patch(async(req, res) => {

    // const id = Number(req.params.id);
    // const updateData = req.body;
    // let userIndex = users.findIndex((user) => user.id === id);

    // if(userIndex === -1){
    //     return res.status(404).json({status : "User not found!!"})
    // }

    // users[userIndex] = {...users[userIndex], ...updateData};

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    //     if (err) return res.status(500).json({ status: "Error updating file" });
    //   return res.json({ status: "User updated", user: users[userIndex] });
    // })

    //**** by Database */

    await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'});
    return res.json({status: "Success"});




 })
 .delete(async(req, res) => {

    //  const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);

    // if (userIndex === -1) {
    //   return res.status(404).json({ status: "User not found" });
    // }

    // const deletedUser = users.splice(userIndex, 1);

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    //   if (err) return res.status(500).json({ status: "Error deleting user" });
    //   return res.json({ status: "User deleted", deletedUser });
    // });

    //**** Through Database  */

    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"});

 });


 app.post("/api/users", async(req,res) => {
    // const body = req.body;
    // users.push({...body, id: users.length+1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({ status: "Success", id: users.length });
    // });
   

    // ******* Inserting Data into mongoDB *********//

    const body = req.body;

    if(
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ){
      return res.status(400).json({msg: "All fields are required..."});
    }
   const result =  await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    console.log("result", result);

    return res.status(201).json({ msg: "success" });
 });




    

app.listen(PORT, () => console.log(`server Started at PORT : ${PORT}`));