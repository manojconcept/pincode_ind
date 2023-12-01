    console.log("Linked")
    let title = document.createElement("title");
    title.innerText = "check pinCode";
    document.head.append(title);

    let mainDiv = document.createElement("div");
    mainDiv.classList.add("container");
    document.body.append(mainDiv);

    let secDiv = document.createElement("div");
    secDiv.classList.add("cardlist");
    mainDiv.append(secDiv);

    let contentCard = `<div>
    <div class="mb-3">
    <label for="searchBox" class="form-label">Indian pincodes only</label>
    <input type="email" class="form-control" id="searchBox" placeholder="Enter Pincode" aria-describedby="emailHelp">
    <div id="contentId" class="form-text"></div>
    </div>
    <button id="search" type="button" class="btn btn-primary">search</button>
    </div>`

    secDiv.innerHTML = contentCard

    let searchBtn = document.getElementById("search");
    let inputSearch = document.getElementById("searchBox");
    let contentId = document.getElementById("contentId");
    searchBtn.addEventListener("click", (event) => {
        const value = inputSearch.value.trim();
        if (value !== "" && /^\d{6}$/.test(value)) {
            getPINCodeInfo(value);
        } else {
            contentId.innerText = "Error: Enter a valid 6-digit PIN code";
            setTimeout(() => {
                contentId.innerText = "Enter a number";
                inputSearch.value = "";
            }, 2000);
        }
    });




    const getPINCodeInfo = async (pincode) => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data && data[0].Status === "Success") {
                console.log(data[0].PostOffice[0].Name);
                inputSearch.value = "";

                // Map through the array and concatenate the desired property
                let content = data[0].PostOffice
                let concatenatedText = content.map(ele => ele.Name).join(', ');
    
                // Set the concatenated text to contentId
                contentId.innerText = concatenatedText;
            
            } else {
                console.log("Invalid PIN Code or no information available.");
                setTimeout(()=>{
                    contentId.innerText = "Invalid PIN Code or no information available.";
                },2000) 
            }
        } catch (error) {
            console.error("Error fetching PIN Code information:", error);
        }
    };



