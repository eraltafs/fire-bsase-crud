const express = require("express");
const admin = require("firebase-admin");

const app = express();

const { User } = require("./config");
const credentials = require("./newtrial-43aad-firebase-adminsdk-hqq7f-93a2b590bd.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userRes = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  });
  res.send(userRes);
});
app.post("/create", async (req, res) => {
  const data = req.body;
  console.log(data);
  await User.add(data);
  res.send({ msg: "user added" });
});
app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});
app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "user up" });
});
app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await User.doc(id).delete();
  res.send({ msg: "user up" });
});
app.listen(8000, () => {
  console.log("app is runing");
});
