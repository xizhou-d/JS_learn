

const btn = document.querySelector('button')

btn.onclick = function () {
    console.log('---------')
    localStorage.setItem('name', 'localStorage')
    sessionStorage.setItem('name', 'sessionStorage')
}

