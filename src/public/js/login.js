

function DisplayLoggedinMessage(username) {
     var username = username.charAt(0).toUpperCase() + username.substring(1);
    document.getElementById(
        'container'
    ).innerHTML = `
    
    <div id="container" class="card shadow-2-strong" style="border-radius: 1rem;">
				<div class="card-body p-5 text-center">
				  <h3 class="mb-5">Logged in as ${username} </h3>
				  <hr class="my-4">
                  <button style="background-color: #005F73; border-color:#005F73; font-weight: bold;" id="logoutBtn" class="btn btn-primary btn-medium btn-block" type="submit">Logout</button>
				</div>
			  </div>`;
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        const response = await fetch(`/login/logout`, {method:'POST'});
        if (response.status == 200) {
            DisplayLogin();
            document.getElementById("greenalert").style.display="block";
			document.getElementById("pgreen").innerHTML="Successfully Logged out!";
            location.replace("/index.html");
        }else{
            document.getElementById("redalert").style.display="block";
			document.getElementById("pred").innerHTML="Please try again!"
        }
    });
}

function DisplayLogin() {
    document.getElementById(
        'container'
    ).innerHTML = `<div id="container" class="card shadow-2-strong" style="border-radius: 1rem;">
    <div class="card-body p-5 text-center">

      <h3 class="mb-5">Sign in</h3>

      <div id="logindiv" class class="form-outline mb-4">
        <input type="text" id="username" class="form-control form-control-lg" />
        <label class="form-label" for="username">Username</label>
      
        <input type="password" id="password" class="form-control form-control-lg" />
        <label class="form-label" for="password">Password</label>
      </div>

      
      <div class="form-check d-flex justify-content-start mb-4">
        <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
        <label class="form-check-label" for="form1Example3"> Remember password </label>
      </div>

      <button id="loginbtn" class="btn btn-primary btn-medium btn-block" type="submit">Login</button>

      <hr class="my-4">

      <div>
        <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
        </p>
      </div>

    </div>
  </div>  `;

    document.getElementById('loginbtn').addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const login_details = {
            username: username,
            password: password,
        };
        const response = await fetch(`/paslogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login_details),
        });
		
        if (response.status == 200) {
            const login = await response.json();
            DisplayLoggedinMessage(login.username);
            document.getElementById("greenalert").style.display="block";
			document.getElementById("pgreen").innerHTML="Successfully Logged in!";
            location.replace("/index.html");
        }else{
            document.getElementById("redalert").style.display="block";
            document.getElementById("pred").innerHTML="Wrong details! Please try again!"
        }
    });
}
async function LogginCheck() {
    try {
        const response = await fetch(`/paslogin`);
        
        const login = await response.json()
        
        if (response.status == 200) {
            //const login = await response.json();
            if (login[0].username != null) {
                DisplayLoggedinMessage(login[0].username);
                
                
            } else if (login[0].username == null) {
                
                
            }
        } else {
            //document.getElementById("redalert").style.display="block";
		    //document.getElementById("pred").innerHTML=`The server is temporarily encountering a problem.`
            DisplayLogin();
           
        }

        //create the button using the dom and then set up click handler on the button
    } catch (e) {
        document.getElementById("redalert").style.display="block";
		document.getElementById("pred").innerHTML=`The server is temporarily encountering a problem.`;
        console.log(e);
        
        //alert(`There was an error: ${e}`);
        
    }
}

LogginCheck();

document.getElementById("redbtn").addEventListener("click",()=>{
	document.getElementById("redalert").style.display="none";
});
document.getElementById("greenbtn").addEventListener("click",()=>{
	document.getElementById("greenalert").style.display="none";
});
