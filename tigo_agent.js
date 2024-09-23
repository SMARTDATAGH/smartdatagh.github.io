var prices = {
    "0": 0,
    "1": 3.8,
    "2": 7.4,
    "3": 10.5,
    "4": 12.5,
    "5": 15.5,
    "6": 18.5,
    "7": 23.5,
    "8": 25.6,
    "10": 33.8,
    "12": 37.8,
    "15": 46.8,
    "20": 60.8,
    "25": 78.5,
    "40": 119.5,
    "50": 147.5
};

const agentEmails = {
    "AFA1412": "safooppong121@gmail.com",
    "SAM2288": "sam.ebulley210@gmail.com",
    "ESK1196": "esko0896@gmail.com",
    "NFC2563": "nimohandy7@gmail.com",
    "AB5050": "abrahamkessey@gmail.com",
    "AY2080": "johnkessey66@gmail.com",
    "BO2013": "bernardoppong220@gmail.com",
    "MA2308": "maryaccomplish7@gmail.com",
    "FK1470": "fredrickkusi10@gmail.com",
    "AR9041": "mutarurazak@gmail.com",
    "UV1234": "vidaackahmensah@gmail.com",
    "MN0144": "mpakyiyanoah02@gmail.com",
    "SA87633": "salifuabdulrahim28@gmail.com",
    "PI6125": "Prahisaac729@gmail.com",
    "XA1873": "alexboasiako11@gmail.com",
    "VN8482": "vicentnutsugah@gmail.com",
    "MO9673": "mordecaiobeng941@gmail.com",
    "FK0234": "frankkwabenaowusu@gmail.com",
    "BN8363": "bnat90883@gmail.com",
    "NN8874": "lilyame311@gmail.com",
    "RC8834": "maayaasekyiwaa@gmail.com",
    "SD7899": "scholasticacudjoe507@gmail.com",
   "OA4906": "www.ayariga84@gmail.com"
};

document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById("phoneNumber").value;
    const agentId = document.getElementById("agentId").value.toUpperCase();
    const selectedBundle = document.getElementById("bundle").value;
    const amount = prices[selectedBundle] * 100; // Amount in pesewas

    if (!(agentId in agentEmails) || agentEmails[agentId] === "") {
        Swal.fire('Error', 'Invalid or unregistered Agent ID.', 'error');
        return;
    }

    const email = agentEmails[agentId];

    const handler = PaystackPop.setup({
        key: 'pk_live_fb405d2702a00868ba424f73b9148b7aad07b2b0', // Replace with your public key
        email: email,
        amount: amount,
        currency: 'GHS',
        ref: 'KYEKYEKU-' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [{
                display_name: "Phone Number",
                variable_name: "phone_number",
                value: phoneNumber
            }]
        },
        callback: function(response) {
            const form = event.target;
            const formData = new FormData(form);

            fetch('https://api.sheetmonkey.io/form/s2tNaVG3kzyiw91cPx6AyC', {
                method: "POST",
                body: formData
            }).then(function(response) {
                if (response.ok) {
                    const currentTime = new Date();
                    const formattedTime = currentTime.toLocaleString();
                    document.getElementById("submissionTime").textContent = "Form submitted at: " + formattedTime;
                    Swal.fire('Payment Successful!', 'Best Regard Kyekyeku-tech');
                    sendSMS(phoneNumber, selectedBundle); // Call the function to send SMS after successful payment
                } else {
                    Swal.fire('Error', 'There was an error with your submission.', 'error');
                }
            }).catch(function(error) {
                console.error("Error:", error);
                Swal.fire('Error', 'There was an error with your submission.', 'error');
            });
        },
        onClose: function() {
            Swal.fire('Payment Cancelled', 'You closed the payment window.', 'info');
        }
    });
    handler.openIframe();
});

function sendSMS(phoneNumber, selectedBundle) {
    const packageNames = {
        "1": "1GB",
        "2": "2GB",
        "3": "3GB",
        "4": "4GB",
        "5": "5GB",
        "6": "6GB",
        "7": "7GB",
        "8": "8GB",
        "10": "10GB",
        "12": "12GB",
        "15": "15GB",
        "20": "20GB",
        "25": "25GB",
        "30": "30GB",
        "40": "40GB",
        "50": "50GB"
    };

    const package = packageNames[selectedBundle];

    fetch(`https://devp-sms03726-api.hubtel.com/v1/messages/send?clientid=janhcpit&clientsecret=mzrmyenb&from=KyekyekuTek&to=+233545454000&content=Hi Boss, ${package} has been bought on Tigo phone number ${phoneNumber} Kindly confirm the Transaction`, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error sending SMS:', error));
}