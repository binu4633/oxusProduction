
const resetEmail  = (link)=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>reset password email</title>
    <style>
        body{
            background-color: rgba(235, 121, 10, 1);
            padding-top: 50px;
            text-align: center;
            color: white;
        }
        .logo{
          font-size: 25px;
          line-height: 10px;
        }
        .content__wrapper{
            width: 100%;
            min-height: 50vh;
            display: flex;
            justify-content: center;
            padding-bottom: 10px;
        }
        .content{
            width: 80%;
            background-color: rgba(95, 60, 26, 1);
            border-radius: 20px;
            padding-bottom: 20px;
        }
        .large{
            font-size: 50px;
        }
        .small{
            font-size: 30px;
        }
        a{
            color: rgba(235, 10, 47, 1);
            text-decoration: none;
            font-size: 40px;
            background-color: rgba(206, 133, 62, 1);
            padding: 10px 20px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
   <div class="logo">
    <h1>Oxus</h1>
    <h1>collection</h1>
   </div>
   <div class="content__wrapper">
      <div class="content">
          <p class="large">Forgot your password</p>
          <p class="small">click the button below to reset your password , this link will only expire  10 minuts</p>
          <a href=${link}>click here</a>
      </div>
   </div>
</body>
</html>
    
    `
}


export default resetEmail