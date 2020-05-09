import UI from "./ui.js";
import Store from "./store.js";
import Helper from "./helper.js";
import Item from "./item.js";

// Event: Display Items
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an Item
document.querySelector("#item-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const amount = document.querySelector("#amount").value;

  // Validation

  if (title === "" || amount === "") {
    UI.showAlert("Please fill out all form fields.", "error");
  } else {
    // Instantiate item
    const id = Helper.generateUUIDv4();
    console.log(id);
    const item = new Item(id, title, amount);
    UI.addItemToList(item);
    Store.addItem(item);
    UI.clearFields();
    console.log(item);
  }
});

document.querySelector("#add-item").addEventListener("click", (e) => {
  console.log("additem ran");
  UI.showModal();
});

document.querySelector("#hide-modal").addEventListener("click", (e) => {
  UI.hideModal();
});

document.querySelector("#item-list").addEventListener("click", (e) => {
  Store.removeItem(e.target.parentElement.className);
  UI.deleteItem(e.target);
});

// listen for button click events
document.addEventListener("click", (event) => {
  const isButton = event.target.nodeName === "BUTTON";
  if (!isButton) {
    console.log("not button");
    return;
  }

  if (isButton && event.target.className === "list-item") {
    UI.showListItemMenu(event.target.id);
    return;
  }

  console.log("is button");
  console.dir(event.target.id);
});
