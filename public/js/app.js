const formSub = document.querySelector('form')
const key = document.querySelector('input')
const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')

document.addEventListener('submit', (e) => {
    e.preventDefault()

    p1.textContent = 'Loading...'
    p2.textContent = ''

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(key.value)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            p1.textContent = data.error
        }
        else{
            p1.textContent = 'Location: ' + key.value
            p2.textContent = 'Forecast: ' + data.forecast
        }
    })
})
})

