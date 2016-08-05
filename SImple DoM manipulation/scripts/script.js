var addDiv = '',
    count = 1,
    num;

function add(arguments) {
    num = parseInt(document.getElementById("inputNumber").value);
    for (var i = 0; i < num; i++) {
        addDiv += "<div>Item " + count + "</div>";
        count++;
    }
    document.getElementById('ItemHolder').innerHTML += addDiv;
    addDiv='';
}

function remove(arguments) {
    var list = document.getElementById('ItemHolder'),
        length;
    num = parseInt(document.getElementById("inputNumber").value);
    for (var i = 0; i < num; i++) {
        length = document.getElementById('ItemHolder').children.length - 1;
        count--;
        if (count <= 0) {
            alert('There are is nothing to delete');
            count = 1;
            break;
        } else {
            list.removeChild(list.childNodes[length]);
        }
    }
}
