function handleFormSubmit(e) {
  e.preventDefault();

  const vegDetails = {
    name: e.target.name.value,
    price: e.target.price.value,
    quantity: e.target.quantity.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/f84e758c422a4190b1cd74176d4fef74/vegDetails",
      vegDetails
    )
    .then((response) => display(response.data))
    .catch((err) => console.log(err));

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}

function display(details) {
  let veglist = document.querySelector(".veglist");
  let list = document.createElement("li");
  let totallist = document.querySelector(".totallist");
  let id = details._id;

  list.textContent = `${details.name} RS:${details.price} ${details.quantity}KG`;

  let inputamount = document.createElement("input");
  inputamount.className = "inpamount";
  list.appendChild(inputamount);

  let buyButton = document.createElement("button");
  buyButton.textContent = "Buy";
  buyButton.type = "button";
  buyButton.className = "buy";
  list.appendChild(buyButton);

  let deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  list.appendChild(deleteButton);

  let total = veglist.querySelectorAll("li").length;
  totallist.textContent = `Total:${++total}`;

  veglist.appendChild(list);

  buyButton.addEventListener("click", (e) => {
    let inputvalue = parseInt(inputamount.value);
    let newQuantity = details.quantity - inputvalue;
    let arr = e.target.parentNode.firstChild.nodeValue.split(" ");
    let obj = {
      name: arr[0],
      price: arr[1],
      quantity: newQuantity,
    };

    axios
      .put(
        `https://crudcrud.com/api/f84e758c422a4190b1cd74176d4fef74/vegDetails/${id}`,
        obj
      )
      .then((response) => {
        list.textContent = `${obj.name}   ${obj.price}   ${obj.quantity}KG`;
        list.appendChild(inputamount);
        list.appendChild(buyButton);
        list.appendChild(deleteButton);
      })
      .catch((err) => console.log(err));
  });

  deleteButton.addEventListener("click", (e) => {
    let valtodel = e.target.parentNode;
    console.log(valtodel);
    veglist.removeChild(valtodel);

    axios
      .delete(
        `https://crudcrud.com/api/f84e758c422a4190b1cd74176d4fef74/vegDetails/${id}`
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
