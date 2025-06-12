const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended : false }));


//Routes

app.get('/users', (req,res) => {
    /*

    <ul>
    <li>Divya Kumari</li>
    </ul>
    
    */

    const html = `
    <ul>

      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}

        </ul>`;

        res.send(html);
});

app.get("/api/users", (req, res) => {
    return res.json(users);
});

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// *********** MORE EFFICIENT WAY *************//

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
 })
 .put((req, res) => {

    const id = Number(req.params.id);
    const updateData = req.body;
    let userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({status : "User not found!!"})
    }

    users[userIndex] = {...users[userIndex], ...updateData};

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: "Error updating file" });
      return res.json({ status: "User updated", user: users[userIndex] });
    })


 })
 .delete((req, res) => {

     const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    const deletedUser = users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ status: "Error deleting user" });
      return res.json({ status: "User deleted", deletedUser });
    });
 });


 app.post("/api/users", (req,res) => {
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", id: users.length });
    });
   
 });




    

app.listen(PORT, () => console.log(`server Started at PORT ${PORT}`));