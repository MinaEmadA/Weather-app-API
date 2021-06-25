/* Global Variables */
const generateBtn = document.querySelector('#generate');
const error = document.querySelector('#error');
const apiKey = ',us&appid=a28ecbec80b86fc098a5f0a51c4a6b52&units=metric'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

generateBtn.addEventListener('click', function () {
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    getTemp(zipCode)
        .then((data) => { postData({ date: newDate, temp: `${data.main.temp} but feels like ${data.main.feels_like}`, feelings: feelings }) })

        .then(() => { updateUserInterface() });
});
//Get temperature function
const getTemp = async (zipCode) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`)
    try {
        const data = await response.json();
        console.log(data)
        if (data.cod != 200) {
            // display the error message on UI
            error.textContent = 'Invalid zip code';
            error.style.color = 'red'
            setTimeout(() => error.innerHTML = '', 2000)
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

//Post data to server as an object
const postData = async (data = {}) => {
    const postReq = await fetch('http://localhost:8000/addData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const returnedData = await postReq.JSON();
        console.log(returnedData)
        return returnedData;
    } catch (error) {
        console.log(error)
    }
}

//retieve data from server and update the user interface
const updateUserInterface = async () => {
    const request = await fetch('http://localhost:8000/allData');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feelings;
    } catch (error) {
        console.log(error)
    }
}