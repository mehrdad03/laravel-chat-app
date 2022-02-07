require('./bootstrap');
const messages_el = document.getElementById("messages")
const username = document.getElementById("username")
const messages_input = document.getElementById("message_input")
const messages_form = document.getElementById("message_form")

messages_form.addEventListener('submit', function (e) {
    e.preventDefault()
    let has_errors = false
    if (username.value == '') {
        alert('please enter a username')
        has_errors = true
    }
    if (messages_input.value == '') {
        alert('please enter a message')
        has_errors = true
    }
    if (has_errors) {
        return;
    }
    const options = {
        method: 'post',
        url: '/send-message',
        data: {
            'username': username.value,
            'message': messages_input.value
        }
    }
    axios(options)
    window.Echo.channel('chat').listen('.message', (e) => {
        console.log(e)
        messages_el.innerHTML+='<div class="message"><strong>'+e.user()+':</strong></div>'+e.message+''
    })


})
