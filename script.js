let addItemBtn = document.querySelector('#add-item-btn');

let groceryList = [];

if (localStorage.getItem('groceryList')) {
    groceryList = JSON.parse(localStorage.getItem('groceryList'));
    createList();
}

addItemBtn.addEventListener('click', function() {
    event.preventDefault();

    if ($('.add-item-input').val().trim() !== '') {
        let groceryItem = $('.add-item-input').val().trim();
        groceryList.push(groceryItem);
        localStorage.setItem("groceryList", JSON.stringify(groceryList));
        $('.add-item-input').val('');
        createList();
    }
});

function createListItem(text, index) {
    let listItemEl = $('<div>').addClass('list-item row');
    let leftColEl = $('<div>').addClass('col-9 d-flex align-items-center justify-content-start');
    let checkBox = $('<input>').attr('type', 'checkbox');
    let listItemText = $('<div>').addClass('list-text').text(text);
    let rightColEl = $('<div>').addClass('col-3 d-flex align-items-center justify-content-end');
    let deleteBtnEl = $('<div>').addClass('delete-btn').html('<i class="fas fa-trash"></i>');
    deleteBtnEl.click(handleDeleteBtnClick);
    deleteBtnEl.attr('data-value', index);

    $(leftColEl).append(checkBox, listItemText);
    $(rightColEl).append(deleteBtnEl);
    $(listItemEl).append(leftColEl, rightColEl);
    $('.list-container').append(listItemEl);
}

function createList() {
    $('.list-container').empty();
    groceryList.forEach(function (item, index) {
        createListItem(item, index);
    })
}

function handleDeleteBtnClick() {
    let targetIndex = $(this).attr('data-value');
    groceryList.splice(targetIndex, 1);
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    createList();
}