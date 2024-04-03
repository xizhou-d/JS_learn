const inputEl = document.querySelector('input')

inputEl.onchange = function() {
    const file = inputEl.files[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = function(e) {
        console.log('e.target.result', e.target.result)
        const preview = document.querySelector('img')
        console.log(preview === preview)
        preview.src = e.target.result
    }
}