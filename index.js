let myleads = [] 
const inputfr = document.getElementById("input")
const buttoninp = document.getElementById("buttonin")
const unlist = document.getElementById("ul-list") 
const buttondel = document.getElementById("buttondel")
const buttontab = document.getElementById("buttontab")
const buttondelo = document.getElementById("buttondelo")

let leadsFromLocalStroage = JSON.parse(localStorage.getItem("myleads"))


if(leadsFromLocalStroage)
{
    myleads = leadsFromLocalStroage
    render(myleads)
}
buttontab.addEventListener("click",function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })
})

buttoninp.addEventListener("click", function(){
    myleads.push(inputfr.value)
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads)
})
buttondel.addEventListener("click", function()
{
    myleads = []
    localStorage.clear()
    render(myleads)
})
buttondelo.addEventListener("click",function()
{
    const todelete = inputfr.value
    const index = myleads.indexOf(todelete)
    myleads.splice(index,1)
    localStorage.removeItem(todelete)
    render(myleads)
})


function render(leads)
{
     let itemslits = ""
     for(let a=0;a<leads.length;a++)
    {
        itemslits += `
        <li>
        <a href='${leads[a]}' target='_blank'>
        ${leads[a]}
        </a>
        </li>`
    }
    unlist.innerHTML = itemslits
    inputfr.value = ""
}