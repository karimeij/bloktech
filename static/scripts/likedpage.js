// html page elements
const main = document.getElementsByTagName('main')[0];
const footerText = document.getElementsByTagName('footer')[0].getElementsByTagName('p')[0];
let deleteButtons = document.getElementsByTagName('button');
let clItems = main.getElementsByTagName('li');

// if likedlist is empty, tell the user it is
if (clItems.length === 0) {
    footerText.textContent = `You haven't liked anyone yet.`
}

// make removebutton invisible when javascript is active 
for (let i = 0; i < deleteButtons.length; i++){ 
    deleteButtons[i].classList.add('invisible');
}

// when user clicks on someone's photo, this person gets deleted from the liked list
function removeChat(event) {
    this.closest('li').remove();
    
    if (clItems.length === 0) {
        footerText.textContent = `You haven't liked anyone yet.`
    }

    let node = event.target;
    let id = node.dataset.id;

    var res = new XMLHttpRequest();
    res.open('DELETE', '/' + id);
    res.onload = onload;
    res.send();

    function onload() {
        if (res.status !== 200) {
            throw new Error('Could not delete!');
        }

        window.location = '/';
  }
}

// for every liked person...
for (let i = 0; i < clItems.length; i++) {
    
    // give every chat the right details
    const photo = main.getElementsByTagName('img')[i];

    // make every profile picture clickable (and execute removeChat function)
    photo.addEventListener('click', removeChat)
}