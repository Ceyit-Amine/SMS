document.addEventListener('DOMContentLoaded', function() {
    var phoneNumber = document.querySelector(".phoneNumber"),
        messageInput = document.querySelector(".message"),
        btnSend = document.querySelector(".btnSend"),
        showMessage = document.querySelector(".showMessage");

    btnSend.addEventListener("click", () => {
        // Check if phone number and message are not empty
        if (phoneNumber.value.trim() === "" || messageInput.value.trim() === "") {
            showMessage.innerHTML = "Please enter both phone number and message.";
            return;
        }

        // SMS API section
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "App 3b5302cc95b325943349d3a50661dae3-7a2ce27c-f35b-49dd-929a-05a93bc1505c");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const newJSON = JSON.stringify({
            "messages": [{
                "destinations": [{"to": phoneNumber.value}],
                "from": "syntax Flow",
                "text": messageInput.value
            }]
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: newJSON,
            redirect: "follow"
        };

        fetch("https://portal.infobip.com/sms/2/text/advanced", requestOptions)
            .then(() => {
                showMessage.innerHTML = "SMS message sent successfully!";
                phoneNumber.value = "";
                messageInput.value = "";
            })
            .catch((error) => {
                console.error("Error:", error);
                showMessage.innerHTML = "Failed to send SMS.";
            });
    });
});
