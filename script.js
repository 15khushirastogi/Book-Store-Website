const bookTables = document.querySelectorAll('.cse-table');

const populateCartTable = () => {
  let table = document.querySelector(".cart-table");
  let cartDetails = localStorage.getItem("cartDetails");
  let cartData = JSON.parse(cartDetails);
  if(cartData === null)
  {

  }
  else{
    table.innerHTML = `<tr>
      <th>Title</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Amount</th>
      <th>Remove</th>
      </tr>`;
  
    let totalamount=0;

    let cartData = JSON.parse(cartDetails);
    for(let i=0; i<cartData.length;i++)
    {
      let row = cartData[i];
      let amount = parseFloat(row.price) * parseInt(row.quantity);
      table.innerHTML += `
        <tr>
          <td>${row.title}</td>
          <td>${row.quantity}</td>
          <td>${row.price}</td>
          <td>${amount}</td>
          <td><button onclick="deleteItem(${i})">Delete</button></td>
        </tr>
        `;
        totalamount+=amount;
    }
    document.write(`<h1 class="bill">Total Payable Amount: Rs.${totalamount}</h1>`);

  }
}

const deleteItem = (index) => {
  let response=confirm("Do you want to delete the item from the cart?");
  if(response==true)
  {
    let cartDetails= JSON.parse(localStorage.getItem("cartDetails"));
    cartDetails.splice(index,1);
    localStorage.setItem("cartDetails" , JSON.stringify(cartDetails));
    populateCartTable();
  }
  
};


bookTables.forEach(table => {
  table.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart")) {
      const button = event.target;
      const row = button.closest("tr");
      const title = row.cells[1].innerText;
      const price= row.cells[3].innerText.replace("Rs.","");
      const quantityInput = row.querySelector(".item-quantity");
      const quantity = parseInt(quantityInput.value);

      if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid positive quantity.");
        return; 
      }
      let shortTitle = title.substring(6, title.indexOf('\n'));

      console.log("Table ID:", table.id);
      console.log("Title:", shortTitle);
      console.log("Quantity:", quantity);
      console.log("Price:", price);
      
      let cartDetails = localStorage.getItem("cartDetails");
      if(cartDetails == null) 
      {
        let cartJSON = [];
        
        cartJSON.push({
          title: shortTitle,
          quantity: quantity,
          price: price
        });
        alert("Item addes to the cart successfully!");
        localStorage.setItem("cartDetails" , JSON.stringify(cartJSON));

      }
      else
      {
        let cartJSON= JSON.parse(cartDetails);
        cartJSON.push({
          title: shortTitle,
          quantity: quantity,
          price: price
        });
        alert("Item addes to the cart successfully!");
        localStorage.setItem("cartDetails" , JSON.stringify(cartJSON));
      }

      populateCartTable();
    }
  });
});

populateCartTable();
