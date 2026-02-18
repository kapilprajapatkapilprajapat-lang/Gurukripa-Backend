const express = require('express');
const app = express();
const user = require('./src/controllers/usercontroller');
require('dotenv').config();
require('./src/config/db');

app.use(express.json());
app.use('/gurukripa', user);

const PORT = process.env.PORT | 8000;

app.get("/", (req, res) => {
    return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kapil Prajapati | Futuristic Portfolio</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Segoe UI', sans-serif;
}

body{
  background: #0f0c29;
  background: linear-gradient(135deg,#0f0c29,#302b63,#24243e);
  color:white;
  overflow-x:hidden;
  scroll-behavior:smooth;
}

/* Animated Background Glow */
body::before{
  content:"";
  position:fixed;
  width:600px;
  height:600px;
  background:radial-gradient(circle,#00f7ff,transparent);
  top:-200px;
  left:-200px;
  animation:moveGlow 8s infinite alternate;
  opacity:0.4;
  z-index:-1;
}

@keyframes moveGlow{
  from{transform:translate(0,0);}
  to{transform:translate(300px,200px);}
}

/* Navbar */
nav{
  position:fixed;
  width:100%;
  top:0;
  padding:15px 30px;
  display:flex;
  justify-content:space-between;
  background:rgba(0,0,0,0.4);
  backdrop-filter:blur(10px);
  z-index:1000;
}

nav a{
  color:#00f7ff;
  text-decoration:none;
  margin-left:20px;
  font-weight:bold;
  transition:0.3s;
}

nav a:hover{
  color:#fff;
}

/* Hero Section */
header{
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  padding-top:60px;
}

h1{
  font-size:55px;
  background: linear-gradient(90deg,#00f7ff,#ff00c8);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.typing{
  margin-top:15px;
  font-size:20px;
  color:#00f7ff;
  min-height:25px;
}

/* Buttons */
.btn{
  margin-top:25px;
  padding:12px 30px;
  border-radius:30px;
  border:1px solid #00f7ff;
  background:transparent;
  color:#00f7ff;
  cursor:pointer;
  transition:0.3s;
}

.btn:hover{
  background:#00f7ff;
  color:#000;
  box-shadow:0 0 20px #00f7ff;
}

/* Sections */
section{
  padding:80px 20px;
  text-align:center;
}

.section-title{
  font-size:35px;
  margin-bottom:40px;
  color:#00f7ff;
}

/* Skills Grid */
.skills{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:25px;
  max-width:900px;
  margin:auto;
}

.skill-card{
  padding:25px;
  border-radius:15px;
  background:rgba(255,255,255,0.05);
  backdrop-filter:blur(15px);
  transition:0.3s;
  border:1px solid rgba(0,247,255,0.3);
}

.skill-card:hover{
  transform:translateY(-10px) scale(1.05);
  box-shadow:0 0 20px #00f7ff;
}

/* Contact */
.contact-box{
  background:rgba(255,255,255,0.05);
  padding:30px;
  border-radius:15px;
  max-width:500px;
  margin:auto;
  backdrop-filter:blur(10px);
  border:1px solid rgba(0,247,255,0.3);
}

.contact-box p{
  margin:10px 0;
  cursor:pointer;
}

.contact-box p:hover{
  color:#00f7ff;
}

/* Footer */
footer{
  padding:20px;
  text-align:center;
  background:rgba(0,0,0,0.4);
  margin-top:40px;
}

@media(max-width:768px){
  h1{font-size:38px;}
}
</style>
</head>

<body>

<nav>
  <div><b>Bajrang.dev</b></div>
  <div>
    <a href="#skills">Skills</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

<header>
  <h1>kapil Prajapati</h1>
  <div class="typing" id="typing"></div>
  <button class="btn" onclick="scrollToSection('skills')">Explore My Work</button>
</header>

<section id="skills">
  <div class="section-title">My Skills</div>
  <div class="skills">
    <div class="skill-card">Flutter</div>
    <div class="skill-card">Node.js</div>
    <div class="skill-card">Firebase</div>
    <div class="skill-card">AI</div>
    <div class="skill-card">Machine Learning</div>
    <div class="skill-card">Blockchain</div>
  </div>
</section>

<section id="about">
  <div class="section-title">About Me</div>
  <p style="max-width:800px;margin:auto;line-height:1.7;">
    Full Stack Flutter Developer with approximately 1 year of experience building scalable
    mobile applications and backend systems. Passionate about AI, ML, and Blockchain innovations.
    I build high-performance apps with modern UI and powerful backend architecture.
  </p>
</section>

<section id="contact">
  <div class="section-title">Contact Me</div>
  <div class="contact-box">
    <p onclick="copyEmail()">📧 kapilprajapatkapilprajapat@gmail.com (Click to Copy)</p>
    <p onclick="callMe()">📱 +91 9511337379 (Click to Call)</p>
    <button class="btn" onclick="hireMe()">Hire Me</button>
  </div>
</section>

<footer>
  ©️ 2026 Bajrang Prajapati | All Rights Reserved
</footer>

<script>
const roles = ["Full Stack Flutter Developer","AI Enthusiast","Backend Architect","Blockchain Explorer"];
let i=0, j=0, current="", isDeleting=false;

function type(){
  current = roles[i];
  if(!isDeleting){
    document.getElementById("typing").innerText = current.substring(0,j++);
    if(j>current.length){ isDeleting=true; setTimeout(type,1000); return;}
  }else{
    document.getElementById("typing").innerText = current.substring(0,j--);
    if(j<0){ isDeleting=false; i=(i+1)%roles.length;}
  }
  setTimeout(type,100);
}
type();

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

function copyEmail(){
  navigator.clipboard.writeText("prajapatbaju37@gmail.com");
  alert("Email Copied ✅");
}

function callMe(){
  window.location.href="tel:+919680462099";
}

function hireMe(){
  alert("Let's Build Something Amazing Together 🚀");
}
</script>

</body>
</html>
`);
});

app.listen(PORT, () => {
  console.log(`Server is Running on PORT = ${PORT}`);
});
