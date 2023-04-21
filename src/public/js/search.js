
async function Login() {
	try {


		//const response = await fetch("/login/login");
		const response = await fetch("/paslogin");
		const login = await response.json();

		if (response.status == 200) {

			var logusername = login[0].username.charAt(0).toUpperCase() + login[0].username.substring(1);
			//document.getElementById("loginmessage").innerHTML=`Logged in as, ${login.username}`;
			document.getElementById("lbtn").style.right = "7%"
			document.getElementById("lbtn").innerHTML = `Logged in as, ${logusername}! Logout`;
		} else {

			document.getElementById("lbtn").innerHTML = `Login`;
		}
	} catch (error) {
		console.log(error);
		console.error(error);
		res.status(500).json({ error: e });
	}

}
Login();


const map = L.map("leafletmap");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
	("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{ attribution: attrib }).addTo(map);

const coordinates = [50.908, -1.4]

map.setView(coordinates, 13);



async function SearchForAccommodations(locations) {
	try {

		// Send a request to our URL
		const response = await fetch(`/placesToStay/location/${locations}`);

		// Parse the JSON.
		const accommodations = await response.json();
		// loop through the records and make a marker with popup for each one with button
		for (let i = 0; i < accommodations.length; i++) {
			var divpopup = document.createElement("div");
			//button
			var buttonpop = document.createElement("button");
			var textbtn = document.createTextNode("Book");
			buttonpop.appendChild(textbtn);
			buttonpop.setAttribute("id", "popbtn");
			buttonpop.addEventListener("click", async () => {
				var date = await document.getElementById("date").value;
				var people = await document.getElementById("ppl").value;
				const booking_map = { thedate: date, npeople: people }

				const checkspop = await fetch(`/check/a/${accommodations[i].ID}/${date}`);
				const checkspopjson = await checkspop.json();

				if (checkspop.status == 200) {
					if (checkspopjson[0].availability < people) {
						document.getElementById("redalert").style.display = "block";
						document.getElementById("pred").innerHTML = "Sorry, not enough space!"
					} else {

						const response = await fetch(`/book/book/${accommodations[i].ID}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(booking_map)
						});

						if (response.status == 401) {
							document.getElementById("redalert").style.display = "block";
							document.getElementById("pred").innerHTML = `Please <a href="/login.html">Log In </a> to Book an accommodation!`;
							//alert("Please Log in to book!");
						} else {
							if (response.status == 400) {
								document.getElementById("redalert").style.display = "block";
								document.getElementById("pred").innerHTML = "Please, fill the details!"
							} else {
								document.getElementById("resultfor").innerHTML = `You successfully booked ${accommodations[i].name} in ${accommodations[i].location}`;
								document.getElementById("greenalert").style.display = "block";
								document.getElementById("pgreen").innerHTML = "Successfully booked!";
								document.getElementById("greenbtn").addEventListener("click", () => {
									window.location.reload();
								})
							}

							//alert("Successfully booked!");
						}
					}
				} else {
					document.getElementById("redalert").style.display = "block";
					document.getElementById("pred").innerHTML = `The server is temporarily encountering a problem.`
					console.log(e);
				}
			});
			buttonpop.setAttribute("class", " btn btn-info");
			// Paragraph one 
			var p1popup = document.createElement("p");
			var textp1 = document.createTextNode(`Name: ${accommodations[i].name}`);
			p1popup.appendChild(textp1);
			// Paragraph two
			var p2popup = document.createElement("p");
			var textp2 = document.createTextNode(`Description: ${accommodations[i].description}`);
			p2popup.appendChild(textp2);

			var select1 = document.createElement("div");
			var selectbox1 = document.createElement("select");
			selectbox1.setAttribute("id", "ppl");
			var pnum = document.createElement("p");
			var labeltext1 = document.createTextNode("Number of people:");
			pnum.appendChild(labeltext1);
			select1.appendChild(pnum);
			select1.appendChild(selectbox1);
			for (let r = 1; r < 21; r++) {
				var option = document.createElement("option");
				option.setAttribute("value", r);
				var textppl = document.createTextNode(r);
				option.appendChild(textppl);
				selectbox1.append(option);
			}

			var select2 = document.createElement("div");
			var selectbox2 = document.createElement("select");
			selectbox2.setAttribute("id", "date");
			selectbox2.setAttribute("value", "Date: ")
			var pdate = document.createElement("p");
			var labeltext2 = document.createTextNode("Date:");
			pdate.appendChild(labeltext2);
			select2.appendChild(pdate);
			select2.appendChild(selectbox2);

			var option1 = document.createElement("option");
			var option2 = document.createElement("option");
			var option3 = document.createElement("option");
			option1.setAttribute("value", "220601");
			option2.setAttribute("value", "220602");
			option3.setAttribute("value", "220603");
			var textoption1 = document.createTextNode("01/06/22");
			var textoption2 = document.createTextNode("02/06/22");
			var textoption3 = document.createTextNode("03/06/22");
			option1.appendChild(textoption1);
			option2.appendChild(textoption2);
			option3.appendChild(textoption3);
			selectbox2.appendChild(option1);
			selectbox2.appendChild(option2);
			selectbox2.appendChild(option3);
			//appending everything inside the divpopup
			divpopup.appendChild(p1popup);
			divpopup.appendChild(p2popup);
			divpopup.appendChild(select1);
			divpopup.appendChild(select2);
			divpopup.appendChild(buttonpop);


			const marker = new L.marker([accommodations[i].latitude, accommodations[i].longitude]).bindPopup(divpopup).addTo(map);

		}


		// table 
		var tbl = document.getElementById("results");
		var tblBody = document.createElement("tbody");


		// creating all cells
		var new_pos = [accommodations[0].latitude, accommodations[0].longitude]
		map.setView(new_pos, 11)
		accommodations.forEach(accommodation => {
			// creates a table row

			var row = document.createElement("tr");
			var button = document.createElement("td");
			var buttonElement = document.createElement("input");
			buttonElement.setAttribute("type", "button");
			buttonElement.setAttribute("value", "Book");
			buttonElement.setAttribute("class", " btn btn-info")

			buttonElement.addEventListener("click", () => {
				document.getElementById("modallll").style.display = "block";
				document.getElementById("modalbook").addEventListener("click", async (e) => {
					var tablepeople = document.getElementById("tablepeople").value
					var tabledate = document.getElementById("tabledate").value

					const checks = await fetch(`/check/a/${accommodation.ID}/${tabledate}`);
					const checksjson = await checks.json();
					if (response.status == 200) {
						if (checksjson[0].availability < tablepeople) {
							document.getElementById("redalert").style.display = "block";
							document.getElementById("pred").innerHTML = "Sorry, not enough space!"
						} else {
							const table_booking = { thedate: tabledate, npeople: tablepeople }
							console.log(table_booking);
							const response = await fetch(`/book/book/${accommodation.ID}`, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(table_booking)
							});

							if (response.status == 401) {
								document.getElementById("redalert").style.display = "block";
								document.getElementById("pred").innerHTML = `Please <a href="/login.html">Log In </a> to Book an accommodation!`;
								//alert("Please Log in to book!");
							} else {
								if (response.status == 400) {
									document.getElementById("redalert").style.display = "block";
									document.getElementById("pred").innerHTML = "Please fill the details!"
								} else {
									
									document.getElementById("modalfooter").style.display = "none";
									document.getElementById("modalbody").innerHTML = `<p id="booked">You successfully booked ${accommodation.name} in ${accommodation.location}</p>`;

									document.getElementById("greenalert").style.display = "block";
									document.getElementById("pgreen").innerHTML = "Successfully booked!";
									document.getElementById("modalclose").addEventListener("click", () => {
										window.location.reload();
									})
								
									//alert("Successfully booked!");
								}
							}
						}
					} else {
						document.getElementById("redalert").style.display = "block";
						document.getElementById("pred").innerHTML = `The server is temporarily encountering a problem.`
						console.log(e);
					}
				})
			});

			for (let key in accommodation) {

				var cell = document.createElement("td");
				button.appendChild(buttonElement)
				var cellText1 = document.createTextNode(` ${accommodation[key]}`);
				cell.appendChild(cellText1);
				row.appendChild(cell);
				row.appendChild(button);
			}
			// }
			tblBody.appendChild(row);
			// add the row to the end of the table body
		});
		// reload the current tbody in the table

		if (tbl.childNodes.length == 2) {
			tbl.removeChild(tbl.childNodes[1]);
		}
		tbl.appendChild(tblBody);
	} catch (e) {
		document.getElementById("redalert").style.display = "block";
		document.getElementById("pred").innerHTML = `The server is temporarily encountering a problem.`
		console.log(e);
		//alert(`There was an error: ${e}`);
	}
}

// Make the AJAX run when we click a button
document.getElementById('ajaxButton').addEventListener('click', () => {
	// Read the product type from a text field
	const location = document.getElementById('location').value;
	console.log(location);
	document.getElementById("resultfor").innerHTML = `Results for: ${location}`;
	SearchForAccommodations(location);
});


document.getElementById("mapbtn").addEventListener("click", () => {
	document.getElementById("tablebtn").style.background="white";
	document.getElementById("tablebtn").style.color="black";
	document.getElementById("mapbtn").style.background="grey";
	document.getElementById("mapbtn").style.color="white";
	document.getElementById("mapdiv").style.display = "block";
	document.getElementById("table1").style.display = "none";
	map.invalidateSize();
});

document.getElementById("tablebtn").addEventListener("click", () => {
	document.getElementById("mapbtn").style.background="white";
	document.getElementById("mapbtn").style.color="black";
	document.getElementById("tablebtn").style.background="grey";
	document.getElementById("tablebtn").style.color="white";
	document.getElementById("table1").style.display = "block";
	document.getElementById("mapdiv").style.display = "none";
});

document.getElementById("redbtn").addEventListener("click", () => {
	document.getElementById("redalert").style.display = "none";
});
document.getElementById("greenbtn").addEventListener("click", () => {
	document.getElementById("greenalert").style.display = "none";
});

document.getElementById("modalclose").addEventListener("click", () => {
	document.getElementById("modallll").style.display = "none";
})
