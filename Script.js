let Yesterday = []
let Yesterday_old_data = []

//thus function will create the elements with button named done
function CreateElements(Array1, parentclassname, childclassname) {
    for (let a = 0; a < Array1?.length; a++) {
        let items_ = document.getElementById(parentclassname);//Reference div to create element
        let Element = document.createElement('li');//creating parent div for todo and btns
        Element.setAttribute("class", childclassname);//class name for parent div
        items_.append(Element)//make the parent div as child to another div

        //Creating content div and add the item from Array
        let Todo_item = document.createElement('div');
        if (childclassname === 'doneitmslist5') {
            Element.innerText = Array1[a];
            items_.append(Element)
            // Todo_item = document.createElement('li')
        }
        if (childclassname === "TodoItems") {
            Todo_item.setAttribute("class", "TodoContent");
            Todo_item.innerText = Array1[a];
            Element.append(Todo_item);
            //Add the button to remove the item from array
            let Btn_Done = document.createElement('button')
            Btn_Done.innerText = 'DONE'
            Element.append(Btn_Done);
            Btn_Done.setAttribute("class", "Btn_done");
            Btn_Done.setAttribute("id", Array1[a]);
        }
    }
}

//used to remove the localstorage particular item
function ClearLocalstorageItem(ItemsToRemove) {
    let Temp_yesterday = window.localStorage.getItem("TODO");
    Temp_yesterday = Temp_yesterday.filter(element => element !== ItemsToRemove);
    // console.log(Temp_yesterday)
}
// to show the done
function ShowDone() {
    let Temp_yesterday = window.localStorage.getItem("DONE") || null
    Temp_yesterday = Temp_yesterday?.split(',');
    CreateElements(Temp_yesterday, "doneItems", "doneitmslist5");
    // console.log(Temp_yesterday)
}
const AddItems = function () {
    // debugger;
    let input_value = document.getElementById("Yesterday").value;
    console.log(input_value)
    if (input_value !== "" && input_value !== undefined) {
        Yesterday.push(input_value);
        // Yesterday_old_data.push(input_value)
        for (let a = 0; a < Yesterday.length; a++) {
            let items_ = document.getElementById('Add_Yesterday_todo');
            let Element = document.createElement('div');
            Element.innerText = Yesterday[a];
            items_.append(Element);
            Yesterday = Yesterday.filter(e => e !== Yesterday[a]);
        }
        Add_localStorage(input_value);
        document.getElementById("Yesterday").value = '';
        location.reload();
    }
}
// This will execute when we click add
document.getElementById('Btn').addEventListener('click', AddItems, false)
// This will execute when we click Enter key
document.onkeydown = function () {
    if (window.event.keyCode == '13') {
        AddItems();
    }
}
function HeaderDisplay() {
    let Temp_yesterday = window.localStorage.getItem("TODO") || null
    if (Temp_yesterday !== null) {
        Temp_yesterday = Temp_yesterday.split(',');
    }
    let items_ = document.getElementById('Header_');
    let Element = document.createElement('h2');
    if (Temp_yesterday !== null) Element.innerText = `Hello, You have ${Temp_yesterday.length} pending tasks!`;
    if (Temp_yesterday === null) Element.innerText = `WOW!!! You have 0 pending tasks!`;
    items_.append(Element);
}
function RenderExisting() {
    CreateElements(Yesterday_old_data[0], "Add_Yesterday_todo", "TodoItems")
}
function ReloadBackup() {
    let Temp_yesterday = window.localStorage.getItem("TODO") || null
    if (Temp_yesterday) Yesterday_old_data.push(Temp_yesterday.split(','));
    RenderExisting();
    HeaderDisplay();
}
function FunctionsNeedtorunDuringOnload() {
    ReloadBackup();
    ShowDone();
}
//this function will run during loading
window.onload = FunctionsNeedtorunDuringOnload();


function Add_localStorage(input_value) {
    if (input_value !== undefined || input_value !== null) {
        let Temp = Yesterday_old_data;
        Temp.push(input_value)
        window.localStorage.setItem("TODO", Temp)
    }
}
function AddDoneToLocalStorage(Data) {
    if (Data !== undefined && Data !== null && Data != "Btn") {
        let Temp_yesterday = window?.localStorage?.getItem("DONE") || []
        Temp_yesterday[0] !== undefined ? Temp_yesterday = Temp_yesterday?.split(',') : null
        Temp_yesterday.push(Data);
        window.localStorage.setItem("DONE", Temp_yesterday);
        location.reload();
    }
}
//Attaching events to all the buttons to remove
document.querySelectorAll('.Btn_done').forEach(function (item) {
    item.addEventListener('click', function () {
        // let ItemToRemove = document.querySelectorAll('.Btn_done')
        let Temp_yesterday = window.localStorage.getItem("TODO") || null
        Temp_yesterday = Temp_yesterday?.split(',');
        Temp_yesterday = Temp_yesterday?.filter(elem => elem !== item.id);
        if (Temp_yesterday !== undefined) {
            window.localStorage.setItem("TODO", Temp_yesterday);
            AddDoneToLocalStorage(item.id);
            location.reload();
        }
    });
});

//download the done file
function downloadFile(type) {
    let Temp_yesterday = window.localStorage.getItem("TODO") || null
    Temp_yesterday = Temp_yesterday.split(',');
    var Element = document.getElementById('downloadFile');
    var file = new Blob(Temp_yesterday, { type: type });
    Element.href = URL.createObjectURL(file);
    Element.download = 'TodosToday.txt';
}
//triggering download file function in rocket button
document.getElementById('download_btn').addEventListener('click', () => {
    downloadFile("file txt", 'filet.txt', 'text/plain');
    let a = document.getElementById('download_btn')
    console.log(a)
})