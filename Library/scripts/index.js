let library = JSON.parse(localStorage.getItem('list_books'))
let div_Books = document.querySelector(".books")

class Book {
    constructor(url_img, title, author, pageCount, readStatus){
        this.url_img = url_img
        this.title = title
        this.author = author 
        this.pageCount = pageCount
        this.readStatus = readStatus
    }
}

function addBookToLibrary (url_img, title, author, pageCount, readStatus) {
    library.push(new Book (url_img, title, author, pageCount, readStatus))
}

function render() {

    div_Books.innerHTML = ''
    for (let book of library){

        let pos = library.indexOf(book)

        let removeElement = document.createElement("img")
        removeElement.setAttribute("src", "https://image.flaticon.com/icons/svg/43/43625.svg")

        let spanElement = document.createElement("span")
        spanElement.appendChild(removeElement)
        spanElement.setAttribute('onclick', `remove(${pos})`)

        let readStatusElement = document.createElement("p")
        readStatusElement.appendChild(document.createTextNode(book.readStatus))

        let pageCountElement = document.createElement("p")
        pageCountElement.appendChild(document.createTextNode(book.pageCount + ' páginas'))

        let authorElement = document.createElement("p")
        authorElement.appendChild(document.createTextNode(book.author))

        let titleElement = document.createElement("p")
        titleElement.appendChild(document.createTextNode(book.title))

        let div_book_info = document.createElement("div")
        div_book_info.setAttribute("class", "book-info")
        div_book_info.appendChild(titleElement)
        div_book_info.appendChild(authorElement)
        div_book_info.appendChild(pageCountElement)
        div_book_info.appendChild(readStatusElement)

        let imgElement = document.createElement("img")
        imgElement.setAttribute("src", book.url_img)

        let div_book = document.createElement("div")
        div_book.setAttribute("class", "book")
        div_book.appendChild(imgElement)
        div_book.appendChild(div_book_info)
        div_book.appendChild(spanElement)
        
        
        div_Books.appendChild(div_book)
    }
}



let buttonAdd = document.querySelector(".home-add button")

const imgInput = document.querySelector("input[name=url]") 
const titleInput = document.querySelector("input[name=title]")
const authorInput = document.querySelector("input[name=author]")
const pageInput = document.querySelector("input[name=pages]")
const checkboxInput = document.querySelector("input[name=status]")

buttonAdd.onclick = function(event){
    event.preventDefault()

    let imgValue = imgInput.value
    let titleValue = titleInput.value
    let authorValue = authorInput.value
    let pageValue = pageInput.value
    let checkBoxValue = (checkboxInput.checked === true) ? 'Já foi Lido' : 'Não Lido'
    
    addBookToLibrary(imgValue, titleValue, authorValue, pageValue,checkBoxValue)

    imgInput.value = ''    
    titleInput.value = ''
    authorInput.value = ''
    pageInput.value = ''
    checkboxInput.checked === false

    onOff()
    render()
    saveToStorage()
}

function saveToStorage() {
    localStorage.setItem('list_books', JSON.stringify(library))
}

render()

const deleteButton = document.querySelector("span button")

function remove(pos) {
    library.splice(pos, 1)
    render()
    saveToStorage()
}