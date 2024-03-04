const inputEl = document.querySelector('input')

inputEl.onchange = function() {
    const file = inputEl.files[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = function(e) {
        console.log('e.target.result', e.target.result)
        const previewa = document.querySelector('img')
        console.log(previewa === preview)
        previewa.src = e.target.result
    }
}