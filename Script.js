let Yesterday = []
let Yesterday_old_data = []

function CreateElements(Array1) {
    for (let a = 0; a < Array1.length; a++) {
        let items_ = document.getElementById('Add_Yesterday_todo');
        let Element = document.createElement('li');
        Element.innerText = Array1[a];
        items_.append(Element);
        let Btn_Done = document.createElement('button')
        Btn_Done.innerText = 'DONE'
        items_.append(Btn_Done);
        Btn_Done.setAttribute("class", "Btn_done");
        Btn_Done.setAttribute("id", Array1[a]);
        // Array1 = Array1.filter(e => e !== Array1[a]);
    }
}
// document.getElementsByClassName('Btn_done').addEventListener('click', () => {
//     console.log("first")
// })

function ClearLocalstorageItem(ItemsToRemove) {
    let Temp_yesterday = window.localStorage.getItem("TODO");
    Temp_yesterday = Temp_yesterday.filter(element => element !== ItemsToRemove);
    console.log(Temp_yesterday)

}
document.getElementById('Btn').addEventListener('click', () => {
    let input_value = document.getElementById("Yesterday").value;
    if (input_value !== '') {
        Yesterday.push(input_value);
        // Yesterday_old_data.push(input_value)
        for (let a = 0; a < Yesterday.length; a++) {
            let items_ = document.getElementById('Add_Yesterday_todo');
            let Element = document.createElement('li');
            Element.innerText = Yesterday[a];
            items_.append(Element);
            Yesterday = Yesterday.filter(e => e !== Yesterday[a]);
        }
        Add_localStorage(input_value);
        document.getElementById("Yesterday").value = ''
    }
})

function RenderExisting() {
    CreateElements(Yesterday_old_data[0])
}
function ReloadBackup() {
    let Temp_yesterday = window.localStorage.getItem("TODO") || null
    if (Temp_yesterday) Yesterday_old_data.push(Temp_yesterday.split(','));
    RenderExisting();
}
//this function will run during loading
window.onload = ReloadBackup();

function Add_localStorage(input_value) {
    let Temp = Yesterday_old_data;
    Temp.push(input_value)
    window.localStorage.setItem("TODO", Temp)
}

//Attaching events to all the buttons to remove
document.querySelectorAll('.Btn_done').forEach(function (item) {
    item.addEventListener('click', function () {
        // let ItemToRemove = document.querySelectorAll('.Btn_done')
        let Temp_yesterday = window.localStorage.getItem("TODO") || null
        Temp_yesterday = Temp_yesterday.split(',')
        // console.log(Temp_yesterday.split(','));
        Temp_yesterday = Temp_yesterday.filter(elem => elem !== item.id);
        window.localStorage.setItem("TODO", Temp_yesterday)
        location.reload();
    });
});