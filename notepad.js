console.log(`helloooooo`);

window.onload = initializePage()



function initializePage() {
    document.body.style.textAlign = `center`

    const heading = document.createElement('h1')
    const textArea = document.createElement('textarea')
    const div = document.createElement('div')

    textArea.id = 'textarea'


    textArea.placeholder = 'Write something here...'

    if (localStorage.getItem('notetext') != null) {
        textArea.value = localStorage.getItem('notetext')
    }
    if (localStorage.getItem('notesize') != null) {
       const dimensions = JSON.parse(localStorage.getItem('notesize'))
       textArea.style.height = dimensions.c
       textArea.style.width = dimensions.r
    }
    textArea.onchange = function () {localStorage.setItem('notetext',this.value)}
    textArea.onmouseup = (event) => {
        console.log('mouseup');
        const dimensions = {
            c: event.target.style.height,
            r: event.target.style.width
        }
        localStorage.setItem('notesize', JSON.stringify(dimensions))
    }

    heading.innerText = 'Welcome to the Local Storage Notepad!'

    document.body.appendChild(div)
    div.appendChild(heading)
    div.appendChild(textArea)

}